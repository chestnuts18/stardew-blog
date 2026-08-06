/**
 * 开场动画 — GSAP逐字弹跳（诊断精简版：暂时去掉烟花，排查 STATUS_BREAKPOINT）
 */
(function () {
  try {
    if (sessionStorage.getItem("pl")) {
      var pl = document.getElementById("kuri-preloader");
      if (pl) pl.remove();
      return;
    }
    sessionStorage.setItem("pl", "1");

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var isMobile = vw < 768;
    var titleY = isMobile ? -(vh * 0.08) : -120;
    var displayDuration = isMobile ? 1.8 : 2.2;

    // ── 标题逐字动画 ─────────────────────────────
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

    // ── 消散 ─────────────────────────────────────
    setTimeout(function () {
      var p = document.getElementById("kuri-preloader");
      if (!p) return;
      if (typeof gsap !== "undefined") {
        gsap.to(p, {
          opacity: 0, duration: 1, ease: "expo.out",
          onComplete: function () { var el = document.getElementById("kuri-preloader"); if (el) el.remove(); }
        });
      } else {
        p.style.transition = "opacity 1s";
        p.style.opacity = "0";
        setTimeout(function () { if (p.parentNode) p.remove(); }, 1000);
      }
    }, displayDuration * 1000);
  } catch (e) {
    console.warn("preloader error:", e);
  }
})();
