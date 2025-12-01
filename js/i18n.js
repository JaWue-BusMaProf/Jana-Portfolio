/**
 * i18n.js - Simple bilingual language switcher (German/English)
 * 
 * Hybrid approach:
 * 1. Tries to fetch translations from ./locales/{lang}.json
 * 2. Falls back to embedded FALLBACK translations if fetch fails
 * 
 * Uses document.baseURI for relative paths
 */
(function() {
  'use strict';

  // FALLBACK translations (embedded for offline/local file access)
  const FALLBACK = {
    de: {
      "page_title": "Jana Wünsch — Master Professional in Business Management",
      "hero_title": "Jana Wünsch",
      "hero_sub": "Business Master Professional — Digitalisierung • Data • Prozesse",
      "hero_tagline": "Diese Seite ist ein eigenes Projekt: umgesetzt ohne Programmierkenntnisse, mit Copilot & selbst erlernten HTML-Basics. Learning-Mindset trifft Business-Expertise.",
      "btn_contact": "Kontakt",
      "btn_cv": "CV herunterladen",
      "btn_portfolio": "Portfolio",
      "about_heading": "Über mich",
      "about_text": "Ich bin Betriebswirtin mit großer Leidenschaft für Digitalisierung, KI und datengestützte Entscheidungen. Wenn moderne Tools Prozesse vereinfachen, Entscheidungen verbessern oder Workflows spürbar beschleunigen, ergibt sich echter Mehrwert.",
      "about_core": "Kern",
      "about_core_1": "Controlling, Reporting & KPI-Analysen",
      "about_core_2": "Microsoft Excel (Pivot, SVERWEIS)",
      "about_core_3": "Microsoft 365 Copilot & Power BI (aktuelle Weiterbildung)",
      "about_core_4": "Analytisches Denken, Prozessoptimierung, Teamarbeit",
      "about_core_5": "KI Management",
      "profile_heading": "Kurzprofil",
      "profile_jobtitle": "Jobtitel",
      "profile_jobtitle_value": "Master Professional in Business Management",
      "profile_contact": "Kontakt",
      "portfolio_heading": "Portfolio — Skills, ausgewählte eigene Projekte & Privat",
      "portfolio_skills_title": "Hard- & Softskills",
      "portfolio_skills_desc": "Meine am stärksten ausgeprägten Fähigkeiten im Überblick.",
      "portfolio_impact_title": "Impact vs. Effort — Analyse",
      "portfolio_impact_desc": "Mit jedem Projekt wurden meine Ergebnisse stärker – und der nötige Aufwand geringer.",
      "portfolio_interests_title": "Interessen",
      "portfolio_interests_desc": "Was mich inspiriert und im Gleichgewicht hält.",
      "career_heading": "Laufbahn",
      "career_1": "06/2025–heute — Weiterbildung zur KI-Managerin (IHK)",
      "career_2": "2024 — Betriebswirtin",
      "career_3": "10/2022–06/2025 — Stellvertretende kaufmännische Leitung",
      "career_4": "01/2019-10/2022 — Kaufmännische Angestellte",
      "career_5": "2018 — Handelsfachwirtin",
      "skills_heading": "Skills & Tools",
      "contact_heading": "Kontakt",
      "contact_text": "Für Kooperationen, Ideen oder Fragen – am besten telefonisch erreichbar.",
      "btn_email": "E‑Mail schreiben",
      "footer_text": "Jana Wünsch — Business Master Professional"
    },
    en: {
      "page_title": "Jana Wünsch — Master Professional in Business Management",
      "hero_title": "Jana Wünsch",
      "hero_sub": "Business Master Professional — Digitalization • Data • Processes",
      "hero_tagline": "This site is my own project: built without prior coding skills, using Copilot & self-taught HTML basics. Learning mindset meets business expertise.",
      "btn_contact": "Contact",
      "btn_cv": "Download CV",
      "btn_portfolio": "Portfolio",
      "about_heading": "About Me",
      "about_text": "I am a business economist with a passion for digitalization, AI, and data-driven decisions. When modern tools simplify processes, improve decisions, or noticeably accelerate workflows, real value emerges.",
      "about_core": "Core",
      "about_core_1": "Controlling, Reporting & KPI Analysis",
      "about_core_2": "Microsoft Excel (Pivot, VLOOKUP)",
      "about_core_3": "Microsoft 365 Copilot & Power BI (ongoing training)",
      "about_core_4": "Analytical Thinking, Process Optimization, Teamwork",
      "about_core_5": "AI Management",
      "profile_heading": "Profile",
      "profile_jobtitle": "Job Title",
      "profile_jobtitle_value": "Master Professional in Business Management",
      "profile_contact": "Contact",
      "portfolio_heading": "Portfolio — Skills, Selected Projects & Personal",
      "portfolio_skills_title": "Hard & Soft Skills",
      "portfolio_skills_desc": "My strongest skills at a glance.",
      "portfolio_impact_title": "Impact vs. Effort — Analysis",
      "portfolio_impact_desc": "With each project, my results grew stronger – while the effort required decreased.",
      "portfolio_interests_title": "Interests",
      "portfolio_interests_desc": "What inspires me and keeps me balanced.",
      "career_heading": "Career",
      "career_1": "06/2025–present — AI Manager Training (IHK)",
      "career_2": "2024 — Business Economist",
      "career_3": "10/2022–06/2025 — Deputy Commercial Manager",
      "career_4": "01/2019-10/2022 — Commercial Employee",
      "career_5": "2018 — Certified Trade Specialist",
      "skills_heading": "Skills & Tools",
      "contact_heading": "Contact",
      "contact_text": "For collaborations, ideas, or questions – best reached by phone.",
      "btn_email": "Send Email",
      "footer_text": "Jana Wünsch — Business Master Professional"
    }
  };

  // Cache for loaded translations
  const cache = {};
  
  // Current language
  let currentLang = localStorage.getItem('lang') || 'de';

  /**
   * Get base URL for relative paths
   */
  function getBaseUrl() {
    return document.baseURI.replace(/\/[^/]*$/, '/');
  }

  /**
   * Load translations for a language
   * @param {string} lang - Language code ('de' or 'en')
   * @returns {Promise<Object>} Translation object
   */
  async function loadTranslations(lang) {
    // Return cached translations if available
    if (cache[lang]) {
      return cache[lang];
    }

    // Try to fetch from JSON file first
    try {
      const baseUrl = getBaseUrl();
      const url = baseUrl + 'locales/' + lang + '.json';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        cache[lang] = data;
        return data;
      }
    } catch (e) {
      // Fetch failed, use fallback
      console.log('i18n: Using fallback translations for', lang);
    }

    // Fall back to embedded translations
    cache[lang] = FALLBACK[lang] || FALLBACK.de;
    return cache[lang];
  }

  /**
   * Apply translations to the page
   * @param {Object} translations - Translation object
   */
  function applyTranslations(translations) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Update page title
    if (translations.page_title) {
      document.title = translations.page_title;
    }

    // Update html lang attribute
    document.documentElement.lang = currentLang;
  }

  /**
   * Switch to a new language
   * @param {string} lang - Language code ('de' or 'en')
   */
  async function switchLanguage(lang) {
    if (lang !== 'de' && lang !== 'en') {
      lang = 'de';
    }
    
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    var translations = await loadTranslations(lang);
    applyTranslations(translations);
    updateButtonStates();
  }

  /**
   * Update active state of language buttons
   */
  function updateButtonStates() {
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
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
   * Initialize language switcher
   */
  function init() {
    // Set up click handlers for language buttons
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var lang = this.getAttribute('data-lang-btn');
        switchLanguage(lang);
      });
    });

    // Load initial language
    switchLanguage(currentLang);
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
    getCurrentLang: function() { return currentLang; }
  };
})();
