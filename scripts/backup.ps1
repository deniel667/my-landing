param(
  [int]$Keep = 20
)

$ErrorActionPreference = 'Stop'

$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$backupDir = Join-Path $root '.backups'
$timestamp = Get-Date -Format 'yyyy-MM-dd_HHmmss'
$archiveName = "backup_$timestamp.zip"
$archivePath = Join-Path $backupDir $archiveName

New-Item -ItemType Directory -Force $backupDir | Out-Null

# Only back up source and config (skip heavy/generated folders)
$items = @(
  'app',
  'components',
  'data',
  'public',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'next.config.ts',
  'postcss.config.mjs',
  'tailwind.config.ts',
  'eslint.config.mjs',
  'README.md'
)

$pathsToArchive = @()
foreach ($item in $items) {
  $full = Join-Path $root $item
  if (Test-Path $full) {
    $pathsToArchive += $full
  }
}

if ($pathsToArchive.Count -eq 0) {
  throw 'No files found to back up.'
}

Compress-Archive -Path $pathsToArchive -DestinationPath $archivePath -CompressionLevel Optimal -Force

# Retention policy
$existing = Get-ChildItem $backupDir -File -Filter 'backup_*.zip' | Sort-Object LastWriteTime -Descending
if ($existing.Count -gt $Keep) {
  $existing | Select-Object -Skip $Keep | Remove-Item -Force
}

Write-Output "Backup created: $archivePath"
