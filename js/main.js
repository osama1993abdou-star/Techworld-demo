
// ========== NAVIGATION & MOBILE MENU Techworld ==========

class Navigation {

  constructor() {

    /* ==================================================
                       ELEMENTS
    ================================================== */

    this.header = document.querySelector('.header');

    this.mobileToggle =
      document.querySelector('.mobile-menu-toggle');

    this.nav =
      document.querySelector('.nav');

    this.navLinks =
      document.querySelectorAll('.nav-link');

    this.dropdownToggles =
      document.querySelectorAll('.dropdown-toggle');

    /* ==================================================
             MOBILE NAV CLOSE BUTTON
    ================================================== */

    this.mobileNavClose = null;

    /* ==================================================
                 MOBILE OVERLAY
    ================================================== */

    this.overlay =
      document.querySelector('.mobile-overlay');

    this.overlayNoise =
      document.querySelector('.mobile-overlay-noise');


    /* ==================================================
           INITIALIZE
    ================================================== */

    this.init();

  }


  /* ==================================================
                     INIT
  ================================================== */

  init() {

    /* -----------------------------------------------
             MOBILE PANEL HEADER
    ----------------------------------------------- */

    this.createMobilePanelHeader();


    /* -----------------------------------------------
             MOBILE DROPDOWN LINKS
    ----------------------------------------------- */

    this.syncMobileDropdownLinks();


    /* -----------------------------------------------
                HEADER SCROLL
    ----------------------------------------------- */

    this.handleScroll();

    window.addEventListener(
      'scroll',
      () => this.handleScroll(),
      { passive: true }
    );


    /* -----------------------------------------------
                  WINDOW RESIZE
    ----------------------------------------------- */

    window.addEventListener(
      'resize',
      () => this.syncMobileDropdownLinks()
    );


    /* ==================================================
       MOBILE MENU TOGGLE
    ================================================== */

    if (this.mobileToggle) {

      this.mobileToggle.addEventListener(
        'click',
        () => this.toggleMobileMenu()
      );

    }


    /* ==================================================
       MOBILE CLOSE BUTTON
    ================================================== */

    if (this.mobileNavClose) {

      this.mobileNavClose.addEventListener(
        'click',
        () => this.closeMobileMenu()
      );

    }


    /* ==================================================
       OVERLAY CLICK
       
       Clicking outside the menu closes it.
    ================================================== */

    if (this.overlay) {

      this.overlay.addEventListener(
        'click',
        () => this.closeMobileMenu()
      );

    }


    /* ==================================================
       MOBILE NAV LINKS
       
       Every mobile link closes the menu.
    ================================================== */

    this.navLinks.forEach(link => {

      link.addEventListener('click', () => {

        if (window.innerWidth <= 1100) {

          this.closeMobileMenu();

        }

      });

    });


    /* ==================================================
       DROPDOWN / MEGA MENU
    ================================================== */

    this.dropdownToggles.forEach(
      (toggle, index) => {

        const navItem =
          toggle.closest('.nav-item');

        const megaMenu =
          navItem?.querySelector('.mega-menu');

        let closeTimer;


        if (!navItem || !megaMenu) {
          return;
        }


        /* ---------------------------------------------
           ACCESSIBILITY
        --------------------------------------------- */

        megaMenu.id ||=
          `mega-menu-${index + 1}`;

        toggle.setAttribute(
          'aria-expanded',
          'false'
        );

        toggle.setAttribute(
          'aria-controls',
          megaMenu.id
        );


        /* ---------------------------------------------
           CANCEL CLOSE
        --------------------------------------------- */

        const cancelClose = () => {

          window.clearTimeout(closeTimer);

        };


        /* ---------------------------------------------
           OPEN MEGA MENU
        --------------------------------------------- */

        const openMegaMenu = () => {

          cancelClose();

          this.closeAllMegaMenus(navItem);

          navItem.classList.add('active');

          toggle.setAttribute(
            'aria-expanded',
            'true'
          );

        };


        /* ---------------------------------------------
           CLOSE MEGA MENU
        --------------------------------------------- */

        const closeMegaMenu = () => {

          navItem.classList.remove('active');

          toggle.setAttribute(
            'aria-expanded',
            'false'
          );

        };


        /* ---------------------------------------------
           SCHEDULE CLOSE
        --------------------------------------------- */

        const scheduleClose = () => {

          cancelClose();

          closeTimer =
            window.setTimeout(
              closeMegaMenu,
              180
            );

        };


        /* ---------------------------------------------
           POINTER ENTER
        --------------------------------------------- */

        navItem.addEventListener(
          'pointerenter',
          openMegaMenu
        );


        /* ---------------------------------------------
           POINTER LEAVE
        --------------------------------------------- */

        navItem.addEventListener(
          'pointerleave',
          scheduleClose
        );


        /* ---------------------------------------------
           MEGA MENU POINTER ENTER
        --------------------------------------------- */

        megaMenu.addEventListener(
          'pointerenter',
          cancelClose
        );


        /* ---------------------------------------------
           MEGA MENU POINTER LEAVE
        --------------------------------------------- */

        megaMenu.addEventListener(
          'pointerleave',
          scheduleClose
        );


        /* ---------------------------------------------
           KEYBOARD FOCUS
        --------------------------------------------- */

        navItem.addEventListener(
          'focusin',
          openMegaMenu
        );


        navItem.addEventListener(
          'focusout',
          () => {

            window.setTimeout(() => {

              if (
                !navItem.contains(
                  document.activeElement
                )
              ) {

                scheduleClose();

              }

            });

          }
        );


        /* ---------------------------------------------
           DESKTOP CLICK
        --------------------------------------------- */

        toggle.addEventListener(
          'click',
          event => {

            if (window.innerWidth > 1100) {

              event.preventDefault();

              openMegaMenu();

            }

          }
        );


        /* ---------------------------------------------
           ESCAPE KEY
        --------------------------------------------- */

        toggle.addEventListener(
          'keydown',
          event => {

            if (event.key === 'Escape') {

              closeMegaMenu();

              toggle.focus();

            }

          }
        );

      }
    );


    /* ==================================================
       CLOSE MEGA MENU WHEN CLICKING OUTSIDE
    ================================================== */

    document.addEventListener(
      'pointerdown',
      event => {

        if (
          !event.target.closest(
            '.nav-item.has-dropdown'
          )
        ) {

          this.closeAllMegaMenus();

        }

      }
    );


    /* ==================================================
       ACTIVE LINK
    ================================================== */

    this.highlightActiveLink();

  }


  /* ==================================================
                    HEADER SCROLL
  ================================================== */

  handleScroll() {

    if (!this.header) {
      return;
    }


    if (window.scrollY > 50) {

      this.header.classList.add(
        'scrolled'
      );

    } else {

      this.header.classList.remove(
        'scrolled'
      );

    }

  }


  /* ==================================================
             CREATE MOBILE PANEL HEADER
  ================================================== */

  createMobilePanelHeader() {

    if (
      !this.nav ||
      this.nav.querySelector(
        '.mobile-nav-header'
      )
    ) {

      return;

    }


    const logo =
      document.querySelector(
        '.header-logo img'
      );


    /* -----------------------------------------------
       HEADER
    ----------------------------------------------- */

    const panelHeader =
      document.createElement('div');

    panelHeader.className =
      'mobile-nav-header';


    /* -----------------------------------------------
       BRAND LINK
    ----------------------------------------------- */

    const brandLink =
      document.createElement('a');

    brandLink.className =
      'mobile-nav-brand';

    brandLink.href =
      'index.html';

    brandLink.setAttribute(
      'aria-label',
      'Techworld Home'
    );


    /* -----------------------------------------------
       LOGO
    ----------------------------------------------- */

    if (logo) {

      const brandLogo =
        logo.cloneNode(true);

      brandLogo.removeAttribute('id');

      brandLink.appendChild(
        brandLogo
      );

    } else {

      brandLink.textContent =
        'Techworld';

    }


    /* -----------------------------------------------
       CLOSE BUTTON
    ----------------------------------------------- */

    const closeButton =
      document.createElement('button');

    closeButton.className =
      'mobile-nav-close';

    closeButton.type =
      'button';

    closeButton.setAttribute(
      'aria-label',
      'Close Menu'
    );

    closeButton.innerHTML =
      '<span></span><span></span>';


    /* -----------------------------------------------
       APPEND
    ----------------------------------------------- */

    panelHeader.append(
      brandLink,
      closeButton
    );


    this.nav.prepend(
      panelHeader
    );


    this.mobileNavClose =
      closeButton;

  }


  /* ==================================================
          SYNC MOBILE DROPDOWN LINKS
  ================================================== */

  syncMobileDropdownLinks() {

    this.dropdownToggles.forEach(
      toggle => {

        const destination =
          toggle.getAttribute(
            'data-lang-en'
          ) === 'Services'
            ? 'services.html'
            : 'solutions.html';


        toggle.setAttribute(
          'href',
          window.innerWidth <= 1100
            ? destination
            : '#'
        );

      }
    );

  }


  /* ==================================================
             TOGGLE MOBILE MENU
  ================================================== */

  toggleMobileMenu() {

    const isOpen =
      this.nav?.classList.contains(
        'active'
      );


    if (isOpen) {

      this.closeMobileMenu();

    } else {

      this.openMobileMenu();

    }

  }


  /* ==================================================
              OPEN MOBILE MENU
  ================================================== */

  openMobileMenu() {

    /* -----------------------------------------------
       MOBILE TOGGLE
    ----------------------------------------------- */

    this.mobileToggle?.classList.add(
      'active'
    );


    /* -----------------------------------------------
       MOBILE NAV
    ----------------------------------------------- */

    this.nav?.classList.add(
      'active'
    );


    /* -----------------------------------------------
       BACKGROUND OVERLAY
    ----------------------------------------------- */

    this.overlay?.classList.add(
      'active'
    );


    /* -----------------------------------------------
       OVERLAY NOISE
       
       THIS IS THE IMPORTANT PART
    ----------------------------------------------- */

    this.overlayNoise?.classList.add(
      'active'
    );


    /* -----------------------------------------------
       BODY STATE
    ----------------------------------------------- */

    document.body.classList.add(
      'menu-open'
    );


    /* -----------------------------------------------
       PREVENT PAGE SCROLL
    ----------------------------------------------- */

    document.body.style.overflow =
      'hidden';


    /* -----------------------------------------------
       ACCESSIBILITY
    ----------------------------------------------- */

    this.mobileToggle?.setAttribute(
      'aria-expanded',
      'true'
    );

    this.mobileToggle?.setAttribute(
      'aria-label',
      'Close Menu'
    );

  }


  /* ==================================================
              CLOSE MOBILE MENU
  ================================================== */

  closeMobileMenu() {

    /* -----------------------------------------------
       MOBILE TOGGLE
    ----------------------------------------------- */

    this.mobileToggle?.classList.remove(
      'active'
    );


    /* -----------------------------------------------
       MOBILE NAV
    ----------------------------------------------- */

    this.nav?.classList.remove(
      'active'
    );


    /* -----------------------------------------------
       BACKGROUND OVERLAY
    ----------------------------------------------- */

    this.overlay?.classList.remove(
      'active'
    );


    /* -----------------------------------------------
       OVERLAY NOISE
       
       IMPORTANT:
       REMOVE ACTIVE WHEN CLOSING
    ----------------------------------------------- */

    this.overlayNoise?.classList.remove(
      'active'
    );


    /* -----------------------------------------------
       BODY STATE
    ----------------------------------------------- */

    document.body.classList.remove(
      'menu-open'
    );


    /* -----------------------------------------------
       RESTORE PAGE SCROLL
    ----------------------------------------------- */

    document.body.style.overflow =
      '';


    /* -----------------------------------------------
       ACCESSIBILITY
    ----------------------------------------------- */

    this.mobileToggle?.setAttribute(
      'aria-expanded',
      'false'
    );

    this.mobileToggle?.setAttribute(
      'aria-label',
      'Open Menu'
    );

  }


  /* ==================================================
             CLOSE ALL MEGA MENUS
  ================================================== */

  closeAllMegaMenus(
    currentItem = null
  ) {

    document
      .querySelectorAll(
        '.nav-item.has-dropdown'
      )
      .forEach(item => {

        if (item !== currentItem) {

          item.classList.remove(
            'active'
          );


          item
            .querySelector(
              '.dropdown-toggle'
            )
            ?.setAttribute(
              'aria-expanded',
              'false'
            );

        }

      });

  }


  /* ==================================================
              TOGGLE MEGA MENU
  ================================================== */

  toggleMegaMenu(toggle) {

    const navItem =
      toggle.closest(
        '.nav-item'
      );

    if (!navItem) {
      return;
    }


    const wasActive =
      navItem.classList.contains(
        'active'
      );


    this.closeAllMegaMenus(
      navItem
    );


    if (wasActive) {

      navItem.classList.remove(
        'active'
      );

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );

    } else {

      navItem.classList.add(
        'active'
      );

      toggle.setAttribute(
        'aria-expanded',
        'true'
      );

    }

  }


  /* ==================================================
              HIGHLIGHT ACTIVE LINK
  ================================================== */

  highlightActiveLink() {

    const currentPath =
      window.location.pathname;


    this.navLinks.forEach(
      link => {

        const href =
          link.getAttribute(
            'href'
          );


        if (
          href &&
          href !== '#' &&
          (
            href === currentPath ||
            currentPath.endsWith(href)
          )
        ) {

          link.classList.add(
            'active'
          );

        }

      }
    );

  }

}

// ========== LANGUAGE SWITCHER ==========

class LanguageSwitcher {

  constructor() {

    this.langButtons =
      document.querySelectorAll(
        ".lang-btn"
      );

    this.currentLang =
      localStorage.getItem(
        "language"
      ) || "en";

    this.init();

  }


  /* =========================================================
     INITIALIZE
  ========================================================= */

  init() {

    /*
       Set initial language
    */

    this.setLanguage(
      this.currentLang
    );


    /*
       Click handlers
    */

    this.langButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const lang =
              button.getAttribute(
                "data-lang"
              );


            if (!lang) {
              return;
            }


            this.setLanguage(
              lang
            );

          }
        );

      }
    );

  }


  /* =========================================================
     SET LANGUAGE
  ========================================================= */

  setLanguage(lang) {

    if (!lang) {
      return;
    }


    this.currentLang =
      lang;


    localStorage.setItem(
      "language",
      lang
    );


    /* =======================================================
       UPDATE HTML LANGUAGE
    ======================================================= */

    document.documentElement.setAttribute(
      "lang",
      lang
    );


    document.documentElement.setAttribute(
      "dir",
      lang === "ar"
        ? "rtl"
        : "ltr"
    );


    document.body.setAttribute(
      "dir",
      lang === "ar"
        ? "rtl"
        : "ltr"
    );


    /* =======================================================
       UPDATE ACTIVE LANGUAGE BUTTON
    ======================================================= */

    this.langButtons.forEach(
      button => {

        const buttonLang =
          button.getAttribute(
            "data-lang"
          );


        if (
          buttonLang === lang
        ) {

          button.classList.add(
            "active"
          );

        } else {

          button.classList.remove(
            "active"
          );

        }

      }
    );


    /* =======================================================
       UPDATE PAGE CONTENT
    ======================================================= */

    this.updateContent(
      lang
    );


    /* =======================================================
       NOTIFY OTHER COMPONENTS
       
       Hero Animation listens to this event.
    ======================================================= */

    document.dispatchEvent(
      new CustomEvent(
        "language:changed",
        {
          detail: {
            lang: lang
          }
        }
      )
    );

  }


  /* =========================================================
     UPDATE TRANSLATED CONTENT
  ========================================================= */

  updateContent(lang) {

    const elements =
      document.querySelectorAll(
        "[data-lang-en], [data-lang-ar]"
      );


    elements.forEach(
      element => {

        const content =
          element.getAttribute(
            `data-lang-${lang}`
          );


        if (
          content === null
        ) {

          return;

        }


        /*
           Elements containing
           icon/image + text.
        */

        const spanChild =
          element.querySelector(
            "span"
          );


        const hasIcon =
          element.querySelector(
            "svg, img"
          );


        if (
          spanChild &&
          hasIcon
        ) {

          spanChild.textContent =
            content;

        }

        /*
           Normal text element.
        */

        else {

          element.textContent =
            content;

        }

      }
    );

  }

}

// ========== SCROLL ANIMATIONS ==========
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }
  
  init() {
    // Use Intersection Observer for better performance
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // Optionally unobserve after animation
          // this.observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    this.animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }
}

class CounterAnimations {
  constructor() {
    this.counters = document.querySelectorAll('.counter-value');
    this.init();
  }

  init() {
    if (!this.counters.length) return;

    if (!('IntersectionObserver' in window)) {
      this.counters.forEach(counter => this.animateCounter(counter));
      return;
    }

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => this.observer.observe(counter));
  }

  animateCounter(counter) {
    const target = parseInt(counter.dataset.countTo || '0', 10);
    const suffix = counter.dataset.suffix || '';
    const prefix = counter.dataset.prefix || '';
    const duration = parseInt(counter.dataset.duration || '1400', 10);
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(target * eased);
      counter.textContent = `${prefix}${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = `${prefix}${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }
}

/* =========================================================
   HERO SECTION ANIMATION
   English  → Character by Character
   Arabic   → Word by Word
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const heroContent =
    document.querySelector(".hero-content");

  const heroScroll =
    document.querySelector(".hero-scroll");

  const heroTextElements =
    Array.from(
      document.querySelectorAll(
        ".hero-animated-text"
      )
    );


  /* =========================================================
     SAFETY CHECK
  ========================================================= */

  if (
    !heroContent ||
    !heroTextElements.length
  ) {
    return;
  }


  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  /* =========================================================
     TEXT DELAYS
  ========================================================= */

  const textDelays = [
    "0s",
    "0.55s",
    "1.05s"
  ];


  /* =========================================================
     GET CURRENT LANGUAGE
  ========================================================= */

  function getCurrentLanguage() {

    return (
      document.documentElement
        .getAttribute("lang") ||
      "en"
    ).toLowerCase();

  }


  /* =========================================================
     CHECK RTL
  ========================================================= */

  function isRTL() {

    return (
      getCurrentLanguage() === "ar" ||
      document.documentElement
        .getAttribute("dir") === "rtl"
    );

  }


  /* =========================================================
     GET TRANSLATED TEXT
  ========================================================= */

  function getTranslatedText(
    element
  ) {

    if (!element) {
      return "";
    }


    const lang =
      getCurrentLanguage();


    const attribute =
      `data-lang-${lang}`;


    const translatedText =
      element.getAttribute(
        attribute
      );


    if (translatedText) {

      return translatedText
        .replace(/\s+/g, " ")
        .trim();

    }


    return element.textContent
      .replace(/\s+/g, " ")
      .trim();

  }


  /* =========================================================
     CLEAR TEXT ELEMENT
  ========================================================= */

  function clearTextElement(
    element
  ) {

    element.classList.remove(
      "is-animating",
      "is-rtl"
    );


    element.dataset.heroSplit =
      "false";


    element.textContent = "";

  }


  /* =========================================================
     SPLIT ENGLISH TEXT
     Character by Character
  ========================================================= */

  function splitEnglishText(
    element,
    text
  ) {

    const fragment =
      document.createDocumentFragment();


    Array.from(text).forEach(
      (
        character,
        index
      ) => {

        const span =
          document.createElement(
            "span"
          );


        span.classList.add(
          "hero-char"
        );


        span.style.setProperty(
          "--char-index",
          index
        );


        if (
          /\s/.test(character)
        ) {

          span.classList.add(
            "hero-char-space"
          );

          span.textContent =
            "\u00A0";

        } else {

          span.textContent =
            character;

        }


        fragment.appendChild(
          span
        );

      }
    );


    element.appendChild(
      fragment
    );

  }


  /* =========================================================
     SPLIT ARABIC TEXT
     Word by Word

     مهم:
     لا نقسم الحروف العربية.
     الكلمة تظل كاملة حتى يحافظ
     المتصفح على Arabic Shaping.
  ========================================================= */

  function splitArabicText(
    element,
    text
  ) {

    const fragment =
      document.createDocumentFragment();


    const words =
      text.split(/\s+/);


    words.forEach(
      (
        word,
        index
      ) => {

        const wordSpan =
          document.createElement(
            "span"
          );


        wordSpan.classList.add(
          "hero-word"
        );


        wordSpan.style.setProperty(
          "--word-index",
          index
        );


        wordSpan.textContent =
          word;


        fragment.appendChild(
          wordSpan
        );


        /*
           Add a visual space between
           Arabic words.
        */

        if (
          index <
          words.length - 1
        ) {

          const space =
            document.createElement(
              "span"
            );


          space.classList.add(
            "hero-word-space"
          );


          space.textContent =
            "\u00A0";


          fragment.appendChild(
            space
          );

        }

      }
    );


    element.appendChild(
      fragment
    );

  }


  /* =========================================================
     PREPARE SINGLE HERO TEXT
  ========================================================= */

  function prepareText(
    element,
    index
  ) {

    if (!element) {
      return;
    }


    const text =
      getTranslatedText(
        element
      );


    if (!text) {
      return;
    }


    /*
       Remove old content.
    */

    clearTextElement(
      element
    );


    /*
       Set animation delay
    */

    element.style.setProperty(
      "--text-delay",
      textDelays[index] || "0s"
    );


    /*
       RTL
       Arabic = words
    */

    if (isRTL()) {

      element.classList.add(
        "is-rtl"
      );


      splitArabicText(
        element,
        text
      );

    }

    /*
       LTR
       English = characters
    */

    else {

      splitEnglishText(
        element,
        text
      );

    }


    /*
       Mark as prepared.
    */

    element.dataset.heroSplit =
      "true";

  }


  /* =========================================================
     PREPARE ALL HERO TEXT
  ========================================================= */

  function prepareHeroText() {

    heroTextElements.forEach(
      (
        element,
        index
      ) => {

        prepareText(
          element,
          index
        );

      }
    );

  }


  /* =========================================================
     START ANIMATION
  ========================================================= */

  function startHeroTextAnimation() {

    if (
      reducedMotion.matches
    ) {

      heroTextElements.forEach(
        element => {

          element.classList.remove(
            "is-animating"
          );

          element
            .querySelectorAll(
              ".hero-char, .hero-word"
            )
            .forEach(
              item => {

                item.style.opacity =
                  "1";

                item.style.transform =
                  "none";

              }
            );

        }
      );

      return;
    }


    /*
       Remove animation first.
    */

    heroTextElements.forEach(
      element => {

        element.classList.remove(
          "is-animating"
        );

      }
    );


    /*
       Force browser reflow.
    */

    void heroContent.offsetWidth;


    /*
       Start animation.
    */

    heroTextElements.forEach(
      element => {

        element.classList.add(
          "is-animating"
        );

      }
    );

  }


  /* =========================================================
     PLAY HERO ANIMATION
  ========================================================= */

  function playHeroAnimation(
    initialDelay = 400
  ) {

    prepareHeroText();


    if (
      reducedMotion.matches
    ) {

      startHeroTextAnimation();

      return;
    }


    setTimeout(
      () => {

        startHeroTextAnimation();

      },
      initialDelay
    );

  }


  /* =========================================================
     LANGUAGE CHANGE
     
     LanguageSwitcher already updates:
     
     <html lang="ar" dir="rtl">
     
     Then dispatches:
     
     language:changed
  ========================================================= */

  document.addEventListener(
    "language:changed",
    () => {

      /*
         Stop current animation.
      */

      heroTextElements.forEach(
        element => {

          element.classList.remove(
            "is-animating"
          );

        }
      );


      /*
         Small delay so that
         LanguageSwitcher finishes
         updating the content.
      */

      setTimeout(
        () => {

          playHeroAnimation(100);

        },
        50
      );

    }
  );


  /* =========================================================
     HERO HOVER
     
     Restart text animation
     when user hovers the glass box.
  ========================================================= */

  heroContent.addEventListener(
    "mouseenter",
    () => {

      playHeroAnimation(0);

    }
  );


  /* =========================================================
     KEYBOARD ACCESSIBILITY
  ========================================================= */

  heroContent.addEventListener(
    "focus",
    () => {

      playHeroAnimation(0);

    }
  );


  /* =========================================================
     TOUCH DEVICES
  ========================================================= */

  heroContent.addEventListener(
    "touchstart",
    () => {

      playHeroAnimation(0);

    },
    {
      passive: true
    }
  );


  /* =========================================================
     SMOOTH SCROLL TO SERVICES
  ========================================================= */

  if (heroScroll) {

    heroScroll.addEventListener(
      "click",
      event => {

        event.preventDefault();


        const servicesSection =
          document.querySelector(
            "#services"
          );


        if (
          !servicesSection
        ) {

          return;

        }


        servicesSection.scrollIntoView({

          behavior:
            reducedMotion.matches
              ? "auto"
              : "smooth",

          block:
            "start"

        });

      }
    );

  }


  /* =========================================================
     REDUCED MOTION CHANGE
  ========================================================= */

  function handleReducedMotionChange() {

    if (
      reducedMotion.matches
    ) {

      heroTextElements.forEach(
        element => {

          element.classList.remove(
            "is-animating"
          );

        }
      );

    } else {

      playHeroAnimation(0);

    }

  }


  if (
    typeof reducedMotion.addEventListener ===
    "function"
  ) {

    reducedMotion.addEventListener(
      "change",
      handleReducedMotionChange
    );

  }


  /* =========================================================
     INITIAL HERO ANIMATION
  ========================================================= */

  playHeroAnimation(400);

});

// =============================================================
//                 ABOUT TECHWORLD
// =============================================================

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
                         SECTION
  ========================================================= */

  const aboutSection =
    document.querySelector("#about-techworld");


  /* =========================================================
                       SAFETY CHECK
  ========================================================= */

  if (!aboutSection) return;


  /* =========================================================
                    ANIMATION STATE
  ========================================================= */

  let animationStarted = false;


  /* =========================================================
                  INTERSECTION OBSERVER
  ========================================================= */

  const observer =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach(entry => {


          /* ==================================================
                         VISIBILITY CHECK
          ================================================== */

          if (
            !entry.isIntersecting ||
            animationStarted
          ) {

            return;

          }


          /* ==================================================
                       LOCK ANIMATION
          ================================================== */

          animationStarted = true;


          /* ==================================================
                             STEP 1
                             IMAGE
          ==================================================

             تبدأ صورة الـ About بالظهور من المنتصف
             باستخدام الـ circle reveal animation.
          ================================================== */

          aboutSection.classList.add(
            "image-active"
          );


          /* ==================================================
                             STEP 2
                            CONTENT
          ==================================================

             مدة Animation الصورة:
             1600ms

             ثم ننتظر 150ms إضافية

             Total:
             1750ms
          ================================================== */

          setTimeout(() => {

            aboutSection.classList.add(
              "content-active"
            );

          }, 1750);


          /* ==================================================
                       STOP OBSERVING
          ==================================================

             Animation تعمل مرة واحدة فقط.
          ================================================== */

          observer.unobserve(
            aboutSection
          );

        });

      },


      /* ======================================================
                         OBSERVER OPTIONS
      ====================================================== */

      {
        threshold: 0.25
      }

    );


  /* =========================================================
                     START OBSERVER
  ========================================================= */

  observer.observe(
    aboutSection
  );

});

/* =========================================================
              SERVICES CARDS REVEAL ON SCROLL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const servicesSection =
        document.querySelector(".services-section");


    /* =====================================================
       CHECK SERVICES SECTION
    ===================================================== */

    if (!servicesSection) {
        return;
    }


    /* =====================================================
       GET SERVICE CARDS
    ===================================================== */

    const serviceItems =
        servicesSection.querySelectorAll(".service-card");


    /* =====================================================
       CHECK SERVICE CARDS
    ===================================================== */

    if (!serviceItems.length) {
        return;
    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const servicesObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                /* =========================================
                   SECTION NOT VISIBLE
                ========================================= */

                if (!entry.isIntersecting) {
                    return;
                }


                /* =========================================
                   SHOW ALL CARDS
                   
                   The stagger effect is already controlled
                   by the CSS nth-child transition delays.
                ========================================= */

                serviceItems.forEach(item => {

                    item.classList.add("service-visible");

                });


                /* =========================================
                   RUN ONLY ONCE
                ========================================= */

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );


    /* =====================================================
       START OBSERVING
    ===================================================== */

    servicesObserver.observe(servicesSection);

});

/* =========================================================
             WHY CHOOSE SECTION REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const whyChooseSection =
    document.querySelector(".why-choose-section");


  if (!whyChooseSection) {
    return;
  }


  const revealElements =
    whyChooseSection.querySelectorAll(
      ".why-choose-shell, .why-benefit-item"
    );


  const whyChooseObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "service-visible"
          );


          observer.unobserve(
            entry.target
          );

        });

      },

      {
        threshold: 0.12
      }

    );


  revealElements.forEach((element) => {

    whyChooseObserver.observe(
      element
    );

  });

});

// ========== SMOOTH SCROLL ==========
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// ========== FORM HANDLING ==========
class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form[data-form]');
    this.init();
  }
  
  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
  }
  
  async handleSubmit(e, form) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate
    if (!this.validateForm(form, data)) {
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    
    try {
      // In a real application, you would send this to a server
      // For now, we'll simulate a successful submission
      await this.simulateSubmission(data);
      
      // Show success message
      this.showMessage(form, 'success', 'Thank you! Your message has been sent successfully.');
      form.reset();
    } catch (error) {
      // Show error message
      this.showMessage(form, 'error', 'Sorry, something went wrong. Please try again.');
    } finally {
      // Reset button state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  }
  
  validateForm(form, data) {
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(error => error.remove());
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && data[emailField.name]) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data[emailField.name])) {
        this.showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
      }
    }
    
    // Required fields
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'This field is required');
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  showFieldError(field, message) {
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.focus();
  }
  
  showMessage(form, type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-${type}`;
    messageDiv.textContent = message;
    
    // Remove existing messages
    form.querySelectorAll('.form-message').forEach(msg => msg.remove());
    
    // Insert message
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => messageDiv.remove(), 5000);
  }
  
  simulateSubmission(data) {
    return new Promise((resolve) => {
      console.log('Form submitted:', data);
      setTimeout(resolve, 1500);
    });
  }
}

// ========== COUNTER ANIMATION (for stats) ==========
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-counter]');
    this.init();
  }
  
  init() {
    const observerOptions = {
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, observerOptions);
    
    this.counters.forEach(counter => observer.observe(counter));
  }
  
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }
}

// ========== LAZY LOADING IMAGES ==========
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }
  
  init() {
    const observerOptions = {
      rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, observerOptions);
    
    this.images.forEach(img => observer.observe(img));
  }
}

/* =========================================================
             AUTO COPYRIGHT YEAR
   ========================================================= */

function updateFooterCopyrightYear() {

  const currentYear = String(new Date().getFullYear());

  const yearPattern = /©\s*\d{4}/g;

  document.querySelectorAll('.footer-copyright').forEach((element) => {

    ['data-lang-en', 'data-lang-ar'].forEach((attr) => {

      const attrValue = element.getAttribute(attr);

      if (attrValue) {
        element.setAttribute(
          attr,
          attrValue.replace(yearPattern, `© ${currentYear}`)
        );
      }

    });

    const currentLang =
      document.documentElement.getAttribute('lang') || 'en';

    const localizedText =
      element.getAttribute(`data-lang-${currentLang}`);

    if (localizedText) {

      element.textContent = localizedText;

    } else {

      element.textContent =
        element.textContent.replace(
          yearPattern,
          `© ${currentYear}`
        );

    }

  });

}


/* =========================================================
   FOOTER - BACK TO TOP
   ========================================================= */

function initFooterBackToTop() {

  const backToTopButton =
    document.querySelector('.footer-back-to-top');

  if (!backToTopButton) return;

  backToTopButton.addEventListener('click', function (event) {

    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}


/* =========================================================
   FOOTER INITIALIZATION
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  updateFooterCopyrightYear();

  initFooterBackToTop();

});
// ========== INITIALIZE ALL ==========

document.addEventListener(
  "DOMContentLoaded",
  () => {

    new Navigation();

    new LanguageSwitcher();

    updateFooterCopyrightYear();

    new ScrollAnimations();

    new SmoothScroll();

    new FormHandler();

    new CounterAnimations();

    new LazyLoader();


    /* =======================================================
       REMOVE OLD HERO TYPEWRITER
       
       لا يوجد Typewriter هنا.
       Hero Animation أصبح مسؤولًا بالكامل
       عن العنوان والـ subtitle والـ description.
    ======================================================= */


    /* =======================================================
       REMOVE LOADING STATE
    ======================================================= */

    document.body.classList.remove(
      "loading"
    );

  }
);

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Navigation,
    LanguageSwitcher,
    ScrollAnimations,
    SmoothScroll,
    FormHandler,
    CounterAnimation,
    LazyLoader
  };
}

/* =========================================================
   TECHNOLOGY SECTION SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const technologySection =
        document.querySelector(".technology-section");

    if (!technologySection) return;


    const technologyObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        technologySection.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            technologySection
                        );
                    }

                });

            },
            {
                threshold: 0.18
            }
        );


    technologyObserver.observe(
        technologySection
    );

});


/* =========================================================
   IT INFRASTRUCTURE REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const infrastructureSection =
        document.querySelector("#it-infrastructure");

    if (!infrastructureSection) return;


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    infrastructureSection.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        infrastructureSection
                    );

                });

            },
            {
                threshold: 0.18
            }
        );


    observer.observe(
        infrastructureSection
    );

});


document.addEventListener("DOMContentLoaded", function () {

    const webSection =
        document.querySelector(".web-design-section");

    if (!webSection) return;


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        webSection.classList.add("web-visible");

                        observer.unobserve(webSection);

                    }

                });

            },
            {
                threshold: 0.18
            }
        );


    observer.observe(webSection);

});

/* =========================================================
   SOFTWARE DEVELOPMENT — SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const softwareSection = document.querySelector(
        ".software-development-section"
    );

    if (!softwareSection) return;

    const revealItems = softwareSection.querySelectorAll(
        ".reveal-item"
    );

    /* ---------------------------------------------------------
       Intersection Observer
    --------------------------------------------------------- */

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                /* Add visible state to the section */
                softwareSection.classList.add("is-visible");

                /* Add visible state to individual elements */
                revealItems.forEach((item) => {
                    item.classList.add("is-visible");
                });

                /* Run only once */
                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    /* Observe the whole section */
    observer.observe(softwareSection);

});


/* =========================================================
     MICROSOFT CLOUD PLATFORM — REVEAL SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(
        ".microsoft-cloud-section"
    );

    /* ---------------------------------------------------------
       SAFETY CHECK
    --------------------------------------------------------- */

    if (!section) {
        return;
    }


    /* ---------------------------------------------------------
       GET REVEAL ELEMENTS
    --------------------------------------------------------- */

    const revealItems = section.querySelectorAll(
        ".reveal-item"
    );


    /* ---------------------------------------------------------
       SAFETY CHECK
    --------------------------------------------------------- */

    if (!revealItems.length) {
        section.classList.add("is-visible");
        return;
    }


    /* ---------------------------------------------------------
       INITIAL STATE
    --------------------------------------------------------- */

    section.classList.remove(
        "is-visible",
        "visible",
        "microsoft-cloud-visible"
    );


    /* ---------------------------------------------------------
       RESET REVEAL DELAYS
    --------------------------------------------------------- */

    revealItems.forEach(function (item) {

        item.style.transitionDelay = "0s";

    });


    /* ---------------------------------------------------------
       INTERSECTION OBSERVER
    --------------------------------------------------------- */

    const observer = new IntersectionObserver(

        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                /* -------------------------------------------------
                   ACTIVATE SECTION
                ------------------------------------------------- */

                section.classList.add(
                    "is-visible"
                );


                /* -------------------------------------------------
                   STAGGER ELEMENTS
                   Each element appears after the previous one
                ------------------------------------------------- */

                revealItems.forEach(function (item, index) {

                    const delay = 0.12 + (index * 0.16);

                    item.style.transitionDelay =
                        delay + "s";

                });


                /* -------------------------------------------------
                   STOP OBSERVING
                   Animation happens only once
                ------------------------------------------------- */

                observerInstance.disconnect();

            });

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -70px 0px"
        }

    );


    /* ---------------------------------------------------------
       OBSERVE SECTION
    --------------------------------------------------------- */

    observer.observe(section);


    /* ---------------------------------------------------------
       FALLBACK
       Prevent section from remaining invisible
    --------------------------------------------------------- */

    window.setTimeout(function () {

        if (
            !section.classList.contains("is-visible") &&
            !section.classList.contains("visible") &&
            !section.classList.contains(
                "microsoft-cloud-visible"
            )
        ) {

            section.classList.add(
                "is-visible"
            );


            revealItems.forEach(function (item, index) {

                const delay =
                    0.12 + (index * 0.16);

                item.style.transitionDelay =
                    delay + "s";

            });

        }

    }, 2500);

});

/* =========================================================
   SECURITY SOLUTIONS — REVEAL SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(
        ".security-solutions-section"
    );

    /* ---------------------------------------------------------
       SAFETY CHECK
    --------------------------------------------------------- */

    if (!section) {
        return;
    }


    /* ---------------------------------------------------------
       GET REVEAL ELEMENTS
    --------------------------------------------------------- */

    const revealItems = section.querySelectorAll(
        ".reveal-item"
    );


    /* ---------------------------------------------------------
       INITIAL STATE
    --------------------------------------------------------- */

    section.classList.remove(
        "is-visible",
        "visible",
        "security-solutions-visible"
    );


    /* ---------------------------------------------------------
       INTERSECTION OBSERVER
    --------------------------------------------------------- */

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                /* -------------------------------------------------
                   ACTIVATE SECTION
                ------------------------------------------------- */

                section.classList.add(
                    "is-visible"
                );


                /* -------------------------------------------------
                   STOP OBSERVING
                   Animation happens only once
                ------------------------------------------------- */

                observerInstance.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -70px 0px"
        }
    );


    /* ---------------------------------------------------------
       OBSERVE ALL REVEAL ITEMS
    --------------------------------------------------------- */

    revealItems.forEach(function (item) {

        observer.observe(item);

    });


    /* ---------------------------------------------------------
       FALLBACK
       Prevent section from remaining invisible
    --------------------------------------------------------- */

    window.setTimeout(function () {

        if (
            !section.classList.contains("is-visible") &&
            !section.classList.contains("visible") &&
            !section.classList.contains(
                "security-solutions-visible"
            )
        ) {

            section.classList.add(
                "is-visible"
            );

        }

    }, 2500);

});


/* =========================================================
   SOLUTIONS SECTION
   VISIBILITY + REVEAL ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const solutionsSection = document.getElementById("solutions");

    // Stop if Solutions Section does not exist
    if (!solutionsSection) {
        console.warn("Solutions section not found.");
        return;
    }

    /* =====================================================
       FORCE SECTION VISIBILITY
    ===================================================== */

    solutionsSection.style.opacity = "1";
    solutionsSection.style.visibility = "visible";
    solutionsSection.style.display = "block";

    // Make sure no external filter is blurring the whole section
    solutionsSection.style.filter = "none";


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const header = solutionsSection.querySelector(".solutions-header");

    const cards = solutionsSection.querySelectorAll(
        ".solution-card"
    );

    const divider = solutionsSection.querySelector(
        ".solutions-divider"
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    if (header) {
        header.style.opacity = "0";
        header.style.visibility = "hidden";
        header.style.transform = "translateY(35px)";
        header.style.filter = "none";
    }

    cards.forEach((card) => {

        card.style.opacity = "0";
        card.style.visibility = "hidden";
        card.style.transform = "translateY(45px)";

        // Prevent accidental blur from other CSS
        card.style.filter = "none";
    });

    if (divider) {
        divider.style.opacity = "0";
        divider.style.visibility = "hidden";
        divider.style.transform = "scaleX(0.5)";
    }


    /* =====================================================
       TRANSITIONS
    ===================================================== */

    if (header) {
        header.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    }

    cards.forEach((card) => {

        card.style.transition =
            "opacity 0.7s ease, " +
            "transform 0.7s ease, " +
            "background 0.45s ease, " +
            "border-color 0.45s ease, " +
            "box-shadow 0.45s ease";
    });

    if (divider) {
        divider.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
    }


    /* =====================================================
       REVEAL SOLUTIONS
    ===================================================== */

    function revealSolutions() {

        // Header
        if (header) {

            setTimeout(() => {

                header.style.opacity = "1";
                header.style.visibility = "visible";
                header.style.transform = "translateY(0)";

            }, 100);
        }


        // Cards
        cards.forEach((card, index) => {

            setTimeout(() => {

                card.style.opacity = "1";
                card.style.visibility = "visible";
                card.style.transform = "translateY(0)";

            }, 250 + (index * 130));

        });


        // Bottom divider
        if (divider) {

            const dividerDelay =
                250 + (cards.length * 130) + 150;

            setTimeout(() => {

                divider.style.opacity = "1";
                divider.style.visibility = "visible";
                divider.style.transform = "scaleX(1)";

            }, dividerDelay);
        }
    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        revealSolutions();

                        // Run only once
                        observerInstance.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        observer.observe(solutionsSection);

    } else {

        // Fallback
        revealSolutions();
    }

});