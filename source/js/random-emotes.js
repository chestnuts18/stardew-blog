/* ================================================================
   😂 随机表情包系统 - pixel farm emote rain
   文章区域随机弹出，像素弹跳动画，点击关闭
   ================================================================ */

(function() {
  'use strict';

  // 表情包文件列表（构建时由 hexo 生成，或手动扫描）
  const EMOTE_DIR = '/images/emotes/';
  const EMOTE_LIST = []; // 由后端/构建时注入，或前端动态扫描

  // 配置
  const CONFIG = {
    maxOnScreen: 6,           // 同时最多显示数量
    spawnInterval: 3000,      // 基础生成间隔 (ms)
    spawnVariation: 5000,     // 间隔随机浮动
    minLifetime: 4000,        // 最短存活时间
    maxLifetime: 9000,        // 最长存活时间
    sizeRange: [60, 200],     // 显示尺寸范围 (px)
    zIndex: 9999,
    margin: 40,               // 距离边缘的最小距离
  };

  let emoteEls = [];
  let spawnTimer = null;
  let isActive = false;

  // ===== 初始化 =====
  function init() {
    // 只在文章页面启动
    const articleBody = document.querySelector('.markdown-body');
    if (!articleBody) return;

    // 收集页面中所有图片，提取表情包文件名
    scanEmotes();

    if (EMOTE_LIST.length === 0) {
      console.log('🐔 未发现表情包，跳过随机表情系统');
      return;
    }

    console.log(`🐔 星露谷表情包系统启动！共 ${EMOTE_LIST.length} 个表情`);
    isActive = true;
    scheduleNext();
  }

  // ===== 扫描表情包文件 =====
  function scanEmotes() {
    // 方法：从已知的表情包目录构建文件名列表
    // 这里用构建时固定的文件名列表
    const KNOWN_EMOTES = [
      // 80x80
      'kuri_Bug_2026-08-02-02-55-41.gif',
      'kuri_PNGTuber 加载中_2026-08-02-03-03-35.gif',
      'kuri_PNGTuber 说教_2026-08-02-03-03-52.gif',
      'kuri_PNGTuber 说话 2_2026-08-02-03-03-50.gif',
      'kuri_PNGTuber 说话_2026-08-02-03-03-44.gif',
      'kuri_PNGTuber 闲置 2_2026-08-02-03-03-30.gif',
      'kuri_PNGTuber 闲置_2026-08-02-03-03-25.gif',
      'kuri_Popcat 帧_2026-08-02-03-03-57.gif',
      'kuri_Popcat 平滑_2026-08-02-03-04-00.gif',
      'kuri_Raid 1_2026-08-02-03-04-07.gif',
      'kuri_Raid 2_2026-08-02-03-04-15.gif',
      'kuri_TrashTuber 说教_2026-08-02-03-06-52.gif',
      'kuri_TrashTuber 说话_2026-08-02-03-06-49.gif',
      'kuri_TrashTuber 闲置_2026-08-02-03-06-46.gif',
      'kuri_主意_2026-08-02-03-00-58.gif',
      'kuri_停止工作_2026-08-02-03-05-38.gif',
      'kuri_催眠_2026-08-02-03-00-55.gif',
      'kuri_像素墨镜反光_2026-08-02-03-05-51.gif',
      'kuri_冒泡 1_2026-08-02-03-01-37.gif',
      'kuri_冒泡 2_2026-08-02-03-01-43.gif',
      'kuri_刀 1_2026-08-02-03-01-09.gif',
      'kuri_刀 2_2026-08-02-03-01-13.gif',
      'kuri_到达(拿勺子)_2026-08-02-02-55-08.gif',
      'kuri_到达(拿筷子)_2026-08-02-02-55-02.gif',
      'kuri_到达_2026-08-02-02-54-56.gif',
      'kuri_加油_2026-08-02-02-56-35.gif',
      'kuri_反向点赞_2026-08-02-03-06-38.gif',
      'kuri_叹号_2026-08-02-02-59-49.gif',
      'kuri_吃(爆米花)_2026-08-02-02-59-37.gif',
      'kuri_吃(甜甜圈)_2026-08-02-02-59-32.gif',
      'kuri_吃(西瓜)_2026-08-02-02-59-43.gif',
      'kuri_呆 1_2026-08-02-02-58-51.gif',
      'kuri_呆 2_2026-08-02-02-58-55.gif',
      'kuri_呆 3_2026-08-02-02-59-00.gif',
      'kuri_呆(贴纸) 1_2026-08-02-02-59-05.gif',
      'kuri_呆(贴纸) 2_2026-08-02-02-59-10.gif',
      'kuri_呆(贴纸) 3_2026-08-02-02-59-15.gif',
      'kuri_哭 1_2026-08-02-02-57-21.gif',
      'kuri_哭 2_2026-08-02-02-57-28.gif',
      'kuri_哭 3_2026-08-02-02-57-35.gif',
      'kuri_唱歌_2026-08-02-03-04-53.gif',
      'kuri_喝(饮料杯)_2026-08-02-02-58-37.gif',
      'kuri_喷剂_2026-08-02-03-05-33.gif',
      'kuri_坐牢 1_2026-08-02-03-01-02.gif',
      'kuri_坐牢 2_2026-08-02-03-01-04.gif',
      'kuri_垃圾桶_2026-08-02-03-06-43.gif',
      'kuri_墨镜反光_2026-08-02-03-05-45.gif',
      'kuri_复活节_2026-08-02-02-59-21.gif',
      'kuri_头晕_2026-08-02-02-58-33.gif',
      'kuri_害羞 1_2026-08-02-03-04-44.gif',
      'kuri_害羞 2_2026-08-02-03-04-49.gif',
      'kuri_工作(小睡)_2026-08-02-03-07-18.gif',
      'kuri_工作(普通)_2026-08-02-03-07-22.gif',
      'kuri_工作(生气)_2026-08-02-03-07-12.gif',
      'kuri_工作(疲倦)_2026-08-02-03-07-29.gif',
      'kuri_带薪拉屎(困难模式)_2026-08-02-03-03-12.gif',
      'kuri_带薪拉屎(简单模式)_2026-08-02-03-03-05.gif',
      'kuri_干杯_2026-08-02-02-56-45.gif',
      'kuri_庆祝_2026-08-02-02-56-27.gif',
      'kuri_得分(0分)_2026-08-02-03-04-36.gif',
      'kuri_爱心 3_2026-08-02-03-02-01.gif',
      'kuri_玫瑰_2026-08-02-03-04-29.gif',
      'kuri_生气_2026-08-02-02-54-36.gif',
      'kuri_画板_2026-08-02-03-06-15.gif',
      'kuri_睡觉 (UU)_2026-08-02-03-05-16.gif',
      'kuri_睡觉(准备阶段1)_2026-08-02-03-05-04.gif',
      'kuri_睡觉(准备阶段2)_2026-08-02-03-05-10.gif',
      'kuri_睡觉(普通)_2026-08-02-03-05-00.gif',
      'kuri_笑(指)_2026-08-02-03-01-20.gif',
      'kuri_笑_2026-08-02-03-01-17.gif',
      'kuri_紧张 1_2026-08-02-03-02-29.gif',
      'kuri_紧张 2_2026-08-02-03-02-35.gif',
      'kuri_红包 1_2026-08-02-03-04-19.gif',
      'kuri_红包 2_2026-08-02-03-04-25.gif',
      'kuri_胶带_2026-08-02-03-06-23.gif',
      'kuri_自我安慰_2026-08-02-02-56-55.gif',
      'kuri_舔舔_2026-08-02-03-01-23.gif',
      'kuri_荧光棒 1_2026-08-02-03-01-26.gif',
      'kuri_荧光棒 2_2026-08-02-03-01-29.gif',
      'kuri_蛋糕_2026-08-02-02-55-49.gif',
      'kuri_要米_2026-08-02-03-02-25.gif',
      'kuri_记录 1_2026-08-02-03-02-49.gif',
      'kuri_记录 2_2026-08-02-03-02-52.gif',
      'kuri_跳舞 1_2026-08-02-02-57-47.gif',
      'kuri_跳舞(Caramelldansen)_2026-08-02-02-57-53.gif',
      'kuri_跳舞(Helltaker)_2026-08-02-02-58-08.gif',
      'kuri_跳舞(低皮质醇)_2026-08-02-02-58-17.gif',
      'kuri_通知_提示 Bits_2026-08-02-02-53-08.gif',
      'kuri_通知_提示 星星_收藏_2026-08-02-02-54-14.gif',
      'kuri_通知_提示 点赞_2026-08-02-02-54-08.gif',
      'kuri_通知_提示 爱心_喜欢_2026-08-02-02-54-00.gif',
      'kuri_通知_提示 硬币_2026-08-02-02-53-45.gif',
      'kuri_钱_2026-08-02-03-02-09.gif',
      'kuri_问号_2026-08-02-03-04-04.gif',
      'kuri_雨刮器尾巴_2026-08-02-03-06-18.gif',
      'kuri_静音 1_2026-08-02-03-02-15.gif',
      'kuri_静音 2_2026-08-02-03-02-20.gif',
      'kuri_馋(刀叉)_2026-08-02-02-58-47.gif',
      'kuri_馋(筷子)_2026-08-02-02-58-44.gif',
      'kuri_驾驶_2026-08-02-02-58-41.gif',
    ];

    EMOTE_LIST.push(...KNOWN_EMOTES);
  }

  // ===== 获取随机表情 =====
  function randomEmote() {
    return EMOTE_LIST[Math.floor(Math.random() * EMOTE_LIST.length)];
  }

  // ===== 获取随机位置 =====
  function randomPosition(el) {
    const container = document.querySelector('.article-content-container') || document.body;
    const rect = container.getBoundingClientRect();
    const w = el.offsetWidth || 80;
    const h = el.offsetHeight || 80;

    const maxX = Math.min(window.innerWidth - w - CONFIG.margin, rect.right - w);
    const minX = Math.max(CONFIG.margin, rect.left);

    return {
      x: minX + Math.random() * (maxX - minX),
      y: CONFIG.margin + Math.random() * (window.innerHeight - h - CONFIG.margin * 2),
    };
  }

  // ===== 生成一个表情 =====
  function spawnEmote() {
    if (!isActive) return;

    // 限制数量
    const alive = document.querySelectorAll('.pixel-emote:not(.emote-dying)');
    if (alive.length >= CONFIG.maxOnScreen) return;

    const src = randomEmote();
    const size = CONFIG.sizeRange[0] + Math.random() * (CONFIG.sizeRange[1] - CONFIG.sizeRange[0]);

    const el = document.createElement('img');
    el.src = EMOTE_DIR + encodeURI(src);
    el.className = 'pixel-emote pixel-appear';
    el.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: auto;
      z-index: ${CONFIG.zIndex};
      image-rendering: pixelated;
      cursor: pointer;
      pointer-events: auto;
      filter: drop-shadow(3px 3px 0 rgba(0,0,0,0.2));
      -webkit-user-drag: none;
    `;

    // 随机水平翻转
    if (Math.random() > 0.5) {
      el.style.transform = 'scaleX(-1)';
    }

    const pos = randomPosition(el);
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';

    // 点击关闭
    el.addEventListener('click', () => dismissEmote(el));

    // 悬停放大
    el.addEventListener('mouseenter', () => {
      el.style.transform = el.style.transform.includes('scaleX(-1)')
        ? 'scaleX(-1) scale(1.3)'
        : 'scale(1.3)';
      el.style.zIndex = CONFIG.zIndex + 100;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = el.style.transform.includes('scaleX(-1)')
        ? 'scaleX(-1)'
        : '';
      el.style.zIndex = CONFIG.zIndex;
    });

    document.body.appendChild(el);
    emoteEls.push(el);

    // 定时自动消失
    const lifetime = CONFIG.minLifetime + Math.random() * (CONFIG.maxLifetime - CONFIG.minLifetime);
    setTimeout(() => dismissEmote(el), lifetime);
  }

  // ===== 关闭表情 =====
  function dismissEmote(el) {
    if (!el || el.classList.contains('emote-dying')) return;
    el.classList.add('emote-dying');
    el.style.transition = 'opacity 0.3s steps(3), transform 0.3s steps(3)';
    el.style.opacity = '0';
    el.style.transform = el.style.transform + ' scale(0.5) translateY(20px)';
    setTimeout(() => {
      el.remove();
      emoteEls = emoteEls.filter(e => e !== el);
    }, 300);
  }

  // ===== 定时调度 =====
  function scheduleNext() {
    if (!isActive) return;
    const delay = CONFIG.spawnInterval + Math.random() * CONFIG.spawnVariation;
    spawnTimer = setTimeout(() => {
      spawnEmote();
      // 一次可能生成多个表情
      const extraSpawns = Math.floor(Math.random() * 3); // 0-2 个额外
      for (let i = 0; i < extraSpawns; i++) {
        setTimeout(() => spawnEmote(), Math.random() * 800);
      }
      scheduleNext();
    }, delay);
  }

  // ===== 停止 =====
  function stop() {
    isActive = false;
    clearTimeout(spawnTimer);
    document.querySelectorAll('.pixel-emote').forEach(el => el.remove());
    emoteEls = [];
  }

  // ===== Swup 页面切换支持 =====
  // 页面切换时重启
  if (window.swup) {
    window.swup.on('contentReplaced', () => {
      stop();
      setTimeout(init, 500);
    });
  }

  // ===== 启动 =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露API
  window.PixelEmotes = { init, stop, spawnEmote, dismissEmote };
})();
