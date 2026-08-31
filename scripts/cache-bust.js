/**
 * 缓存爆破：给关键 JS 加版本号查询参数
 * 背景：/js/ 无浏览器 Cache-Control 头（CDN 8条响应头规则未配置），
 * 用户浏览器会启发式长期缓存旧 JS。文件名不变时改 URL 查询参数，
 * 浏览器视为新资源强制重新下载（CDN 缓存 key 含参数，也走全新回源）。
 * 修改 main.js/preloader.js 后记得把版本号 +1。
 */
const VER = "3";

hexo.extend.filter.register("after_render:html", function (html, data) {
  if (!data.path || !data.path.endsWith(".html")) return html;
  return html
    .replace(/src="\/js\/build\/main\.js"/g, 'src="/js/build/main.js?v=' + VER + '"')
    .replace(/src="\/js\/preloader\.js"/g, 'src="/js/preloader.js?v=' + VER + '"');
});
