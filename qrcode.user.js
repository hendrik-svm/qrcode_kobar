// ==UserScript==
// @name         QrCode_Kobar
// @version      20261105.2300
// @author       hendrik svm
// @require      https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js
// @include      *cloud.kotawaringinbaratkab*
// @updateURL    https://raw.githubusercontent.com/hendrik-svm/qrcode_kobar/main/qrcode.meta.js
// @downloadURL  https://raw.githubusercontent.com/hendrik-svm/qrcode_kobar/main/qrcode.user.js
// @grant        none
// ==/UserScript==

!(function () {
  if (-1 != location.href.search("cloud.kotawaringinbarat")) {
    const n = document.createElement("style");
    ((n.innerHTML =
      "\n            /* Gaya untuk modal */\n            .qr-modal {\n                display: none;\n                position: fixed;\n                z-index: 10000;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n                overflow: auto;\n                background-color: rgba(0, 0, 0, 0.5);\n                backdrop-filter: blur(2px);\n            }\n\n            .qr-modal-content {\n                background-color: #fefefe;\n                margin: auto;\n                padding: 20px;\n                border: 1px solid #888;\n                border-radius: 8px;\n                width: 80%;\n                max-width: 350px;\n                position: relative;\n                top: 50%;\n                transform: translateY(-50%);\n            }\n\n            .qr-close {\n                color: #aaa;\n                position: absolute;\n                right: 12px;\n                top: 8px;\n                font-size: 28px;\n                font-weight: bold;\n                cursor: pointer;\n                line-height: 1;\n            }\n\n            .qr-close:hover,\n            .qr-close:focus {\n                color: black;\n                text-decoration: none;\n            }\n\n            /* Gaya tombol QR kecil di samping tombol copy */\n            .qr-btn {\n                margin-left: 8px;\n                padding: 4px 8px;\n                font-size: 12px;\n                border: none;\n                border-radius: 4px;\n                background-color: #ffeb3b !important;\n                color: black !important;\n                cursor: pointer;\n                vertical-align: middle;\n                float: right;\n                white-space: nowrap;\n            }\n\n            .qr-btn:hover {\n                background-color: #fdd835 !important;\n            }\n\n            .qr-btn:disabled {\n                background-color: #9e9e9e;\n                cursor: not-allowed;\n            }\n\n            .qr-canvas-container {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                margin: 15px 0;\n            }\n\n            #qrCanvas {\n                border: 1px solid #eee;\n                background: white;\n                display: block;\n                margin: 0 auto;\n            }\n"),
      document.head.appendChild(n));
    const e = document.createElement("div");
    function t(n, e, o, r) {
      const a = (r || document).querySelectorAll(n);
      let i = !1;
      if (
        (a.forEach((n) => {
          if ("true" === n.dataset.qrAlreadyFound) return;
          ((i = !0), (n.dataset.qrAlreadyFound = "true"));
          const t = e(n);
          o && !1 === t && (n.dataset.qrAlreadyFound = "false");
        }),
        !i && !o)
      ) {
        const a = n.replace(/[^\w]/g, "_");
        (t.controlObj || (t.controlObj = {}),
          t.controlObj[a] ||
            (t.controlObj[a] = setInterval(() => {
              t(n, e, o, r);
            }, 1500)));
      }
    }
    function o(n) {
      if ("true" === n.dataset.qrBtnInserted) return;
      const e = n.getAttribute("href");
      if (!e) return;
      const t = document.createElement("button");
      ((t.type = "button"),
        (t.className = "qr-btn"),
        (t.textContent = "QR"),
        (t.title = "Buat QR Code dari link ini"),
        t.addEventListener("click", (n) => {
          var t;
          (n.preventDefault(),
            n.stopPropagation(),
            (t = e),
            (a.style.display = "block"),
            i(t));
        }),
        n.parentNode.parentNode.insertBefore(t, n.parentNode),
        (n.dataset.qrBtnInserted = "true"));
    }
    function r() {
      t(".sharing-entry__copy", (n) => {
        o(n);
      });
    }
    ((e.innerHTML =
      '\n            <div id="qrModal" class="qr-modal">\n                <div class="qr-modal-content">\n                    <span class="qr-close">&times;</span>\n                    <div class="qr-canvas-container">\n                        <canvas id="qrCanvas" width="300" height="300"></canvas>\n                    </div>\n                    <div style="font-size: 15px; color: #666; text-align: center; margin-top: 5px;">\n                        Klik kanan &rarr; Copy Image &rarr; Paste ke Word\n                    </div>\n            </div>\n        '),
      document.body.appendChild(e),
      r(),
      new MutationObserver((n) => {
        let e = !1;
        (n.forEach((n) => {
          n.addedNodes.forEach((n) => {
            1 === n.nodeType &&
              (n.matches && n.matches(".sharing-entry__copy") && (e = !0),
              n.querySelectorAll) &&
              n.querySelectorAll(".sharing-entry__copy").length > 0 &&
              (e = !0);
          });
        }),
          e && r());
      }).observe(document.body, { childList: !0, subtree: !0 }));
    const a = document.getElementById("qrModal");
    function i(n) {
      if (!n) return void alert("Link tidak tersedia untuk membuat QR Code.");
      const e = document.createElement("div");
      (new QRCode(e, {
        text: n,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      }),
        setTimeout(() => {
          const n = e.querySelector("canvas") || e.querySelector("img"),
            t = document.getElementById("qrCanvas"),
            o = t.getContext("2d");
          if (!n) return void alert("Gagal generate QR Code.");
          if ("img" === n.tagName.toLowerCase()) {
            const e = n;
            ((t.width = e.width), (t.height = e.height), o.drawImage(e, 0, 0));
          } else
            ((t.width = n.width), (t.height = n.height), o.drawImage(n, 0, 0));
          const r = new Image();
          ((r.src =
            "https://cloud.kotawaringinbaratkab.go.id/s/fYM4tGeNGFgMRAq/download"),
            (r.onload = function () {
              const n = 0.35 * t.width,
                e = n,
                a = n * (r.naturalHeight / r.naturalWidth);
              ((o.imageSmoothingEnabled = !0),
                (o.imageSmoothingQuality = "high"),
                o.drawImage(r, (t.width - e) / 2, (t.height - a) / 2, e, a));
            }),
            (r.onerror = function () {
              console.warn("Logo tidak dapat dimuat, QR Code tanpa logo.");
            }));
        }, 500));
    }
    (a.querySelector(".qr-close").addEventListener("click", () => {
      a.style.display = "none";
    }),
      a.addEventListener("click", (n) => {
        n.target === a && (a.style.display = "none");
      }));
  }
})();
