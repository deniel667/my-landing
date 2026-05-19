const exactBottleImages = new Map<string, string>();

export function normalizeWineNameForMatch(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[вЂќвЂњвЂћвЂџ"']/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .trim();
}

function buildBottleImageKey(wineryId: string, wineName: string) {
  return `${wineryId}::${normalizeWineNameForMatch(wineName)}`;
}

function registerBottleImage(wineryId: string, wineName: string, imageSrc: string) {
  exactBottleImages.set(buildBottleImageKey(wineryId, wineName), imageSrc);
}

function registerBottleImageAliases(wineryId: string, imageSrc: string, wineNames: string[]) {
  wineNames.forEach((wineName) => registerBottleImage(wineryId, wineName, imageSrc));
}

registerBottleImageAliases('landerer', '/story/lan-kaiser-spat-23.png', [
  '2023 KaiserstuhlSpätburgundertrocken',
  '2023 KaiserstuhlSpГ¤tburgundertrocken',
]);
registerBottleImage('landerer', '2023 Leiselheim Chardonnay trocken -SchwarzeErde-', '/story/lan-leisen-chard-23.png');

registerBottleImage('bus', '2019 CabernetSauvignontrocken', '/story/Bus-cab-sav-19.png');
registerBottleImage('bus', '2023 MerlotBlancdeNoirtrocken', '/story/Bus-mer-blandenoir-23.png');
registerBottleImage('bus', '2019 Merlot trocken', '/story/Bus-mer-19.png');
registerBottleImage('bus', '2022 Chardonnay dry', '/story/Bus-char-22.png');
registerBottleImage('bus', '2018 Goldmuskateller feinherb Q.B.A.', '/story/Bus-gold-18.png');
registerBottleImage('bus', '2018 Dornfelder trocken', '/story/Bus-dorn-18.png');
registerBottleImageAliases('bus', '/story/Bus-dorn-18.png', [
  '2016 Dornfelder trocken',
  '2016 Dornfeldertrocken',
  '2016 Dornfeldertrocken “In derHölle”',
]);

registerBottleImage('dautel', '2022 Lemberger VDP.Gutswein', '/story/dau-lemberger-22.png');
registerBottleImageAliases('dautel', '/story/dau-spat-23.png', [
  '2023 Spätburgundertrocken',
  '2023 SpГ¤tburgundertrocken',
  '2015 Spätburgunder trocken',
  '2015 SpГ¤tburgunder trocken',
  '2016 Spätburgunder trocken',
  '2016 SpГ¤tburgunder trocken',
  '2022 Spätburgunder trocken',
  '2022 SpГ¤tburgunder trocken',
]);
registerBottleImage('dautel', '2024 Jakob D.', '/story/dau-jak.png');
registerBottleImage('dautel', '2018 Chardonnay -S- trocken', '/story/dautel-chardonnay-s.png');
registerBottleImage('dautel', '2022 Trollinger', '/story/dautel-trollinger.png');

registerBottleImage('horst', '2024 EscherndorfSilvanertrocken', '/story/Hor-Esch-Silv-24.png');
registerBottleImage('horst', '2023 Escherndorf Riesling trocken', '/story/Hor-Esch-Riesl-23-20260323.png');
registerBottleImage('horst', '2023 SilvanerbrutSektb.A.', '/story/Hor-silv-sektbrut-2023.png');
registerBottleImage('horst', '2022 Just Silvaner trocken Gutswein', '/story/Hor-silv-just-2022.png');
registerBottleImage('horst', '2022 Escherndorfer Silvaner trocken', '/story/Hor-Esch-Silv-24.png');
registerBottleImageAliases('horst', '/story/hor-muller-thr.png', [
  '2017 Escherndorfer Fürstenberg Müller-Thurgau trocken',
  '2017 Escherndorfer FГјrstenberg MГјller-Thurgau trocken',
]);
registerBottleImageAliases('horst', '/story/hor-bacchus.png', [
  '2017 Escherndorfer Bacchus Spätlese',
  '2017 Escherndorfer Bacchus SpГ¤tlese',
]);
registerBottleImage('horst', '2016 Escherndorfer Domina trocken (BB)', '/story/hor-domina.png');
registerBottleImageAliases('horst', '/story/Hor-just-secco-rose-18.png', [
  '2018 JUST Secco Rosé',
  '2018 JUST Secco RosГ©',
]);

registerBottleImage('ludwig', 'NV RieslingSektBrut', '/story/lud-riesl-sekt.png');
registerBottleImageAliases('ludwig', '/story/lud-thorn-riesl-24.png', [
  '2024 Thörnicher Riesling trocken',
  '2024 ThГ¶rnicher Riesling trocken',
]);
registerBottleImage('ludwig', '2023 Sauvignon Blanc trocken', '/story/lud-savignblan-23.png');
registerBottleImage('ludwig', '2022 Riesling dry Guts', '/story/lud-riesl-dry.png');
registerBottleImageAliases('ludwig', '/story/lud-thorn-riesl-24.png', [
  '2020 Thörnicher Riesling trocken',
  '2020 ThГ¶rnicher Riesling trocken',
  'Weingut Ludwig 2020 Thörnicher Riesling trocken',
]);

registerBottleImage('hamm', '2017 RheingauRieslingfeinherb', '/story/hamm-rhein-riesl-17.png');
registerBottleImage('hamm', '2017 Rheingau Riesling trocken', '/story/hamm-riesl-17.png');
registerBottleImage('hamm', '2017 Winkel Riesling Alte Reben feinherb', '/story/hamm-wink-17.png');

registerBottleImageAliases('buerklinwolf', '/story/bur-riesl-22.png', [
  '2022 Rieslingtrocken',
  '2022 BUR Riesling Trocken',
  '2018 Riesling trocken',
]);
registerBottleImageAliases('buerklinwolf', '/story/bur-fass68-17.png', [
  '2017 FASS 68 Ruppertsberger Riesling',
  'FASS68 Ruppertsberger Riesling 2017',
]);
registerBottleImageAliases('buerklinwolf', '/story/Bur-cuvee-weiss-17.png', [
  '2017 Villa Bürklin Weißwein trocken',
  '2017 Villa BГјrklin WeiГџwein trocken',
  '2018 Villa Bürklin Weißwein trocken',
  '2018 Villa BГјrklin WeiГџwein trocken',
]);
registerBottleImageAliases('buerklinwolf', '/story/Bur-cuvee-rot-17.png', [
  '2018 Villa Bürklin Rotwein trocken',
  '2018 Villa BГјrklin Rotwein trocken',
  '2017 Villa Bürklin Rotwein trocken',
  '2017 Villa BГјrklin Rotwein trocken',
]);

registerBottleImageAliases('ress', '/story/ress-rot-09.png', [
  '2009 Rüdesheimer Berg Rottland Riesling Erstes Gewächs',
  '2009 RГјdesheimer Berg Rottland Riesling Erstes GewГ¤chs',
]);
registerBottleImageAliases('ress', '/story/ress-rud-berg-rottl-2006.png', [
  '2006 Rüdesheim Berg Schlossberg Riesling Auslese',
  '2006 RГјdesheim Berg Schlossberg Riesling Auslese',
]);

registerBottleImageAliases('salwey', '/story/Sal-spat-22.png', [
  '2022 KaiserstuhlSpätburgunder',
  '2022 KaiserstuhlSpГ¤tburgunder',
]);
registerBottleImage('salwey', '2023 Weissburgunder Gutswein', '/story/Sal-weissburg-23.png');
registerBottleImage('salwey', '2023 Grauburgunder Gutswein', '/story/Sal-grauburg-23.png');
registerBottleImage('salwey', '2022 Grauburgunder Gutswein', '/story/Sal-grauburg-23.png');
registerBottleImage('salwey', '2024 Weissburgunder Gutswein', '/story/Sal-weis-24.png');
registerBottleImage('salwey', '2024 Grauburgunder Gutswein', '/story/Sal-grau-24.png');
registerBottleImageAliases('salwey', '/story/Sal-Ob-Spat-Rs-16.png', [
  '2016 Oberrotweil Spätburgunder RS',
  '2016 Oberrotweil SpГ¤tburgunder RS',
]);
registerBottleImage('salwey', '2016 Henkenberg Grauburgunder GG', '/story/sal-heinkenberg-grauburg GG.png');
registerBottleImage('salwey', '2017 Eichberg Grauburgunder GG', '/story/sal-eichberg-grauburg-GG.png');

registerBottleImageAliases('stodden', '/story/stdn-spat-23.png', [
  '2023 Spätburgundertrocken',
  '2023 SpГ¤tburgundertrocken',
  '2022 Spätburgunder trocken',
  '2022 SpГ¤tburgunder trocken',
]);
registerBottleImageAliases('stodden', '/story/stdn-herr-spat-14.png', [
  '2014 RecherHerrenbergSpätburgundertrocken',
  '2014 RecherHerrenbergSpГ¤tburgundertrocken',
]);
registerBottleImageAliases('stodden', '/story/stdn-blandenoir-22.png', [
  '2022 Spätburgunder Blanc de Noir trocken',
  '2022 SpГ¤tburgunder Blanc de Noir trocken',
]);
registerBottleImageAliases('stodden', '/story/jst-alte reben-spatburgunder.png', [
  '2016 Alte Reben Spätburgunder',
  '2016 Alte Reben SpГ¤tburgunder',
]);

export function getExactBottleImageSrc(wineryId: string, wineName: string) {
  return exactBottleImages.get(buildBottleImageKey(wineryId, wineName)) ?? null;
}
