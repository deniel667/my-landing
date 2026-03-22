const exactBottleImages = new Map<string, string>();

export function normalizeWineNameForMatch(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[”“„‟"']/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ß/g, 'ss')
    .trim();
}

function buildBottleImageKey(wineryId: string, wineName: string) {
  return `${wineryId}::${normalizeWineNameForMatch(wineName)}`;
}

function registerBottleImage(wineryId: string, wineName: string, imageSrc: string) {
  exactBottleImages.set(buildBottleImageKey(wineryId, wineName), imageSrc);
}

registerBottleImage('landerer', '2023 KaiserstuhlSpätburgundertrocken', '/story/lan-kaiser-spat-23.png');
registerBottleImage('landerer', '2023 Leiselheim Chardonnay trocken -SchwarzeErde-', '/story/lan-leisen-chard-23.png');
registerBottleImage('bus', '2016 Dornfeldertrocken “In derHölle”', '/story/Bus-dorn-holle-16.png');
registerBottleImage('bus', '2019 CabernetSauvignontrocken', '/story/Bus-cab-sav-19.png');
registerBottleImage('bus', '2023 MerlotBlancdeNoirtrocken', '/story/Bus-mer-blandenoir-23.png');
registerBottleImage('bus', '2019 Merlot trocken', '/story/Bus-mer-19.png');
registerBottleImage('dautel', '2022 Lemberger VDP.Gutswein', '/story/dau-lemberger-22.png');
registerBottleImage('dautel', '2023 Spätburgundertrocken', '/story/dau-spat-23.png');
registerBottleImage('dautel', '2024 Jakob D.', '/story/dau-jak.png');
registerBottleImage('horst', '2024 EscherndorfSilvanertrocken', '/story/Hor-Esch-Silv-24.png');
registerBottleImage('horst', '2023 Escherndorf Riesling trocken', '/story/Hor-Esch-Riesl-23.png');
registerBottleImage('horst', '2023 SilvanerbrutSektb.A.', '/story/Hor-silv-sektbrut-2023.png');
registerBottleImage('ludwig', 'NV RieslingSektBrut', '/story/lud-riesl-sekt.png');
registerBottleImage('ludwig', '2024 Thörnicher Riesling trocken', '/story/lud-thorn-riesl-24.png');
registerBottleImage('ludwig', '2023 Sauvignon Blanc trocken', '/story/lud-savignblan-23.png');
registerBottleImage('hamm', '2017 RheingauRieslingfeinherb', '/story/hamm-rhein-riesl-17.png');
registerBottleImage('buerklinwolf', '2022 Rieslingtrocken', '/story/bur-riesl-22.png');
registerBottleImage('buerklinwolf', '2017 FASS 68 Ruppertsberger Riesling', '/story/bur-fass68-17.png');
registerBottleImage('salwey', '2022 KaiserstuhlSpätburgunder', '/story/Sal-spat-22.png');
registerBottleImage('salwey', '2023 Weissburgunder Gutswein', '/story/Sal-weissburg-23.png');
registerBottleImage('salwey', '2023 Grauburgunder Gutswein', '/story/Sal-grauburg-23.png');
registerBottleImage('stodden', '2023 Spätburgundertrocken', '/story/stdn-spat-23.png');
registerBottleImage('stodden', '2014 RecherHerrenbergSpätburgundertrocken', '/story/stdn-herr-spat-14.png');
registerBottleImage('stodden', '2022 Spätburgunder Blanc de Noir trocken', '/story/stdn-blandenoir-22.png');

export function getExactBottleImageSrc(wineryId: string, wineName: string) {
  return exactBottleImages.get(buildBottleImageKey(wineryId, wineName)) ?? null;
}
