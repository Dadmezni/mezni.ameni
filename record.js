const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Charger votre fichier HTML
  await page.goto('file:///C:/laragon/www/azza/index.html');

  const recorder = new PuppeteerScreenRecorder(page, {
    followNewTab: false,
    fps: 60,
    videoFrame: { width: 1920, height: 1080 },
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitrate: 1000,
    autopad: { color: 'black' },
  });

  await recorder.start('./presentation.mp4');

  // Cliquer sur le bouton Play
  await page.click('#bigplay');

  // Attendre la fin de la présentation (ajustez le temps en millisecondes)
  // Par exemple : 23 slides * ~8s = environ 180 secondes + marge
  await new Promise(r => setTimeout(r, 190000)); 

  await recorder.stop();
  await browser.close();
})();