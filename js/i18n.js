/**
 * i18n.js - Simple bilingual language switcher (DE/EN)
 * Hybrid approach: tries fetch first, falls back to embedded translations
 */
(function() {
  'use strict';

  // Embedded fallback translations
  var FALLBACK = {
    de: {
      "page.title": "Jana Wünsch — Master Professional in Business Management",
      "page.description": "Jana Wünsch — Betriebswirtin, Digitalisierung & Data Enthusiast. Portfolio, Skills und Kontakt für Recruiter.",
      "hero.name": "Jana Wünsch",
      "hero.subtitle": "Business Master Professional — Digitalisierung • Data • Prozesse",
      "hero.tagline": "Diese Seite ist ein eigenes Projekt: umgesetzt ohne Programmierkenntnisse, mit Copilot & selbst erlernten HTML-Basics. Learning-Mindset trifft Business-Expertise.",
      "hero.contact": "Kontakt",
      "hero.cv": "CV herunterladen",
      "hero.portfolio": "Portfolio",
      "about.title": "Über mich",
      "about.text": "Ich bin Betriebswirtin mit großer Leidenschaft für Digitalisierung, KI und datengestützte Entscheidungen. Wenn moderne Tools Prozesse vereinfachen, Entscheidungen verbessern oder Workflows spürbar beschleunigen, ergibt sich echter Mehrwert.",
      "about.core": "Kern",
      "about.core.1": "Controlling, Reporting & KPI-Analysen",
      "about.core.2": "Microsoft Excel (Pivot, SVERWEIS)",
      "about.core.3": "Microsoft 365 Copilot & Power BI (aktuelle Weiterbildung)",
      "about.core.4": "Analytisches Denken, Prozessoptimierung, Teamarbeit",
      "about.core.5": "KI Management",
      "profile.title": "Kurzprofil",
      "profile.jobtitle.label": "Jobtitel",
      "profile.jobtitle": "Master Professional in Business Management",
      "profile.contact.label": "Kontakt",
      "profile.email": "Email:",
      "profile.phone": "Tel:",
      "profile.instagram": "Instagram:",
      "portfolio.title": "Portfolio — Skills, ausgewählte eigene Projekte & Privat",
      "portfolio.hardsoft.title": "Hard- & Softskills",
      "portfolio.hardsoft.desc": "Meine am stärksten ausgeprägten Fähigkeiten im Überblick.",
      "portfolio.impact.title": "Impact vs. Effort — Analyse",
      "portfolio.impact.desc": "Mit jedem Projekt wurden meine Ergebnisse stärker – und der nötige Aufwand geringer.",
      "portfolio.interests.title": "Interessen",
      "portfolio.interests.desc": "Was mich inspiriert und im Gleichgewicht hält.",
      "career.title": "Laufbahn",
      "career.1": "06/2025–heute — Weiterbildung zur KI-Managerin (IHK)",
      "career.2": "2024 — Betriebswirtin",
      "career.3": "10/2022–06/2025 — Stellvertretende kaufmännische Leitung",
      "career.4": "01/2019-10/2022 — Kaufmännische Angestellte",
      "career.5": "2018 — Handelsfachwirtin",
      "skills.title": "Skills & Tools",
      "skills.list": "Controlling, Reporting, Prozessoptimierung, KPI-Analyse, Power BI, Excel (Power Query, Pivot, SVERWEIS), Microsoft 365 Copilot, AI-Tooling & Prompting",
      "contact.title": "Kontakt",
      "contact.text": "Für Kooperationen, Ideen oder Fragen – am besten telefonisch erreichbar.",
      "contact.email": "E‑Mail schreiben",
      "contact.cv": "CV herunterladen",
      "footer.text": "Jana Wünsch — Business Master Professional",
      "footer.contact": "Kontakt",
      "modal.close": "Schließen",
      "modal.open": "Interaktiven Report öffnen"
    },
    en: {
      "page.title": "Jana Wünsch — Master Professional in Business Management",
      "page.description": "Jana Wünsch — Business Administrator, Digitalization & Data Enthusiast. Portfolio, Skills and Contact for Recruiters.",
      "hero.name": "Jana Wünsch",
      "hero.subtitle": "Business Master Professional — Digitalization • Data • Processes",
      "hero.tagline": "This website is a personal project: built without programming knowledge, using Copilot & self-taught HTML basics. Learning mindset meets business expertise.",
      "hero.contact": "Contact",
      "hero.cv": "Download CV",
      "hero.portfolio": "Portfolio",
      "about.title": "About Me",
      "about.text": "I am a business administrator with a great passion for digitalization, AI and data-driven decisions. When modern tools simplify processes, improve decisions or noticeably accelerate workflows, real added value emerges.",
      "about.core": "Core",
      "about.core.1": "Controlling, Reporting & KPI Analysis",
      "about.core.2": "Microsoft Excel (Pivot, VLOOKUP)",
      "about.core.3": "Microsoft 365 Copilot & Power BI (ongoing training)",
      "about.core.4": "Analytical Thinking, Process Optimization, Teamwork",
      "about.core.5": "AI Management",
      "profile.title": "Quick Profile",
      "profile.jobtitle.label": "Job Title",
      "profile.jobtitle": "Master Professional in Business Management",
      "profile.contact.label": "Contact",
      "profile.email": "Email:",
      "profile.phone": "Phone:",
      "profile.instagram": "Instagram:",
      "portfolio.title": "Portfolio — Skills, Selected Personal Projects & Private",
      "portfolio.hardsoft.title": "Hard & Soft Skills",
      "portfolio.hardsoft.desc": "An overview of my most pronounced abilities.",
      "portfolio.impact.title": "Impact vs. Effort — Analysis",
      "portfolio.impact.desc": "With each project, my results became stronger – and the required effort decreased.",
      "portfolio.interests.title": "Interests",
      "portfolio.interests.desc": "What inspires me and keeps me balanced.",
      "career.title": "Career",
      "career.1": "06/2025–present — Training as AI Manager (IHK)",
      "career.2": "2024 — Business Administrator",
      "career.3": "10/2022–06/2025 — Deputy Commercial Manager",
      "career.4": "01/2019-10/2022 — Commercial Employee",
      "career.5": "2018 — Retail Business Specialist",
      "skills.title": "Skills & Tools",
      "skills.list": "Controlling, Reporting, Process Optimization, KPI Analysis, Power BI, Excel (Power Query, Pivot, VLOOKUP), Microsoft 365 Copilot, AI-Tooling & Prompting",
      "contact.title": "Contact",
      "contact.text": "For collaborations, ideas or questions – best reached by phone.",
      "contact.email": "Send Email",
      "contact.cv": "Download CV",
      "footer.text": "Jana Wünsch — Business Master Professional",
      "footer.contact": "Contact",
      "modal.close": "Close",
      "modal.open": "Open Interactive Report"
    }
  };

  var currentLang = 'de';
  var translations = {};

  /**
   * Get base URL for fetching locale files
   */
  function getBaseUrl() {
    // Use document.baseURI for relative paths
    var base = document.baseURI || window.location.href;
    // Remove filename if present
    return base.replace(/\/[^\/]*$/, '/');
  }

  /**
   * Load translations - try fetch first, fall back to embedded
   */
  function loadTranslations(lang, callback) {
    var baseUrl = getBaseUrl();
    var url = baseUrl + 'locales/' + lang + '.json';

    // Try to fetch the JSON file
    fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        translations[lang] = data;
        if (callback) callback();
      })
      .catch(function() {
        // Fallback to embedded translations
        translations[lang] = FALLBACK[lang] || {};
        if (callback) callback();
      });
  }

  /**
   * Get translation for a key
   */
  function t(key) {
    var langData = translations[currentLang] || {};
    return langData[key] || key;
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   */
  function applyTranslations() {
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var translation = t(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });

    // Handle title attributes
    var titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(function(el) {
      var key = el.getAttribute('data-i18n-title');
      var translation = t(key);
      if (translation && translation !== key) {
        el.setAttribute('title', translation);
      }
    });

    // Handle aria-label attributes
    var ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(function(el) {
      var key = el.getAttribute('data-i18n-aria');
      var translation = t(key);
      if (translation && translation !== key) {
        el.setAttribute('aria-label', translation);
      }
    });

    // Update document lang attribute
    document.documentElement.lang = currentLang;

    // Update page title
    var pageTitle = t('page.title');
    if (pageTitle && pageTitle !== 'page.title') {
      document.title = pageTitle;
    }

    // Update meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      var descText = t('page.description');
      if (descText && descText !== 'page.description') {
        metaDesc.setAttribute('content', descText);
      }
    }

    // Update active button state
    updateButtonStates();
  }

  /**
   * Update language button active states
   */
  function updateButtonStates() {
    var buttons = document.querySelectorAll('[data-lang-btn]');
    buttons.forEach(function(btn) {
      var btnLang = btn.getAttribute('data-lang-btn');
      if (btnLang === currentLang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Switch to a different language
   */
  function switchLanguage(lang) {
    if (lang === currentLang) return;
    if (lang !== 'de' && lang !== 'en') return;

    currentLang = lang;

    // Save preference
    try {
      localStorage.setItem('i18n-lang', lang);
    } catch (e) {
      // localStorage not available
    }

    // Load and apply
    if (translations[lang]) {
      applyTranslations();
    } else {
      loadTranslations(lang, applyTranslations);
    }
  }

  /**
   * Get saved language preference or detect from browser
   */
  function getInitialLanguage() {
    // Check localStorage
    try {
      var saved = localStorage.getItem('i18n-lang');
      if (saved === 'de' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      // localStorage not available
    }

    // Check browser language
    var browserLang = navigator.language || navigator.userLanguage || 'de';
    if (browserLang.startsWith('en')) {
      return 'en';
    }

    // Default to German
    return 'de';
  }

  /**
   * Initialize i18n system
   */
  function init() {
    currentLang = getInitialLanguage();

    // Set up button event listeners
    var buttons = document.querySelectorAll('[data-lang-btn]');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lang = this.getAttribute('data-lang-btn');
        switchLanguage(lang);
      });
    });

    // Load initial language and apply
    loadTranslations(currentLang, applyTranslations);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.i18n = {
    switchLanguage: switchLanguage,
    t: t,
    getCurrentLang: function() { return currentLang; }
  };
})();
