import { esc, pageHead } from './dom.js';
import { bindFlameScene3d, flameScene3d } from './flame-scene3d.js';

const copy = {
  en: {
    title: 'Interactive 3D model library',
    intro: 'Explore all MORS system concepts, what each one is for, and the research question it can help investigate.',
    search: 'Search models and descriptions',
    category: 'Filter by category',
    all: 'All categories',
    shown: 'models shown',
    loading: 'Loading model…',
    ready: '3D model ready · drag to rotate · scroll or pinch to zoom',
    unavailable:
      'This browser could not start the 3D viewer. The model description and direct download are still available.',
    failed: 'Model could not be rendered. Use its direct GLB download.',
    purpose: 'What it represents',
    value: 'Why it is useful',
    download: 'Download GLB',
    viewer: 'Interactive 3D view',
    select: 'Select any model below to inspect it.',
    noResults: 'No models match these filters.',
    catalogError: 'The model library could not load. Reload this page to try again.',
    disclaimer:
      'These are research concepts and visual CAD models, not qualified hardware. The condition controls below change a separate explanatory scene; they do not alter the CAD model or predict fire suppression.',
    conditions: 'Illustrative conditions',
    scenarioFor: 'Condition scene for selected concept',
    noMeasured: 'Schematic only · not CFD · not a test result',
  },
  ar: {
    title: 'مكتبة النماذج التفاعلية ثلاثية الأبعاد',
    intro: 'تصفّح جميع مفاهيم أنظمة MORS، والغرض من كل نموذج، والسؤال البحثي الذي قد يساعد في دراسته.',
    search: 'ابحث في النماذج والشروح',
    category: 'تصفية حسب الفئة',
    all: 'كل الفئات',
    shown: 'نموذج معروض',
    loading: 'جارٍ تحميل النموذج…',
    ready: 'النموذج جاهز · اسحب للتدوير · كبّر بالعجلة أو بإصبعين',
    unavailable: 'تعذر تشغيل عارض 3D في هذا المتصفح. يبقى الشرح والتنزيل المباشر متاحين.',
    failed: 'تعذر عرض النموذج. استخدم رابط تنزيل GLB المباشر.',
    purpose: 'ماذا يمثّل',
    value: 'ما فائدته البحثية',
    download: 'تنزيل GLB',
    viewer: 'عرض ثلاثي الأبعاد تفاعلي',
    select: 'اختر أي نموذج أدناه لمعاينته.',
    noResults: 'لا توجد نماذج تطابق عوامل التصفية.',
    catalogError: 'تعذر تحميل مكتبة النماذج. أعد تحميل الصفحة للمحاولة.',
    disclaimer:
      'هذه مفاهيم بحثية ونماذج CAD بصرية وليست معدات مؤهلة. تغيّر خيارات الحالة أدناه مشهداً تفسيرياً منفصلاً؛ ولا تعدّل نموذج CAD ولا تتنبأ بإخماد الحريق.',
    conditions: 'حالات توضيحية',
    scenarioFor: 'مشهد الحالات للمفهوم المحدد',
    noMeasured: 'رسم تخطيطي فقط · ليس CFD · وليس نتيجة اختبار',
  },
};

const escPath = (file) => `/models/${encodeURIComponent(file)}`;
const conceptDiagram = (title, category, ar) => `<figure class="model-function-figure"><svg viewBox="0 0 480 150" role="img" aria-label="${esc(`${title}: conceptual function diagram`)}"><defs><marker id="modelArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0v6l7-3z" fill="currentColor"/></marker></defs><path d="M124 74h58m116 0h58" stroke="currentColor" stroke-width="3" marker-end="url(#modelArrow)" opacity=".8"/><rect x="12" y="39" width="112" height="70" rx="12"/><rect x="182" y="24" width="116" height="100" rx="18"/><rect x="356" y="39" width="112" height="70" rx="12"/><circle cx="240" cy="62" r="16"/><path d="M211 94h58" stroke="currentColor" stroke-width="3" opacity=".7"/><text x="68" y="67" text-anchor="middle">${ar?'ظروف':'INPUT'}</text><text x="68" y="87" text-anchor="middle">${ar?'اختبار':'CONDITION'}</text><text x="240" y="107" text-anchor="middle">${esc(category)}</text><text x="412" y="67" text-anchor="middle">${ar?'قياس':'OBSERVE'}</text><text x="412" y="87" text-anchor="middle">${ar?'دليل':'EVIDENCE'}</text></svg><figcaption>${ar?'مخطط مفاهيمي لوظيفة النموذج':'Conceptual function diagram'} · ${esc(title)} · ${ar?'توضيحي، لا يمثل نتيجة اختبار':'schematic, not a test result'}</figcaption></figure>`;

export async function renderModelGallery(lang = 'en') {
  const ar = lang === 'ar';
  const t = copy[ar ? 'ar' : 'en'];
  let models;
  let descriptions;
  let viewerAvailable = true;
  try {
    const [catalogResponse, descriptionsResponse] = await Promise.all([
      fetch('/models/catalog.json'),
      fetch('/models/descriptions.json'),
    ]);
    if (!catalogResponse.ok || !descriptionsResponse.ok) throw new Error('Model catalogue request failed.');
    [models, descriptions] = await Promise.all([catalogResponse.json(), descriptionsResponse.json()]);
    if (!Array.isArray(models) || models.length === 0 || models.some((model) => !descriptions[model.file]))
      throw new Error('Model catalogue is incomplete.');
  } catch {
    return `${pageHead(t.title, t.catalogError)}<div class="callout warn" role="alert">${t.catalogError}</div>`;
  }
  try {
    await import('/vendor/model-viewer.min.js');
  } catch {
    viewerAvailable = false;
  }

  const categories = [
    ...new Set(models.map((model) => descriptions[model.file][ar ? 'categoryAr' : 'categoryEn'])),
  ].sort();
  const first = models[0];
  const initial = descriptions[first.file];
  const itemCards = models
    .map((model) => {
      const detail = descriptions[model.file];
      const title = model.title.replace(/-/g, ' ');
      const category = detail[ar ? 'categoryAr' : 'categoryEn'];
      const value = detail[ar ? 'valueAr' : 'valueEn'];
      const search = `${title} ${detail.categoryEn} ${detail.categoryAr} ${detail.purposeEn} ${detail.purposeAr} ${detail.valueEn} ${detail.valueAr}`;
      const selected = model.file === first.file;
      return `<button class="model-gallery-item${selected ? ' selected' : ''}" type="button" data-model-file="${esc(model.file)}" data-model-title="${esc(title)}" data-category-en="${esc(detail.categoryEn)}" data-category-ar="${esc(detail.categoryAr)}" data-purpose-en="${esc(detail.purposeEn)}" data-purpose-ar="${esc(detail.purposeAr)}" data-value-en="${esc(detail.valueEn)}" data-value-ar="${esc(detail.valueAr)}" data-search="${esc(search.toLocaleLowerCase())}" data-category="${esc(detail.categoryEn)}" aria-pressed="${selected}"><span class="model-gallery-item-top"><b>${esc(title)}</b><small>${esc(category)}</small></span><span class="model-gallery-item-summary">${esc(value)}</span></button>`;
    })
    .join('');

  return `<div class="model-gallery">
    ${pageHead(t.title, t.intro)}
    <div class="callout model-gallery-boundary">${t.disclaimer}</div>
    <section class="card model-inspector" aria-label="${esc(t.viewer)}">
      <div class="model-inspector-viewer">
        <div class="card-head"><div><h2 id="galleryModelTitle">${esc(first.title.replace(/-/g, ' '))}</h2><p class="sub">${t.viewer}</p></div><span class="concept-badge">${models.length} ${ar ? 'نموذجاً' : 'models'}</span></div>
        <model-viewer id="galleryModelViewer" class="model-viewer" src="${escPath(first.file)}" alt="${esc(first.title)}" camera-controls shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager" reveal="auto"></model-viewer>
        <div class="concept-model-meta"><span id="galleryModelStatus" class="sub" role="status" aria-live="polite">${viewerAvailable ? t.loading : t.unavailable}</span><a id="galleryModelDownload" class="outline-btn" href="${escPath(first.file)}" download>${t.download}</a></div>
      </div>
        <div class="model-inspector-details">
        <div id="galleryModelDiagram">${conceptDiagram(first.title.replace(/-/g, ' '), initial[ar ? 'categoryAr' : 'categoryEn'], ar)}</div>
        <div><span class="eyebrow" id="galleryModelCategory">${esc(initial[ar ? 'categoryAr' : 'categoryEn'])}</span><h3>${t.purpose}</h3><p id="galleryModelPurpose" class="sub">${esc(initial[ar ? 'purposeAr' : 'purposeEn'])}</p></div>
        <div><h3>${t.value}</h3><p id="galleryModelValue" class="sub">${esc(initial[ar ? 'valueAr' : 'valueEn'])}</p></div>
      </div>
    </section>
    <section class="model-scenario-wrap"><div class="model-scenario-heading"><div><span class="eyebrow">${t.conditions}</span><p id="modelScenarioSelection" class="sub">${t.scenarioFor}: ${esc(first.title.replace(/-/g, ' '))}</p></div><span class="concept-badge">${t.noMeasured}</span></div>${flameScene3d(lang)}</section>
    <section class="card model-catalog" aria-label="${esc(t.title)}">
      <div class="card-head"><div><h2>${ar ? 'كل النماذج' : 'Browse every model'}</h2><p id="modelGalleryCount" class="sub">${models.length} ${t.shown}</p></div></div>
      <div class="model-gallery-filters"><label>${t.search}<input id="modelGallerySearch" type="search" autocomplete="off" placeholder="${esc(t.search)}"></label><label>${t.category}<select id="modelGalleryCategory"><option value="">${t.all}</option>${categories.map((category) => `<option value="${esc(descriptions[models.find((item) => descriptions[item.file][ar ? 'categoryAr' : 'categoryEn'] === category).file].categoryEn)}">${esc(category)}</option>`).join('')}</select></label></div>
      <div id="modelGalleryEmpty" class="callout" hidden>${t.noResults}</div>
      <div id="modelGalleryItems" class="model-gallery-grid">${itemCards}</div>
    </section>
  </div>`;
}

export function bindModelGallery(root, lang = 'en') {
  const ar = lang === 'ar';
  const t = copy[ar ? 'ar' : 'en'];
  const viewer = root.querySelector('#galleryModelViewer');
  const status = root.querySelector('#galleryModelStatus');
  const scenarioSelection = root.querySelector('#modelScenarioSelection');
  const download = root.querySelector('#galleryModelDownload');
  const search = root.querySelector('#modelGallerySearch');
  const category = root.querySelector('#modelGalleryCategory');
  const items = [...root.querySelectorAll('.model-gallery-item')];
  const empty = root.querySelector('#modelGalleryEmpty');
  const count = root.querySelector('#modelGalleryCount');

  bindFlameScene3d(root, lang);
  if (!viewer || !items.length) return;

  if (!window.customElements?.get('model-viewer')) {
    if (status) status.textContent = t.unavailable;
  } else {
    viewer.addEventListener('load', () => {
      if (status) status.textContent = t.ready;
    });
    viewer.addEventListener('error', () => {
      if (status) status.textContent = t.failed;
    });
    if (viewer.loaded && status) status.textContent = t.ready;
  }

  const filter = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    const selectedCategory = category?.value || '';
    let visible = 0;
    for (const item of items) {
      const matches =
        (!query || item.dataset.search.includes(query)) &&
        (!selectedCategory || item.dataset.category === selectedCategory);
      item.hidden = !matches;
      if (matches) visible++;
    }
    if (count) count.textContent = `${visible} ${t.shown}`;
    if (empty) empty.hidden = visible > 0;
  };
  search?.addEventListener('input', filter);
  category?.addEventListener('change', filter);

  for (const item of items) {
    item.addEventListener('click', () => {
      const file = item.dataset.modelFile;
      const title = item.dataset.modelTitle || file;
      const path = escPath(file);
      for (const candidate of items) {
        candidate.setAttribute('aria-pressed', candidate === item ? 'true' : 'false');
        candidate.classList.toggle('selected', candidate === item);
      }
      root.querySelector('#galleryModelTitle').textContent = title;
      root.querySelector('#galleryModelCategory').textContent = item.dataset[ar ? 'categoryAr' : 'categoryEn'];
      root.querySelector('#galleryModelPurpose').textContent = item.dataset[ar ? 'purposeAr' : 'purposeEn'];
      root.querySelector('#galleryModelValue').textContent = item.dataset[ar ? 'valueAr' : 'valueEn'];
      root.querySelector('#galleryModelDiagram').innerHTML = conceptDiagram(title, item.dataset[ar ? 'categoryAr' : 'categoryEn'], ar);
      if (scenarioSelection) scenarioSelection.textContent = `${t.scenarioFor}: ${title}`;
      if (download) download.href = path;
      if (viewer && window.customElements?.get('model-viewer')) {
        if (status) status.textContent = t.loading;
        viewer.alt = title;
        viewer.src = path;
      }
    });
  }
}
