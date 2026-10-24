/**
 * Umeka "Where are you building?" Product Finder
 * Approved 6 Applications & Descriptions per Strategy Doc Stage 3 / Stage 4.7
 */

(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var OPTS = [
    {
      k: 'Kitchen cabinets',
      p: 'Calibrated Plywood',
      t: 'Kitchens deal with steam, spills and heavy daily use. Choose a plywood grade made for moisture resistance, and keep panel thickness even so shutters and shelves fit cleanly.'
    },
    {
      k: 'Wardrobes and bedrooms',
      p: 'Calibrated Plywood',
      t: 'Wardrobes need flat, evenly thick panels so shutters hang straight and hinges sit true. Calibrated plywood is made for exactly that.'
    },
    {
      k: 'TV units and living rooms',
      p: 'Calibrated Plywood',
      t: 'Use plywood for carcasses and shutters. For wide shelves and long spans where a flat, rigid panel matters, add block board.'
    },
    {
      k: 'Tables and shelving',
      p: 'Block Board',
      t: 'A solid wood core gives a flat, stable panel that stays light for its size. It is a common choice for tabletops, long shelves and partitions.'
    },
    {
      k: 'Doors',
      p: 'Flush Doors',
      t: 'Smooth, flat door shutters for bedrooms, offices and cabins, ready to be finished in laminate, veneer or paint.'
    },
    {
      k: 'Offices and commercial',
      p: 'Not sure yet',
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

    result.innerHTML =
      '<span class="tag">Recommended for ' + o.k.toLowerCase() + '</span>' +
      '<h3>' + heading + '</h3>' +
      '<p>' + o.t + '</p>' +
      '<div style="margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;">' +
        '<a class="btn primary-gold" href="#contact" data-interest="' + o.p + '">' + ctaText + '</a>' +
      '</div>';

    if (window.bindEnquiryLinks) {
      window.bindEnquiryLinks(result);
    }
  }

  chips.innerHTML = '';
  OPTS.forEach(function (o, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = o.k;
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
