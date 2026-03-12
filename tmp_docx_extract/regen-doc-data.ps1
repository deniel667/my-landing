$ErrorActionPreference = 'Stop'

function Normalize-Whitespace([string]$s) {
  if ([string]::IsNullOrWhiteSpace($s)) { return '' }
  $s = $s -replace "`r", ' '
  $s = $s -replace "`n", ' '
  $s = $s -replace '\s{2,}', ' '
  return $s.Trim()
}

function Clean-Chunk([string]$chunk) {
  $markers = '1–2行サマリー|Key Specs|Tasting Note|Vinification|Vineyard / Soil|Serving / 提案|VintageComment|Awards / Reference|Links（'
  return [regex]::Replace($chunk, 'ミキコさんコメント：.*?(?=(?:' + $markers + ')|$)', '', 'Singleline')
}

function Get-Section([string]$chunk, [string]$start, [string[]]$ends) {
  $endPattern = ($ends | ForEach-Object { [regex]::Escape($_) }) -join '|'
  $pattern = [regex]::Escape($start) + '(?<body>[\s\S]*?)(?=' + $endPattern + '|$)'
  $m = [regex]::Match($chunk, $pattern)
  if (-not $m.Success) { return '' }
  $body = $m.Groups['body'].Value
  $body = $body -replace '^（[^）]*）', ''
  $body = $body -replace '^[:：\s]+', ''
  return Normalize-Whitespace $body
}

$idMap = @{
  'Bus Wine characteristics.txt' = 'bus'
  'Dautel Wine characteristics.txt' = 'dautel'
  'Dr.Buerklin-wolf Wine characteristics.txt' = 'buerklinwolf'
  'Hamm Wine characteristics.txt' = 'hamm'
  'Horst Sauer Wine characteristics.txt' = 'horst'
  'Jean Stodden Wine characteristics.txt' = 'stodden'
  'Landerer Wine characteristics.txt' = 'landerer'
  'Ludwig Wine characteristics.txt' = 'ludwig'
  'Ress Wine characteristics.txt' = 'ress'
  'Salwey Wine characteristics.txt' = 'salwey'
}

$headings = @('1–2行サマリー','Key Specs','Tasting Note','Vinification','Vineyard / Soil','Serving / 提案','VintageComment','Awards / Reference','Links（')
$result = @{}

$files = Get-ChildItem 'tmp_docx_extract' -Filter '*Wine characteristics.txt' -File
foreach ($file in $files) {
  $id = $idMap[$file.Name]
  if (-not $id) { continue }

  $raw = Get-Content -Raw -Encoding utf8 $file.FullName
  $matches = [regex]::Matches($raw, '[─]{20,}\s*(?<chunk>(?:NV|\d{4})[\s\S]*?)(?=[─]{20,}\s*(?:NV|\d{4})|\z)')
  $wines = @()

  foreach ($m in $matches) {
    $chunk = $m.Groups['chunk'].Value.Trim()
    if (-not $chunk) { continue }
    $chunk = Clean-Chunk $chunk

    $header = [regex]::Match($chunk, '^(?:NV|\d{4})\s*[^\r\n]+').Value
    if (-not $header) { continue }

    $name = $header
    $name = $name -replace '■.*$', ''
    $name = $name -replace '(?i)Weingut.*$', ''
    $name = $name -replace '[─]+$', ''
    $name = Normalize-Whitespace $name

    if ($name -match '^N\s*$' -or $name -match '^\d+$') { continue }

    $typeMatch = [regex]::Match($chunk, 'タイプ：([^\s]+)')
    $typeText = if ($typeMatch.Success) { $typeMatch.Groups[1].Value } else { '' }
    $docType = 'white'
    if ($typeText -match '赤') { $docType = 'red' }
    elseif ($typeText -match '泡|スパークリング|Sekt') { $docType = 'sparkling' }

    $summary = Get-Section $chunk '1–2行サマリー' $headings
    $analysis = Get-Section $chunk 'Key Specs' $headings
    $tasting = Get-Section $chunk 'Tasting Note' $headings
    $vinification = Get-Section $chunk 'Vinification' $headings
    $soil = Get-Section $chunk 'Vineyard / Soil' $headings
    $serving = Get-Section $chunk 'Serving / 提案' $headings

    $wines += [ordered]@{
      name = $name
      type = $docType
      summary = $summary
      analysis = $analysis
      tasting = $tasting
      vinification = $vinification
      soil = $soil
      serving = $serving
    }
  }

  $seen = @{}
  $dedup = @()
  foreach ($w in $wines) {
    if (-not $seen.ContainsKey($w.name)) {
      $seen[$w.name] = $true
      $dedup += $w
    }
  }

  $result[$id] = $dedup
}

$ts = @()
$ts += 'export type DocWine = {'
$ts += '  name: string;'
$ts += '  type: "white" | "red" | "sparkling";'
$ts += '  summary: string;'
$ts += '  analysis: string;'
$ts += '  tasting: string;'
$ts += '  vinification: string;'
$ts += '  soil: string;'
$ts += '  serving: string;'
$ts += '};'
$ts += ''
$ts += 'export const docWineData: Record<string, DocWine[]> = {'
foreach ($id in ($result.Keys | Sort-Object)) {
  $json = $result[$id] | ConvertTo-Json -Depth 6
  $jsonLines = $json -split "`n"
  $ts += ('  "{0}": {1}' -f $id, $jsonLines[0])
  for ($j = 1; $j -lt $jsonLines.Count; $j++) {
    if ($j -eq $jsonLines.Count - 1) {
      $ts += ('  {0},' -f $jsonLines[$j])
    } else {
      $ts += ('  {0}' -f $jsonLines[$j])
    }
  }
}
$ts += '};'
Set-Content -Encoding utf8 data\my-landing\docWineData.ts ($ts -join "`n")

$result.GetEnumerator() | Sort-Object Name | ForEach-Object { "{0}: {1}" -f $_.Name, $_.Value.Count }
