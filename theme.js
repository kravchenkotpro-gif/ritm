// Ставит тему до первой отрисовки, чтобы экран не мигал: выбор пользователя
// из настроек, а пока его нет — системная тема (и следит за её сменой).
// Отдельный файл, а не встроенный скрипт: так его пропускает политика безопасности программы.
(function () {
  var KEY = 'ritm-theme';
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', theme === 'dark' ? '#121110' : '#F4F2EE');
  }
  apply(stored() || (media.matches ? 'dark' : 'light'));
  media.addEventListener('change', function (e) {
    if (!stored()) apply(e.matches ? 'dark' : 'light');
  });
})();
