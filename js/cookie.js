/* =====================================================
   COOKIE-БАННЕР + ЯНДЕКС МЕТРИКА
   Метрика запускается ТОЛЬКО после нажатия «Принять»
   ===================================================== */
(function () {
  var METRIKA_ID = 113674999;

  // Папка сайта (чтобы ссылки работали и со страниц в подпапках)
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/js\/cookie\.js.*$/, '') : '';

  // ===== 1. ЗАПУСК МЕТРИКИ =====
  function loadMetrika() {
    if (window.ym) return; // уже запущена

    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + METRIKA_ID, 'ym');

    ym(METRIKA_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true
    });
  }

  // ===== 2. УДАЛЕНИЕ COOKIE МЕТРИКИ ПРИ ОТКАЗЕ =====
  function removeMetrikaCookies() {
    var host = location.hostname;
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ym') === 0) {
        document.cookie = name + '=; Max-Age=0; path=/';
        document.cookie = name + '=; Max-Age=0; path=/; domain=' + host;
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + host;
      }
    });
  }

  // ===== 3. СТИЛИ ПЛАШКИ =====
  var style = document.createElement('style');
  style.textContent =
    '#cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:640px;margin:0 auto;' +
    'padding:18px 20px;background:#fff;color:#222;border:1px solid #ddd;border-radius:14px;' +
    'box-shadow:0 6px 24px rgba(0,0,0,.18);font:14px/1.5 Arial,sans-serif;display:none;z-index:99999;' +
    'animation:cookieUp .4s ease}' +
    '#cookie-banner .cookie-title{margin:0 0 6px;font-weight:bold;font-size:15px}' +
    '#cookie-banner p{margin:0 0 14px}' +
    '#cookie-banner a{color:rgb(194,70,8)}' +
    '#cookie-banner .cookie-buttons{display:flex;gap:10px}' +
    '#cookie-banner button{flex:1;padding:10px 20px;background:#fff;color:#222;border:1px solid #222;' +
    'border-radius:8px;font-size:14px;cursor:pointer;transition:background .2s}' +
    '#cookie-banner button:hover{background:#f2f2f2}' +
    '@keyframes cookieUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}' +
    '@media (max-width:480px){#cookie-banner{left:8px;right:8px;bottom:8px;padding:14px}' +
    '#cookie-banner .cookie-buttons{flex-direction:column}}';
  document.head.appendChild(style);

  // ===== 4. САМА ПЛАШКА =====
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Согласие на использование cookie');
  banner.innerHTML =
    '<p class="cookie-title">Мы используем cookie</p>' +
    '<p>' +
      'Сайт использует файлы cookie и сервис Яндекс Метрика, чтобы собирать ' +
      'обезличенную статистику посещений и делать сайт удобнее. ' +
      'Нажимая «Принять», вы даёте ' +
      '<a href="' + BASE + 'cookie.html">согласие на обработку данных</a>. ' +
      'Подробнее — в <a href="' + BASE + 'privacy.html">Политике конфиденциальности</a>.' +
    '</p>' +
    '<div class="cookie-buttons">' +
      '<button type="button" id="cookie-reject">Отклонить</button>' +
      '<button type="button" id="cookie-accept">Принять</button>' +
    '</div>';
  document.body.appendChild(banner);

  // ===== 5. ЛОГИКА ВЫБОРА =====
  var choice = null;
  try { choice = localStorage.getItem('cookieChoice'); } catch (e) {}

  if (choice === 'accepted') {
    loadMetrika();
  } else if (choice !== 'rejected') {
    banner.style.display = 'block';
  }

  document.getElementById('cookie-accept').addEventListener('click', function () {
    try { localStorage.setItem('cookieChoice', 'accepted'); } catch (e) {}
    banner.style.display = 'none';
    loadMetrika();
  });

  document.getElementById('cookie-reject').addEventListener('click', function () {
    var wasRunning = !!window.ym;
    try { localStorage.setItem('cookieChoice', 'rejected'); } catch (e) {}
    banner.style.display = 'none';
    removeMetrikaCookies();
    if (wasRunning) location.reload(); // останавливаем уже запущенную Метрику
  });

  // ===== 6. ОТКРЫТЬ ПЛАШКУ СНОВА (для ссылки в футере) =====
  window.openCookieSettings = function () {
    banner.style.display = 'block';
  };
})();