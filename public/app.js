import {
  renderChallengeLibrary,
  renderFlamePhysics,
  renderMissionAtmospheres,
  renderMissionLab,
  bindMissionLab,
  renderSafetyInsights,
  flameScenarioControlsMarkup,
  bindFlameScenarioControls,
  bindSafetyInsightCharts,
  bindChallengeLibrary,
  renderInvestigationLab,
  bindInvestigationLab,
} from './challenge-research.js';
import { csvCell } from './csv-safe.js';
import { $, esc, toast, pageHead, stat, download } from './lib/dom.js';
import { get, post } from './lib/api.js';
import {
  scientificScatter,
  bindInteractiveCharts,
  chartControlLabels,
  scientificHistogram,
} from './lib/interactive-charts.js';
import { FLEX_CHART_GUIDE } from './lib/chart-guide.js';
import { filterNavEntries } from './lib/navigation.js';
import { bindFlameScene3d } from './lib/flame-scene3d.js';
import { flex3DMarkup, bindFlex3DPlot } from './lib/flex-3d.js';
import { measurementPlotStudioMarkup, bindMeasurementPlotStudio } from './lib/measurement-plots.js';
import { renderSystemConcepts, bindSystemConcepts } from './lib/system-concepts.js';
import { renderModelGallery, bindModelGallery } from './lib/model-gallery.js';
import { renderSourceChartGuide } from './source-charts.js';
import { judgingTrail } from './lib/judging-trail.js';
import { EXTERNAL_NASA_SOURCES } from './lib/external-nasa-evidence.js';
import { accessibleAccent, normalizeHexColor } from './lib/theme-accent.js';
const nav = [
  ['AI Copilot', 'Ask the source-grounded research assistant', '✧', 'RESEARCH'],
  ['Overview', 'Challenge overview', '⌂', 'COMMAND'],
  ['Challenge Guide', 'Learn the science behind the challenge', '◉', 'SCIENCE'],
  ['Flame Lab', 'Interactive flame physics & scenarios', '∿', 'SCIENCE'],
  ['Mission Lab', 'Target environments & evidence fit', '⊕', 'SCIENCE'],
  ['Mission Atmospheres', 'Oxygen, pressure & EVA transitions', '◉', 'SCIENCE'],
  ['Safety Insights', 'Prevention, detection & suppression', '◇', 'SCIENCE'],
  ['System Concepts', 'HARBOR observation concept & microgravity fire-response map', '⌘', 'SCIENCE'],
  ['3D Models', 'Interactive models, research purposes & scenario controls', '⬡', 'SCIENCE'],
  ['Mission Lessons', 'NASA incidents & technology transfer', '⌁', 'SCIENCE'],
  ['Challenge Evidence', 'Dataset Explorer · NASA PSI source tables', '▤', 'SCIENCE'],
  ['Investigation Lab', 'Study-specific NASA PSI evidence summaries', '◉', 'ANALYSIS'],
  ['Analysis Workbench', 'FLEX-only descriptive analysis', '∑', 'ANALYSIS'],
  ['Chart Guide', 'Chart purposes, variables & limits', '▥', 'ANALYSIS'],
  ['Comparison Studio', 'Compare matched FLEX tests', '◫', 'ANALYSIS'],
  ['Sources', 'NASA PSI sources & methods', '◎', 'RESEARCH'],
  ['Reports', 'Scientific reports & exports', '↗', 'RESEARCH'],
  ['Settings', 'Language & appearance', '⚙', 'SYSTEM'],
];
function pageFromHash() {
  try {
    const requested = decodeURIComponent(location.hash.slice(1));
    return nav.some(([name]) => name === requested) || requested === 'Flame Physics' ? requested : 'AI Copilot';
  } catch {
    return 'Overview';
  }
}
// Some in-app/mobile browsers deny localStorage. Preferences are optional and
// must never prevent the research interface from booting.
function storageGet(key, fallback = null) {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Keep the current session usable when persistent browser storage is blocked.
  }
}
let current = pageFromHash(),
  lang = storageGet('mors-lang', 'en'),
  theme = storageGet('mors-theme', 'arctic'),
  dataset = null,
  analysis = null,
  chatThread = [],
  chatBusy = false;
let navigationId = 0;
try {
  const saved = JSON.parse(storageGet('mors-chat-v1', '[]'));
  if (Array.isArray(saved))
    chatThread = saved
      .filter((m) => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
      .slice(-60)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 8000),
        provider: typeof m.provider === 'string' ? m.provider.slice(0, 120) : '',
        citation: m.role === 'assistant' ? '/psi-69' : '',
        toolsExecuted: Array.isArray(m.toolsExecuted)
          ? m.toolsExecuted
              .slice(0, 3)
              .filter(
                (x) =>
                  x &&
                  ['runAnalysis', 'compareExperiments', 'pearson', 'lookupExperiment'].includes(x.tool) &&
                  x.status === 'complete',
              )
              .map((x) => ({
                tool: x.tool,
                status: 'complete',
                evidence: x.tool === 'lookupExperiment' ? 'OBSERVED' : 'COMPUTED',
                resultSha256: typeof x.resultSha256 === 'string' ? x.resultSha256.slice(0, 64) : '',
              }))
          : [],
      }));
} catch {
  chatThread = [];
}
const t = (a, b) => (lang === 'ar' ? b : a);
const navArabic = {
  Overview: 'نظرة عامة',
  'Challenge Guide': 'دليل التحدي العلمي',
  'Flame Lab': 'مختبر اللهب',
  'Flame Physics': 'فيزياء اللهب',
  'Mission Lab': 'مختبر المهمات',
  'Mission Atmospheres': 'أجواء المهمات',
  'Safety Insights': 'رؤى سلامة الحريق',
  'System Concepts': 'تصاميم الأنظمة',
  '3D Models': 'النماذج ثلاثية الأبعاد',
  'Mission Lessons': 'دروس المهمات والتقنية',
  'Challenge Evidence': 'مستكشف البيانات',
  'Investigation Lab': 'مختبر التحقيقات',
  'Analysis Workbench': 'منضدة التحليل',
  'Chart Guide': 'دليل المخططات',
  'Comparison Studio': 'مقارنة التجارب',
  'AI Copilot': 'مساعد الأبحاث',
  Sources: 'المصادر والمنهجية',
  Reports: 'التقارير',
  Settings: 'الإعدادات',
};
const sectionArabic = {
  COMMAND: 'الرئيسية',
  SCIENCE: 'العلم',
  ANALYSIS: 'التحليل',
  RESEARCH: 'البحث',
  SYSTEM: 'النظام',
};
const pageLabel = (key) => (lang === 'ar' ? navArabic[key] || key : key);
function setTheme() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $('#langBtn').textContent = lang === 'ar' ? 'English' : 'عربي';
  document.body.className =
    (theme === 'space' ? 'theme-space' : theme === 'observatory' ? 'theme-observatory' : theme === 'blackhole' ? 'theme-blackhole' : '') +
    (lang === 'ar' ? ' rtl' : '');
  const customAccent = normalizeHexColor(storageGet('mors-custom-accent', ''));
  if (customAccent) {
    const css = getComputedStyle(document.body);
    const accent = accessibleAccent(customAccent, [css.getPropertyValue('--surface').trim(), css.getPropertyValue('--surface2').trim()]);
    if (accent) {
      document.body.style.setProperty('--accent', accent);
      document.body.style.setProperty('--link', accent);
      document.body.style.setProperty('--eyebrow', accent);
    }
  } else {
    for (const property of ['--accent', '--link', '--eyebrow']) document.body.style.removeProperty(property);
  }
  $('#themeBtn').textContent = t(
    'Theme · ' + { arctic: 'Arctic', space: 'Deep Space', observatory: 'Observatory', blackhole: 'Black Hole' }[theme],
    'المظهر · ' + { arctic: 'قطبي', space: 'فضاء عميق', observatory: 'مرصد', blackhole: 'الثقب الأسود' }[theme],
  );
  $('#navSearch').setAttribute('aria-label', t('Find a page', 'ابحث عن صفحة'));
  $('#navSearch').placeholder = t('Find a page…', 'ابحث عن صفحة…');
}
function accentPickerMarkup(id) {
  const ar = lang === 'ar';
  const custom = normalizeHexColor(storageGet('mors-custom-accent', '')) || '#38b9e8';
  return `<div class="custom-accent"><label for="${id}"><b>${ar ? 'اختر لون اللمسات' : 'Choose an accent color'}</b><input id="${id}" type="color" value="${custom}" aria-label="${ar ? 'لون اللمسات المخصص' : 'Custom accent color'}" data-accent-picker></label><p class="sub">${ar ? 'يتكيف اللون تلقائياً للحفاظ على وضوح الروابط والعناوين. لا تتغير ألوان البيانات ومعانيها.' : 'The accent adjusts automatically for readable links and headings. Scientific series colors and their meanings stay unchanged.'}</p><button class="quiet-btn" type="button" data-accent-reset>${ar ? 'إعادة ألوان النمط' : 'Reset theme colors'}</button></div>`;
}
function renderNav() {
  const n = $('#nav');
  const search = $('#navSearch');
  const entries = filterNavEntries(nav, search.value, navArabic);
  if (!entries.length) {
    n.innerHTML = `<div class="nav-empty" role="status">${t('No pages match this search.', 'لا توجد صفحات تطابق البحث.')}</div><button class="nav-clear" type="button">${t('Clear search', 'مسح البحث')}</button>`;
    n.querySelector('.nav-clear').onclick = () => {
      search.value = '';
      renderNav();
      search.focus();
    };
    return;
  }
  let group = '';
  n.innerHTML = entries
    .map(([k, label, ico, section]) => {
      const heading =
        section !== group ? `<div class="nav-group">${lang === 'ar' ? sectionArabic[section] : section}</div>` : '';
      group = section;
      return `${heading}<button data-page="${k}" title="${esc(lang === 'ar' ? label : navArabic[k] || label)}" ${current === k ? 'aria-current="page"' : ''} class="${current === k ? 'active' : ''}"><span class="nav-icon">${ico}</span>${esc(lang === 'ar' ? navArabic[k] || label : label)}</button>`;
    })
    .join('');
  n.querySelectorAll('button').forEach((b) => (b.onclick = () => go(b.dataset.page)));
}
function bindNavigationSearch() {
  const search = $('#navSearch');
  search.addEventListener('input', renderNav);
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      $('#nav [data-page]')?.click();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      search.value = '';
      renderNav();
      search.blur();
    }
  });
  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const editing = target?.matches?.('input, textarea, select, [contenteditable="true"]');
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !editing) {
      event.preventDefault();
      search.focus();
    }
  });
}
function rowsTable(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>${t('Test ID', 'معرّف الاختبار')}</th><th>${t('Date · UTC', 'التاريخ · UTC')}</th><th>${t('Fuel', 'الوقود')}</th><th>${t('Pressure · mmHg', 'الضغط · mmHg')}</th><th>O₂</th><th>CO₂</th><th>He</th><th>${t('Droplet · mm', 'القطرة · mm')}</th><th>${t('Extinction · mm', 'الإخماد · mm')}</th><th>${t('Burn-rate constant · mm²/s', 'ثابت معدل الاحتراق · mm²/s')}</th><th>${t('Burn · s', 'الاحتراق · s')}</th><th>${t('End state', 'الحالة النهائية')}</th></tr></thead><tbody>${rows.map((r) => `<tr><td class="mono">${esc(r.id)}</td><td>${esc(r.date)} <span class="mono">${esc(r.time_utc)}</span></td><td>${esc(r.fuel)}</td><td>${esc(r.pressure_mmHg ?? '—')}</td><td>${esc(r.oxygen_mole_fraction ?? '—')}</td><td>${esc(r.carbon_dioxide_mole_fraction ?? '—')}</td><td>${esc(r.helium_mole_fraction ?? '—')}</td><td>${esc(r.initial_droplet_diameter_mm ?? '—')}</td><td>${esc(r.visible_flame_extinction_diameter_mm ?? '—')}</td><td>${esc(r.burning_rate_mm_s ?? '—')}</td><td>${esc(r.burn_time_s ?? '—')}</td><td>${esc(r.test_end)}</td></tr>`).join('')}</tbody></table></div>`;
}
function hero() {
  return `<div class="hero"><div class="hero-copy"><div class="eyebrow">MORS AEGIS · FLAME IN FREEFALL</div><h2>${t('A source-linked workspace for spaceflight fire-safety research.', 'مساحة بحث موثقة المصدر لأبحاث سلامة الحرائق في الرحلات الفضائية.')}</h2><p>${t('Microgravity weakens buoyancy-driven flow and changes flame and droplet behavior. MORS AEGIS brings NASA PSI investigations and original tables into a searchable, condition-aware workspace so teams can inspect measurements and form testable safety questions. It explains research evidence; it does not certify equipment or operating procedures.', 'تضعف الجاذبية الصغرى تيارات الحمل الطبيعي وتغيّر سلوك اللهب والقطرات. يجمع MORS AEGIS تحقيقات NASA PSI وجداولها الأصلية في مساحة بحث قابلة للبحث بحسب ظروف الاختبار، لمساعدة الفرق على فحص القياسات وصياغة أسئلة سلامة قابلة للاختبار. يشرح المشروع الأدلة البحثية ولا يصادق على المعدات أو إجراءات التشغيل.')}</p><div class="hero-actions"><button class="primary-btn" data-go="Challenge Evidence">${t('Explore NASA PSI data →', 'استكشف بيانات NASA PSI ←')}</button><button class="secondary-btn" data-go="Flame Physics">${t('Study flame physics →', 'افهم فيزياء اللهب ←')}</button></div></div><div class="hero-meta">NASA PSI · COMBUSTION SCIENCE<br>${t('CHALLENGE-SCOPED · INVESTIGATION-LEVEL EVIDENCE', 'نطاق التحدي · الأدلة حسب كل تحقيق')}</div></div>`;
}
function themeWelcome() {
  if (storageGet('mors-welcome-v21-complete') === '1') return '';
  const choices = [
    ['arctic', t('Light · Arctic', 'فاتح · قطبي'), 'theme-preview-arctic'],
    ['space', t('Dark · Deep Space', 'داكن · فضاء عميق'), 'theme-preview-space'],
    ['observatory', t('Neutral · Observatory', 'محايد · مرصد'), 'theme-preview-observatory'],
    ['blackhole', t('Black Hole', 'الثقب الأسود'), 'theme-preview-blackhole'],
  ];
  return `<section class="card welcome-theme" id="theme-welcome"><div><span class="eyebrow">${t('WELCOME · PERSONALIZE', 'مرحباً · خصّص التجربة')}</span><h3>${t('Choose your research workspace', 'اختر مساحة البحث التي تناسبك')}</h3><p class="sub">${t('Set the language and visual theme before exploring. You can change these choices later in Settings.', 'اختر اللغة والمظهر قبل الاستكشاف. يمكنك تعديلهما لاحقاً من الإعدادات.')}</p></div><div class="welcome-language" role="group" aria-label="${t('Choose language', 'اختر اللغة')}"><button type="button" class="outline-btn" data-lang="en" aria-pressed="${lang === 'en'}">English</button><button type="button" class="outline-btn" data-lang="ar" aria-pressed="${lang === 'ar'}">العربية</button></div><div class="welcome-theme-options" role="group" aria-label="${t('Choose a visual theme', 'اختر نمط العرض')}">${choices.map(([value, label, preview]) => `<button type="button" class="theme-choice ${preview}" data-theme="${value}" aria-pressed="${theme === value}"><span class="theme-preview" aria-hidden="true"><i></i><b></b><em></em></span><span>${label}</span></button>`).join('')}</div>${accentPickerMarkup('welcomeAccent')}<div class="welcome-actions"><span class="sub">${t('Current selection is saved in this browser.', 'يُحفظ اختيارك في هذا المتصفح.')}</span><button class="primary-btn" type="button" data-welcome-continue>${t('Enter the research workspace →', 'ادخل مساحة البحث ←')}</button></div></section>`;
}
function flexScatterPanel() {
  const fuels = [...new Set(dataset.rows.map((row) => row.fuel).filter(Boolean))].sort();
  const options = fuels.map((fuel) => `<option value="${esc(fuel)}">${esc(fuel)}</option>`).join('');
  const included = dataset.rows.filter(
    (row) => Number.isFinite(row.oxygen_mole_fraction) && Number.isFinite(row.burning_rate_mm_s),
  ).length;
  return `<article class="card flex-scatter-card"><div class="card-head"><div><h3>${t('PSI-69 · Oxygen fraction and droplet burning rate', 'PSI-69 · نسبة الأكسجين ومعدل احتراق القطرة')}</h3><p class="sub">${t('Each point is one NASA FLEX source row. Click or tap a point for test details; drag empty space to pan, zoom, or draw a guide line.', 'كل نقطة تمثل صفاً واحداً من NASA FLEX. انقر النقطة لعرض تفاصيل الاختبار؛ اسحب المساحة الفارغة للتحريك أو التكبير أو رسم خط إرشادي.')}</p></div><span class="tag obs">${t('OBSERVED ROWS', 'صفوف مرصودة')}</span></div><div class="toolbar"><label>${t('Fuel', 'الوقود')} <select id="flexScatterFuel"><option value="">${t('All fuels', 'كل أنواع الوقود')}</option>${options}</select></label><label>${t('Pressure · mmHg', 'الضغط · mmHg')} <select id="flexScatterPressure"><option value="all">${t('All pressures', 'كل الضغوط')}</option><option value="low">≤ 760</option><option value="mid">760–1520</option><option value="high">&gt; 1520</option><option value="unknown">${t('Unreported', 'غير مسجل')}</option></select></label></div><div id="flexScatterPlot" aria-live="polite"></div><p class="sub" id="flexScatterCount">${t('Rows shown', 'الصفوف المعروضة')}: n=${included} / ${dataset.rows.length} ${t('source rows with both plotted values', 'صف مصدر يحوي القيمتين')}</p><div class="legend"><span style="--legend-color:#39a77e">${t('Source test_end: Extinction', 'قيمة المصدر test_end: Extinction')}</span><span style="--legend-color:#d59a3d">${t('Source test_end: Disruption', 'قيمة المصدر test_end: Disruption')}</span><span style="--legend-color:#7d73d3">${t('Other / source label', 'أخرى / تسمية المصدر')}</span></div><div class="callout warn">${t('The FLEX burning-rate constant is for liquid droplets under the d² law, not solid-material flame-spread speed. These points are descriptive; mixed conditions do not establish an oxygen effect or causality. Source: PSI-69 · DOI 10.60555/mbq8-0451.', 'ثابت معدل الاحتراق في FLEX خاص بالقطرات السائلة وفق قانون d²، وليس سرعة انتشار اللهب على مادة صلبة. النقاط وصفية؛ اختلاف الشروط لا يثبت أثر الأكسجين أو السببية. المصدر: PSI-69 · DOI 10.60555/mbq8-0451.')}</div></article>`;
}
function bindFlexScatter(root) {
  const fuel = root.querySelector('#flexScatterFuel');
  const pressure = root.querySelector('#flexScatterPressure');
  const plot = root.querySelector('#flexScatterPlot');
  const count = root.querySelector('#flexScatterCount');
  if (!fuel || !pressure || !plot) return;
  const update = () => {
    const rows = dataset.rows.filter((row) => {
      if (fuel.value && row.fuel !== fuel.value) return false;
      if (pressure.value === 'unknown') return !Number.isFinite(row.pressure_mmHg);
      if (!Number.isFinite(row.pressure_mmHg) && pressure.value !== 'all') return false;
      if (pressure.value === 'low') return row.pressure_mmHg <= 760;
      if (pressure.value === 'mid') return row.pressure_mmHg > 760 && row.pressure_mmHg <= 1520;
      if (pressure.value === 'high') return row.pressure_mmHg > 1520;
      return true;
    });
    const config = FLEX_CHART_GUIDE[0];
    plot.innerHTML = scientificScatter({
      rows,
      xKey: config.xKey,
      yKey: config.yKey,
      xLabel: config.xLabel[lang],
      yLabel: config.yLabel[lang],
      xUnit: config.xUnit,
      yUnit: config.yUnit,
      xFactor: config.xFactor || 1,
      groupKey: 'fuel',
      labels: chartControlLabels(lang),
    });
    bindInteractiveCharts(plot);
    const shown = rows.filter(
      (row) => Number.isFinite(row.oxygen_mole_fraction) && Number.isFinite(row.burning_rate_mm_s),
    ).length;
    if (count)
      count.textContent = `${t('Rows shown', 'الصفوف المعروضة')}: n=${shown} / ${rows.length} ${t('filtered source rows with both plotted values', 'صف مفلتر يحوي القيمتين')}`;
  };
  fuel.onchange = update;
  pressure.onchange = update;
}
function fuelOutcomeMatrix() {
  const ar = lang === 'ar';
  const fuels = [...new Set(dataset.rows.map((row) => row.fuel || (ar ? 'غير مسجل' : 'Unreported')))].sort();
  const outcomes = [...new Set(dataset.rows.map((row) => row.test_end || (ar ? 'غير مسجل' : 'Unreported')))].sort();
  const count = (fuel, outcome) => dataset.rows.filter((row) =>
    (row.fuel || (ar ? 'غير مسجل' : 'Unreported')) === fuel &&
    (row.test_end || (ar ? 'غير مسجل' : 'Unreported')) === outcome,
  ).length;
  return `<article class="card fuel-outcome-card"><div class="card-head"><div><span class="eyebrow">${ar ? 'توزيع صفوف المصدر' : 'SOURCE ROW DISTRIBUTION'}</span><h3>${ar ? 'نتائج الاختبارات بحسب الوقود · NASA PSI-69' : 'PSI-69 test outcomes by fuel'}</h3><p class="sub">${ar ? 'عدد تسميات test_end المنشورة لكل وقود، دون تحويلها لاحتمالات أو ترتيب خطورة.' : 'Counts of NASA-reported test_end labels for each fuel; not probabilities or a hazard ranking.'}</p></div><span class="tag obs">${ar ? 'عدد الصفوف' : 'SOURCE COUNTS'}</span></div><div class="table-wrap"><table><caption class="sr-only">${ar ? 'عدد صفوف NASA PSI-69 بحسب الوقود والنتيجة المنشورة' : 'NASA PSI-69 source row counts by fuel and reported test outcome'}</caption><thead><tr><th>${ar ? 'الوقود' : 'Fuel'}</th>${outcomes.map((outcome) => `<th>${esc(outcome)}</th>`).join('')}<th>${ar ? 'الإجمالي' : 'Total'}</th></tr></thead><tbody>${fuels.map((fuel) => { const values = outcomes.map((outcome) => count(fuel, outcome)); return `<tr><th scope="row">${esc(fuel)}</th>${values.map((value) => `<td><span class="outcome-count">${value}</span></td>`).join('')}<td><b>${values.reduce((sum, value) => sum + value, 0)}</b></td></tr>`; }).join('')}</tbody></table></div><p class="sub">${ar ? `المصدر: NASA PSI-69 · DOI 10.60555/mbq8-0451 · ${dataset.rows.length} صفاً كما وردت تسمياتها.` : `Source: NASA PSI-69 · DOI 10.60555/mbq8-0451 · ${dataset.rows.length} records using the reported labels.`}</p><div class="callout warn">${ar ? 'تعكس الأعداد تركيب جدول FLEX المحدد فقط؛ لا تمثل تكراراً عاماً للوقود ولا عتبة اشتعال.' : 'These counts describe this FLEX table only; they do not estimate general fuel frequency or an ignition threshold.'}</div></article>`;
}
function challengeGoals() {
  const goals =
    lang === 'ar'
      ? [
          [
            '1 · اكتشاف دراسات الطاقم',
            'يعرض فهرس NASA PSI الكامل (24 تحقيقاً) مع درجة صلة بالمهمة من البيانات الوصفية. توفر الجدول ظاهر منفصلاً ولا يدخل في الدرجة؛ ليست درجة خطورة.',
          ],
          [
            '2 · أدلة للنمذجة التنبؤية',
            'يكشف المختبر ظروف القياس والحقول والنتائج والنقص لكل دراسة؛ ويحلل FLEX منفصلاً بحسب ظروفه. البيانات الحالية لا تثبت نموذج خطر موحداً عبر التحقيقات.',
          ],
          [
            '3 · أنظمة سلامة الجيل القادم',
            'تربط صفحة السلامة الأدلة بأسئلة الوقاية والكشف والإخماد. هذه اتجاهات بحثية وليست توصيات تشغيلية مصدّقة.',
          ],
        ]
      : [
          [
            '1 · Find crew-relevant studies',
            'Browse all 24 NASA PSI investigations with a metadata-based mission-relevance score. Table availability is separate and does not change the score; this is not a fire-hazard ranking.',
          ],
          [
            '2 · Expose evidence for predictive models',
            'Inspect conditions, fields, outcomes, and gaps per study; analyze FLEX separately by test conditions. Current evidence does not validate a universal cross-study risk model.',
          ],
          [
            '3 · Inform next-generation safety systems',
            'Connect evidence to prevention, detection, and suppression research questions. These are design directions, not certified operating recommendations.',
          ],
        ];
  return `<article class="card" style="margin:15px 0"><div class="card-head"><div><span class="eyebrow">OFFICIAL CHALLENGE VIDEO · 07:15–08:39</span><h3>${t('What the challenge asks us to deliver', 'ما الذي يطلبه التحدي من المشروع')}</h3></div><a href="https://www.youtube.com/watch?v=AVuEiKxOpc0" target="_blank" rel="noreferrer">${t('Watch video ↗', 'شاهد الفيديو ↗')}</a></div><div class="grid three">${goals.map(([title, body]) => `<section class="card"><h3>${title}</h3><p class="sub">${body}</p></section>`).join('')}</div><p class="sub">${t('SI is used to help navigate and explain cited evidence; generated text is not an experimental measurement. Optional Earth applications are documented separately.', 'يساعد SI على استكشاف الأدلة الموثقة وشرحها؛ النص المولّد ليس قياساً تجريبياً. تطبيقات الأرض الاختيارية موثقة منفصلة.')}</p></article>`;
}
function flexBurnRateHistogram() {
  return scientificHistogram({
    rows: dataset.rows,
    key: 'burning_rate_mm_s',
    label: t('Droplet burning-rate constant', 'ثابت معدل احتراق القطرة'),
    unit: 'mm²/s',
    labels: chartControlLabels(lang),
    idField: 'id',
  });
}
async function overview() {
  const evidence = await get('/api/challenge/catalog');
  return `${hero()}${themeWelcome()}${challengeGoals()}${judgingTrail(evidence, lang)}<article class="card ai-entry"><div><span class="eyebrow">${t('AI RESEARCH COPILOT', 'مساعد الأبحاث بالذكاء الاصطناعي')}</span><h3>${t('Ask a question; inspect the evidence behind the answer.', 'اسأل، ثم افحص الدليل الذي يستند إليه الجواب.')}</h3><p class="sub">${t('The assistant works with NASA PSI-69 records, computes descriptive results, cites the source, and labels its AI explanation separately.', 'يعمل المساعد على سجلات NASA PSI-69، ويحسب النتائج الوصفية، ويذكر المصدر ويفصل تفسير AI عنها.')}</p></div><button class="primary-btn" data-go="AI Copilot">${t('Open AI Copilot →', 'افتح مساعد AI ←')}</button></article><div class="grid stats">${stat(t('PSI COMBUSTION INVESTIGATIONS', 'تحقيقات الاحتراق في PSI'), evidence.officialInventory.total, t('Official NASA inventory snapshot', 'لقطة من فهرس NASA الرسمي'), '◉')}${stat(t('TABLES BUNDLED', 'الجداول المرفقة'), evidence.investigations.length, t('NASA PSI tables · checksums verified', 'جداول NASA PSI · البصمات متحققة'), '▤')}${stat(t('SEPARATE SOURCE ROWS', 'صفوف المصدر المنفصلة'), evidence.recordCountAcrossFiles, t('Separate studies; never pooled', 'دراسات منفصلة؛ غير مدمجة'), '▤')}${stat(t('VERIFIED TABLE HASHES', 'بصمات الجداول المتحققة'), evidence.investigations.filter((x) => x.sourceIntegrity === 'VERIFIED').length, t('Original source bytes verified', 'تم التحقق من بايتات الملفات الأصلية'), '✓')}</div><div class="grid two"><article class="card"><div class="card-head"><div><h3>FLEX · PSI-69</h3><p class="sub">${t('One investigation selected for detailed, condition-stratified analysis.', 'تحقيق واحد للتحليل التفصيلي بحسب ظروف الاختبار.')}</p></div><span class="tag obs">${t('OBSERVED', 'مرصود')}</span></div>${flexBurnRateHistogram()}<div class="legend"><span>PSI-69 · DOI 10.60555/mbq8-0451</span></div></article><article class="card"><h3>${t('NASA challenge-source coverage', 'تغطية مصدر بيانات التحدي')}</h3><p class="sub">${t(`Measurements come from the challenge-relevant NASA PSI Combustion Science repository. NASA PSI lists ${evidence.officialInventory.total} investigations; ${evidence.investigations.length} original table files are bundled, checksummed, and inspectable. Studies remain separate because their methods and outcomes differ.`, `تأتي القياسات من مستودع NASA PSI Combustion Science المرتبط بالتحدي. يسجل الفهرس ${evidence.officialInventory.total} تحقيقاً؛ أرفقنا ${evidence.investigations.length} جدولاً أصلياً مع بصماتها لفحصها. بقيت الدراسات منفصلة لاختلاف طرقها ونتائجها.`)}</p><div class="list-row"><span>${t('Flame and droplet studies', 'دراسات اللهب والقطرات')}</span><b>ACME · CFI · FLEX · SPICE</b></div><div class="list-row"><span>${t('Solid materials and spacecraft fires', 'المواد الصلبة وحرائق المركبات')}</span><b>BASS · SAFFIRE</b></div><div class="list-row"><span>${t('Smoke and aerosol studies', 'دراسات الدخان والهباء')}</span><b>SAME · DAFT</b></div><div class="callout warn">${t('Other PSI tables are kept as separate source records and are never pooled into a universal fire-hazard rank.', 'تبقى جداول PSI الأخرى سجلات مصدر مستقلة. لا ندمج تجارب مختلفة في تصنيف عام لخطر الحريق.')}</div></article></div>${flexScatterPanel()}${fuelOutcomeMatrix()}<div class="grid three"><article class="card"><h3>${t('Study the physics', 'ادرس الفيزياء')}</h3><p class="sub">${t('Buoyancy-driven convection weakens in microgravity; diffusion and forced ventilation remain.', 'يضعف الحمل الناتج عن الطفو في الجاذبية الصغرى، بينما يستمر الانتشار والتهوية القسرية.')}</p><button class="outline-btn" data-go="Flame Lab">${t('Open Flame Lab →', 'افتح مختبر اللهب ←')}</button></article><article class="card"><h3>${t('Inspect primary data', 'افحص البيانات الأساسية')}</h3><p class="sub">${t('Browse source rows, missing values, DOIs, and integrity checks for each study.', 'استعرض صفوف المصدر والقيم المفقودة وDOI وفحوص السلامة لكل دراسة.')}</p><button class="outline-btn" data-go="Challenge Evidence">${t('Open Dataset Explorer →', 'افتح مستكشف البيانات ←')}</button></article><article class="card"><h3>${t('Decision-support boundary', 'حدود دعم القرار')}</h3><p class="sub">${t('This research dashboard does not certify spacecraft fire risk or replace flight-safety procedures.', 'لوحة الأبحاث لا تصادق على مخاطر الحريق ولا تستبدل إجراءات سلامة الطيران.')}</p><a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA · ${t('fire-safety research', 'أبحاث سلامة الحريق')} ↗</a></article></div>`;
}
const WB_VARIABLES = [
  ['burning_rate_mm_s', 'Burning-rate constant (mm²/s)'],
  ['initial_droplet_diameter_mm', 'Initial droplet diameter (mm)'],
  ['visible_flame_extinction_diameter_mm', 'Flame extinction diameter (mm)'],
  ['burn_time_s', 'Burn time (s)'],
  ['pressure_mmHg', 'Pressure (mmHg)'],
  ['oxygen_mole_fraction', 'Oxygen mole fraction'],
];
const WB_DEFAULT = { fuel: '', pressureBand: '', diluent: '', variable: 'burning_rate_mm_s' };
let wbFilter = { ...WB_DEFAULT };
const fmt = (v, d = 3) => (Number.isFinite(v) ? v.toFixed(d) : '—');
function ciCell(ci) {
  if (!ci) return '—';
  if (ci.low === null)
    return `<span style="color:var(--muted)" title="${esc(ci.reason || '')}">${ci.n < 5 ? t('not reported (n &lt; 5)', 'غير مُبلغ عنه (n &lt; 5)') : t('not reported', 'غير مُبلغ عنه')}</span>`;
  return `${fmt(ci.low)} – ${fmt(ci.high)}`;
}
function wbSelect(id, label, options, value) {
  return `<label style="font-size:10px;color:var(--muted)">${label} <select id="${id}">${options.map(([v, text]) => `<option value="${esc(v)}" ${v === value ? 'selected' : ''}>${esc(text)}</option>`).join('')}</select></label>`;
}
function wbGroupRow(label, g, bold = false) {
  const a = g.association,
    name = bold ? `<b>${esc(label)}</b>` : esc(label);
  return `<tr><td>${name}</td><td>${g.records}</td><td>${g.n}</td><td><b>${fmt(g.mean)}</b></td><td>${ciCell(g.ci95)}</td><td>${fmt(g.sampleSd)}</td><td>${a.r === null ? '—' : fmt(a.r)} <span style="color:var(--muted)">(n=${a.n})</span></td><td>${a.r === null ? '—' : ciCell(a.ci95)}</td></tr>`;
}
function scientificChartGallery(rows, { explain = false } = {}) {
  const labels = {
    controls: t('Chart controls', 'أدوات المخطط'),
    interactionHint: t(
      'Tap or click a point for details · drag the plot to pan · use +/− or the wheel to zoom.',
      'انقر النقطة لعرض التفاصيل · اسحب المخطط لتحريكه · استخدم +/− أو عجلة الفأرة للتكبير.',
    ),
    zoomIn: t('Zoom in', 'تكبير'),
    zoomOut: t('Zoom out', 'تصغير'),
    reset: t('Reset view', 'إعادة العرض'),
    fitLine: t('Linear fit', 'خط الملاءمة'),
    drawLine: t('Draw guide line', 'ارسم خطاً إرشادياً'),
    drawLineActive: t('Drag to draw · tap to stop', 'اسحب لرسم الخط · اضغط للإيقاف'),
    undo: t('Undo line', 'تراجع عن الخط'),
    fit: t('Exploratory linear fit', 'ملاءمة خطية استكشافية'),
    fitUnavailable: t('Fit unavailable (need at least 3 points)', 'لا يمكن حساب الملاءمة (يلزم 3 نقاط على الأقل)'),
    fitNote: t('Exploratory association only; it does not show causation.', 'ارتباط استكشافي فقط؛ لا يثبت السببية.'),
    rows: t('Valid source rows', 'صفوف المصدر الصالحة'),
  };
  const language = lang === 'ar' ? 'ar' : 'en';
  const configs = FLEX_CHART_GUIDE.map((cfg) => ({
    ...cfg,
    title: cfg.title[language],
    xLabel: cfg.xLabel[language],
    yLabel: cfg.yLabel[language],
    question: cfg.question[language],
    use: cfg.use[language],
    limit: cfg.limit[language],
  }));
  const guidance = (cfg) =>
    explain
      ? `<div class="grid three" style="margin:12px 0"><p class="sub"><b>${t('Question', 'السؤال')}</b><br>${esc(cfg.question)}</p><p class="sub"><b>${t('How to use it', 'طريقة الاستخدام')}</b><br>${esc(cfg.use)}</p><p class="sub"><b>${t('Interpretation limit', 'حدود التفسير')}</b><br>${esc(cfg.limit)}</p></div>`
      : '';
  return `<section class="chart-gallery"><div class="section-title"><div><h2>${t('Interactive FLEX research plots', 'مخططات FLEX البحثية التفاعلية')}</h2><p>${t('Each dot is one source test. Missing pairs are omitted only from that plot. Fuel is shown by color; fitted lines are exploratory and never establish causation.', 'كل نقطة تمثل اختباراً واحداً من المصدر. تُستبعد القيم الناقصة من ذلك المخطط فقط. يميز اللون الوقود؛ وخط الملاءمة استكشافي ولا يثبت السببية.')}</p></div></div><div class="grid two">${configs.map((cfg) => `<article class="card" data-chart-guide="${cfg.id}"><h3>${cfg.title}</h3>${guidance(cfg)}${scientificScatter({ ...cfg, rows, groupKey: 'fuel', labels })}</article>`).join('')}</div></section>`;
}

function chartGuidePage() {
  const ar = lang === 'ar';
  const intro = ar
    ? 'يجمع هذا الدليل مخططي النظرة العامة ومخططات منضدة التحليل الستة. جميع النقاط التجريبية أدناه من NASA PSI-69 (FLEX)، وليست خليطاً من التحقيقات المختلفة.'
    : 'This guide collects the two Overview plots and the six Analysis Workbench plots. Experimental points below come from NASA PSI-69 (FLEX); they are not pooled across unrelated investigations.';
  return `${pageHead(t('Chart Guide', 'دليل المخططات'), t('What each plot asks, how to read it, and what it cannot establish.', 'سؤال كل مخطط وطريقة قراءته وما لا يمكن استنتاجه منه.'))}
    <div class="callout" style="margin-bottom:18px">${intro} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-69" target="_blank" rel="noreferrer">NASA PSI-69 · DOI 10.60555/mbq8-0451 ↗</a></div>
    <h2 style="margin:22px 0 12px">${t('Overview plots', 'مخططا النظرة العامة')}</h2>
    <div class="grid two">
      <article class="card"><h3>${t('Distribution of FLEX droplet burning-rate constants', 'توزيع ثوابت معدل احتراق قطرات FLEX')}</h3><p class="sub">${t('Purpose: scan the spread of reported burning-rate constants and spot values worth inspecting.', 'الغرض: استعراض تشتت ثوابت معدل الاحتراق المسجلة ورصد القيم التي تستحق الفحص.')}</p>${flexBurnRateHistogram()}<div class="callout warn">${t('Each bar counts valid PSI-69 source rows within a burning-rate interval. Click a bar to inspect its source test IDs; binning is descriptive.', 'يمثل كل عمود عدد صفوف NASA PSI-69 الصالحة ضمن مجال لمعدل الاحتراق. انقر عموداً لفحص معرّفات الاختبار؛ والتجميع وصفي.')}</div></article>
      ${flexScatterPanel()}
    </div>
    <h2 style="margin:24px 0 12px">${t('Six interactive Workbench plots', 'المخططات التفاعلية الستة في منضدة التحليل')}</h2>
    ${scientificChartGallery(dataset.rows, { explain: true })}
    <div class="callout warn" style="margin-top:16px">${t('The Earth and microgravity flame drawings in Flame Physics are conceptual schematics, not measured NASA plots. The 3D models are research concepts, not validated fire-suppression hardware.', 'رسما اللهب للأرض والجاذبية الصغرى في صفحة فيزياء اللهب تخطيطيان مفهومان وليسا مخططَي قياسات من ناسا. والنماذج ثلاثية الأبعاد مفاهيم بحثية وليست معدات إخماد معتمدة.')}</div>`;
}

async function analysisPage() {
  const params = new URLSearchParams(Object.entries(wbFilter).filter(([, v]) => v));
  const wb = await get(`/api/analysis?${params}`);
  const variableLabels = WB_VARIABLES.map(([key, label]) => [
    key,
    t(
      label,
      {
        'Burning-rate constant (mm²/s)': 'ثابت معدل الاحتراق (mm²/s)',
        'Initial droplet diameter (mm)': 'قطر القطرة الابتدائي (mm)',
        'Flame extinction diameter (mm)': 'قطر إخماد اللهب (mm)',
        'Burn time (s)': 'زمن الاحتراق (s)',
        'Pressure (mmHg)': 'الضغط (mmHg)',
        'Oxygen mole fraction': 'الكسر المولي للأكسجين',
      }[label],
    ),
  ]);
  const c = wb.conditions,
    strata = wb.strata,
    filtered = Object.keys(wb.filter).length > 0,
    varLabel = variableLabels.find(([k]) => k === wbFilter.variable)?.[1] || wbFilter.variable,
    any = (label) => [['', label]];
  const bar = `<article class="card"><div class="card-head"><div><h3>${t('Test-condition filter', 'تصفية ظروف الاختبار')}</h3><p class="sub">${esc(c.bandDefinition)} ${t('Diluent is the added inert gas (CO₂ or He); “no diluent” means O₂/N₂ only.', 'المخفف هو الغاز الخامل المضاف (CO₂ أو He)؛ وتعني «من دون مخفف» مزيج O₂/N₂ فقط.')}</p></div><span class="tag obs">${wb.records} ${t('OF', 'من أصل')} ${dataset.dataset.records} ${t('TESTS', 'اختباراً')}</span></div><div class="toolbar" style="margin:0">${wbSelect('wbFuel', t('Fuel', 'الوقود'), any(t('All fuels', 'كل أنواع الوقود')).concat(c.fuels.map((f) => [f.id, `${f.label} (${f.n})`])), wbFilter.fuel)}${wbSelect('wbBand', t('Pressure', 'الضغط'), any(t('All pressures', 'كل الضغوط')).concat(c.pressureBands.map((b) => [b.id, `${b.label} · ${b.observed} (${b.n})`])), wbFilter.pressureBand)}${wbSelect('wbDiluent', t('Diluent', 'الغاز المخفف'), any(t('All diluents', 'كل الغازات المخففة')).concat(c.diluents.map((d) => [d.id, `${d.label} (${d.n})`])), wbFilter.diluent)}${wbSelect('wbVariable', t('Grouped variable', 'متغير التجميع'), variableLabels, wbFilter.variable)}<button class="outline-btn" id="wbReset">${t('Reset', 'إعادة ضبط')}</button></div></article>`;
  if (!strata)
    return `${pageHead(t('Scientific Analysis Workbench', 'منضدة التحليل العلمي'), t('Reproducible summary statistics computed from source rows.', 'إحصاءات وصفية قابلة لإعادة الإنتاج ومحسوبة من صفوف المصدر.'))}${bar}<div class="callout warn" style="margin-top:15px">${t('No bundled test matches', 'لا يوجد اختبار مرفق يطابق')} ${esc(wb.conditionLabel)}. ${t('Summary statistics are withheld; reset the conditions to inspect all records.', 'حُجبت الإحصاءات؛ أعد ضبط الظروف لفحص السجلات.')}</div>${measurementPlotStudioMarkup(lang)}${flex3DMarkup(lang)}`;
  const st = wb.summary.stats,
    pooled = strata.pooled,
    boot = strata.bootstrap,
    highBand = c.pressureBands.find((b) => b.id === '>2atm');
  const metrics = Object.entries(st)
    .map(
      ([k, v]) =>
        `<article class="card metric"><div class="label">${t({ burning_rate_mm_s: 'Burning-rate constant', burn_time_s: 'Burn time', initial_droplet_diameter_mm: 'Initial droplet diameter', visible_flame_extinction_diameter_mm: 'Visible flame extinction diameter' }[k] || k.replaceAll('_', ' '), { burning_rate_mm_s: 'ثابت معدل الاحتراق', burn_time_s: 'زمن الاحتراق', initial_droplet_diameter_mm: 'قطر القطرة الابتدائي', visible_flame_extinction_diameter_mm: 'قطر إخماد اللهب المرئي' }[k] || k.replaceAll('_', ' '))}</div><strong>${v.mean === null ? '—' : v.mean.toFixed(3)}</strong><small>${t('Mean', 'المتوسط')} · ${v.unit} · n=${v.n} · ${t('missing', 'مفقود')}=${v.missing}</small><p class="sub">${t('Sample SD', 'الانحراف المعياري للعينة')} ${v.sd === null ? '—' : v.sd.toFixed(3)} · ${t('range', 'النطاق')} ${v.min ?? '—'}–${v.max ?? '—'}</p></article>`,
    )
    .join('');
  const table = `<article class="card" style="margin-top:15px"><div class="card-head"><div><h3>${t('Per-condition results', 'النتائج بحسب ظروف الاختبار')} · ${esc(varLabel)}</h3><p class="sub">${esc(wb.conditionLabel)} · ${t('grouped by fuel, pressure band and diluent. 95% CIs are seeded percentile bootstrap intervals', 'مجمعة حسب الوقود ونطاق الضغط والغاز المخفف. فواصل الثقة 95% محسوبة بإعادة معاينة bootstrap ذات بذرة ثابتة')} (seed ${boot.seed}, ${boot.resamples} ${t('resamples; withheld when n', 'إعادة معاينة؛ لا تُعرض عندما n')} &lt; ${boot.minN}.</p></div><span class="tag comp">${t('COMPUTED', 'محسوب')}</span></div><div class="table-wrap"><table><thead><tr><th>${t('Condition', 'الظرف')}</th><th>${t('Tests', 'الاختبارات')}</th><th>n</th><th>${t('Mean', 'المتوسط')}</th><th>95% CI (${t('mean', 'المتوسط')})</th><th>SD (${t('sample', 'العينة')})</th><th>Pearson r · ${t('diameter vs burning rate', 'القطر مقابل معدل الاحتراق')}</th><th>95% CI (r)</th></tr></thead><tbody>${wbGroupRow(filtered ? `${wb.conditionLabel} (${t('all', 'الكل')})` : t('All tests (pooled)', 'كل الاختبارات (مجمعة)'), pooled, true)}${strata.groups.map((g) => wbGroupRow(g.label, g)).join('')}</tbody></table></div><div class="callout warn" style="margin-top:12px">${filtered ? t('Oxygen fraction, diluent fraction and droplet size still vary among tests within each row.', 'ما تزال نسبة الأكسجين والغاز المخفف وحجم القطرة تختلف بين الاختبارات في الصف الواحد.') : t('The first row pools different fuels, pressures and diluents; prefer the per-condition rows.', 'يجمع الصف الأول أنواع وقود وضغوطاً وغازات مخففة مختلفة؛ اعتمد صفوف ظروف الاختبار المنفصلة.')} ${t('The >2 atm band spans 2.0–3.1 atm and contains', 'يمتد نطاق >2 atm من 2.0 إلى 3.1 atm ويضم')} ${highBand?.n ?? 0} ${t('tests. Intervals describe resampling, not instrument uncertainty.', 'اختباراً. تصف الفواصل إعادة معاينة السجلات ولا تمثل عدم يقين الأجهزة.')}</div></article>`;
  const assoc = `<article class="card"><div class="card-head"><div><h3>${t('Exploratory association', 'ارتباط استكشافي')}</h3><p class="sub">${t('Initial droplet diameter vs. burning rate', 'قطر القطرة الابتدائي مقابل معدل الاحتراق')} · ${esc(wb.conditionLabel)}</p></div><span class="tag comp">${t('COMPUTED', 'محسوب')}</span></div><div style="font-size:34px;font-weight:800;margin:18px 0">${wb.associations.r?.toFixed(3) ?? '—'}</div><p class="sub">Pearson r · n = ${wb.associations.n} · 95% CI ${wb.associations.r === null ? '—' : ciCell(pooled.association.ci95)}. ${t('Conditions still vary within this selection, so this association cannot establish causality.', 'تبقى ظروف الاختبار متغيرة ضمن هذا الاختيار، لذلك لا يثبت الارتباط علاقة سببية.')}</p><div class="callout warn">${t('No hypothesis test is run. Small-group r values are exploratory.', 'لم يُجرَ اختبار فرضية. قيم r للمجموعات الصغيرة استكشافية.')}</div></article>`;
  const methods = `<article class="card"><h3>${t('Methods & reproducibility', 'الطرق وقابلية إعادة الإنتاج')}</h3><div class="list-row"><span>${t('Mean', 'المتوسط')}</span><b>${t('Arithmetic mean', 'المتوسط الحسابي')}</b></div><div class="list-row"><span>${t('Spread', 'التشتت')}</span><b>${t('Sample standard deviation (n − 1)', 'الانحراف المعياري للعينة (n − 1)')}</b></div><div class="list-row"><span>${t('Interval', 'الفاصل')}</span><b>95% ${t('percentile bootstrap', 'bootstrap المئيني')} · seed ${boot.seed} · ${boot.resamples} · n ≥ ${boot.minN}</b></div><div class="list-row"><span>${t('Grouping', 'التجميع')}</span><b>${t('Fuel · pressure band · diluent', 'الوقود · نطاق الضغط · الغاز المخفف')}</b></div><div class="list-row"><span>${t('Missing values', 'القيم المفقودة')}</span><b>${t('Excluded per variable; no imputation', 'تُستبعد لكل متغير؛ بلا تعويض')}</b></div><div class="list-row"><span>${t('Source table', 'جدول المصدر')}</span><b>NASA PSI-69</b></div><div class="list-row"><span>${t('Software', 'البرنامج')}</span><b>MORS AEGIS 3.0 · JS</b></div></article>`;
  return `${pageHead(t('Scientific Analysis Workbench', 'منضدة التحليل العلمي'), t('Reproducible statistics computed from source rows by test condition; nulls are excluded per variable.', 'إحصاءات قابلة لإعادة الإنتاج من صفوف المصدر بحسب ظرف الاختبار؛ تُستبعد القيم الفارغة لكل متغير.'))}${bar}${scientificChartGallery(dataset.rows)}${measurementPlotStudioMarkup(lang)}${flex3DMarkup(lang)}<div class="grid three" style="margin-top:15px">${metrics}</div>${table}<div class="grid two" style="margin-top:15px">${assoc}${methods}</div>`;
}
function comparePage() {
  return `${pageHead(t('Experiment Comparison Studio', 'استوديو مقارنة التجارب'), t('Compare two FLEX tests. Differences are computed only when fuel and gas composition match.', 'قارن اختبارين من FLEX. لا تُحسب الفروق إلا إذا تطابق الوقود وتركيب الغاز.'))}<div class="grid two"><article class="card"><h3>${t('Test A', 'الاختبار A')}</h3><label class="field-label">${t('Select record', 'اختر سجلاً')}</label><select id="compareA" class="field">${dataset.rows.map((r) => `<option value="${esc(r.id)}">${esc(r.id)} · ${r.burning_rate_mm_s ?? '—'} mm²/s</option>`).join('')}</select><div id="compareResultA"></div></article><article class="card"><h3>${t('Test B', 'الاختبار B')}</h3><label class="field-label">${t('Select record', 'اختر سجلاً')}</label><select id="compareB" class="field">${dataset.rows.map((r, i) => `<option value="${esc(r.id)}" ${i === 1 ? 'selected' : ''}>${esc(r.id)} · ${r.burning_rate_mm_s ?? '—'} mm²/s</option>`).join('')}</select><div id="compareResultB"></div></article></div><article class="card" style="margin-top:15px"><div class="card-head"><div><h3>${t('Paired variables', 'المتغيرات المقارنة')}</h3><p class="sub">${t('Observed source values shown side by side', 'قيم المصدر المرصودة معروضة جنباً إلى جنب')}</p></div><span class="tag obs">${t('OBSERVED', 'مرصود')}</span></div><div id="compareTable"></div></article><div class="callout warn" style="margin-top:14px">${t('These are individual records, not controlled matched groups. A difference does not establish a physical effect.', 'هذه سجلات اختبار منفردة وليست مجموعات مضبوطة ومتطابقة؛ والفرق الظاهر لا يثبت أثراً فيزيائياً.')}</div>`;
}
function renderCompare() {
  const a = dataset.rows.find((r) => r.id === $('#compareA').value),
    b = dataset.rows.find((r) => r.id === $('#compareB').value);
  for (const [id, r] of [
    ['compareResultA', a],
    ['compareResultB', b],
  ])
    $('#' + id).innerHTML =
      `<div style="margin:20px 0 5px;font-size:29px;font-weight:800">${r.burning_rate_mm_s ?? '—'} <small style="font-size:11px;color:var(--muted)">mm²/s</small></div><p class="sub">${r.date} ${r.time_utc ?? '—'} UTC · ${r.test_end}</p>`;
  // Same rule as the server's compareExperiments: differences are only computed between tests
  // with the same fuel and ambient gas composition; observed values are always shown.
  const conditions = [
    'fuel',
    'oxygen_mole_fraction',
    'nitrogen_mole_fraction',
    'carbon_dioxide_mole_fraction',
    'helium_mole_fraction',
  ];
  const mismatched = conditions.filter((k) => a[k] == null || b[k] == null || a[k] !== b[k]);
  const comparable = a.id !== b.id && mismatched.length === 0;
  const keys = [
    ...conditions,
    'pressure_mmHg',
    'initial_droplet_diameter_mm',
    'visible_flame_extinction_diameter_mm',
    'burning_rate_mm_s',
    'burn_time_s',
  ];
  const difference = (k) =>
    !conditions.includes(k) && comparable && Number.isFinite(a[k]) && Number.isFinite(b[k])
      ? (b[k] - a[k]).toFixed(3)
      : '—';
  const notice = comparable
    ? ''
    : `<div class="callout warn" style="margin-bottom:12px">${a.id === b.id ? t('Select two different tests.', 'اختر اختبارين مختلفين.') : `${t('Differences withheld; the tests differ in', 'حُجبت الفروق لاختلاف الاختبارين في')} ${mismatched.map((k) => k.replaceAll('_', ' ')).join(', ')}. ${t('A numeric comparison requires the same fuel and gas composition.', 'تتطلب المقارنة العددية تطابق الوقود وتركيب الغاز.')}`}</div>`;
  $('#compareTable').innerHTML =
    `${notice}<table><thead><tr><th>${t('Variable', 'المتغير')}</th><th>${esc(a.id)}</th><th>${esc(b.id)}</th><th>${t('Difference · B − A', 'الفرق · B − A')}</th></tr></thead><tbody>${keys.map((k) => `<tr${mismatched.includes(k) ? ' class="mismatch"' : ''}><td>${k.replaceAll('_', ' ')}</td><td>${esc(a[k] ?? '—')}</td><td>${esc(b[k] ?? '—')}</td><td>${difference(k)}</td></tr>`).join('')}</tbody></table>`;
}
function copilot() {
  const ar = lang === 'ar';
  return `${themeWelcome()}${pageHead(ar ? 'مساعد أبحاث MORS AEGIS' : 'AEGIS AI Research Chat', ar ? 'مساعد بحثي تفاعلي لبيانات NASA PSI-69؛ يحسب النتائج من البيانات ويفصلها عن تفسير AI.' : 'Ask the AI about NASA PSI-69 evidence, methods, statistics, or limitations. Computed results are shown separately from AI interpretation.')}<article class="card copilot-brief"><div><span class="eyebrow">${ar ? 'كيف يعمل مساعد AI' : 'HOW THE AI COPILOT WORKS'}</span><p>${ar ? 'يحوّل سؤالك إلى تحليل محدد، يحسب الجواب من صفوف NASA المنشورة، ثم يضيف تفسيراً قصيراً ضمن حدود الدليل.' : 'Your question selects a bounded analysis; deterministic tools compute results from NASA source rows, then AI adds a short evidence-bounded interpretation.'}</p></div><ol><li>${ar ? 'اسأل عن المتوسط أو العلاقة أو مقارنة سجلين أو حدود البيانات.' : 'Ask for a mean, association, two-record comparison, or data limitation.'}</li><li>${ar ? 'اقرأ النتيجة المحسوبة ومصدر PSI-69 منفصلة عن صياغة النموذج.' : 'Read the computed result and PSI-69 citation separately from model wording.'}</li><li>${ar ? 'إذا تعذر الاتصال بالنموذج، يبقى الملخص العلمي الحتمي متاحاً.' : 'If the model is offline, the deterministic research summary remains available.'}</li></ol></article><div class="callout warn">${ar ? 'الحسابات العلمية التفصيلية الموثقة تستخدم PSI-69 حالياً؛ ويمكن للمساعد استرجاع صفوف مرتبطة بالسؤال من 16 جدول NASA PSI مستقلاً ومتحقق البصمة عند تحديد التحقيق، دون دمج الدراسات أو إجراء حسابات موحدة بينها.' : 'Detailed verified calculations currently use PSI-69; the Copilot can retrieve relevant rows from sixteen separately checksum-verified NASA PSI tables when you name an investigation, but it does not pool or calculate across unlike studies.'}</div><article class="card chat-shell"><div class="chat-top"><div class="chat-brand"><div class="chat-avatar">✧</div><div><h3>${ar ? 'مساعد البحث العلمي' : 'AEGIS Research Assistant'}</h3><p class="sub">${ar ? 'NASA PSI-69 · جدول التجارب الكامل · DOI 10.60555/mbq8-0451' : 'NASA PSI-69 · full experimental table · DOI 10.60555/mbq8-0451'}</p></div></div><div class="chat-top-actions"><span class="tag" id="copilotMode">${ar ? 'جارٍ التحقق من الخدمة…' : 'Checking provider…'}</span><button class="outline-btn" id="newChat" type="button">${ar ? 'محادثة جديدة' : 'New chat'}</button></div></div><div class="chat-context"><span class="tag obs">OBSERVED · PSI-69</span><span class="tag comp">COMPUTED · ${ar ? 'إحصاءات وصفية' : 'descriptive statistics'}</span><span class="tag">${ar ? 'السجل محفوظ محليًا في هذا المتصفح' : 'Chat saved locally in this browser'}</span></div><div class="chat-log" id="chatLog" role="log" aria-live="polite" aria-relevant="additions text"></div><div id="chatTyping" class="chat-typing" hidden>${ar ? 'يفحص الأدلة…' : 'Checking the evidence…'}</div><div class="chat-suggestions" id="chatSuggestions"><button class="suggestion" data-question="${t('What is the mean burning rate, and how was it computed?', 'ما متوسط ثابت معدل الاحتراق، وكيف حُسب؟')}">${t('Mean burning rate', 'متوسط معدل الاحتراق')}</button><button class="suggestion" data-question="${t('What do these records tell us about droplet diameter and burning rate?', 'ماذا تخبرنا السجلات عن قطر القطرة ومعدل الاحتراق؟')}">${t('Explore relationship', 'استكشف العلاقة')}</button><button class="suggestion" data-question="${t('What are the main limitations of this table?', 'ما أبرز حدود هذا الجدول؟')}">${t('Evidence limits', 'حدود الأدلة')}</button><button class="suggestion" data-question="${t('Summarize NASA PSI-25 source evidence and its limits.', 'لخص أدلة NASA PSI-25 وحدودها.')}">${t('Explore BASS-II · PSI-25', 'استكشف BASS-II · PSI-25')}</button></div><div class="chat-compose"><form id="chatForm"><textarea class="field" id="question" rows="2" maxlength="1500" required aria-label="${ar ? 'رسالة إلى مساعد أبحاث AEGIS' : 'Message AEGIS research assistant'}" placeholder="${ar ? 'اكتب سؤالك عن الأدلة…' : 'Message AEGIS about the evidence…'}"></textarea><button class="primary-btn chat-send" id="chatSend" type="submit">${ar ? 'إرسال ↑' : 'Send ↑'}</button></form><div class="chat-disclosure">${ar ? 'تُحفظ المحادثة في تخزين المتصفح فقط. لا تدخل معلومات شخصية أو سرية.' : 'Conversation is stored in this browser only. Do not enter personal or confidential information.'} · ${ar ? 'تُرسل أسئلة البحث إلى نموذج محلي عبر شبكة Tailscale الخاصة، أو يعرض النظام ملخصاً محلياً عند توقف النموذج.' : 'Questions go to a local model over private Tailscale; a deterministic evidence summary appears if it is offline.'}</div></div></article>`;
}
function missionLessons() {
  const ar = lang === 'ar';
  const incidents = [
    {
      title: 'Apollo 1 · Pad test, 1967',
      tag: ar ? 'حادث أرضي · ليس بيانات جاذبية صغرى' : 'GROUND INCIDENT · NOT MICROGRAVITY DATA',
      facts: ar
        ? 'كان اختبار ما قبل الإطلاق داخل الكبسولة المضغوطة بأكسجين نقي. لم يحدد التحقيق مصدر اشتعال واحداً بشكل قاطع، لكنه وجد أدلة على تقوس كهربائي. أدى الجو الغني بالأكسجين إلى انتشار سريع وارتفاع الضغط، وتعذر فتح الفتحة بسرعة.'
        : 'The prelaunch capsule test used a pressurized, pure-oxygen atmosphere. Investigators did not identify one definitive ignition source, but found evidence of electrical arcing. The oxygen-rich environment supported rapid fire growth and pressure rise; the hatch could not be opened quickly.',
      insight: ar
        ? 'درس التصميم: اضبط مصادر الاشتعال والمواد القابلة للاحتراق، وراجع فتحات الخروج والإنقاذ في ظروف الضغط الفعلية. الحادث يوضح الخطر ولا يقيس انتشار لهب في انعدام الجاذبية.'
        : 'Design lesson: control ignition sources and combustible materials, and validate egress and rescue under the actual pressure condition. This incident demonstrates a hazard; it does not measure flame spread in microgravity.',
      url: 'https://sma.nasa.gov/sma-disciplines/accllp/apollo-1',
      label: 'NASA Apollo 1 accident record',
    },
    {
      title: 'Apollo 13 · Oxygen-tank failure, 1970',
      tag: ar ? 'عطل نظام أكسجين · ليس تجربة لهب' : 'OXYGEN-SYSTEM FAILURE · NOT A FLAME TEST',
      facts: ar
        ? 'تضررت أسلاك وعوازل داخل خزان الأكسجين بعد تسخين مفرط في الاختبار الأرضي، ثم وقع انفجار أثناء الرحلة وفُقد الأكسجين والطاقة من خلايا الوقود. كانت المشكلة تفاعلاً بين التصميم والتغيير الهندسي والاختبار.'
        : 'Wiring and insulation inside an oxygen tank were damaged by overheating during ground testing. The tank later failed in flight, causing oxygen loss and fuel-cell power loss. The review identified interacting design, configuration, and test-process failures.',
      insight: ar
        ? 'درس التصميم: تتبع تغييرات التهيئة، وهوامش درجات الحرارة والجهد، واعزل أعطال أنظمة الأكسجين والطاقة. لا نعامل انفجار الخزان كقياس لانتشار حريق المقصورة.'
        : 'Design lesson: maintain configuration control, temperature and voltage margins, and fault isolation for oxygen and power systems. Do not treat the tank failure as a cabin-fire propagation measurement.',
      url: 'https://sma.nasa.gov/sma-disciplines/accllp/apollo-13',
      label: 'NASA Apollo 13 accident record',
    },
    {
      title: 'Mir · Solid-fuel oxygen generator fire, 1997',
      tag: ar ? 'حريق على متن محطة · استجابة الطاقم والدخان' : 'ON-ORBIT FIRE · CREW RESPONSE & SMOKE',
      facts: ar
        ? 'اشتعل مولد أكسجين كيميائي صلب أثناء وجود ستة أفراد. أنتج لهباً وشرراً ودخاناً كثيفاً وسدّ مساراً إلى مركبة هروب. أخمد الطاقم الحريق بطفايات؛ ثم احتاجت أنظمة دعم الحياة ساعات لإزالة الدخان. رجّح التحقيق دخول مادة هيدروكربونية إلى العبوة.'
        : 'A solid-fuel oxygen generator ignited with six crew aboard, producing flame, sparks, and dense smoke that blocked an escape route. The crew used extinguishers; life support took hours to clear the smoke. Investigators later considered hydrocarbon contamination of the canister the likely cause.',
      insight: ar
        ? 'درس التصميم: قيّم مولدات الأكسجين كمصدر اشتعال مستقل، خطط للمسارات البديلة، واجمع بين التدريب والإطفاء وكشف الدخان وتنقيته. هذا حادث تشغيلي وليس تجربة احتراق مضبوطة.'
        : 'Design lesson: treat oxygen-generation hardware as a potential ignition source, protect alternate egress, and combine training, suppression, smoke detection, and cleanup. This is an operational incident, not a controlled combustion experiment.',
      url: 'https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/',
      label: 'NASA Mir fire history',
    },
  ];
  const transfers = [
    {
      title: ar ? 'كشف الحريق المبكر' : 'Incipient-fire detection',
      facts: ar
        ? 'يعرض مورد NASA Spinoff كاشفاً لمكوك الفضاء يرصد جسيمات الاحتراق ويميّزها عن الغبار، وقد صُمم للتنبيه قبل ظهور لهب أو دخان واضح.'
        : 'The NASA Spinoff resource describes a Shuttle detector that samples combustion particles and distinguishes them from dust, aiming to signal a fire condition before visible flame or smoke.',
      use: ar
        ? 'فرصة بحث: اختبر زمن الاستجابة والإنذارات الكاذبة مع أنواع الدخان والهباء ومسارات التهوية المناسبة للمركبات المأهولة.'
        : 'Research opportunity: test response time and false alarms across smoke/aerosol types and ventilation paths relevant to crewed vehicles.',
      url: 'https://spinoff.nasa.gov/node/9407',
      label: 'NASA Spinoff · Fire Detector',
    },
    {
      title: ar ? 'معدات تنفس أخف' : 'Lighter firefighter air tanks',
      facts: ar
        ? 'يوثق المورد تعاوناً لنقل تصميم أسطوانة مركبة أخف مع قناع أوضح ومنبه شخصي لانخفاض الهواء إلى معدات رجال الإطفاء.'
        : 'The resource documents transfer of a lighter composite air-tank design, improved mask visibility, and a personal low-air warning to firefighter equipment.',
      use: ar
        ? 'صلة المشروع: قابلية الحركة والإنذار والاحتياطي عناصر في تجهيز الطاقم؛ هذا المثال لا يبرر تغيير خليط أكسجين المقصورة.'
        : 'Project relevance: mobility, alerts, and reserve capacity matter to crew equipment; this example does not justify changing cabin oxygen composition.',
      url: 'https://spinoff.nasa.gov/node/9582',
      label: "NASA Spinoff · Fireman's Air Tanks",
    },
    {
      title: ar ? 'مواد ملابس واقية' : 'Protective clothing materials',
      facts: ar
        ? 'يصف Project FIRES تكييف مواد وتصاميم خفيفة ومقاومة للحرارة طُورت لبدلات الفضاء أو الحماية الحرارية إلى ملابس رجال الإطفاء.'
        : 'Project FIRES adapted lightweight, heat-protective materials and design concepts from spacesuits and spacecraft thermal protection for firefighter ensembles.',
      use: ar
        ? 'صلة المشروع: نقل التقنية يحتاج اختبارات أداء وراحة وسلامة مستقلة؛ نجاح مادة في الملابس لا يجعلها تلقائياً مناسبة لمقصورة أو بدلة فضاء.'
        : 'Project relevance: technology transfer still requires independent performance, comfort, and safety testing; a material suitable for clothing is not automatically suitable for a spacecraft cabin or suit.',
      url: 'https://spinoff.nasa.gov/node/9918',
      label: 'NASA Spinoff · New Technology for the Fire Attire',
    },
  ];
  const card = (item) =>
    `<article class="card"><div class="card-head"><h3>${item.title}</h3><span class="tag">${item.tag || (ar ? 'نقل تقنية · ليس قياس احتراق' : 'TECH TRANSFER · NOT COMBUSTION DATA')}</span></div><p>${item.facts}</p><div class="callout">${item.insight || item.use}</div><a href="${item.url}" target="_blank" rel="noreferrer">${item.label} ↗</a></article>`;
  return `${pageHead(ar ? 'دروس سلامة المهمات' : 'Mission Safety Lessons', ar ? 'تحليل موارد ناسا التي أرفقها التحدي: حوادث فضائية ونقل تقنية، مع فصلها عن بيانات التجارب.' : 'Analyze the NASA incident histories and technology-transfer resources supplied with the challenge, separately from experiment data.')}<div class="callout warn"><b>${ar ? 'حدود الدليل:' : 'Evidence boundary:'}</b> ${ar ? 'هذه السجلات تشرح أنماط الخطر والاستجابة ونقل التقنية. لا تضيف قياسات إلى قاعدة NASA PSI ولا تثبت أثراً سببياً في الجاذبية الصغرى.' : 'These records describe hazards, response, and technology transfer. They add no measurements to the NASA PSI dataset and do not establish causal effects in microgravity.'}</div><article class="card" style="margin-top:14px"><h2>${ar ? 'كيف نحافظ على سلامة الاستنتاج العلمي؟' : 'How we keep safety conclusions scientifically bounded'}</h2><p class="sub">${ar ? 'نُظهر نوع الدليل قبل تحويله إلى سؤال تصميم؛ السياق التاريخي والمعادلة التوضيحية لا يصبحان تجربة ناسا.' : 'We identify the kind of evidence before turning it into a design question; historical context and illustrative equations do not become NASA experiments.'}</p><div class="grid two"><div><span class="tag obs">${ar ? 'قياس منشور' : 'REPORTED MEASUREMENT'}</span><p>${ar ? 'نربط قيمة التجربة بسجل NASA PSI وظروفها ووحداتها، ونبقي التحقيقات غير المتوافقة منفصلة.' : 'Link a test value to its NASA PSI record, conditions, and units; keep incompatible investigations separate.'}</p></div><div><span class="tag comp">${ar ? 'حساب مشتق' : 'DERIVED CALCULATION'}</span><p>${ar ? 'نذكر المدخلات والمعادلة والوحدات؛ مثال ضغط الأكسجين الجاف ليس قياساً فسيولوجياً أو حدّ اشتعال.' : 'Show inputs, formula, and units; dry-gas oxygen partial pressure is not a physiological measurement or an ignition limit.'}</p></div><div><span class="tag">${ar ? 'تفسير فيزيائي' : 'PHYSICAL INTERPRETATION'}</span><p>${ar ? 'نشرح الآلية المحتملة مع إبقاء التفسير منفصلاً عن القياسات والنتائج المحسوبة.' : 'Explain a possible mechanism while keeping interpretation separate from measurements and computed results.'}</p></div><div><span class="tag">${ar ? 'فجوة بحثية' : 'OPEN RESEARCH GAP'}</span><p>${ar ? 'لا تعرض بيانات PSI الحالية احتراقاً عند جاذبية القمر أو المريخ؛ نعرض ذلك كفجوة لا كتنبؤ.' : 'The current PSI inventory does not provide lunar- or Martian-gravity combustion tests; we show this as a gap, not a prediction.'}</p></div></div><div class="callout warn">${ar ? 'درجة صلة التحقيق بالمهمة تساعد على الاستكشاف فقط؛ ليست احتمال حريق أو ترتيب خطورة.' : 'Mission-relevance scores help users explore records; they are not fire probabilities or hazard rankings.'}</div><p><a href="https://psi.nasa.gov/physci/repo/search?q=combustion" target="_blank" rel="noreferrer">NASA PSI Combustion Science ↗</a> · <a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" target="_blank" rel="noreferrer">NASA OCHMO-TB-003 ↗</a> · <a href="https://ntrs.nasa.gov/citations/20260001966" target="_blank" rel="noreferrer">NASA NTRS lunar/Martian flammability reference ↗</a></p></article><h2 style="margin:22px 0 12px">${ar ? 'حوادث موثقة من ناسا' : 'NASA incident records'}</h2><div class="grid three">${incidents.map(card).join('')}</div><h2 style="margin:22px 0 12px">${ar ? 'أمثلة نقل التقنية' : 'Technology-transfer examples'}</h2><div class="grid three">${transfers.map(card).join('')}</div><article class="card" style="margin-top:15px"><h2>${ar ? 'كيف تتحول إلى أسئلة تصميم قابلة للاختبار؟' : 'Turn lessons into testable design questions'}</h2><ol>${(ar ? ['هل اختُبرت المواد والمكونات عند ضغط الأكسجين والضغط الكلي وتدفق الهواء المقصود؟', 'هل تكشف الحساسات نواتج الاحتراق المبكر وتفصلها عن الغبار والإنذارات الكاذبة؟', 'هل يبقى مسار هروب بديل متاحاً مع دخان كثيف أو عطل في مولد الأكسجين؟', 'هل اختُبرت إجراءات العزل والإطفاء وتصفية الجو مع الطاقم والأجهزة الفعلية؟'] : ['Were materials and components tested at the intended oxygen partial pressure, total pressure, and airflow?', 'Can detectors identify early combustion products while rejecting dust and nuisance alarms?', 'Does an alternate egress route remain available during dense smoke or oxygen-generator failure?', 'Were isolation, suppression, and atmosphere-cleanup procedures tested with representative crew and hardware?']).map((x) => `<li>${x}</li>`).join('')}</ol><p class="sub">${ar ? 'هذه أسئلة بحث وتأهيل وليست إعدادات تشغيلية أو توصيات معتمدة للمركبات.' : 'These are research and qualification questions, not operational settings or certified spacecraft recommendations.'}</p></article>`;
}
async function sourcesPage() {
  const evidence = await get('/api/challenge/catalog');
  const ar = lang === 'ar';
  const challengeResources = [
    [
      'NASA PSI Data Repository · Combustion Science (challenge-specified source)',
      'https://psi.nasa.gov/physci/repo/search?q=combustion',
      'PRIMARY DATA',
    ],
    [
      '2026 Space Apps challenge video · Flame in Freefall',
      'https://www.youtube.com/watch?v=AVuEiKxOpc0',
      'OFFICIAL CHALLENGE VIDEO',
    ],
    [
      'NASA Combustion Science overview',
      'https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/',
      'CONTEXT',
    ],
    [
      'NASA ACME · candle-flame morphology in microgravity (visual context)',
      'https://science.nasa.gov/image-detail/candle-flames-3/',
      'VISUAL CONTEXT',
    ],
    ['NASA ScienceCasts · combustion on the ISS (2018)', 'https://www.youtube.com/watch?v=W1oXykoz9zg', 'VIDEO'],
    [
      "NASA Researcher's Guide to ISS Combustion Science",
      'https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/',
      'CONTEXT',
    ],
    ['Apollo 1 investigation and lessons', 'https://sma.nasa.gov/sma-disciplines/accllp/apollo-1', 'INCIDENT HISTORY'],
    [
      'Apollo 13 oxygen-tank investigation',
      'https://sma.nasa.gov/sma-disciplines/accllp/apollo-13',
      'INCIDENT HISTORY',
    ],
    [
      'Fire aboard Mir (1997)',
      'https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/',
      'INCIDENT HISTORY',
    ],
    ["NASA Spinoff · Fireman's air tanks", 'https://spinoff.nasa.gov/node/9582', 'TECHNOLOGY TRANSFER'],
    ['NASA Spinoff · Shuttle fire detector', 'https://spinoff.nasa.gov/node/9407', 'TECHNOLOGY TRANSFER'],
    ['NASA Spinoff · Firefighter attire', 'https://spinoff.nasa.gov/node/9918', 'TECHNOLOGY TRANSFER'],
  ];
  const categoryArabic = {
    'PRIMARY DATA': 'بيانات أساسية',
    CONTEXT: 'سياق علمي',
    'VISUAL CONTEXT': 'سياق بصري علمي',
    VIDEO: 'فيديو',
    'OFFICIAL CHALLENGE VIDEO': 'فيديو التحدي الرسمي',
    'INCIDENT HISTORY': 'حوادث تاريخية',
    'TECHNOLOGY TRANSFER': 'نقل التقنية',
  };
  return `${pageHead(t('Sources & Methods', 'المصادر والمنهجية'), t('Challenge data, background explanations, the official challenge video, and the separate NASA ScienceCasts video.', 'بيانات التحدي والمراجع العلمية وفيديو التحدي الرسمي وفيديو NASA ScienceCasts المنفصل.'))}
    <article class="card"><h3>${t('Primary experimental evidence · NASA Physical Sciences Informatics', 'بيانات التجارب الأساسية · NASA Physical Sciences Informatics')}</h3>
    <p class="sub">${t('The official challenge names NASA PSI Combustion Science as its data source. PSI is the challenge-specified evidence source. Separate NASA studies supplement the two missing plots and are listed below. The 24-record PSI index and file metadata are shown in Challenge Evidence. Sixteen original tables are bundled and linked to their NASA records; DOI and rights information are shown only when available. Eight manifest lookups returned no listing in this snapshot. PSI does not provide one harmonized cross-study experiment table.', 'يحدد التحدي الرسمي مستودع NASA PSI Combustion Science مصدراً للبيانات، وهو مصدر الأدلة المحدد للتحدي. أضفنا أدناه دراسات NASA إضافية للمخططين مع فصلها بوضوح عن بيانات التحدي. يعرض قسم أدلة التحدي فهرس PSI ذي السجلات الـ24 وبيانات الملفات المتاحة. أرفقنا 16 جدولاً أصلياً وربطناها بسجلات NASA؛ لا نعرض DOI أو حقوقاً إلا عند توفرها. لم تُرجع ثمانية استعلامات عن الفهارس قائمة ملفات في هذه اللقطة. لا يقدم PSI جدولاً موحداً صالحاً لدمج كل الدراسات.')}</p>
    <div class="table-wrap"><table><thead><tr><th>${t('Investigation', 'الدراسة')}</th><th>${t('Rows', 'الصفوف')}</th><th>DOI</th><th>${t('License', 'الترخيص')}</th><th>${t('Integrity', 'سلامة الملف')}</th><th>${t('Source record', 'سجل المصدر')}</th></tr></thead><tbody>${evidence.investigations.map((s) => `<tr><td><b>${esc(s.id)} · ${esc(s.title)}</b></td><td>${s.rowCount}</td><td class="mono">${esc(s.doi || '—')}</td><td>${esc(s.license)}</td><td>${esc(s.sourceIntegrity)}</td><td><a href="${esc(s.sourceUrl)}" target="_blank" rel="noreferrer">NASA PSI ↗</a></td></tr>`).join('')}</tbody></table></div></article>
    <div class="grid two" style="margin-top:15px"><article class="card"><h3>${t('Challenge-provided resources', 'المصادر المرفقة بالتحدي')}</h3><p class="sub">${t('PSI is the measurement source. The other resources provide context, incident history, or technology-transfer examples; they are not additional experiment datasets.', 'PSI هو مصدر القياسات. أما بقية المصادر فتقدم سياقاً علمياً أو تاريخ الحوادث أو أمثلة لنقل التقنية؛ وليست مجموعات إضافية لبيانات التجارب.')}</p>
    ${challengeResources.map(([label, url, kind]) => `<div class="list-row"><span>${esc(label)} <small class="tag">${esc(ar ? categoryArabic[kind] || kind : kind)}</small></span><a href="${esc(url)}" target="_blank" rel="noreferrer">${t('Open ↗', 'فتح ↗')}</a></div>`).join('')}
    <div class="list-row"><span>${t('Official challenge · Flame in Freefall', 'صفحة تحدي Flame in Freefall الرسمية')}</span><a href="https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources" target="_blank" rel="noreferrer">${t('Open ↗', 'فتح ↗')}</a></div>
    <div class="list-row"><span>${t('PSI filtered API · investigation metadata refresh', 'واجهة PSI المفلترة · تحديث بيانات التحقيقات')} <small class="tag">${t('METADATA API', 'واجهة بيانات وصفية')}</small></span><a href="https://psi.nasa.gov/geode-py/ws/repo/search?source=psi&type=investigation&size=100&sort=Accession&order=asc&ffield=Research+Area&fvalue=combustion+science" target="_blank" rel="noreferrer">${t('API ↗', 'واجهة API ↗')}</a></div>
    <div class="list-row"><span>${t('NASA NTRS API docs · reference discovery; figures digitized separately, no raw dataset ingested', 'توثيق NASA NTRS API · اكتشاف المراجع؛ رُقمنت الأشكال بشكل منفصل ولم يُستورد جدول خام')}</span><a href="https://ntrs.nasa.gov/api/openapi/" target="_blank" rel="noreferrer">${t('API docs ↗', 'توثيق API ↗')}</a></div>
    <div class="list-row"><span>NASA OCHMO-TB-003 · Habitable Atmosphere</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" target="_blank" rel="noreferrer">${t('Open ↗', 'فتح ↗')}</a></div><div class="list-row"><span>NASA OCHMO-TB-008 · Fire Protection</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">${t('Open ↗', 'فتح ↗')}</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 · crew atmosphere constraints</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${t('Open ↗', 'فتح ↗')}</a></div><div class="list-row"><span>NASA 2026 · exploration atmosphere concept</span><a href="https://ntrs.nasa.gov/citations/20260001966" target="_blank" rel="noreferrer">NASA NTRS ↗</a></div></article>
    <article class="card"><h3>${t('Additional NASA research sources', 'مصادر NASA البحثية الإضافية')}</h3><p class="sub">${t('Supplementary NASA experiments and reports used in the two added plots. Figure-digitized points are identified as approximate; simulation is separated from measured evidence.', 'تجارب وتقارير NASA الإضافية المستخدمة في المخططين. نوضح أن النقاط المستخرجة من الأشكال تقريبية، ونفصل المحاكاة عن القياس التجريبي.')}</p>${EXTERNAL_NASA_SOURCES.map((source) => `<div class="list-row"><span><b>${esc(source.title)}</b><small>${esc(source.date)} · ${esc(source.method)}<br>${t('Use:', 'الاستخدام:')} ${esc(source.use)}<br>${t('Limit:', 'القيد:')} ${esc(source.limit)}</small></span><a href="${esc(source.url)}" target="_blank" rel="noreferrer">NASA ↗</a></div>`).join('')}</article><article class="card"><h3>${t('Services, provenance, and boundaries', 'الخدمات والمصدر وحدود البيانات')}</h3><p class="sub">${t('The PSI investigation-search and file-manifest endpoints refresh metadata; listing files does not download the multi-terabyte archive. The app serves a local inventory snapshot and checksummed files. NASA NTRS is linked for selected references, not harvested as an experiment dataset. Gemini is optional generated explanation, never experimental evidence.', 'تُستخدم واجهتا البحث والفهرسة لدى PSI لتحديث البيانات الوصفية؛ فهرسة الملفات لا تعني تنزيل الأرشيف الذي يتجاوز عدة تيرابايت. يعرض التطبيق لقطة محلية وملفات متحققاً من بصمتها. أُدرج NASA NTRS كمصدر لمراجع مختارة ولم يُستورد كبيانات تجارب. Gemini اختياري لشرح مولّد ولا يعد دليلاً تجريبياً.')}</p><div class="list-row"><span>OBSERVED</span><b>${t('Values directly reported by NASA PSI.', 'قيم مذكورة مباشرة في NASA PSI.')}</b></div><div class="list-row"><span>COMPUTED</span><b>${t('Deterministic arithmetic or summaries with stated inputs.', 'حسابات أو ملخصات حتمية بمدخلات معلنة.')}</b></div><div class="list-row"><span>INTERPRETATION</span><b>${t('Scientific explanation linked to references.', 'تفسير علمي مرتبط بمراجع.')}</b></div><div class="list-row"><span>HYPOTHESIS</span><b>${t('A question that needs experiments or validation.', 'سؤال يحتاج تجارب أو تحققاً.')}</b></div><div class="callout warn">${t('Earth-fire hotspots, NOAA space weather, solar-event feeds, and unrelated challenge data from the earlier prototype are excluded from active research.', 'استُبعدت حرائق الأرض وبيانات طقس الفضاء والأحداث الشمسية وبيانات التحديات الأخرى من البحث الحالي.')}</div><a href="../docs/CHALLENGE_BRIEF_AND_VIDEO.md">${t('Read the challenge and video review ↗', 'اقرأ مراجعة التحدي والفيديو ↗')}</a></article></div>`;
}
function reports() {
  return `${pageHead(t('Scientific Reports Center', 'مركز التقارير العلمية'), t('Export reproducible source rows, analysis results, or a printable report.', 'صدّر صفوف المصدر ونتائج التحليل أو تقريراً قابلاً للطباعة.'))}<div class="grid three"><article class="card"><div class="eyebrow">${t('DATA', 'البيانات')}</div><h3 style="margin:10px 0">${t('Source table', 'جدول المصدر')}</h3><p class="sub">${t('Observed rows and field names from NASA PSI-69.', 'صفوف مرصودة وأسماء حقول من NASA PSI-69.')}</p><button class="outline-btn" id="downloadCsv">${t('Download CSV', 'تنزيل CSV')}</button></article><article class="card"><div class="eyebrow">${t('REPRODUCIBILITY', 'قابلية الإعادة')}</div><h3 style="margin:10px 0">${t('Analysis package', 'حزمة التحليل')}</h3><p class="sub">${t('JSON with source metadata, summary statistics, validation, and limitations.', 'ملف JSON يحوي بيانات المصدر والإحصاءات والتحقق والقيود.')}</p><button class="outline-btn" id="downloadJson">${t('Download JSON', 'تنزيل JSON')}</button></article><article class="card"><div class="eyebrow">${t('PRESENTATION', 'العرض')}</div><h3 style="margin:10px 0">${t('Scientific summary', 'ملخص علمي')}</h3><p class="sub">${t('Open a printable report and use Save as PDF in your browser.', 'افتح تقريراً قابلاً للطباعة واختر الحفظ بصيغة PDF من المتصفح.')}</p><button class="outline-btn" id="printReport">${t('Print / Save PDF', 'طباعة / حفظ PDF')}</button></article></div><div class="callout" style="margin-top:15px">${t('Exports preserve evidence labels and include DOI, units, methods, and limitations. AI interpretation is not an experimentally verified result.', 'تحافظ الملفات المصدّرة على تصنيفات الأدلة وتشمل DOI والوحدات والطرق والقيود. تفسير الذكاء الاصطناعي ليس نتيجة تجريبية متحققاً منها.')}</div>`;
}
function challengeGuidePage() {
  const ar = lang === 'ar';
  const h = (en, arabic) => ar ? arabic : en;
  return `${pageHead(h('Flame in Freefall · Science Guide','النار في السقوط الحر · الدليل العلمي'),h('A visual introduction to combustion in microgravity, NASA evidence, and spacecraft fire-safety questions.','مقدمة بصرية عن الاحتراق في الجاذبية الصغرى وأدلة ناسا وأسئلة سلامة الحريق الفضائي.'))}
  <section class="grid two guide-grid"><article class="card"><span class="eyebrow">01 · COMBUSTION BASICS</span><h2>${h('A fire needs three things','يحتاج الحريق إلى ثلاثة عناصر')}</h2><svg viewBox="0 0 520 280" role="img" aria-label="Combustion triangle: heat, fuel, oxidizer" class="science-diagram"><path d="M260 36 465 238H55Z" fill="none" stroke="#48c8e8" stroke-width="4"/><circle cx="260" cy="54" r="35" fill="#153b58"/><circle cx="82" cy="218" r="35" fill="#522f26"/><circle cx="438" cy="218" r="35" fill="#193e44"/><text x="260" y="60" text-anchor="middle">HEAT</text><text x="82" y="224" text-anchor="middle">FUEL</text><text x="438" y="224" text-anchor="middle">O₂</text><path d="M260 100v54m-18-18 18 18 18-18" stroke="#f3b95f" stroke-width="4" fill="none"/></svg><p class="sub">${h('Combustion depends on fuel, an oxidizer, and enough energy to sustain chemical reactions. Spacecraft design must also consider pressure, ventilation, materials, detection, and crew response.','يعتمد الاحتراق على الوقود والمؤكسد وطاقة تكفي لاستمرار التفاعل. ويتطلب تصميم المركبات أيضًا مراعاة الضغط والتهوية والمواد والكشف واستجابة الطاقم.')}</p></article>
  <article class="card"><span class="eyebrow">02 · GRAVITY CHANGES FLOW</span><h2>${h('Why flames look different in orbit','لماذا يتغير شكل اللهب في المدار؟')}</h2><svg viewBox="0 0 520 280" role="img" aria-label="Illustration comparing buoyant Earth flame and round microgravity flame" class="science-diagram"><path d="M30 230H245M275 230H490" stroke="#9ab2c5" stroke-width="3"/><path d="M130 226C78 190 100 130 129 72c30 58 52 118 1 154Z" fill="#ff9b47"/><path d="M129 219c-17-34-8-72 1-105 13 36 22 74-1 105Z" fill="#fff0ae"/><circle cx="382" cy="153" r="72" fill="url(#microflame)"/><defs><radialGradient id="microflame"><stop stop-color="#fff3b2"/><stop offset=".48" stop-color="#ffac50"/><stop offset=".82" stop-color="#d65a9e" stop-opacity=".72"/><stop offset="1" stop-color="#55cae9" stop-opacity=".05"/></radialGradient></defs><text x="130" y="260" text-anchor="middle">1 g · BUOYANCY</text><text x="382" y="260" text-anchor="middle">MICROGRAVITY · DIFFUSION</text></svg><p class="sub">${h('On Earth, hot gases rise and buoyant flow stretches a flame. In microgravity, buoyancy weakens; diffusion and imposed airflow shape transport more strongly. The diagram is explanatory, not measured imagery.','على الأرض تصعد الغازات الساخنة ويمد الحمل الطفوّي اللهب. في الجاذبية الصغرى يضعف الطفو، ويصبح الانتشار وتدفق الهواء المفروض أهم في نقل المواد. الرسم توضيحي وليس صورة قياس.')}</p></article></section>
  <section class="grid two guide-grid"><article class="card"><span class="eyebrow">03 · READ THE EVIDENCE</span><h2>${h('Measurements are not all interchangeable','ليست كل القياسات قابلة للدمج')}</h2><p>${h('NASA PSI hosts separate investigations: liquid droplets, solid materials, spacecraft fire experiments, and smoke/aerosol studies. Each has different methods and fields. MORS AEGIS keeps studies separate and labels observed source values, computed summaries, and illustrations.', 'يضم NASA PSI تحقيقات منفصلة: قطرات سائلة ومواد صلبة وتجارب حرائق مركبات وقياس دخان وهباء. تختلف الطرق والحقول بين الدراسات، لذلك يفصلها MORS AEGIS ويصنف قيم المصدر والملخصات والرسوم التوضيحية بوضوح.')}</p><div class="callout warn">${h('A PSI-69 droplet burning-rate constant is not the same as solid-material flame-spread speed, and descriptive association does not prove causation.','ثابت معدل احتراق القطرة في PSI-69 ليس سرعة انتشار اللهب على مادة صلبة، والارتباط الوصفي لا يثبت السببية.')}</div><button class="outline-btn" data-go="Challenge Evidence">${h('Open the source tables →','افتح جداول المصدر ←')}</button></article>
  <article class="card"><span class="eyebrow">04 · NASA VISUAL EXPLANATION</span><h2>${h('Combustion research on the ISS','أبحاث الاحتراق على المحطة الدولية')}</h2><div class="guide-video"><iframe src="https://www.youtube-nocookie.com/embed/W1oXykoz9zg" title="NASA ScienceCasts: combustion research on the ISS" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><p class="sub">${h('NASA ScienceCasts · background explanation, not an experimental data source. If the embed is unavailable, open the NASA video directly.','NASA ScienceCasts · شرح سياقي وليس مصدر بيانات تجريبية. إذا تعذر تشغيل المشغل افتح فيديو ناسا مباشرة.')}</p><a href="https://www.youtube.com/watch?v=W1oXykoz9zg" target="_blank" rel="noreferrer">${h('Open the NASA video ↗','افتح فيديو ناسا ↗')}</a></article></section>
  <article class="card guide-sources"><span class="eyebrow">05 · FOLLOW THE SOURCES</span><h2>${h('Explore, compare, and ask the AI','استكشف وقارن واسأل مساعد AI')}</h2><p>${h('Start with the published challenge dataset, inspect its source rows, then use the interactive labs to explore how experimental conditions relate. AI explanations stay separate from calculated results and cite the source record.', 'ابدأ ببيانات التحدي المنشورة وافحص صفوف المصدر، ثم استخدم المختبرات التفاعلية لاستكشاف علاقة ظروف التجربة. تبقى تفسيرات AI منفصلة عن الحسابات وتذكر سجل المصدر.')}</p><div class="hero-actions"><button class="primary-btn" data-go="AI Copilot">${h('Ask the research copilot →','اسأل مساعد البحث ←')}</button><button class="outline-btn" data-go="Sources">${h('View all sources →','اعرض كل المصادر ←')}</button></div><p class="sub">NASA PSI Combustion Science · <a href="https://psi.nasa.gov/physci/repo/search?q=combustion" target="_blank" rel="noreferrer">Official investigation index ↗</a></p></article>`;
}
async function health() {
  const h = await get('/api/health');
  $('#dataMode').textContent = t('NASA PSI challenge evidence · offline-ready', 'أدلة تحدي NASA PSI · متاحة دون اتصال');
  return h;
}
function settings() {
  return `${pageHead(t('Settings & Theme Manager', 'الإعدادات والمظهر'), t('Appearance and language preferences are saved in this browser.', 'تُحفظ إعدادات المظهر واللغة في هذا المتصفح.'))}<div class="grid two"><article class="card"><h3>${t('Visual theme', 'المظهر')}</h3><p class="sub">${t('Three MORS themes preserve the same evidence labels and reading order.', 'ثيمات MORS الثلاثة تحافظ على تصنيفات الأدلة وترتيب القراءة.')}</p>${[
    ['arctic', 'MORS Arctic', 'Light research surfaces with blue accents'],
    ['space', 'MORS Deep Space', 'Dark navy mission-control palette'],
    ['observatory', 'MORS Observatory', 'Neutral lab surfaces with dark data panels'],
    ['blackhole', 'MORS Black Hole', 'Deep black-hole ambience with cyan accretion light'],
  ]
    .map(
      ([v, n, d]) =>
        `<div class="list-row"><span><b>${n}</b><br><small>${t(d, { 'Light research surfaces with blue accents': 'واجهة بحث فاتحة ولمسات زرقاء', 'Dark navy mission-control palette': 'لوحة داكنة بلون أزرق المهمات', 'Neutral lab surfaces with dark data panels': 'واجهة مختبر محايدة مع ألواح بيانات داكنة', 'Deep black-hole ambience with cyan accretion light': 'أجواء ثقب أسود عميقة مع قرص تراكم سماوي' }[d])}</small></span><button class="outline-btn" data-theme="${v}">${theme === v ? t('Active', 'مفعّل') : t('Apply', 'تطبيق')}</button></div>`,
    )
    .join(
      '',
    )}${accentPickerMarkup('settingsAccent')}</article><article class="card"><h3>${t('Language', 'اللغة')}</h3><p class="sub">${t('The interface supports English and Arabic with right-to-left layout.', 'تدعم الواجهة الإنجليزية والعربية مع تخطيط من اليمين إلى اليسار.')}</p><div class="list-row"><span>English</span><button class="outline-btn" data-lang="en">${lang === 'en' ? t('Active', 'مفعّل') : t('Apply', 'تطبيق')}</button></div><div class="list-row"><span>العربية</span><button class="outline-btn" data-lang="ar">${lang === 'ar' ? 'نشط' : 'تطبيق'}</button></div><div class="callout" style="margin-top:15px">${t('Scientific field names and source values stay in their original form for traceability.', 'تبقى أسماء الحقول العلمية وقيم المصدر بصيغتها الأصلية لتسهيل التتبع.')}</div></article></div>`;
}
const pageMap = {
  Overview: overview,
  'Challenge Guide': challengeGuidePage,
  'Flame Lab': () => renderFlamePhysics(lang) + flameScenarioControlsMarkup(lang),
  'Flame Physics': () => renderFlamePhysics(lang),
  'Mission Lab': () => renderMissionLab(lang),
  'Mission Atmospheres': () => renderMissionAtmospheres(lang),
  'Safety Insights': () => renderSafetyInsights(lang),
  'System Concepts': () => renderSystemConcepts(lang),
  '3D Models': () => renderModelGallery(lang),
  'Mission Lessons': missionLessons,
  'Challenge Evidence': () => renderChallengeLibrary(lang),
  'Investigation Lab': () => renderInvestigationLab(lang),
  'Analysis Workbench': analysisPage,
  'Chart Guide': chartGuidePage,
  'Comparison Studio': comparePage,
  'AI Copilot': copilot,
  Sources: sourcesPage,
  Reports: reports,
  Settings: settings,
};
async function go(name) {
  const id = ++navigationId;
  current = name;
  $('#navSearch').value = '';
  const nextHash = `#${encodeURIComponent(name)}`;
  if (location.hash !== nextHash) location.hash = nextHash;
  renderNav();
  $('#pageTitle').textContent = pageLabel(name);
  $('#crumb').textContent = lang === 'ar' ? `MORS AEGIS / ${pageLabel(name)}` : 'MORS AEGIS / ' + name.toUpperCase();
  $('.evidence-pill').innerHTML = `<i></i> ${t('EVIDENCE FIRST', 'الأدلة أولاً')}`;
  $('#reportBtn').title = t('Export report', 'تصدير التقرير');
  $('#reportBtn').innerHTML = `↗ <span>${t('Export', 'تصدير')}</span>`;
  document.querySelector('footer').innerHTML =
    `<span>${t('© 2026 MORS · NASA PSI COMBUSTION RESEARCH', '© 2026 MORS · أبحاث NASA PSI للاحتراق')}</span><span>${t('Source-linked · Reproducible · Research use only', 'موثّق المصدر · قابل لإعادة الإنتاج · للاستخدام البحثي')}</span>`;
  const c = $('#content');
  c.innerHTML = `<div class="empty">${t('Loading research view…', 'جارٍ تحميل صفحة البحث…')}</div>`;
  try {
    const html = await pageMap[name]();
    if (id !== navigationId) return;
    c.innerHTML = html;
    bindPage();
    if (name === 'Overview' || name === 'Chart Guide') bindFlexScatter(c);
    if (name === 'Chart Guide') {
      const sourceCharts = document.createElement('section');
      sourceCharts.className = 'source-chart-guide-loading';
      sourceCharts.innerHTML = `<div class="empty" role="status">${t('Loading source-table plots…', 'جارٍ تحميل مخططات جداول المصدر…')}</div>`;
      c.append(sourceCharts);
      renderSourceChartGuide(lang)
        .then((markup) => {
          if (id !== navigationId) return;
          sourceCharts.outerHTML = markup;
          bindInteractiveCharts(c);
        })
        .catch((error) => {
          if (id !== navigationId) return;
          sourceCharts.innerHTML = `<div class="callout warn">${t('Source-table plots could not load:', 'تعذر تحميل مخططات جداول المصدر:')} ${esc(error.message)}</div>`;
        });
    }
    if (name === 'Challenge Evidence') bindChallengeLibrary(c, lang);
    if (name === 'Safety Insights') bindSafetyInsightCharts(c, lang);
    if (name === 'Investigation Lab') bindInvestigationLab(c, lang);
    if (name === 'Flame Physics' || name === 'Flame Lab') bindFlameScene3d(c, lang);
    if (name === 'Flame Lab') bindFlameScenarioControls(c, lang);
    if (name === 'Analysis Workbench') {
      bindMeasurementPlotStudio(c, dataset.rows, lang);
      bindFlex3DPlot(c, dataset.rows, lang);
    }
    if (name === 'Mission Lab') bindMissionLab(c, lang);
    if (name === 'System Concepts') bindSystemConcepts(c, lang);
    if (name === '3D Models') bindModelGallery(c, lang);
    if (name === 'Comparison Studio') renderCompare();
    if (name === 'AI Copilot') {
      const health = await get('/api/health');
      if (id === navigationId) {
        const ai = health.ai || {};
        $('#copilotMode').textContent = ai.provider === 'ollama'
          ? `LOCAL AI · ${ai.model || 'OLLAMA'} · TAILSCALE`
          : ai.provider === 'gemini' || health.credentials?.gemini
            ? 'GEMINI CONFIGURED · CHECKED PER REPLY'
            : 'LOCAL EVIDENCE MODE';
      }
    }
  } catch (e) {
    if (id === navigationId)
      c.innerHTML = `<div class="callout warn">View could not be loaded: ${esc(e.message)}</div>`;
  }
}
function persistChat() {
  try {
    storageSet('mors-chat-v1', JSON.stringify(chatThread.slice(-60)));
  } catch {
    toast('Local chat history could not be saved in this browser.');
  }
}
function addChatMessage(log, message) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${message.role}`;
  const meta = document.createElement('div');
  meta.className = 'bubble-meta';
  meta.textContent =
    message.role === 'user' ? (lang === 'ar' ? 'أنت' : 'YOU') : message.provider || 'AEGIS · LOCAL EVIDENCE';
  const body = document.createElement('div');
  body.className = 'bubble-body';
  body.textContent = message.content;
  bubble.append(meta, body);
  if (message.role === 'assistant') {
    if (Array.isArray(message.toolsExecuted) && message.toolsExecuted.length) {
      const details = document.createElement('details'),
        summary = document.createElement('summary'),
        pre = document.createElement('pre');
      summary.textContent = lang === 'ar' ? 'أدوات التحليل المنفذة' : 'Executed analysis tools';
      pre.textContent = message.toolsExecuted
        .map(
          (item) =>
            `${item.tool}: ${item.status} · ${item.evidence}${item.resultSha256 ? ` · SHA-256 ${item.resultSha256}` : ''}`,
        )
        .join('\n');
      details.append(summary, pre);
      bubble.append(details);
    }
    const cite = document.createElement('div');
    cite.className = 'bubble-citation';
    cite.textContent =
      lang === 'ar'
        ? 'المصدر: NASA PSI-69 · DOI 10.60555/mbq8-0451 · '
        : 'Source: NASA PSI-69 · DOI 10.60555/mbq8-0451 · ';
    const link = document.createElement('a');
    link.href = 'https://psi.nasa.gov/physci/repo/data/investigations/PSI-69';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = lang === 'ar' ? 'فتح سجل NASA' : 'Open NASA record';
    cite.append(link);
    bubble.append(cite);
  }
  log.append(bubble);
}
function renderChat() {
  const log = $('#chatLog');
  if (!log) return;
  log.replaceChildren();
  if (!chatThread.length) {
    addChatMessage(log, {
      role: 'assistant',
      provider: lang === 'ar' ? 'مساعد الأبحاث' : 'AEGIS · RESEARCH ASSISTANT',
      content:
        lang === 'ar'
          ? 'مرحبًا. اسأل عن قياسات FLEX أو طرق الحساب أو حدود الأدلة. سأوضح إن كانت الإجابة قياساً مرصوداً أم حساباً وصفياً، وسأذكر عندما لا تكفي البيانات للإجابة.'
          : 'Hello. Ask about FLEX measurements, calculations, or evidence limits. I will distinguish observations from computed summaries and flag questions this table cannot answer.',
    });
  } else chatThread.forEach((message) => addChatMessage(log, message));
  log.scrollTop = log.scrollHeight;
}
async function submitChat(event) {
  event.preventDefault();
  if (chatBusy) return;
  const input = $('#question'),
    question = input.value.trim();
  if (!question) return;
  const history = chatThread.slice(-8).map(({ role, content }) => ({ role, content }));
  chatThread.push({ role: 'user', content: question });
  persistChat();
  renderChat();
  input.value = '';
  chatBusy = true;
  $('#chatTyping').hidden = false;
  $('#chatSend').disabled = true;
  try {
    const result = await post('/api/copilot', { question, history });
    const provider =
      result.status === 'live'
        ? `${result.provider || 'AI INTERPRETATION'} · ${result.model || ''}${result.verifiedAnswer ? ' · QUALITATIVE NOTE' : ''}`
        : (result.provider || 'DETERMINISTIC LOCAL SUMMARY').toUpperCase();
    chatThread.push({
      role: 'assistant',
      content: result.verifiedAnswer
        ? `${result.verifiedAnswer}\n\n${lang === 'ar' ? 'تفسير نوعي مولّد بالذكاء الاصطناعي (ليس قياسًا):' : 'AI qualitative interpretation (not a measurement):'}\n${result.answer}`
        : result.answer || 'No text was returned. Please try again.',
      provider,
      citation: true,
      toolsExecuted: result.toolsExecuted || [],
    });
  } catch {
    const mean = analysis?.summary?.stats?.burning_rate_mm_s?.mean;
    chatThread.push({
      role: 'assistant',
      provider: 'DETERMINISTIC LOCAL SUMMARY · REQUEST FAILED',
      citation: true,
      content: `The AI request could not be completed. Local evidence: ${dataset?.dataset?.records ?? 0} PSI-69 table rows; computed mean burning rate ${Number.isFinite(mean) ? mean.toFixed(3) + ' mm²/s' : 'not available'}. These pooled records cannot establish causality or represent every FLEX test. Source DOI: 10.60555/mbq8-0451.`,
    });
  } finally {
    chatBusy = false;
    persistChat();
    if ($('#chatTyping')) $('#chatTyping').hidden = true;
    if ($('#chatSend')) $('#chatSend').disabled = false;
    if ($('#chatLog')) {
      renderChat();
      if ($('#question')) $('#question').focus();
    }
  }
}
function bindPage() {
  bindInteractiveCharts(document);
  document.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => go(b.dataset.go)));
  if ($('#compareA')) {
    $('#compareA').onchange = renderCompare;
    $('#compareB').onchange = renderCompare;
  }
  if ($('#chatForm')) {
    renderChat();
    $('#chatForm').onsubmit = submitChat;
    $('#question').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!chatBusy) $('#chatForm').requestSubmit();
      }
    });
    $('#newChat').onclick = () => {
      if (
        chatThread.length &&
        !window.confirm(
          lang === 'ar'
            ? 'بدء محادثة جديدة؟ سيُمسح سجل هذه المحادثة من هذا المتصفح.'
            : 'Start a new chat? This clears this conversation from this browser.',
        )
      )
        return;
      chatThread = [];
      persistChat();
      renderChat();
    };
    document.querySelectorAll('[data-question]').forEach(
      (b) =>
        (b.onclick = () => {
          if (chatBusy) return;
          $('#question').value = b.dataset.question;
          $('#question').focus();
        }),
    );
  }
  for (const [id, key] of [
    ['#wbFuel', 'fuel'],
    ['#wbBand', 'pressureBand'],
    ['#wbDiluent', 'diluent'],
    ['#wbVariable', 'variable'],
  ])
    if ($(id))
      $(id).onchange = (e) => {
        wbFilter = { ...wbFilter, [key]: e.target.value };
        go('Analysis Workbench');
      };
  if ($('#wbReset'))
    $('#wbReset').onclick = () => {
      wbFilter = { ...WB_DEFAULT };
      go('Analysis Workbench');
    };
  if ($('#chatLog')) $('#chatLog').scrollTop = $('#chatLog').scrollHeight;
  if ($('#downloadCsv'))
    $('#downloadCsv').onclick = () => download('mors-aegis-psi69-flex.csv', awaitlessCSV(), 'text/csv');
  if ($('#downloadJson'))
    $('#downloadJson').onclick = () =>
      download('mors-aegis-report.json', JSON.stringify(report(), null, 2), 'application/json');
  if ($('#printReport')) $('#printReport').onclick = printSummary;
  if ($('#saveProject'))
    $('#saveProject').onclick = () => {
      const p = {
        name: $('#projectName').value,
        question: $('#projectQuestion').value,
        dataset: 'PSI-69',
        savedAt: new Date().toISOString(),
      };
      storageSet('mors-project', JSON.stringify(p));
      $('#savedProject').innerHTML =
        `<div class="callout good">Saved locally in this browser: <b>${esc(p.name)}</b>. No server storage configured.</div>`;
    };
  document.querySelectorAll('[data-theme]').forEach(
    (b) =>
      (b.onclick = () => {
        theme = b.dataset.theme;
        storageSet('mors-theme', theme);
        setTheme();
        go(current);
      }),
  );
  document.querySelectorAll('[data-lang]').forEach(
    (b) =>
      (b.onclick = () => {
        lang = b.dataset.lang;
        storageSet('mors-lang', lang);
        setTheme();
        $('#langBtn').textContent = lang === 'ar' ? 'English' : 'عربي';
        renderNav();
        go(current);
      }),
  );
  document.querySelectorAll('[data-accent-picker]').forEach((picker) => {
    picker.addEventListener('input', () => {
      const color = normalizeHexColor(picker.value);
      if (!color) return;
      storageSet('mors-custom-accent', color);
      setTheme();
    });
  });
  document.querySelectorAll('[data-accent-reset]').forEach((button) => {
    button.onclick = () => {
      try { window.localStorage.removeItem('mors-custom-accent'); } catch { /* preference storage is optional */ }
      setTheme();
      go(current);
    };
  });
  document.querySelector('[data-welcome-continue]')?.addEventListener('click', () => {
    storageSet('mors-welcome-v21-complete', '1');
    go(current);
  });
}
function awaitlessCSV() {
  const keys = Object.keys(dataset.rows[0]);
  return (
    [keys, ...dataset.rows.map((r) => keys.map((k) => r[k]))].map((row) => row.map(csvCell).join(',')).join('\r\n') +
    '\r\n'
  );
}
function report() {
  return {
    product: 'MORS AEGIS',
    evidence_classification: 'OBSERVED source rows → COMPUTED summary',
    dataset: dataset.dataset,
    rows: dataset.rows,
    analysis: analysis,
    limitations: [
      'Official PSI-69 experimental table; raw imagery and archive assets not included.',
      'Descriptive analysis is not causal inference.',
      'No imagery attached to current data extract.',
    ],
    generatedAt: new Date().toISOString(),
  };
}
function printSummary() {
  const d = report(),
    w = window.open('', '_blank'),
    ar = lang === 'ar';
  if (!w) {
    toast(t('Allow a popup to print the report', 'اسمح بفتح نافذة منبثقة لطباعة التقرير'));
    return;
  }
  w.document.write(
    `<html lang="${ar ? 'ar' : 'en'}" dir="${ar ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><title>${t('MORS AEGIS Scientific Summary', 'MORS AEGIS · ملخص علمي')}</title><style>body{font:14px Arial;margin:40px;color:#123}h1{color:#123}table{border-collapse:collapse}td,th{padding:8px;border:1px solid #abc}small{color:#567}pre{white-space:pre-wrap;direction:ltr;text-align:left}</style></head><body><h1>MORS AEGIS · ${t('FLEX Evidence Summary', 'ملخص أدلة FLEX')}</h1><p>NASA PSI-69 · DOI 10.60555/mbq8-0451 · ${new Date().toISOString()}</p><p>${t('Evidence: observed source-table values and computed descriptive statistics.', 'الأدلة: قيم مرصودة في جدول المصدر وإحصاءات وصفية محسوبة.')}</p><p><b>${t('Scope:', 'النطاق:')}</b> ${t('all tests in the official PSI-69 experimental table; raw imagery and other archive assets are not included.', 'كل الاختبارات في جدول NASA PSI-69 الرسمي؛ الصور الخام وبقية ملفات الأرشيف غير مضمّنة.')}</p>${rowsTable(dataset.rows)}<h2>${t('Computed summary', 'الملخص المحسوب')}</h2><pre>${esc(JSON.stringify(analysis.summary, null, 2))}</pre><h2>${t('Limitations', 'القيود')}</h2><ul>${d.limitations.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><p>${t('Source:', 'المصدر:')} https://psi.nasa.gov/physci/repo/data/investigations/PSI-69</p></body></html>`,
  );
  w.document.close();
  setTimeout(() => {
    w.focus();
    w.print();
  }, 400);
}
$('#reportBtn').onclick = () => go('Reports');
$('#langBtn').textContent = lang === 'ar' ? 'English' : 'عربي';
$('#langBtn').onclick = () => {
  lang = lang === 'en' ? 'ar' : 'en';
  storageSet('mors-lang', lang);
  setTheme();
  renderNav();
  go(current);
};
  $('#themeBtn').onclick = () => {
  theme = { arctic: 'space', space: 'observatory', observatory: 'blackhole', blackhole: 'arctic' }[theme];
  storageSet('mors-theme', theme);
  setTheme();
  go(current);
};
window.addEventListener('hashchange', () => {
  const requested = pageFromHash();
  if (requested !== current) go(requested);
});
setTheme();
let pointerFrame = 0;
window.addEventListener('pointermove', (event) => {
  if (theme !== 'blackhole' || pointerFrame) return;
  pointerFrame = requestAnimationFrame(() => {
    document.body.style.setProperty('--cursor-x', `${event.clientX}px`);
    document.body.style.setProperty('--cursor-y', `${event.clientY}px`);
    pointerFrame = 0;
  });
}, { passive: true });
bindNavigationSearch();
renderNav();
$('#content').innerHTML = `<div class="empty">${t('Loading research view…', 'جارٍ تحميل صفحة البحث…')}</div>`;
(async () => {
  try {
    // Fetch startup data together so a high-latency mobile connection does not
    // spend one full round trip on each request before rendering the interface.
    [dataset, analysis] = await Promise.all([get('/api/datasets/flex'), get('/api/analysis')]);
    // Health status is secondary to rendering the research view.
    health().catch(() => {});
    await go(current);
    document.documentElement.dataset.morsAppReady = 'true';
  } catch (e) {
    $('#content').innerHTML =
      `<div class="callout warn">Backend not ready. Start this application with <code>npm start</code> in its folder. ${esc(e.message)}</div>`;
    document.documentElement.dataset.morsAppReady = 'true';
  }
})();
