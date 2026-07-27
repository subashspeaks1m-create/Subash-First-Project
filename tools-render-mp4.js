/*
 * Render the animation to an MP4, frame by frame.
 *
 *   npm i playwright && npx playwright install chromium
 *   node tools-render-mp4.js
 *
 * Env: PRESET (json to apply)  OUT (mp4 path)  FPS  W  H  FFMPEG  CHROME
 *
 * Frames are stepped deterministically via CrystalReveal.frameAt(t), which ties
 * the wall clock to the playhead — so idle drift and grain are reproducible and
 * the output is identical every run, regardless of how fast the machine renders.
 * Full-page screenshots (not canvas.toDataURL) because the headlines are DOM.
 */
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');

// ffmpeg with libx264. Override with FFMPEG=/path/to/ffmpeg if it isn't on PATH.
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FPS = Number(process.env.FPS || 30);
const W = Number(process.env.W || 1920), H = Number(process.env.H || 1080);
const OUT = process.env.OUT || 'crystal-reveal.mp4';

(async () => {
  const preset = JSON.parse(fs.readFileSync(process.env.PRESET || 'presets/subash-five-steps.json', 'utf8'));
  const b = await chromium.launch(
    process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const p = await b.newPage({ viewport:{ width:W, height:H }, deviceScaleFactor:1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + require('path').resolve('index.html'));
  await p.waitForTimeout(2000);
  await p.evaluate(pr => {
    document.body.classList.add('panel-hidden','idle');
    document.getElementById('transport').style.display='none';
    document.getElementById('fab').style.display='none';
    document.getElementById('toast').style.display='none';
    window.CrystalReveal.applyPreset(pr);
  }, preset);
  await p.waitForTimeout(900);
  const dur = await p.evaluate(() => window.CrystalReveal.duration);
  const total = Math.round(dur * FPS);
  console.log(`duration ${dur.toFixed(2)}s -> ${total} frames @ ${FPS}fps, ${W}x${H}`);

  const ff = spawn(FFMPEG, [
    '-y', '-f','image2pipe', '-vcodec','png', '-r', String(FPS), '-i','pipe:0',
    '-c:v','libx264', '-preset','slow', '-crf','16', '-pix_fmt','yuv420p',
    '-movflags','+faststart', OUT
  ], { stdio:['pipe','ignore','pipe'] });
  let ffErr = ''; ff.stderr.on('data', d => ffErr += d.toString());
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg '+c+'\n'+ffErr.slice(-1500)))));

  const t0 = Date.now();
  for (let i = 0; i < total; i++) {
    await p.evaluate(t => window.CrystalReveal.frameAt(t), i / FPS);
    const buf = await p.screenshot({ type:'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0 || i === total-1) {
      const el = (Date.now()-t0)/1000;
      process.stdout.write(`\r  frame ${i+1}/${total}  ${el.toFixed(0)}s elapsed, eta ${(el/(i+1)*(total-i-1)).toFixed(0)}s   `);
    }
  }
  ff.stdin.end();
  await done;
  console.log('\nERRORS:', errs.length ? errs.join('\n') : 'none');
  await b.close();
})();
