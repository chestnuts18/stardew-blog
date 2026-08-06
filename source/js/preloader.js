/**
 * 开场动画 — DOM烟花 + GSAP逐字弹跳
 * 用 gsap.matchMedia() 做响应式 + prefers-reduced-motion，CSS 接管所有样式（100dvh + MiaoFont）
 */
(function () {
  try {
    if (sessionStorage.getItem("pl")) {
      var pl = document.getElementById("kuri-preloader");
      if (pl) pl.remove();
      return;
    }
    var pl = document.getElementById("kuri-preloader");
    if (!pl) return;
    sessionStorage.setItem("pl", "1");

    // 8s 安全网：防止 resize/rotate 后 overlay 残留
    setTimeout(function () { if (pl.parentNode) { pl.style.opacity = "0"; setTimeout(function () { if (pl.parentNode) pl.remove(); }, 200); } }, 8000);

    // ── 表情包列表 ────────────────────────────────────
    var E = [
      "kuri_爱心_1_2026-08-02-03-56-10.gif","kuri_爱心_2_2026-08-02-03-56-13.gif","kuri_爱心_3_2026-08-02-03-56-17.gif","kuri_眨眼_2026-08-02-04-00-33.gif","kuri_庆祝_2026-08-02-03-52-10.gif","kuri_吃(甜甜圈)_2026-08-04-23-15-34.gif","kuri_吃(西瓜)_2026-08-04-23-15-18.gif","kuri_吃爆米花_2026-08-02-03-54-05.gif","kuri_馋刀叉_2026-08-02-03-53-33.gif","kuri_馋筷子_2026-08-02-03-53-30.gif","kuri_跳舞Caramelldansen_2026-08-02-03-53-02.gif","kuri_跳舞低皮质醇_2026-08-02-03-53-09.gif","kuri_干杯_2026-08-02-03-52-17.gif","kuri_打游戏_2026-08-02-03-54-32.gif","kuri_电风扇1_2026-08-02-03-54-11.gif","kuri_电风扇2_2026-08-02-03-54-15.gif","kuri_画板_2026-08-02-03-59-32.gif","kuri_害羞_1_2026-08-02-03-58-15.gif","kuri_害羞_2_2026-08-02-03-58-18.gif","kuri_喝饮料杯_2026-08-02-03-53-23.gif","kuri_催眠_2026-08-02-03-55-21.gif","kuri_加油_2026-08-02-03-52-13.gif","kuri_笑_2026-08-02-03-55-42.gif","kuri_六七_2026-08-02-03-58-26.gif","kuri_扩音器_2026-08-02-03-56-24.gif","kuri_舔舔_2026-08-02-03-55-49.gif","kuri_情书_2026-08-02-03-55-59.gif","kuri_玫瑰_2026-08-02-03-57-59.gif","kuri_钱_2026-08-02-03-56-28.gif","kuri_摸头_2026-08-02-03-57-05.gif","kuri_期待_1_2026-08-02-03-58-53.gif","kuri_期待_2_2026-08-02-03-58-57.gif","kuri_带薪拉屎简单模式_2026-08-02-03-56-57.gif","kuri_像素墨镜反光_2026-08-02-03-59-14.gif","kuri_墨镜反光_2026-08-02-03-59-07.gif","kuri_要米_2026-08-02-03-56-39.gif","kuri_主意_2026-08-02-03-55-25.gif","kuri_吉他_2026-08-02-03-55-07.gif","kuri_唱歌_2026-08-02-03-58-22.gif","kuri_喷剂_2026-08-02-03-59-00.gif","kuri_红包_1_2026-08-02-03-57-49.gif","kuri_摇铃_2026-08-02-03-51-42.gif","kuri_打招呼_1_2026-08-02-03-55-00.gif","kuri_打招呼_2_2026-08-02-03-55-04.gif","kuri_思考自信地_2026-08-02-03-59-45.gif","kuri_抓拍手机_2026-08-02-03-52-02.gif","kuri_抓拍摄像机_2026-08-02-03-52-06.gif","kuri_点赞_2026-08-02-04-00-07.gif","kuri_荧光棒_1_2026-08-02-03-55-52.gif","kuri_荧光棒_2_2026-08-02-03-55-56.gif","kuri_礼物_1_2026-08-02-03-54-53.gif","kuri_礼物_2_2026-08-02-03-54-57.gif","kuri_通知_提示_硬币_2026-08-02-03-51-14.gif"
    ];

    var R = document.getElementById("emote-rain");
    var vw = pl.clientWidth;
    var vh = pl.clientHeight;

    // ── 拆分标题文字 ──────────────────────────────────
    var t = document.getElementById("pl-title");
    if (!t) return;
    var txt = t.textContent;
    t.textContent = "";
    for (var i = 0; i < txt.length; i++) {
      var ch = document.createElement("span");
      ch.className = "char";
      ch.textContent = txt[i];
      t.appendChild(ch);
    }

    if (typeof gsap === "undefined") {
      // GSAP 未加载 — 静态降级
      t.style.visibility = "visible";
      setTimeout(function () {
        pl.style.transition = "opacity 1s";
        pl.style.opacity = "0";
        setTimeout(function () { if (pl.parentNode) pl.remove(); }, 1000);
      }, 2200);
      return;
    }

    // ── GSAP matchMedia 响应式 ────────────────────────
    gsap.matchMedia().add({
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
      always: "(min-width: 0px)"
    }, function (ctx) {
      var isMobile = ctx.conditions.isMobile;
      var reduce = ctx.conditions.reduceMotion;

      // ── 烟花 ────────────────────────────────────
      if (!reduce && R) {
        var pCount = isMobile ? 80 : 250;
        var minS = isMobile ? 25 : 45;
        var maxS = isMobile ? 45 : 70;
        var minD = isMobile ? 80 : 120;
        var maxD = isMobile ? Math.min(300, vw * 0.6) : 480;
        for (var j = 0; j < pCount; j++) {
          var img = document.createElement("img");
          img.src = encodeURI("/images/preload/" + E[Math.floor(Math.random() * E.length)]);
          var sz = minS + Math.random() * (maxS - minS);
          img.style.width = sz + "px";
          img.style.height = sz + "px";
          img.style.left = (vw / 2) + "px";
          img.style.top = (vh / 2) + "px";
          var a = (j / pCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
          var dist = minD + Math.random() * (maxD - minD);
          var dx = Math.cos(a) * dist;
          var dy = Math.sin(a) * dist - 20 - Math.random() * 40;
          var rot = (Math.random() - 0.5) * 360;
          img.style.setProperty("--dx", dx + "px");
          img.style.setProperty("--dy", dy + "px");
          img.style.setProperty("--rot", rot + "deg");
          img.style.animationDelay = Math.random() * 0.1 + "s";
          img.style.animationDuration = (2 + Math.random() * 1.5) + "s";
          R.appendChild(img);
          (function (el) { setTimeout(function () { if (el.parentNode) el.remove(); }, 4000); })(img);
        }
      }

      // ── 标题文字动画 ───────────────────────────────
      if (reduce) {
        t.style.visibility = "visible";
      } else {
        var titleY = isMobile ? -(vh * 0.08) : -120;
        t.style.visibility = "visible";
        gsap.fromTo("#pl-title .char", {
          autoAlpha: 0, y: titleY, scale: 0, rotation: -45
        }, {
          autoAlpha: 1, y: 0, scale: 1, rotation: 0,
          duration: 0.9, ease: "back.out(1.7)",
          stagger: { each: 0.08, from: "start" },
          delay: 0.3
        });
      }

      // ── 消散 ─────────────────────────────────────
      gsap.to(pl, {
        autoAlpha: 0,
        duration: reduce ? 0.4 : 1,
        ease: "expo.out",
        delay: reduce ? 0.6 : (isMobile ? 1.8 : 2.2),
        onComplete: function () { if (pl.parentNode) pl.remove(); }
      });
    });
  } catch (e) {
    console.warn("preloader:", e);
    var pp = document.getElementById("kuri-preloader");
    if (pp) pp.remove();
  }
})();
