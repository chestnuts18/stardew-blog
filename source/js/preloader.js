/**
 * 开场动画 — DOM烟花 + GSAP逐字弹跳
 * 移动端自适应：粒子数/尺寸/爆发半径/标题偏移/持续时间 全部按viewport缩放
 */
(function () {
  try {
    if (sessionStorage.getItem("pl")) {
      var pl = document.getElementById("kuri-preloader");
      if (pl) pl.remove();
      return;
    }
    sessionStorage.setItem("pl", "1");

    // ── 移动端自适应参数 ──────────────────────────────
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var isMobile = vw < 768;

    var particleCount = isMobile ? 80 : 250;
    var minSize = isMobile ? 25 : 45;
    var maxSize = isMobile ? 45 : 70;
    var minDist = isMobile ? 80 : 120;
    var maxDist = isMobile ? Math.min(300, vw * 0.6) : 480;
    var titleY = isMobile ? -(vh * 0.08) : -120;
    var displayDuration = isMobile ? 1.8 : 2.2;

    // ── DOM烟花爆发 ──────────────────────────────────
    var R = document.getElementById("emote-rain");
    if (R) {
      var E = [
        "kuri_爱心_1_2026-08-02-03-56-10.gif","kuri_爱心_2_2026-08-02-03-56-13.gif","kuri_爱心_3_2026-08-02-03-56-17.gif","kuri_眨眼_2026-08-02-04-00-33.gif","kuri_庆祝_2026-08-02-03-52-10.gif","kuri_吃(甜甜圈)_2026-08-04-23-15-34.gif","kuri_吃(西瓜)_2026-08-04-23-15-18.gif","kuri_吃爆米花_2026-08-02-03-54-05.gif","kuri_馋刀叉_2026-08-02-03-53-33.gif","kuri_馋筷子_2026-08-02-03-53-30.gif","kuri_跳舞Caramelldansen_2026-08-02-03-53-02.gif","kuri_跳舞低皮质醇_2026-08-02-03-53-09.gif","kuri_干杯_2026-08-02-03-52-17.gif","kuri_打游戏_2026-08-02-03-54-32.gif","kuri_电风扇1_2026-08-02-03-54-11.gif","kuri_电风扇2_2026-08-02-03-54-15.gif","kuri_画板_2026-08-02-03-59-32.gif","kuri_害羞_1_2026-08-02-03-58-15.gif","kuri_害羞_2_2026-08-02-03-58-18.gif","kuri_喝饮料杯_2026-08-02-03-53-23.gif","kuri_催眠_2026-08-02-03-55-21.gif","kuri_加油_2026-08-02-03-52-13.gif","kuri_笑_2026-08-02-03-55-42.gif","kuri_六七_2026-08-02-03-58-26.gif","kuri_扩音器_2026-08-02-03-56-24.gif","kuri_舔舔_2026-08-02-03-55-49.gif","kuri_情书_2026-08-02-03-55-59.gif","kuri_玫瑰_2026-08-02-03-57-59.gif","kuri_钱_2026-08-02-03-56-28.gif","kuri_摸头_2026-08-02-03-57-05.gif","kuri_期待_1_2026-08-02-03-58-53.gif","kuri_期待_2_2026-08-02-03-58-57.gif","kuri_带薪拉屎简单模式_2026-08-02-03-56-57.gif","kuri_像素墨镜反光_2026-08-02-03-59-14.gif","kuri_墨镜反光_2026-08-02-03-59-07.gif","kuri_要米_2026-08-02-03-56-39.gif","kuri_主意_2026-08-02-03-55-25.gif","kuri_吉他_2026-08-02-03-55-07.gif","kuri_唱歌_2026-08-02-03-58-22.gif","kuri_喷剂_2026-08-02-03-59-00.gif","kuri_红包_1_2026-08-02-03-57-49.gif","kuri_摇铃_2026-08-02-03-51-42.gif","kuri_打招呼_1_2026-08-02-03-55-00.gif","kuri_打招呼_2_2026-08-02-03-55-04.gif","kuri_思考自信地_2026-08-02-03-59-45.gif","kuri_抓拍手机_2026-08-02-03-52-02.gif","kuri_抓拍摄像机_2026-08-02-03-52-06.gif","kuri_点赞_2026-08-02-04-00-07.gif","kuri_荧光棒_1_2026-08-02-03-55-52.gif","kuri_荧光棒_2_2026-08-02-03-55-56.gif","kuri_礼物_1_2026-08-02-03-54-53.gif","kuri_礼物_2_2026-08-02-03-54-57.gif","kuri_通知_提示_硬币_2026-08-02-03-51-14.gif"
      ];

      function burst(cx, cy, n) {
        for (var i = 0; i < n; i++) {
          var img = document.createElement("img");
          img.src = encodeURI("/images/preload/" + E[Math.floor(Math.random() * E.length)]);
          var s = minSize + Math.random() * (maxSize - minSize);
          img.style.width = s + "px";
          img.style.height = s + "px";
          img.style.left = cx + "px";
          img.style.top = cy + "px";
          var a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
          var d = minDist + Math.random() * (maxDist - minDist);
          var dx = Math.cos(a) * d;
          var dy = Math.sin(a) * d - 20 - Math.random() * 40;
          var rot = (Math.random() - 0.5) * 360;
          img.style.setProperty("--dx", dx + "px");
          img.style.setProperty("--dy", dy + "px");
          img.style.setProperty("--rot", rot + "deg");
          img.style.animationDelay = Math.random() * 0.1 + "s";
          img.style.animationDuration = (2 + Math.random() * 1.5) + "s";
          R.appendChild(img);
          setTimeout(function () { if (img.parentNode) img.remove(); }, 4000);
        }
      }

      burst(window.innerWidth / 2, window.innerHeight / 2, particleCount);
    }

    // ── GSAP 逐字弹跳标题 ─────────────────────────────
    (function () {
      var t = document.getElementById("pl-title");
      if (!t) return;
      var txt = t.textContent;
      t.textContent = "";
      for (var i = 0; i < txt.length; i++) {
        var s = document.createElement("span");
        s.className = "char";
        s.textContent = txt[i];
        t.appendChild(s);
      }
      t.style.visibility = "visible";

      if (typeof gsap !== "undefined") {
        gsap.fromTo(".center-text .char", {
          opacity: 0, y: titleY, scale: 0, rotation: -45
        }, {
          opacity: 1, y: 0, scale: 1, rotation: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: { each: 0.08, from: "start" },
          delay: 0.3
        });
      }
    })();

    // ── 消散 ─────────────────────────────────────────
    setTimeout(function () {
      var p = document.getElementById("kuri-preloader");
      if (!p) return;
      if (typeof gsap !== "undefined") {
        gsap.to(p, {
          opacity: 0, duration: 1, ease: "expo.out",
          onComplete: function () { var el = document.getElementById("kuri-preloader"); if (el) el.remove(); }
        });
      } else {
        p.style.opacity = "0";
        setTimeout(function () { if (p.parentNode) p.remove(); }, 1000);
      }
    }, displayDuration * 1000);
  } catch (e) {
    console.warn("preloader:", e);
  }
})();
