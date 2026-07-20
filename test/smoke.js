const { chromium } = require('playwright');
const nodePath = require('path');
const { pathToFileURL } = require('url');
const INDEX = pathToFileURL(nodePath.resolve(__dirname, '..', 'index.html')).href;

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('dialog', d => d.accept());

  await page.goto(INDEX);

  // landing page shows first; privacy note present; start quiz from CTA
  console.log('Landing visible:', !(await page.locator('#view-landing').evaluate(e => e.classList.contains('hide'))));
  console.log('Privacy note:', (await page.textContent('#view-landing')).includes('只儲存在此裝置'));
  const landingText = await page.textContent('#view-landing');
  console.log('Secure frame:', landingText.includes('大腦會繼續因應眼前的關係改變'));
  console.log('Sharing invitation:', landingText.includes('當日分享紀錄'));
  console.log('Framework infographic:', await page.locator('#attachmentFrame').count() === 1);
  console.log('Three purpose routes:', await page.locator('.purpose-card').count() === 3);
  console.log('Compact privacy:', await page.locator('#privacyDetails').count() === 1);
  console.log('Route start action:', await page.locator('#routeStart').count() === 1);
  console.log('Official book link:', await page.locator('a[href="https://amirlevinemd.com/books/secure/"]').count() === 1);
  console.log('Bookfort contact link:', await page.locator('a[href="https://www.instagram.com/reel/DaHcPUuOLx7"]').count() === 1);
  const visualLayout = await page.evaluate(() => {
    const displays = ['.hero-grid', '.frame-grid', '.purpose-grid'].map(selector =>
      getComputedStyle(document.querySelector(selector)).display
    );
    return displays.every(display => display === 'grid');
  });
  console.log('Visual grids active:', visualLayout);
  if (!visualLayout) throw new Error('Visual information grids are not active');
  await page.click('#routeStart');
  await page.waitForSelector('#view-home:not(.hide)');
  const snapshotMarkers = await page.locator('.snapshot-markers[role="list"] .snapshot-marker[role="listitem"]').count();
  console.log('Snapshot markers:', snapshotMarkers === 3);
  if (snapshotMarkers !== 3) throw new Error('Snapshot markers are not exposed as a three-item list');

  const modeCount = await page.locator('#quizModes .mode-choice').count();
  console.log('Two questionnaire modes:', modeCount === 2);
  if (modeCount !== 2) throw new Error('Questionnaire setup must offer only general and specific modes');

  // ── Quiz 1: new specific person "阿明", answers chosen to land in ANXIOUS quadrant
  // supportive items 1-4 answered 6 (reverse → 2), items 5-6 answered 3, anxiety items 7-9 answered 6
  // avoidance = (2*4 + 3*2)/6 = 14/6 = 2.33 ; anxiety = 18/3 = 6.00 → anxious
  await page.click('#quizModes .mode-choice[data-mode="specific"]');
  await page.fill('#personName', '   ');
  await page.click('#startBtn');
  const blankBlocked = await page.locator('#view-home:not(.hide)').count() === 1 &&
    !(await page.locator('#nameError').evaluate(element => element.classList.contains('hide')));
  console.log('Blank specific alias blocked:', blankBlocked);
  if (!blankBlocked) throw new Error('Blank specific alias must be blocked');
  await page.fill('#personName', '阿明');
  await page.click('#startBtn');
  const answers1 = [6, 6, 6, 6, 3, 3, 6, 6, 6];
  for (const a of answers1) {
    await page.waitForSelector('#view-quiz:not(.hide)');
    await page.click(`#scale7 button:nth-child(${a})`);
  }
  await page.waitForSelector('#view-result:not(.hide)');
  const resultText = await page.textContent('#resultCard');
  console.log('R1 anxiety 6.00:', resultText.includes('6.00'));
  console.log('R1 avoidance 2.33:', resultText.includes('2.33'));
  console.log('R1 style 焦慮型:', resultText.includes('焦慮型'));
  console.log('Sharing handoff:', resultText.includes('帶住呢個位置去分享會'));

  // chart rendered with labelled point
  const svgCount = await page.locator('#resultChart svg').count();
  console.log('R1 chart rendered:', svgCount === 1);

  // ── Quiz 2: general style, all 1s on anxiety, all supportive high → secure
  await page.click('#againBtn');
  await page.click('#quizModes .mode-choice[data-mode="general"]');
  await page.click('#startBtn');
  await page.waitForSelector('#view-quiz:not(.hide)');
  const gq = await page.textContent('#qtext');
  console.log('General wording (no 這個人):', !gq.includes('這個人') && gq.includes('別人'));
  const answers2 = [7, 7, 7, 7, 1, 1, 1, 1, 1]; // avoid = (1*4+1*2)/6 = 1.00, anx = 1.00 → secure
  for (const a of answers2) {
    await page.waitForSelector('#view-quiz:not(.hide)');
    await page.click(`#scale7 button:nth-child(${a})`);
  }
  await page.waitForSelector('#view-result:not(.hide)');
  const r2 = await page.textContent('#resultCard');
  console.log('R2 style 安全型:', r2.includes('安全型'), '| 1.00 scores:', (r2.match(/1\.00/g) || []).length === 2);

  // ── Retake for 阿明 (should append a 2nd result, trajectory on map)
  await page.click('#againBtn');
  await page.click('#existingPeople .chip:has-text("阿明")');
  await page.click('#startBtn');
  for (const a of [6, 6, 6, 6, 2, 2, 3, 3, 3]) { // anx 3.00 avoid 2.00 → secure now
    await page.waitForSelector('#view-quiz:not(.hide)');
    await page.click(`#scale7 button:nth-child(${a})`);
  }
  await page.waitForSelector('#view-result:not(.hide)');
  const r3 = await page.textContent('#resultCard');
  console.log('R3 retake counted:', r3.includes('第 2 次'));

  // ── Map: legend chips, trajectory path, labels
  await page.click('nav.tabs button[data-view="map"]');
  const legendCount = await page.locator('#legend button').count();
  const pathCount = await page.locator('#mapChart svg path').count();
  const circleCount = await page.locator('#mapChart svg circle').count();
  console.log('Map legend=2:', legendCount === 2, '| trajectory path:', pathCount >= 1, '| dots=3:', circleCount === 3);
  const colourSemantics = await page.evaluate(() => {
    const people = db.people.map(person => ({ name: person.name, colour: slotColor(person.slot) }));
    const pointData = [...document.querySelectorAll('#mapChart svg circle')]
      .filter(circle => circle.querySelector('title'))
      .map(circle => ({
        name: circle.querySelector('title').textContent.split(' · ')[0],
        fill: circle.getAttribute('fill'),
        opacity: circle.getAttribute('opacity'),
      }));
    const ahMing = pointData.filter(point => point.name === '阿明');
    return {
      differentPeople: new Set(people.map(person => person.colour)).size === people.length,
      retestSameHue: ahMing.length === 2 && ahMing[0].fill === ahMing[1].fill,
      retestDifferentDepth: ahMing.length === 2 && ahMing[0].opacity !== ahMing[1].opacity,
    };
  });
  console.log('Different-name colours:', colourSemantics.differentPeople,
    '| retest hue:', colourSemantics.retestSameHue,
    '| retest depth:', colourSemantics.retestDifferentDepth);

  // point click → info panel
  await page.locator('#mapChart svg circle').last().click();
  const info = await page.textContent('#pointInfo');
  console.log('Point info shows scores:', /焦慮 \d/.test(info));

  // ── Map image export downloads a PNG
  const [imgDl] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#mapImgBtn'),
  ]);
  console.log('Map PNG export:', imgDl.suggestedFilename().endsWith('.png'));

  // ── Persistence across reload (landing again, use 查看我的地形圖 shortcut)
  await page.reload();
  console.log('Landing map shortcut visible:', !(await page.locator('#landingMap').evaluate(e => e.classList.contains('hide'))));
  await page.click('nav.tabs button[data-view="records"]');
  const rec = await page.textContent('#recordsBody');
  console.log('Persisted after reload:', rec.includes('阿明') && rec.includes('一般'));

  // ── Export produces valid JSON (now inside 紀錄 view)
  await page.click('nav.tabs button[data-view="records"]');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#exportBtn'),
  ]);
  const path = await download.path();
  const exported = JSON.parse(require('fs').readFileSync(path, 'utf8'));
  console.log('Export valid:', exported.people.length === 2,
    '| results total 3:', exported.people.reduce((a, p) => a + p.results.length, 0) === 3);

  // ── Wipe then import-merge restores
  await page.click('#wipeBtn'); // dialogs auto-accepted
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('attachment-topography-v1')).people.length === 0);
  await page.evaluate(() => document.getElementById('importFile').classList.remove('hide'));
  await page.setInputFiles('#importFile', path);
  await page.waitForSelector('#importDlg[open]');
  await page.click('#importMerge');
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('attachment-topography-v1')).people.length === 2);
  console.log('Import-merge restored 2 people: true');

  // ── Collab checklist: answer all 15 with 4 → total 60 (high band)
  await page.click('nav.tabs button[data-view="collab"]');
  console.log('CAS glossary:', await page.locator('.term-grid .term-card').count() === 4);
  await page.fill('#collabName', '阿明');
  for (let i = 1; i <= 15; i++) {
    await page.click(`#collabItems .clitem:nth-child(${i}) .likert5 button:nth-child(4)`);
  }
  await page.click('#collabScoreBtn');
  const cr = await page.textContent('#collabResult');
  console.log('Collab total 60:', cr.includes('60'));
  console.log('Collab 60+ interpretation:', cr.includes('合作得非常好'));

  // ── Language toggle: switch to English, verify UI + questions, persists
  await page.click('#langBtn');
  const navTxt = await page.textContent('nav.tabs');
  console.log('EN nav:', navTxt.includes('Quiz') && navTxt.includes('Map'));
  await page.click('nav.tabs button[data-view="home"]');
  console.log('EN quiz modes:', (await page.textContent('#quizModes')).includes('Specific relationship'));
  await page.click('#quizModes .mode-choice[data-mode="specific"]');
  await page.fill('#personName', 'Alex');
  await page.click('#startBtn');
  await page.waitForSelector('#view-quiz:not(.hide)');
  console.log('EN question:', (await page.textContent('#qtext')).includes('turn to this person'));
  // scale is now 7 unlabelled dots with verbal labels: tap one, label appears
  await page.click('#scale7 button:nth-child(6)');
  console.log('EN scale label:', (await page.textContent('#scaleLabel')).includes('Agree'));
  await page.click('#quitBtn');
  await page.reload();
  console.log('EN persists after reload:', (await page.textContent('nav.tabs')).includes('Records'));
  await page.click('#langBtn');
  console.log('Back to zh:', (await page.textContent('nav.tabs')).includes('測驗'));

  // ── Dark mode toggle re-renders without error
  await page.click('#themeBtn');
  console.log('Theme toggled:', await page.evaluate(() => document.documentElement.dataset.theme));

  // screenshots
  await page.click('nav.tabs button[data-view="map"]');
  await page.screenshot({ path: nodePath.join(__dirname, 'map-dark.png'), fullPage: false });
  await page.click('#themeBtn');
  await page.screenshot({ path: nodePath.join(__dirname, 'map-light.png'), fullPage: false });

  // ── Narrow mobile landing remains inside the viewport
  await page.setViewportSize({ width: 320, height: 800 });
  await page.click('#homeLink');
  await page.waitForSelector('#view-landing:not(.hide)');
  const noMobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  console.log('320px no overflow:', noMobileOverflow);
  if (!noMobileOverflow) throw new Error('Landing page overflows at 320px');

  console.log('JS errors:', errors.length ? errors : 'none');
  await browser.close();
})();
