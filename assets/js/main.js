/**
 * Umeka Production JavaScript
 * Handles Header Scroll, Mobile Drawer, 4-Slide Hero Banner, Form Pre-fill, WhatsApp Integration & Document Modals
 */

(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Update footer year dynamically
  var yrEl = $('#yr');
  if (yrEl) {
    yrEl.textContent = new Date().getFullYear();
  }

  // Header scroll detection (transitions to brand green at > 20px)
  var hdr = $('#hdr');
  if (hdr) {
    var checkScroll = function () {
      hdr.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // Mobile navigation drawer
  var drawer = $('#drawer');
  var menuOpenBtn = $('#menu-open');
  var menuCloseBtn = $('#menu-close');

  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (menuOpenBtn) menuOpenBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && menuCloseBtn) {
      menuCloseBtn.focus();
    } else if (menuOpenBtn) {
      menuOpenBtn.focus();
    }
  }

  if (menuOpenBtn) {
    menuOpenBtn.addEventListener('click', function () { setDrawer(true); });
  }
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', function () { setDrawer(false); });
  }

  $$('#drawer a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      setDrawer(false);
    }
  });

  // Notice bar close
  var noticeX = $('#notice-x');
  var noticeBar = $('#notice');
  if (noticeX && noticeBar) {
    noticeX.addEventListener('click', function () {
      noticeBar.style.display = 'none';
    });
  }

  // ==========================================================================
  // FULL-WIDTH 4-SLIDE HERO BANNER CONTROLLER
  // ==========================================================================
  var heroSlider = $('#hero-slider');
  if (heroSlider) {
    var slides = $$('.hero-slide', heroSlider);
    var dots = $$('.hero-dot-btn', heroSlider);
    var prevBtn = $('#hero-prev', heroSlider);
    var nextBtn = $('#hero-next', heroSlider);
    var currentIndex = 0;
    var autoPlayTimer = null;
    var intervalTime = 6500; // 6.5 seconds per slide
    var isHovered = false;

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      slides.forEach(function (slide, i) {
        var isActive = (i === currentIndex);
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      dots.forEach(function (dot, i) {
        var isActive = (i === currentIndex);
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(function () {
        if (!isHovered) {
          nextSlide();
        }
      }, intervalTime);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startAutoPlay();
      });
    }

    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () {
        goToSlide(idx);
        startAutoPlay();
      });
    });

    heroSlider.addEventListener('mouseenter', function () { isHovered = true; });
    heroSlider.addEventListener('mouseleave', function () { isHovered = false; });
    heroSlider.addEventListener('focusin', function () { isHovered = true; });
    heroSlider.addEventListener('focusout', function () { isHovered = false; });

    // Keyboard navigation
    heroSlider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        nextSlide();
        startAutoPlay();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        startAutoPlay();
      }
    });

    // Touch Swipe Support
    var touchStartX = 0;
    var touchEndX = 0;
    heroSlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoPlay();
      }
    }, { passive: true });

    goToSlide(0);
    startAutoPlay();
  }

  // Bind CTA links with data attributes to pre-fill inquiry forms
  function bindEnquiryLinks(root) {
    $$('a[data-interest], a[data-type]', root || document).forEach(function (a) {
      if (a._bound) return;
      a._bound = true;
      a.addEventListener('click', function () {
        var interestInput = $('#f-interest');
        var typeInput = $('#f-type');
        if (a.dataset.interest && interestInput) {
          interestInput.value = a.dataset.interest;
        }
        if (a.dataset.type && typeInput) {
          typeInput.value = a.dataset.type;
        }
      });
    });
  }
  bindEnquiryLinks(document);
  window.bindEnquiryLinks = bindEnquiryLinks;

  // Form Submission (WhatsApp formatting + user feedback across all forms)
  var allEnqForms = $$('form#enq, form.enq-card-form, form.enq-form');
  allEnqForms.forEach(function (enqForm) {
    enqForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.target;
      var statusEl = form.querySelector('.f-status-msg') || form.querySelector('.f-status') || $('#f-status');

      var name = form.name ? form.name.value.trim() : '';
      var phone = form.phone ? form.phone.value.trim() : '';
      var business = form.business ? form.business.value.trim() : '';
      var email = form.email ? form.email.value.trim() : '';
      var city = form.city ? form.city.value.trim() : '';
      var type = form.type ? form.type.value : '';
      var interest = form.interest ? form.interest.value : '';
      var projectType = form.project_type ? form.project_type.value : '';
      var approxQty = form.approx_qty ? form.approx_qty.value.trim() : '';
      var msg = form.msg ? form.msg.value.trim() : '';
      var consent = form.consent ? form.consent.checked : true;

      if (!name || !phone) {
        if (statusEl) {
          statusEl.style.color = 'var(--terracotta)';
          statusEl.textContent = 'Please provide your name and phone number.';
        }
        return;
      }

      if (!consent) {
        if (statusEl) {
          statusEl.style.color = 'var(--terracotta)';
          statusEl.textContent = 'Please accept the privacy consent to proceed.';
        }
        return;
      }

      var text = 'Hello Umeka Team, I would like to connect regarding a requirement.\n\n';
      text += '👤 Name: ' + name + '\n';
      text += '📞 Phone: ' + phone + '\n';
      if (business) text += '🏢 Firm / Business: ' + business + '\n';
      if (email) text += '✉️ Email: ' + email + '\n';
      if (city) text += '📍 City & State: ' + city + '\n';
      if (type) text += '💼 Category / Role: ' + type + '\n';
      if (interest) text += '🪵 Product Interest: ' + interest + '\n';
      if (projectType) text += '🏗️ Project Type: ' + projectType + '\n';
      if (approxQty) text += '📦 Approximate Requirement: ' + approxQty + '\n';
      if (msg) text += '💬 Requirement Details: ' + msg + '\n';

      if (statusEl) {
        statusEl.style.color = 'var(--green)';
        statusEl.textContent = 'Thank you! Connecting directly to our sales desk via WhatsApp...';
      }

      var waUrl = 'https://wa.me/919725208788?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank', 'noopener');
    });
  });

  // ==========================================================================
  // DOCUMENTED VERIFICATION INTERACTIVE FILTER & MODAL
  // ==========================================================================
  var docData = {
    'BIS & IS Standards Specification': {
      category: 'BIS & Compliance',
      desc: 'Bureau of Indian Standards compliance parameters, dimension tolerances, and factory manufacturing licence validity records.',
      status: 'Under Verification',
      std: 'IS 303 / IS 710 / IS 1659',
      protocol: 'Dimension Gauge & Tensile Compliance'
    },
    'Glue Bond & Moisture Test Reports': {
      category: 'Laboratory Test Report',
      desc: 'Laboratory cyclic boil test, shear strength, knife test datasheets, and moisture resistance metrics for BWP/MR phenolic adhesives.',
      status: 'Laboratory Validated',
      std: '72-Hour Boiling Test Benchmark',
      protocol: 'Hydraulic Shear & Delamination Resistance'
    },
    'Emission & Sustainable Timber Sourcing': {
      category: 'Eco & Timber Provenance',
      desc: 'Formaldehyde emission classifications and certified plantation agro-forestry hardwood origin documentation.',
      status: 'Sustainably Sourced',
      std: 'Low Formaldehyde Emission',
      protocol: 'Controlled Plantation Agro-Hardwood'
    },
    'Official Warranty Guarantee Terms': {
      category: 'Warranty Certificate',
      desc: 'Official Umeka warranty terms: coverage scope against core delamination, borer immunity warranty, and transparent claim guidelines.',
      status: 'Official Warranty Policy',
      std: 'Borer-Free & Anti-Delamination',
      protocol: 'Factory Replacement Guarantee'
    }
  };

  // Filter Buttons
  var docFilterBtns = $$('.doc-filter-btn');
  var docCards = $$('.doc-card');
  if (docFilterBtns.length > 0) {
    docFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        docFilterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.dataset.filter;
        docCards.forEach(function (card) {
          if (filter === 'all' || card.dataset.docCat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Modal Handling
  var docModal = $('#docModal');
  var docModalTitle = $('#docModalTitle');
  var docModalDesc = $('#docModalDesc');
  var docModalBadge = $('#docModalBadge');
  var docModalStatus = $('#docModalStatus');
  var docModalStd = $('#docModalStd');
  var docModalProtocol = $('#docModalProtocol');
  var docModalAction = $('#docModalAction');
  var docModalClose = $('#docModalClose');
  var docModalDismiss = $('#docModalDismiss');

  function openDocModal(docName) {
    if (!docModal) return;
    var info = docData[docName] || {
      category: 'Verification Datasheet',
      desc: 'Technical specification datasheet currently in preparation for direct download.',
      status: 'Under Verification',
      std: 'Standard Manufacturing Parameters',
      protocol: 'Internal Quality Control'
    };

    if (docModalTitle) docModalTitle.textContent = docName;
    if (docModalDesc) docModalDesc.textContent = info.desc;
    if (docModalBadge) docModalBadge.textContent = info.category;
    if (docModalStatus) docModalStatus.innerHTML = '<span class="pending">' + info.status + '</span>';
    if (docModalStd) docModalStd.textContent = info.std;
    if (docModalProtocol) docModalProtocol.textContent = info.protocol;

    if (docModalAction) {
      var waMsg = 'Hello Umeka, I would like to request the technical document: "' + docName + '".';
      docModalAction.href = 'https://wa.me/919725208788?text=' + encodeURIComponent(waMsg);
    }

    docModal.classList.add('open');
    docModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDocModal() {
    if (!docModal) return;
    docModal.classList.remove('open');
    docModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  $$('[data-doc-name]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var docName = btn.dataset.docName;
      openDocModal(docName);
    });
  });

  if (docModalClose) docModalClose.addEventListener('click', closeDocModal);
  if (docModalDismiss) docModalDismiss.addEventListener('click', closeDocModal);
  if (docModal) {
    docModal.addEventListener('click', function (e) {
      if (e.target === docModal) closeDocModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && docModal && docModal.classList.contains('open')) {
      closeDocModal();
    }
  });

  // ==========================================================================
  // MATERIAL ARCHITECTURE INTERACTIVE TAB SWITCHER
  // ==========================================================================
  var archTabCards = $$('.mat-arch-tab-card');
  var archIsoLayers = $$('.iso-ply-layer');
  if (archTabCards.length > 0) {
    archTabCards.forEach(function (card) {
      card.addEventListener('click', function () {
        archTabCards.forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');

        var targetLayer = card.dataset.layerTarget;
        if (targetLayer) {
          archIsoLayers.forEach(function (l) {
            if (l.dataset.layerType === targetLayer || targetLayer === 'all') {
              l.style.transform = 'translateX(6px) scale(1.02)';
              l.style.borderColor = 'var(--yellow)';
            } else {
              l.style.transform = '';
              l.style.borderColor = '';
            }
          });
        }
      });
    });
  }

  // ==========================================================================
  // INSTAGRAM CAROUSEL CONTROLLER
  // ==========================================================================
  var instaTrack = $('#instaTrack');
  var instaPrev = $('#instaPrev');
  var instaNext = $('#instaNext');

  if (instaTrack && (instaPrev || instaNext)) {
    var scrollStep = 320;

    if (instaNext) {
      instaNext.addEventListener('click', function () {
        instaTrack.scrollBy({ left: scrollStep, behavior: 'smooth' });
      });
    }

    if (instaPrev) {
      instaPrev.addEventListener('click', function () {
        instaTrack.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      });
    }
  }

  // ==========================================================================
  // OWNER VIDEO INTERACTION
  // ==========================================================================
  var ownerPlayBtn = $('#ownerPlayBtn');
  var ownerPoster = $('#ownerPoster');
  var ownerIframe = $('#ownerVideoIframe');

  function triggerOwnerVideo() {
    if (ownerIframe && ownerIframe.getAttribute('src')) {
      if (ownerPoster) ownerPoster.style.display = 'none';
      ownerIframe.style.display = 'block';
    } else {
      var waMsg = "Hello Umeka, I would like to watch the Founder's address video.";
      if (confirm("Founder's address video slot is ready. Would you like to connect directly on WhatsApp?")) {
        window.open('https://wa.me/919725208788?text=' + encodeURIComponent(waMsg), '_blank', 'noopener');
      }
    }
  }

  if (ownerPlayBtn) {
    ownerPlayBtn.addEventListener('click', triggerOwnerVideo);
  }
  if (ownerPoster) {
    ownerPoster.addEventListener('click', triggerOwnerVideo);
  }

  // ==========================================================================
  // MANUFACTURING PROCESS VIDEO INTERACTION
  // ==========================================================================
  var playProcessVideo = $('#playProcessVideo');
  var videoPoster = $('#videoPoster');
  var videoEmbedWrap = $('#videoEmbedWrap');
  var videoIframe = $('#videoIframe');

  function triggerProcessVideo() {
    if (videoIframe && videoIframe.getAttribute('src')) {
      if (videoPoster) videoPoster.style.display = 'none';
      if (videoEmbedWrap) videoEmbedWrap.style.display = 'block';
    } else {
      var waMsg = 'Hello Umeka, I would like to watch the full manufacturing video tour.';
      if (confirm('The factory process video slot is ready. Would you like to request the official manufacturing walkthrough video on WhatsApp?')) {
        window.open('https://wa.me/919725208788?text=' + encodeURIComponent(waMsg), '_blank', 'noopener');
      }
    }
  }

  if (playProcessVideo) playProcessVideo.addEventListener('click', triggerProcessVideo);

  // ==========================================================================
  // FIRST-TIME VISITOR WELCOME POPUP
  // ==========================================================================
  var welcomePopup = $('#welcomePopup');
  var welcomePopupClose = $('#welcomePopupClose');
  var welcomePopupSkip = $('#welcomePopupSkip');
  var welcomePopupForm = $('#welcomePopupForm');

  function openWelcomePopup() {
    if (!welcomePopup) return;
    welcomePopup.classList.add('active');
    welcomePopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeWelcomePopup() {
    if (!welcomePopup) return;
    welcomePopup.classList.remove('active');
    welcomePopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    try {
      sessionStorage.setItem('umeka_first_popup_seen', 'true');
    } catch (e) {}
  }

  if (welcomePopup) {
    if (window.location.search.indexOf('nopopup') !== -1) {
      // Allow QA screenshots without popup
    } else {
      var hasSeen = false;
      try {
        hasSeen = sessionStorage.getItem('umeka_first_popup_seen') === 'true';
      } catch (e) {}

      if (!hasSeen) {
        setTimeout(openWelcomePopup, 2000);
      }
    }

    if (welcomePopupClose) welcomePopupClose.addEventListener('click', closeWelcomePopup);
    if (welcomePopupSkip) welcomePopupSkip.addEventListener('click', closeWelcomePopup);
    welcomePopup.addEventListener('click', function (e) {
      if (e.target === welcomePopup) closeWelcomePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && welcomePopup.classList.contains('active')) {
        closeWelcomePopup();
      }
    });

    if (welcomePopupForm) {
      welcomePopupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = ($('#wp-name', welcomePopupForm) || {}).value || '';
        var phone = ($('#wp-phone', welcomePopupForm) || {}).value || '';
        var role = ($('#wp-role', welcomePopupForm) || {}).value || '';

        var waText = 'Hello Umeka, I would like to request the 2026 Master Product Catalogue & Architectural Specification Guide.\n\n' +
                     '👤 Name: ' + name + '\n' +
                     '📞 Phone: ' + phone + '\n' +
                     '🏢 Role: ' + role;
        
        closeWelcomePopup();
        window.open('https://wa.me/919725208788?text=' + encodeURIComponent(waText), '_blank', 'noopener');
      });
    }
  }
})();
