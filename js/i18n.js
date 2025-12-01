/**
 * Minimal client-side i18n for static HTML portfolio.
 * - Reads language from localStorage ('lang') or navigator.language
 * - Loads /locales/{lang}.json and applies to elements with [data-i18n]
 * - Handles click on [data-lang-btn] buttons to switch language
 */
(function() {
  'use strict';

  var SUPPORTED_LANGS = ['de', 'en'];
  var DEFAULT_LANG = 'de';
  var STORAGE_KEY = 'lang';

  /**
   * Detect initial language: localStorage > navigator.language > default
   */
  function detectLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) {
      return stored;
    }
    var browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.indexOf(browserLang) !== -1) {
      return browserLang;
    }
    return DEFAULT_LANG;
  }

  /**
   * Fetch translations JSON for a given language
   */
  function loadTranslations(lang, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'locales/' + lang + '.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            callback(null, JSON.parse(xhr.responseText));
          } catch (e) {
            callback(e, null);
          }
        } else {
          callback(new Error('Failed to load ' + lang + '.json'), null);
        }
      }
    };
    xhr.send();
  }

  /**
   * Apply translations to the DOM
   */
  function applyTranslations(translations) {
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (translations[key] !== undefined) {
        el.textContent = translations[key];
      }
    }
  }

  /**
   * Update active state on language buttons
   */
  function updateButtonStates(currentLang) {
    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var btnLang = btn.getAttribute('data-lang-btn');
      if (btnLang === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  }

  /**
   * Set language, persist to localStorage, and apply
   */
  function setLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) {
      lang = DEFAULT_LANG;
    }
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    updateButtonStates(lang);

    loadTranslations(lang, function(err, translations) {
      if (err) {
        console.error('i18n: Could not load translations for', lang, err);
        return;
      }
      applyTranslations(translations);
    });
  }

  /**
   * Initialize: detect language, bind buttons, apply translations
   */
  function init() {
    var currentLang = detectLang();
    
    // Bind click handlers to language buttons
    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(e) {
        e.preventDefault();
        var lang = this.getAttribute('data-lang-btn');
        setLanguage(lang);
      });
    }

    // Apply initial language
    setLanguage(currentLang);
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
