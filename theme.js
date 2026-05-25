/**
 * 主题切换 · 支持深色/浅色模式
 * 在所有页面的 </body> 前引入此脚本
 */
(function () {
  var STORAGE_KEY = 'energy-dashboard-theme';

  // 读取保存的主题，默认深色
  var saved = localStorage.getItem(STORAGE_KEY);
  var theme = saved || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  // 页面加载完成后绑定切换按钮
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    updateIcon(btn, theme);

    btn.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
      updateIcon(btn, theme);

      // 通知 ECharts 实例刷新（如果有）
      if (window.dashboardCharts) {
        window.dashboardCharts.forEach(function (chart) {
          chart.dispose();
        });
        if (window.initCharts) window.initCharts();
      }
    });
  });

  function updateIcon(btn, t) {
    btn.textContent = t === 'dark' ? '☀️' : '🌙';
    btn.title = t === 'dark' ? '切换到浅色模式' : '切换到深色模式';
  }
})();
