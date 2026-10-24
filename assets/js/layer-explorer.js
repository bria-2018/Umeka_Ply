/**
 * Umeka 3D Interactive Product Construction Explorer
 * Exploded views for Calibrated Plywood, Block Board, and Flush Doors.
 */

(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var DATA = {
    ply: {
      title: 'Calibrated Plywood (Illustrative Construction)',
      text: 'Thin seasoned timber veneers stacked with alternating 90° grain orientations and bonded under hydraulic pressure. Dual-side calibration creates an even, uniform thickness across the sheet.',
      layers: [
        { name: 'Face Veneer (Hardwood)', grain: 'Horizontal', type: 'h', color: '#D9BE93' },
        { name: 'Cross-Band Veneer', grain: 'Vertical', type: 'v', color: '#C7A578' },
        { name: 'Inner Core Veneer', grain: 'Horizontal', type: 'h', color: '#D3B584' },
        { name: 'Center Core Veneer', grain: 'Vertical', type: 'v', color: '#BE9A6C' },
        { name: 'Inner Core Veneer', grain: 'Horizontal', type: 'h', color: '#D3B584' },
        { name: 'Cross-Band Veneer', grain: 'Vertical', type: 'v', color: '#C7A578' },
        { name: 'Back Veneer', grain: 'Horizontal', type: 'h', color: '#D9BE93' }
      ]
    },
    block: {
      title: 'Block Board (Solid Timber Batten Core)',
      text: 'Seasoned solid wood batten strips positioned between balanced cross-band veneers. Provides longitudinal stiffness against sagging over horizontal spans.',
      layers: [
        { name: 'Face Veneer', grain: 'Horizontal', type: 'h', color: '#D9BE93' },
        { name: 'Cross-Band Veneer', grain: 'Vertical', type: 'v', color: '#C7A578' },
        { name: 'Solid Seasoned Timber Batten Core', grain: 'Horizontal Battens', type: 'strips', color: '#B98F5E' },
        { name: 'Cross-Band Veneer', grain: 'Vertical', type: 'v', color: '#C7A578' },
        { name: 'Back Veneer', grain: 'Horizontal', type: 'h', color: '#D9BE93' }
      ]
    },
    door: {
      title: 'Flush Door (Solid Frame & Core Construction)',
      text: 'Hardwood perimeter framing with seasoned core filler, pressed with calibrated surface skins for dimensional stability.',
      layers: [
        { name: 'Face Overlay Skin', grain: 'Horizontal', type: 'h', color: '#D9BE93' },
        { name: 'Seasoned Hardwood Frame & Core Infill', grain: 'Solid Frame', type: 'frame', color: '#B98F5E' },
        { name: 'Back Overlay Skin', grain: 'Horizontal', type: 'h', color: '#D9BE93' }
      ]
    }
  };

  var stack = $('#stack');
  var legend = $('#legend');
  var range = $('#explode');
  var titleEl = $('#l-title');
  var textEl = $('#l-text');

  if (!stack || !range) return;

  function render(k) {
    var d = DATA[k];
    if (!d) return;
    var n = d.layers.length;

    if (titleEl) titleEl.textContent = d.title;
    if (textEl) textEl.textContent = d.text;

    stack.style.setProperty('--n', n);
    stack.innerHTML = '';
    if (legend) legend.innerHTML = '';

    d.layers.forEach(function (L, i) {
      // 3D Layer element
      var el = document.createElement('div');
      el.className = 'ply-3d-layer ' + L.type;
      el.style.setProperty('--i', n - 1 - i); // top layer first
      el.style.setProperty('--c', L.color);
      el.style.setProperty('--c2', L.color);
      el.dataset.layerIndex = i;
      stack.appendChild(el);

      // Legend Item
      if (legend) {
        var li = document.createElement('li');
        li.className = 'layer-legend-item';
        li.dataset.layerIndex = i;
        li.innerHTML =
          '<div style="display:flex;align-items:center;">' +
            '<i class="layer-color-dot" style="background:' + L.color + '"></i>' +
            '<span>' + L.name + '</span>' +
          '</div>' +
          '<span class="layer-grain-tag">' + L.grain + '</span>';

        // Hover syncing without transform override
        li.addEventListener('mouseenter', function () {
          el.classList.add('active-hover');
          li.classList.add('active-focus');
        });
        li.addEventListener('mouseleave', function () {
          el.classList.remove('active-hover');
          li.classList.remove('active-focus');
        });

        el.addEventListener('mouseenter', function () {
          li.classList.add('active-focus');
        });
        el.addEventListener('mouseleave', function () {
          li.classList.remove('active-focus');
        });

        legend.appendChild(li);
      }
    });

    $$('.eng-tab-btn, .tab').forEach(function (t) {
      t.setAttribute('aria-selected', t.dataset.k === k ? 'true' : 'false');
    });
  }

  function setGap(v) {
    stack.style.setProperty('--gap', (4 + v * 0.32) + 'px');
  }

  range.addEventListener('input', function () {
    setGap(+range.value);
  });

  $$('.eng-tab-btn, .tab').forEach(function (t) {
    t.addEventListener('click', function () {
      render(t.dataset.k);
      setGap(+range.value);
    });
  });

  render('ply');
  setGap(0);

  // Smooth scroll orchestrated reveal
  var played = false;
  function play() {
    if (played) return;
    played = true;
    if (reduce) {
      range.value = 60;
      setGap(60);
      return;
    }
    var t0 = null;
    var dur = 1400;
    var to = 65;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val = Math.round(ease * to);
      range.value = val;
      setGap(val);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var sceneViewport = $('.eng-scene-viewport') || $('.scene');
  if (sceneViewport && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      });
    }, { threshold: 0.35 });
    io.observe(sceneViewport);
  } else {
    play();
  }
})();
