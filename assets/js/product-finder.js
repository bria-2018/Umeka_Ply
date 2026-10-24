/**
 * Umeka "Where are you building?" Product Finder
 * Approved 6 Applications & Descriptions per Strategy Doc Stage 3 / Stage 4.7
 * Enhanced with Rich Architectural Visuals, Specs Badges & Compact Layout
 */

(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var OPTS = [
    {
      k: 'Kitchen cabinets',
      p: 'Calibrated Plywood',
      img: 'assets/images/prod-ply.jpg',
      specs: ['BWP / Marine Grade', 'Dual-Side Calibrated', 'Zero Core Gaps'],
      t: 'Kitchens deal with steam, spills and heavy daily use. Choose a plywood grade made for moisture resistance, and keep panel thickness even so shutters and shelves fit cleanly.'
    },
    {
      k: 'Wardrobes and bedrooms',
      p: 'Calibrated Plywood',
      img: 'assets/images/prod-ply.jpg',
      specs: ['Even Panel Thickness', 'Straight Shutter Alignment', 'Seasoned Hardwood'],
      t: 'Wardrobes need flat, evenly thick panels so shutters hang straight and hinges sit true. Calibrated plywood is made for exactly that.'
    },
    {
      k: 'TV units and living rooms',
      p: 'Calibrated Plywood',
      img: 'assets/images/space-panelling.jpg',
      specs: ['Calibrated Plywood Carcasses', 'Block Board Long Shelves', 'Dimensional Stability'],
      t: 'Use plywood for carcasses and shutters. For wide shelves and long spans where a flat, rigid panel matters, add block board.'
    },
    {
      k: 'Tables and shelving',
      p: 'Block Board',
      img: 'assets/images/prod-block.jpg',
      specs: ['Solid Seasoned Batten Core', 'Zero Sag Over Wide Spans', 'Lightweight & Rigid'],
      t: 'A solid wood core gives a flat, stable panel that stays light for its size. It is a common choice for tabletops, long shelves and partitions.'
    },
    {
      k: 'Doors',
      p: 'Flush Doors',
      img: 'assets/images/prod-door.jpg',
      specs: ['Hardwood Frame Construction', 'Smooth Veneer / Laminate Ready', 'Warp-Resistant Core'],
      t: 'Smooth, flat door shutters for bedrooms, offices and cabins, ready to be finished in laminate, veneer or paint.'
    },
    {
      k: 'Offices and commercial',
      p: 'Not sure yet',
      img: 'assets/images/app-office.jpg',
      specs: ['Workstations & Desks', 'Executive Conference Tables', 'Flush Door Partitions'],
      t: 'Most projects use all three: plywood for workstations and cabinets, block board for large tables, flush doors for cabins. Send us the quantities and timeline and we will suggest a mix.'
    }
  ];

  var chips = $('#chips');
  var result = $('#result');

  if (!chips || !result) return;

  function showResult(o) {
    var isMix = (o.p === 'Not sure yet');
    var heading = isMix ? 'Plywood, block board and flush doors' : o.p;
    var ctaText = isMix ? 'Talk to an expert' : 'Enquire about ' + o.p.toLowerCase();
    var specsHtml = o.specs.map(function(s) { return '<span>' + s + '</span>'; }).join('');

    result.innerHTML =
      '<div class="finder-result-card">' +
        '<div class="finder-result-top">' +
          '<img src="' + o.img + '" alt="' + heading + '" class="finder-result-thumb">' +
          '<div class="finder-result-info">' +
            '<span class="finder-result-tag">Recommended for ' + o.k + '</span>' +
            '<h3 class="finder-result-title">' + heading + '</h3>' +
          '</div>' +
        '</div>' +
        '<p class="finder-result-copy">' + o.t + '</p>' +
        '<div class="finder-result-specs">' + specsHtml + '</div>' +
        '<div style="margin-top:0.75rem;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;">' +
          '<a class="btn primary-gold" href="#contact" data-interest="' + o.p + '">' + ctaText + ' &rarr;</a>' +
          '<a class="link" href="https://wa.me/919725208788?text=Hello%20Umeka%2C%20I%20am%20asking%20about%20' + encodeURIComponent(heading) + '%20for%20' + encodeURIComponent(o.k) + '." target="_blank" rel="noopener">Ask via WhatsApp</a>' +
        '</div>' +
      '</div>';

    if (window.bindEnquiryLinks) {
      window.bindEnquiryLinks(result);
    }
  }

  chips.innerHTML = '';
  OPTS.forEach(function (o, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'finder-app-btn chip';
    b.innerHTML = '<span>' + o.k + '</span><span class="btn-arrow">&rarr;</span>';
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () {
      $$('.chip', chips).forEach(function (c) {
        c.setAttribute('aria-pressed', 'false');
      });
      b.setAttribute('aria-pressed', 'true');
      showResult(o);
    });
    chips.appendChild(b);
  });

  showResult(OPTS[0]);
})();
