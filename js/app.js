(function () {
  "use strict";

  /* ---------- Datos: huesos por módulo ---------- */
  var pair = function (n) { return [n + " (der.)", n + " (izq.)"]; };
  var flat = function (arr) { return arr.reduce(function (a, b) { return a.concat(b); }, []); };
  var range = function (a, b) { var r = []; for (var i = a; i <= b; i++) r.push(i); return r; };

  var dedosMano = ["Pulgar", "Índice", "Medio", "Anular", "Meñique"];
  var dedosPie = ["Dedo gordo", "2.º dedo", "3.º dedo", "4.º dedo", "5.º dedo"];
  var falanges = function (dedos, lado, primerDedo) {
    return flat(dedos.map(function (d, i) {
      var partes = i === 0 ? ["proximal", "distal"] : ["proximal", "media", "distal"];
      return partes.map(function (p) { return "Falange " + p + ", " + d + " (" + lado + ")"; });
    }));
  };
  var romanos = ["I", "II", "III", "IV", "V"];

  var MODULES = [
    { id: "cabeza", title: "Cabeza", sub: "Cráneo, cara, oído y hioides", groups: [
      { name: "Cráneo", bones: flat([["Frontal"], pair("Parietal"), pair("Temporal"), ["Occipital", "Esfenoides", "Etmoides"]]) },
      { name: "Cara", bones: flat([pair("Maxilar"), pair("Cigomático (pómulo)"), pair("Nasal"), pair("Lagrimal"), pair("Palatino"), pair("Cornete inferior"), ["Vómer", "Mandíbula"]]) },
      { name: "Oído", bones: flat([pair("Martillo"), pair("Yunque"), pair("Estribo")]) },
      { name: "Hioides", bones: ["Hioides"] }
    ]},
    { id: "columna", title: "Columna vertebral", sub: "Vértebras, sacro y cóccix", groups: [
      { name: "Cervicales", bones: ["C1 Atlas", "C2 Axis", "C3", "C4", "C5", "C6", "C7"] },
      { name: "Dorsales", bones: range(1, 12).map(function (n) { return "D" + n; }) },
      { name: "Lumbares", bones: range(1, 5).map(function (n) { return "L" + n; }) },
      { name: "Sacro y cóccix", bones: ["Sacro", "Cóccix"] }
    ]},
    { id: "torax", title: "Tórax", sub: "Esternón y costillas", groups: [
      { name: "Esternón", bones: ["Esternón"] },
      { name: "Costillas verdaderas", bones: flat(range(1, 7).map(function (n) { return pair("Costilla " + n); })) },
      { name: "Costillas falsas", bones: flat(range(8, 10).map(function (n) { return pair("Costilla " + n); })) },
      { name: "Costillas flotantes", bones: flat(range(11, 12).map(function (n) { return pair("Costilla " + n); })) }
    ]},
    { id: "superiores", title: "Miembros superiores", sub: "Hombro, brazo, antebrazo y mano", groups: [
      { name: "Hombro", bones: flat([pair("Clavícula"), pair("Escápula (omóplato)")]) },
      { name: "Brazo", bones: pair("Húmero") },
      { name: "Antebrazo", bones: flat([pair("Radio"), pair("Cúbito")]) },
      { name: "Carpo (muñeca)", bones: flat(["Escafoides", "Semilunar", "Piramidal", "Pisiforme", "Trapecio", "Trapezoide", "Hueso grande", "Ganchoso"].map(pair)) },
      { name: "Metacarpo", bones: flat(romanos.map(function (n) { return pair("Metacarpiano " + n); })) },
      { name: "Falanges de la mano", bones: flat([falanges(dedosMano, "der."), falanges(dedosMano, "izq.")]) }
    ]},
    { id: "pelvis", title: "Pelvis", sub: "Huesos coxales", groups: [
      { name: "Cintura pélvica", bones: pair("Coxal") }
    ]},
    { id: "inferiores", title: "Miembros inferiores", sub: "Muslo, rodilla, pierna y pie", groups: [
      { name: "Muslo", bones: pair("Fémur") },
      { name: "Rodilla", bones: pair("Rótula") },
      { name: "Pierna", bones: flat([pair("Tibia"), pair("Peroné")]) },
      { name: "Tarso (tobillo)", bones: flat(["Astrágalo", "Calcáneo", "Escafoides del pie", "Cuboides", "Cuneiforme medial", "Cuneiforme intermedio", "Cuneiforme lateral"].map(pair)) },
      { name: "Metatarso", bones: flat(romanos.map(function (n) { return pair("Metatarsiano " + n); })) },
      { name: "Falanges del pie", bones: flat([falanges(dedosPie, "der."), falanges(dedosPie, "izq.")]) }
    ]}
  ];

  /* Asignar ids y calcular totales */
  var BONES = {};           // id -> { name, mod }
  var seq = 0;
  MODULES.forEach(function (m) {
    m.total = 0;
    m.groups.forEach(function (g) {
      g.items = g.bones.map(function (name) {
        var id = "b" + (seq++);
        BONES[id] = { name: name, mod: m.id };
        m.total++;
        return id;
      });
    });
  });
  var TOTAL = seq;

  /* ---------- Imágenes incluidas en el repositorio (carpeta img/) ---------- */
  /* js/imagenes.js lo genera tools/descargar_imagenes.py */
  var IMG = window.IMAGENES || {};
  var broken = {};
  var KEY_RULES = [
    [/^Frontal$/, "frontal"], [/^Parietal$/, "parietal"], [/^Temporal$/, "temporal"],
    [/^Occipital$/, "occipital"], [/^Esfenoides$/, "esfenoides"], [/^Etmoides$/, "etmoides"],
    [/^Maxilar$/, "maxilar"], [/^Cigom/, "cigomatico"], [/^Nasal$/, "nasal"],
    [/^Lagrimal$/, "lagrimal"], [/^Palatino$/, "palatino"], [/^Cornete/, "cornete"],
    [/^V[oó]mer$/, "vomer"], [/^Mand[ií]bula$/, "mandibula"], [/^Martillo$/, "martillo"],
    [/^Yunque$/, "yunque"], [/^Estribo$/, "estribo"], [/^Hioides$/, "hioides"],
    [/^C1 /, "atlas"], [/^C2 /, "axis"], [/^C\d$/, "cervicales"], [/^D\d+$/, "dorsales"],
    [/^L\d$/, "lumbares"], [/^Sacro$/, "sacro"], [/^C[oó]ccix$/, "coccix"],
    [/^Estern[oó]n$/, "esternon"], [/^Costilla /, "costilla"],
    [/^Clav[ií]cula$/, "clavicula"], [/^Esc[aá]pula/, "escapula"], [/^H[uú]mero$/, "humero"],
    [/^Radio$/, "radio"], [/^C[uú]bito$/, "cubito"],
    [/^Escafoides del pie$/, "navicular"], [/^Escafoides$/, "escafoides"],
    [/^Semilunar$/, "semilunar"], [/^Piramidal$/, "piramidal"], [/^Pisiforme$/, "pisiforme"],
    [/^Trapecio$/, "trapecio"], [/^Trapezoide$/, "trapezoide"], [/^Hueso grande$/, "grande"],
    [/^Ganchoso$/, "ganchoso"], [/^Metacarpiano/, "metacarpianos"], [/^Falange/, "falanges"],
    [/^Coxal$/, "coxal"], [/^F[eé]mur$/, "femur"], [/^R[oó]tula$/, "rotula"],
    [/^Tibia$/, "tibia"], [/^Peron[eé]$/, "peroneo"], [/^Astr[aá]galo$/, "astragalo"],
    [/^Calc[aá]neo$/, "calcaneo"], [/^Cuboides$/, "cuboides"],
    [/^Cuneiforme medial$/, "cuneiforme_medial"], [/^Cuneiforme intermedio$/, "cuneiforme_intermedio"],
    [/^Cuneiforme lateral$/, "cuneiforme_lateral"], [/^Metatarsiano/, "metatarsianos"]
  ];
  function keyFor(name) {
    var n = name.replace(/\s*\((der|izq)\.\)\s*$/, "");
    for (var i = 0; i < KEY_RULES.length; i++) {
      if (KEY_RULES[i][0].test(n)) return KEY_RULES[i][1];
    }
    return null;
  }
  function defaultFor(id) {
    var k = keyFor(BONES[id].name);
    return (k && IMG[k] && !broken[k]) ? { key: k, src: "img/" + IMG[k].file } : null;
  }
  function hasImg(id) { return !!(images[id] || defaultFor(id)); }

  /* ---------- Estado ---------- */
  var checked = {};         // id -> true
  var images = {};          // id -> dataURL
  var openMods = { cabeza: true };
  var pendingId = null;

  var LS_KEY = "sistema-oseo:marcados";
  try {
    var saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    if (Array.isArray(saved)) saved.forEach(function (id) { if (BONES[id]) checked[id] = true; });
  } catch (e) {}
  function saveChecked() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(Object.keys(checked))); } catch (e) {}
  }

  /* ---------- Imágenes guardadas en el navegador (IndexedDB) ---------- */
  var db = null;
  function openDB() {
    return new Promise(function (resolve) {
      try {
        var req = indexedDB.open("sistema-oseo", 1);
        req.onupgradeneeded = function () { req.result.createObjectStore("img"); };
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { resolve(null); };
      } catch (e) { resolve(null); }
    });
  }
  function dbAll() {
    return new Promise(function (resolve) {
      if (!db) return resolve({});
      try {
        var out = {};
        var tx = db.transaction("img", "readonly");
        var cur = tx.objectStore("img").openCursor();
        cur.onsuccess = function () {
          var c = cur.result;
          if (c) { out[c.key] = c.value; c.continue(); } else { resolve(out); }
        };
        cur.onerror = function () { resolve(out); };
      } catch (e) { resolve({}); }
    });
  }
  function dbSet(id, val) { try { if (db) db.transaction("img", "readwrite").objectStore("img").put(val, id); } catch (e) {} }
  function dbDel(id) { try { if (db) db.transaction("img", "readwrite").objectStore("img").delete(id); } catch (e) {} }

  /* ---------- Render ---------- */
  var app = document.getElementById("app");

  function phHTML(id) {
    var name = BONES[id].name;
    var mine = images[id];
    var def = mine ? null : defaultFor(id);
    var src = mine || (def && def.src);
    if (src) {
      return '<img src="' + src + '" alt="Imagen de ' + name + '"' + (def ? ' data-key="' + def.key + '"' : '') + ' data-act="view" loading="lazy">' +
             '<span class="ph-tools">' +
             '<button type="button" data-act="replace" aria-label="Subir mi propia imagen" title="Subir mi propia imagen">↻</button>' +
             (mine ? '<button type="button" data-act="remove" aria-label="Quitar mi imagen" title="Quitar mi imagen">✕</button>' : '') +
             '</span>';
    }
    return '<span class="plus" aria-hidden="true">+</span><span>Subir imagen</span>';
  }
  function boneHTML(id) {
    var name = BONES[id].name;
    return '<article class="bone' + (checked[id] ? " on" : "") + '" data-id="' + id + '">' +
      '<div class="ph" data-act="' + (hasImg(id) ? "none" : "upload") + '" role="' + (hasImg(id) ? "group" : "button") + '" tabindex="' + (hasImg(id) ? "-1" : "0") + '" aria-label="' + (hasImg(id) ? "Imagen de " : "Subir imagen de ") + name + '">' + phHTML(id) + '</div>' +
      '<button type="button" class="name" data-act="toggle" aria-pressed="' + (checked[id] ? "true" : "false") + '">' + name + '</button>' +
      '</article>';
  }
  function render() {
    app.innerHTML = MODULES.map(function (m) {
      var body = m.groups.map(function (g) {
        return '<section class="group" data-group="' + g.items[0] + '">' +
          '<h3 class="group-head"><span>' + g.name + '</span><small></small></h3>' +
          '<div class="grid">' + g.items.map(boneHTML).join("") + '</div></section>';
      }).join("");
      return '<section class="mod' + (openMods[m.id] ? " open" : "") + '" data-mod="' + m.id + '">' +
        '<button type="button" class="mod-head" data-act="mod" aria-expanded="' + (openMods[m.id] ? "true" : "false") + '">' +
        '<span class="mod-title">' + m.title + '<span class="mod-sub">' + m.sub + '</span></span>' +
        '<span class="mod-count"></span><span class="chev" aria-hidden="true"></span></button>' +
        '<div class="mod-body"' + (openMods[m.id] ? "" : " hidden") + '>' + body + '</div></section>';
    }).join("");
    updateCounts();
  }

  function updateCard(id) {
    var card = app.querySelector('.bone[data-id="' + id + '"]');
    if (!card) return;
    card.outerHTML = boneHTML(id);
  }

  function updateCounts() {
    var n = Object.keys(checked).length;
    document.getElementById("count").textContent = n;
    document.getElementById("total").textContent = TOTAL;
    document.getElementById("fill").style.width = (n / TOTAL * 100) + "%";
    var bar = document.querySelector(".bar");
    bar.setAttribute("aria-valuenow", n);
    bar.setAttribute("aria-valuemax", TOTAL);
    document.getElementById("done").hidden = n !== TOTAL;

    MODULES.forEach(function (m) {
      var c = 0;
      m.groups.forEach(function (g) {
        var gc = g.items.filter(function (id) { return checked[id]; }).length;
        c += gc;
        var sec = app.querySelector('.group[data-group="' + g.items[0] + '"] small');
        if (sec) sec.textContent = gc + " / " + g.items.length;
      });
      var el = app.querySelector('.mod[data-mod="' + m.id + '"]');
      if (el) {
        el.querySelector(".mod-count").textContent = c + " / " + m.total;
        el.classList.toggle("full", c === m.total);
      }
    });
  }

  /* ---------- Interacción ---------- */
  var fileInput = document.getElementById("file");
  var lb = document.getElementById("lb");

  function toggle(id) {
    if (checked[id]) delete checked[id]; else checked[id] = true;
    saveChecked();
    updateCard(id);
    updateCounts();
  }

  app.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act");
    var card = t.closest(".bone");
    var id = card ? card.getAttribute("data-id") : null;

    if (act === "mod") {
      var mod = t.closest(".mod");
      var key = mod.getAttribute("data-mod");
      openMods[key] = !openMods[key];
      mod.classList.toggle("open", openMods[key]);
      t.setAttribute("aria-expanded", openMods[key] ? "true" : "false");
      mod.querySelector(".mod-body").hidden = !openMods[key];
    } else if (act === "toggle") {
      toggle(id);
    } else if (act === "upload" || act === "replace") {
      pendingId = id; fileInput.value = ""; fileInput.click();
    } else if (act === "remove") {
      delete images[id]; dbDel(id); updateCard(id);
    } else if (act === "view") {
      document.getElementById("lb-img").src = t.getAttribute("src");
      document.getElementById("lb-img").alt = "Imagen de " + BONES[id].name;
      document.getElementById("lb-name").textContent = BONES[id].name;
      var info = IMG[t.getAttribute("data-key")];
      document.getElementById("lb-credit").textContent = info
        ? "Imagen: " + (info.autor || "Wikimedia Commons") + (info.licencia ? ", " + info.licencia : "")
        : "";
      lb.hidden = false;
    }
  });

  app.addEventListener("error", function (e) {
    var t = e.target;
    var k = t && t.tagName === "IMG" ? t.getAttribute("data-key") : null;
    if (!k || broken[k]) return;
    broken[k] = true;
    Object.keys(BONES).forEach(function (id) {
      if (keyFor(BONES[id].name) === k) updateCard(id);
    });
  }, true);

  app.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches('.ph[data-act="upload"]')) {
      e.preventDefault();
      pendingId = e.target.closest(".bone").getAttribute("data-id");
      fileInput.value = ""; fileInput.click();
    }
  });

  fileInput.addEventListener("change", function () {
    var f = fileInput.files && fileInput.files[0];
    var id = pendingId;
    if (!f || !id) return;
    var url = URL.createObjectURL(f);
    var img = new Image();
    img.onload = function () {
      var max = 800, w = img.naturalWidth, h = img.naturalHeight;
      var k = Math.min(1, max / Math.max(w, h));
      var c = document.createElement("canvas");
      c.width = Math.round(w * k); c.height = Math.round(h * k);
      var ctx = c.getContext("2d");
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      var data = c.toDataURL("image/jpeg", 0.85);
      images[id] = data; dbSet(id, data); updateCard(id);
    };
    img.onerror = function () { URL.revokeObjectURL(url); };
    img.src = url;
  });

  function closeLb() { lb.hidden = true; }
  document.getElementById("lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });

  /* Reiniciar: dos toques para confirmar */
  var resetBtn = document.getElementById("reset");
  var resetTimer = null;
  resetBtn.addEventListener("click", function () {
    if (!resetBtn.classList.contains("armed")) {
      resetBtn.classList.add("armed");
      resetBtn.textContent = "Toca otra vez para confirmar";
      resetTimer = setTimeout(disarm, 3500);
      return;
    }
    clearTimeout(resetTimer);
    checked = {}; saveChecked(); disarm(); render();
  });
  function disarm() {
    resetBtn.classList.remove("armed");
    resetBtn.textContent = "Reiniciar contador";
  }

  /* ---------- Inicio ---------- */
  render();
  openDB().then(function (d) {
    db = d;
    return dbAll();
  }).then(function (all) {
    var any = false;
    Object.keys(all).forEach(function (id) { if (BONES[id]) { images[id] = all[id]; any = true; } });
    if (any) render();
  });
})();
