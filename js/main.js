
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

/* =========================================================
   LANGUAGE SWITCHER
   ========================================================= */

class LanguageSwitcher {

    constructor() {

        this.buttons =
            document.querySelectorAll(".lang-btn");

        this.currentLang =
            localStorage.getItem("language") || "en";

        this.init();
    }


    init() {

        this.setLanguage(this.currentLang);

        this.buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const lang =
                        button.getAttribute("data-lang");

                    if (!lang) return;

                    this.setLanguage(lang);
                }
            );

        });
    }



    setLanguage(lang) {

        if (
            lang !== "en" &&
            lang !== "ar"
        ) {
            lang = "en";
        }


        this.currentLang = lang;

        localStorage.setItem(
            "language",
            lang
        );



        document.documentElement.lang =
            lang;

        document.documentElement.dir =
            lang === "ar"
                ? "rtl"
                : "ltr";



        document.body.dir =
            lang === "ar"
                ? "rtl"
                : "ltr";



        this.buttons.forEach(button => {

            const buttonLang =
                button.getAttribute("data-lang");

            button.classList.toggle(
                "active",
                buttonLang === lang
            );

        });



        this.updateContent(lang);



        document.dispatchEvent(
            new CustomEvent(
                "language:changed",
                {
                    detail: {
                        language: lang
                    }
                }
            )
        );
    }



    updateContent(lang) {

        const elements =
            document.querySelectorAll(
                "[data-lang-en], [data-lang-ar]"
            );


        elements.forEach(element => {



            const content =
                element.getAttribute(
                    `data-lang-${lang}`
                );


            if (content === null) {
                return;
            }



            if (
                element.classList.contains(
                    "dy-title"
                )
            ) {

                const titleText =
                    element.querySelector(
                        ".dy-title-text"
                    );

                const titleAccent =
                    element.querySelector(
                        ".dy-title-accent"
                    );


                if (
                    titleText &&
                    titleAccent
                ) {

                    if (lang === "en") {

                        titleText.textContent =
                            "Microsoft Dynamics";

                        titleAccent.textContent =
                            "365";

                    }

                    else if (lang === "ar") {

                        titleText.textContent =
                            "مايكروسوفت دايناميكس";

                        titleAccent.textContent =
                            "365";
                    }

                    return;
                }
            }



            if (
                element.classList.contains(
                    "pb-how-title"
                )
            ) {

                const lightSpan =
                    element.querySelector(
                        ".pb-how-title-light"
                    );

                const orangeSpan =
                    element.querySelector(
                        ".pb-how-title-orange"
                    );


                if (
                    lightSpan &&
                    orangeSpan
                ) {

                    if (lang === "en") {

                        lightSpan.textContent =
                            "From Data to";

                        orangeSpan.textContent =
                            "Business Insights";
                    }

                    else if (lang === "ar") {

                        lightSpan.textContent =
                            "من البيانات إلى";

                        orangeSpan.textContent =
                            "رؤى الأعمال";
                    }

                    return;
                }
            }




            if (
                element.classList.contains(
                    "partners-value-title"
                )
            ) {

                const titleSpan =
                    element.querySelector(
                        "span"
                    );


                if (titleSpan) {

                    const firstTextNode =
                        Array.from(
                            element.childNodes
                        ).find(
                            node =>
                                node.nodeType ===
                                    Node.TEXT_NODE &&
                                node.textContent.trim() !== ""
                        );



                    if (lang === "en") {

                        if (firstTextNode) {

                            firstTextNode.textContent =
                                "\n                A Partnership Built for\n                ";
                        }


                        titleSpan.textContent =
                            "Long-Term Technology Success";
                    }


                    else if (lang === "ar") {

                        if (firstTextNode) {

                            firstTextNode.textContent =
                                "\n                شراكة مصممة لتحقيق\n                ";
                        }


                        titleSpan.textContent =
                            "نجاح تقني مستدام على المدى الطويل";
                    }


                    return;
                }
            }



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


 

            else {

                element.textContent =
                    content;
            }

        });
    }
}


/* =========================================================
   INITIALIZE LANGUAGE SWITCHER
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        window.languageSwitcher =
            new LanguageSwitcher();

    }
);

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
        this.counters = document.querySelectorAll(
            '#statistics .counter-value'
        );

        this.init();
    }

    init() {
        if (!this.counters.length) {
            console.warn(
                'Statistics counters were not found.'
            );
            return;
        }

        // Fallback for browsers without IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            this.counters.forEach(counter => {
                this.animateCounter(counter);
            });
            return;
        }

        this.observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }

    animateCounter(counter) {
        // Prevent the same counter from running twice
        if (counter.dataset.animated === 'true') {
            return;
        }

        counter.dataset.animated = 'true';

        const target = parseInt(
            counter.dataset.countTo || '0',
            10
        );

        const suffix = counter.dataset.suffix || '';
        const prefix = counter.dataset.prefix || '';

        const duration = Math.max(
            1,
            parseInt(counter.dataset.duration || '1400', 10)
        );

        const startTime = performance.now();

        const step = (timestamp) => {
            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            // Smooth ease-out animation
            const eased = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(
                target * eased
            );

            counter.textContent =
                `${prefix}${currentValue}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.textContent =
                    `${prefix}${target}${suffix}`;
            }
        };

        requestAnimationFrame(step);
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CounterAnimations();
    }, { once: true });
} else {
    new CounterAnimations();
}


/* =========================================================
             HERO SECTION ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {



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




  if (
    !heroContent ||
    !heroTextElements.length
  ) {
    return;
  }




  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );




  const textDelays = [
    "0s",
    "0.55s",
    "1.05s"
  ];



  function getCurrentLanguage() {

    return (
      document.documentElement
        .getAttribute("lang") ||
      "en"
    ).toLowerCase();

  }



  function isRTL() {

    return (
      getCurrentLanguage() === "ar" ||
      document.documentElement
        .getAttribute("dir") === "rtl"
    );

  }



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



    clearTextElement(
      element
    );




    element.style.setProperty(
      "--text-delay",
      textDelays[index] || "0s"
    );



    if (isRTL()) {

      element.classList.add(
        "is-rtl"
      );


      splitArabicText(
        element,
        text
      );

    }


    else {

      splitEnglishText(
        element,
        text
      );

    }



    element.dataset.heroSplit =
      "true";

  }




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



    heroTextElements.forEach(
      element => {

        element.classList.remove(
          "is-animating"
        );

      }
    );



    void heroContent.offsetWidth;


    heroTextElements.forEach(
      element => {

        element.classList.add(
          "is-animating"
        );

      }
    );

  }


  

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




  document.addEventListener(
    "language:changed",
    () => {

   

      heroTextElements.forEach(
        element => {

          element.classList.remove(
            "is-animating"
          );

        }
      );


      setTimeout(
        () => {

          playHeroAnimation(100);

        },
        50
      );

    }
  );



  heroContent.addEventListener(
    "mouseenter",
    () => {

      playHeroAnimation(0);

    }
  );



  heroContent.addEventListener(
    "focus",
    () => {

      playHeroAnimation(0);

    }
  );



  heroContent.addEventListener(
    "touchstart",
    () => {

      playHeroAnimation(0);

    },
    {
      passive: true
    }
  );




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


 

  playHeroAnimation(400);

});

/*=============================================================
                 ABOUT TECHWORLD
 =============================================================*/

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
          ==================================================*/

      
     

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


/* =========================================================
   TECHWORLD — CONTACT SECTION JAVASCRIPT
========================================================= */

class TechworldContactSection {
  constructor() {
    this.section = document.querySelector("#contact-form");

    if (!this.section) return;

    this.form = this.section.querySelector(
      'form[data-form="contact"]'
    );

    this.revealItems = this.section.querySelectorAll(".tw-reveal");

    this.initReveal();
    this.initForm();
    this.initLanguageSupport();
  }

  /* =======================================================
     SCROLL REVEAL — BOTTOM TO TOP
  ======================================================= */

  initReveal() {
    if (!this.revealItems.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      this.revealItems.forEach((element) => {
        element.classList.add("tw-is-visible");
      });

      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("tw-is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );

    this.revealItems.forEach((element) => {
      this.revealObserver.observe(element);
    });
  }

  /* =======================================================
     FORM INITIALIZATION
  ======================================================= */

  initForm() {
    if (!this.form) return;

    this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });

    this.form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        this.clearFieldError(field);
      });
    });
  }

  /* =======================================================
     LANGUAGE HELPERS
  ======================================================= */

  isArabic() {
    return (
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang.toLowerCase().startsWith("ar")
    );
  }

  getText(en, ar) {
    return this.isArabic() ? ar : en;
  }

  initLanguageSupport() {
    this.updatePlaceholders();

    /*
      Listen for a language-change event if your existing
      language switcher dispatches one.
    */

    document.addEventListener("languageChanged", () => {
      this.updatePlaceholders();
    });
  }

  updatePlaceholders() {
    if (!this.form) return;

    const language = this.isArabic() ? "ar" : "en";

    this.form.querySelectorAll("[data-placeholder-en]").forEach(
      (field) => {
        const placeholder =
          field.getAttribute(`data-placeholder-${language}`);

        if (placeholder) {
          field.placeholder = placeholder;
        }
      }
    );
  }

  /* =======================================================
     VALIDATION
  ======================================================= */

  validateForm() {
    let isValid = true;
    let firstInvalidField = null;

    this.form.querySelectorAll("input, textarea").forEach((field) => {
      this.clearFieldError(field);
    });

    this.form.querySelectorAll(".form-message").forEach((message) => {
      message.remove();
    });

    const fields = this.form.querySelectorAll(
      "input[required], textarea[required]"
    );

    fields.forEach((field) => {
      const value = field.value.trim();

      if (!value) {
        this.showFieldError(
          field,
          this.getText(
            "This field is required.",
            "هذا الحقل مطلوب."
          )
        );

        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = field;
        }

        return;
      }

      if (field.type === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
          this.showFieldError(
            field,
            this.getText(
              "Please enter a valid email address.",
              "يرجى إدخال بريد إلكتروني صحيح."
            )
          );

          isValid = false;

          if (!firstInvalidField) {
            firstInvalidField = field;
          }
        }
      }
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add("tw-invalid");
    field.setAttribute("aria-invalid", "true");

    const error = document.createElement("span");

    error.className = "form-error";
    error.textContent = message;
    error.setAttribute("role", "alert");

    field.insertAdjacentElement("afterend", error);
  }

  clearFieldError(field) {
    field.classList.remove("tw-invalid");
    field.removeAttribute("aria-invalid");

    const nextElement = field.nextElementSibling;

    if (nextElement && nextElement.classList.contains("form-error")) {
      nextElement.remove();
    }
  }

  /* =======================================================
     FORM SUBMISSION
  ======================================================= */

  async handleSubmit(event) {
    event.preventDefault();

    if (!this.validateForm()) return;

    const submitButton = this.form.querySelector(
      'button[type="submit"]'
    );

    if (!submitButton || submitButton.disabled) return;

    const originalButtonContent = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");

    submitButton.querySelector("span[data-lang-en]").textContent =
      this.getText("Sending...", "جارٍ الإرسال...");

    try {
      const formData = new FormData(this.form);

      const data = Object.fromEntries(formData.entries());

      /*
        IMPORTANT:
        This is a front-end demonstration only.
        Connect your backend/API here to actually send the message.
      */

      console.log("Contact form data:", data);

      await this.simulateSubmission();

      this.showMessage(
        "success",
        this.getText(
          "Thank you! Your message has been received.",
          "شكرًا لك! تم استلام رسالتك بنجاح."
        )
      );

      this.form.reset();
      this.updatePlaceholders();

    } catch (error) {
      console.error("Contact form submission failed:", error);

      this.showMessage(
        "error",
        this.getText(
          "Something went wrong. Please try again.",
          "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
        )
      );

    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
      submitButton.innerHTML = originalButtonContent;
    }
  }

  /* =======================================================
     STATUS MESSAGES
  ======================================================= */

  showMessage(type, message) {
    this.form.querySelectorAll(".form-message").forEach((item) => {
      item.remove();
    });

    const messageElement = document.createElement("div");

    messageElement.className =
      type === "success"
        ? "form-message form-success"
        : "form-message form-error-message";

    messageElement.textContent = message;
    messageElement.setAttribute("role", "status");
    messageElement.setAttribute("aria-live", "polite");

    this.form.insertBefore(messageElement, this.form.firstChild);

    messageElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  /* =======================================================
     DEMO SUBMISSION
  ======================================================= */

  simulateSubmission() {
    return new Promise((resolve) => {
      window.setTimeout(resolve, 1000);
    });
  }
}

/* =========================================================
   START AFTER DOM IS READY
========================================================= */

function initTechworldContact() {
  if (window.techworldContactInstance) return;

  window.techworldContactInstance = new TechworldContactSection();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initTechworldContact,
    { once: true }
  );
} else {
  initTechworldContact();
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
             IT INFRASTRUCTURE 
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
                SOFTWARE DEVELOPMENT 
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const softwareSection = document.querySelector(
        ".software-development-section"
    );

    if (!softwareSection) return;

    const revealItems = softwareSection.querySelectorAll(
        ".reveal-item"
    );



    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                softwareSection.classList.add("is-visible");

              
                revealItems.forEach((item) => {
                    item.classList.add("is-visible");
                });

       
                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }
    );

   
    observer.observe(softwareSection);

});


/* =========================================================
          MICROSOFT CLOUD PLATFORM 
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(
        ".microsoft-cloud-section"
    );



    if (!section) {
        return;
    }




    const revealItems = section.querySelectorAll(
        ".reveal-item"
    );



    if (!revealItems.length) {
        section.classList.add("is-visible");
        return;
    }




    section.classList.remove(
        "is-visible",
        "visible",
        "microsoft-cloud-visible"
    );




    revealItems.forEach(function (item) {

        item.style.transitionDelay = "0s";

    });



    const observer = new IntersectionObserver(

        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }




                section.classList.add(
                    "is-visible"
                );




                revealItems.forEach(function (item, index) {

                    const delay = 0.12 + (index * 0.16);

                    item.style.transitionDelay =
                        delay + "s";

                });


                observerInstance.disconnect();

            });

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -70px 0px"
        }

    );



    observer.observe(section);



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
             SECURITY SOLUTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(
        ".security-solutions-section"
    );


    if (!section) {
        return;
    }


 

    const revealItems = section.querySelectorAll(
        ".reveal-item"
    );



    section.classList.remove(
        "is-visible",
        "visible",
        "security-solutions-visible"
    );




    const observer = new IntersectionObserver(
        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                section.classList.add(
                    "is-visible"
                );




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



    revealItems.forEach(function (item) {

        observer.observe(item);

    });


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
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const solutionsSection = document.getElementById("solutions");


    if (!solutionsSection) {
        console.warn("Solutions section not found.");
        return;
    }


    solutionsSection.style.opacity = "1";
    solutionsSection.style.visibility = "visible";
    solutionsSection.style.display = "block";

    solutionsSection.style.filter = "none";



    const header = solutionsSection.querySelector(".solutions-header");

    const cards = solutionsSection.querySelectorAll(
        ".solution-card"
    );

    const divider = solutionsSection.querySelector(
        ".solutions-divider"
    );




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


        card.style.filter = "none";
    });

    if (divider) {
        divider.style.opacity = "0";
        divider.style.visibility = "hidden";
        divider.style.transform = "scaleX(0.5)";
    }




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




    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        revealSolutions();


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


        revealSolutions();
    }

});





/* =========================================================
            HARDWARE SOLUTIONS SECTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    const hardwareSection = 
        document.querySelector(".hardware-solutions-section");



    if (!hardwareSection) {
        return;
    }



    const revealItems = 
        hardwareSection.querySelectorAll(
            ".hardware-reveal"
        );


    hardwareSection.classList.remove(
        "hardware-visible"
    );


    revealItems.forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 0.15}s`;

    });



    const hardwareObserver = 
        new IntersectionObserver(
            
            (entries, observer) => {


                entries.forEach(entry => {


                    if (!entry.isIntersecting) {
                        return;
                    }


                    hardwareSection.classList.add(
                        "hardware-visible"
                    );


                    observer.unobserve(
                        entry.target
                    );


                });


            },

            {
                threshold:0.15,
                rootMargin:
                    "0px 0px -80px 0px"
            }

        );





    hardwareObserver.observe(
        hardwareSection
    );



});




/* =========================================================
            HARDWARE VIDEO INTERACTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    const hardwareVideo =
        document.querySelector(
            ".hardware-video"
        );


    if (!hardwareVideo) {
        return;
    }



    const videoObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {


                    if(entry.isIntersecting){


                        hardwareVideo.play()
                        .catch(() => {});


                    }else{


                        hardwareVideo.pause();


                    }


                });


            },

            {
                threshold:0.35
            }

        );



    videoObserver.observe(
        hardwareVideo
    );


});




/* =========================================================
          HARDWARE CARDS HOVER EFFECT STATE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    const hardwareCards =
        document.querySelectorAll(
            ".hardware-card"
        );


    if(!hardwareCards.length){
        return;
    }



    hardwareCards.forEach(card => {


        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "active"
                );

            }
        );



        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "active"
                );

            }
        );


    });


});



/* =========================================================
                 SECURITY SECTION
========================================================= */


document.addEventListener("DOMContentLoaded", () => {



    const securitySection =

        document.querySelector(
            ".tw-security-section"
        );





    if(!securitySection){

        return;

    }





    const revealItems =

        securitySection.querySelectorAll(
            ".security-reveal"
        );





    securitySection.classList.remove(
        "security-visible"
    );





    revealItems.forEach((item,index)=>{


        item.style.transitionDelay =

            `${index * 0.12}s`;


    });






    const securityObserver =

        new IntersectionObserver(


            (entries,observer)=>{


                entries.forEach(entry=>{


                    if(!entry.isIntersecting){

                        return;

                    }





                    securitySection.classList.add(

                        "security-visible"

                    );






                    revealItems.forEach(item=>{


                        item.classList.add(

                            "active"

                        );


                    });








                    observer.unobserve(

                        entry.target

                    );



                });



            },


            {


                threshold:.15,


                rootMargin:

                    "0px 0px -80px 0px"


            }



        );







    securityObserver.observe(

        securitySection

    );



});



/* =========================================================
              SECURITY VIDEO INTERACTION
========================================================= */


document.addEventListener("DOMContentLoaded",()=>{



    const securityVideo =


        document.querySelector(

            ".tw-security-video-media"

        );





    if(!securityVideo){

        return;

    }





    const videoObserver =


        new IntersectionObserver(


            entries=>{


                entries.forEach(entry=>{



                    if(entry.isIntersecting){



                        securityVideo.play()

                        .catch(()=>{});



                    }else{



                        securityVideo.pause();



                    }



                });



            },


            {


                threshold:.35


            }



        );








    videoObserver.observe(

        securityVideo

    );



});




/* =========================================================
   SECURITY CARDS HOVER STATE
========================================================= */


document.addEventListener("DOMContentLoaded",()=>{



    const securityCards =


        document.querySelectorAll(

            ".tw-security-card"

        );





    if(!securityCards.length){


        return;


    }







    securityCards.forEach(card=>{





        card.addEventListener(

            "mouseenter",()=>{


                card.classList.add(

                    "active"

                );


            }


        );







        card.addEventListener(

            "mouseleave",()=>{


                card.classList.remove(

                    "active"

                );


            }


        );





    });




});




/* =========================================================
   SECURITY TECHNOLOGY CARDS HOVER
========================================================= */


document.addEventListener("DOMContentLoaded",()=>{



    const techCards =


        document.querySelectorAll(

            ".tw-security-tech-card"

        );





    if(!techCards.length){


        return;


    }







    techCards.forEach(card=>{





        card.addEventListener(

            "mouseenter",()=>{


                card.classList.add(

                    "active"

                );


            }

        );







        card.addEventListener(

            "mouseleave",()=>{


                card.classList.remove(

                    "active"

                );


            }

        );





    });





});


/* =========================================================
   TECHWORLD STATISTICS COUNTER ANIMATION
========================================================= */


class TwStatsCounter {


    constructor(){


        this.counters = document.querySelectorAll('.tw-counter');


        if(!this.counters.length) return;


        this.init();

    }





    init(){


        if(!('IntersectionObserver' in window)){


            this.counters.forEach(counter=>{


                this.animate(counter);


            });


            return;

        }



        const observer = new IntersectionObserver((entries)=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){



                    this.animate(entry.target);



                    observer.unobserve(entry.target);



                }


            });



        },{


            threshold:.45


        });





        this.counters.forEach(counter=>{


            observer.observe(counter);


        });



    }





    animate(counter){


        const target = parseInt(
            counter.dataset.count || 0
        );


        const suffix =
        counter.dataset.suffix || "";



        const duration = 1600;



        const startTime = performance.now();





        const update = (currentTime)=>{


            const elapsed =
            currentTime - startTime;



            const progress =
            Math.min(elapsed / duration , 1);




            // Smooth ease out
            const ease =
            1 - Math.pow(1 - progress , 3);




            const value =
            Math.floor(target * ease);




            counter.textContent =
            value + suffix;





            if(progress < 1){


                requestAnimationFrame(update);


            }
            else{


                counter.textContent =
                target + suffix;


            }


        };




        requestAnimationFrame(update);



    }



}





/* =========================================================
                  INITIALIZE
========================================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


    new TwStatsCounter();


});


/* =========================================================
              SOLUTIONS NAVIGATION
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const nav =
            document.querySelector(
                ".tw-solutions-nav"
            );


        const navScroller =
            document.querySelector(
                ".tw-solutions-nav-inner"
            );


        const scrollbarThumb =
            document.querySelector(
                ".tw-solutions-nav-scrollbar-thumb"
            );


        const links =
            document.querySelectorAll(
                ".tw-solutions-nav-list a[href^='#']"
            );


        /* =====================================================
           SAFETY CHECK
        ===================================================== */

        if (
            !nav ||
            !navScroller ||
            !links.length
        ) {
            return;
        }


        /* =====================================================
           TARGET SECTIONS
        ===================================================== */

        const sections =
            Array.from(links)
                .map(
                    function (link) {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {
                            return null;
                        }


                        try {

                            return document.querySelector(
                                href
                            );

                        }
                        catch (error) {

                            return null;

                        }

                    }
                )
                .filter(Boolean);


        /* =====================================================
           STATE
        ===================================================== */

        let isDragging =
            false;


        let dragStarted =
            false;


        let hasDragged =
            false;


        let pointerDownOnLink =
            null;


        let activePointerId =
            null;


        let startX =
            0;


        let startY =
            0;


        let startScrollPosition =
            0;


        let suppressNextClick =
            false;


        let scrollTimer =
            null;


        let rafScrollbar =
            null;


        let clickSuppressTimer =
            null;


        /* =====================================================
           SETTINGS
        ===================================================== */

        const dragThreshold =
            6;


        const dragSpeed =
            1.35;


        const clickSuppressTime =
            300;


        /* =====================================================
           DEVICE DETECTION
        ===================================================== */

        function isDesktop() {

            return (
                window.innerWidth >= 1024
            );

        }


        /* =====================================================
           RTL DETECTION
        ===================================================== */

        function isRTL() {

            return (

                document.documentElement.dir === "rtl"

                ||

                document.documentElement.getAttribute(
                    "dir"
                ) === "rtl"

                ||

                getComputedStyle(
                    navScroller
                ).direction === "rtl"

            );

        }


        /* =====================================================
           RTL SCROLL MODEL
        ===================================================== */

        let rtlScrollType =
            "negative";


        /* =====================================================
           DETECT RTL SCROLL MODEL
        ===================================================== */

        function detectRTLScrollType() {

            const outer =
                document.createElement(
                    "div"
                );


            const inner =
                document.createElement(
                    "div"
                );


            outer.style.width =
                "4px";


            outer.style.height =
                "1px";


            outer.style.position =
                "absolute";


            outer.style.left =
                "-9999px";


            outer.style.top =
                "-9999px";


            outer.style.overflow =
                "scroll";


            outer.style.direction =
                "rtl";


            inner.style.width =
                "8px";


            inner.style.height =
                "1px";


            outer.appendChild(
                inner
            );


            document.body.appendChild(
                outer
            );


            const initial =
                outer.scrollLeft;


            if (
                initial > 0
            ) {

                rtlScrollType =
                    "default";

            }
            else {

                outer.scrollLeft =
                    1;


                if (
                    outer.scrollLeft === 0
                ) {

                    rtlScrollType =
                        "negative";

                }
                else {

                    rtlScrollType =
                        "reverse";

                }

            }


            document.body.removeChild(
                outer
            );

        }


        /* =====================================================
           INITIAL RTL DETECTION
        ===================================================== */

        detectRTLScrollType();


        /* =====================================================
           MAXIMUM SCROLL
        ===================================================== */

        function getMaxScroll() {

            return Math.max(
                0,
                navScroller.scrollWidth -
                navScroller.clientWidth
            );

        }


        /* =====================================================
           NORMALIZED SCROLL POSITION

           LTR:
               0   = visual left
               max = visual right

           RTL:
               0   = visual right
               max = visual left
        ===================================================== */

        function getNormalizedScrollLeft() {

            const maxScroll =
                getMaxScroll();


            if (
                maxScroll <= 0
            ) {

                return 0;

            }


            const raw =
                navScroller.scrollLeft;


            /* =================================================
               LTR
            ================================================= */

            if (
                !isRTL()
            ) {

                return Math.max(
                    0,
                    Math.min(
                        maxScroll,
                        raw
                    )
                );

            }


            /* =================================================
               RTL — NEGATIVE
            ================================================= */

            if (
                rtlScrollType ===
                "negative"
            ) {

                return Math.max(
                    0,
                    Math.min(
                        maxScroll,
                        -raw
                    )
                );

            }


            /* =================================================
               RTL — REVERSE
            ================================================= */

            if (
                rtlScrollType ===
                "reverse"
            ) {

                return Math.max(
                    0,
                    Math.min(
                        maxScroll,
                        maxScroll - raw
                    )
                );

            }


            /* =================================================
               RTL — DEFAULT
            ================================================= */

            return Math.max(
                0,
                Math.min(
                    maxScroll,
                    maxScroll - raw
                )
            );

        }


        /* =====================================================
           SET NORMALIZED SCROLL POSITION
        ===================================================== */

        function setNormalizedScrollLeft(
            position
        ) {

            const maxScroll =
                getMaxScroll();


            position =
                Math.max(
                    0,
                    Math.min(
                        maxScroll,
                        position
                    )
                );


            /* =================================================
               LTR
            ================================================= */

            if (
                !isRTL()
            ) {

                navScroller.scrollLeft =
                    position;

                return;

            }


            /* =================================================
               RTL — NEGATIVE
            ================================================= */

            if (
                rtlScrollType ===
                "negative"
            ) {

                navScroller.scrollLeft =
                    -position;

                return;

            }


            /* =================================================
               RTL — REVERSE
            ================================================= */

            if (
                rtlScrollType ===
                "reverse"
            ) {

                navScroller.scrollLeft =
                    maxScroll -
                    position;

                return;

            }


            /* =================================================
               RTL — DEFAULT
            ================================================= */

            navScroller.scrollLeft =
                maxScroll -
                position;

        }


        /* =====================================================
           SHOW CUSTOM SCROLLBAR
        ===================================================== */

        function showScrollbar() {

            if (
                isDesktop()
            ) {
                return;
            }


            navScroller.classList.add(
                "show-scrollbar"
            );


            clearTimeout(
                scrollTimer
            );


            scrollTimer =
                setTimeout(
                    function () {

                        if (
                            !isDragging
                        ) {

                            navScroller.classList.remove(
                                "show-scrollbar"
                            );

                        }

                    },
                    1200
                );

        }


        /* =====================================================
           UPDATE CUSTOM SCROLLBAR
        ===================================================== */

        function updateScrollbar() {

            if (
                isDesktop() ||
                !scrollbarThumb
            ) {
                return;
            }


            const viewport =
                navScroller.clientWidth;


            const content =
                navScroller.scrollWidth;


            const maxScroll =
                content -
                viewport;


            if (
                maxScroll <= 1
            ) {

                scrollbarThumb.style.width =
                    "100%";


                scrollbarThumb.style.transform =
                    "translateX(0)";


                return;

            }


            /* =================================================
               THUMB SIZE
            ================================================= */

            let ratio =
                viewport /
                content;


            ratio =
                Math.max(
                    0.18,
                    Math.min(
                        1,
                        ratio
                    )
                );


            const thumbWidth =
                ratio * 100;


            scrollbarThumb.style.width =
                thumbWidth + "%";


            /* =================================================
               CURRENT POSITION
            ================================================= */

            const current =
                getNormalizedScrollLeft();


            const progress =
                current /
                maxScroll;


            const movement =
                100 -
                thumbWidth;


            scrollbarThumb.style.transform =
                "translateX(" +
                (
                    progress *
                    movement
                ) +
                "%)";

        }


        /* =====================================================
           REQUEST SCROLLBAR UPDATE
        ===================================================== */

        function requestScrollbarUpdate() {

            if (
                rafScrollbar
            ) {

                cancelAnimationFrame(
                    rafScrollbar
                );

            }


            rafScrollbar =
                requestAnimationFrame(
                    function () {

                        updateScrollbar();

                    }
                );

        }


        /* =====================================================
           ACTIVE LINK
        ===================================================== */

        function updateActiveLink() {

            if (
                !sections.length
            ) {
                return;
            }


            const header =
                document.querySelector(
                    ".header"
                );


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const position =
                window.scrollY +
                headerHeight +
                nav.offsetHeight +
                40;


            let current =
                null;


            sections.forEach(
                function (section) {

                    if (
                        position >=
                        section.offsetTop
                    ) {

                        current =
                            section;

                    }

                }
            );


            links.forEach(
                function (link) {

                    link.classList.remove(
                        "active"
                    );

                }
            );


            if (
                !current
            ) {
                return;
            }


            const active =
                document.querySelector(
                    '.tw-solutions-nav-list a[href="#' +
                    current.id +
                    '"]'
                );


            if (
                active
            ) {

                active.classList.add(
                    "active"
                );

            }

        }


        /* =====================================================
           SCROLL TO SECTION
        ===================================================== */

        function scrollToSection(
            link
        ) {

            if (
                !link
            ) {
                return;
            }


            const id =
                link.getAttribute(
                    "href"
                );


            if (
                !id ||
                id === "#"
            ) {
                return;
            }


            let target =
                null;


            try {

                target =
                    document.querySelector(
                        id
                    );

            }
            catch (error) {

                return;

            }


            if (
                !target
            ) {
                return;
            }


            /* =================================================
               HEADER
            ================================================= */

            const header =
                document.querySelector(
                    ".header"
                );


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            /* =================================================
               OFFSET
            ================================================= */

            const offset =
                headerHeight +
                nav.offsetHeight +
                20;


            /* =================================================
               TARGET POSITION
            ================================================= */

            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;


            /* =================================================
               SMOOTH SCROLL
            ================================================= */

            window.scrollTo({

                top:
                    Math.max(
                        0,
                        top
                    ),

                behavior:
                    "smooth"

            });


            /* =================================================
               UPDATE URL
            ================================================= */

            try {

                history.replaceState(
                    null,
                    "",
                    id
                );

            }
            catch (error) {}

        }


        /* =====================================================
           POINTER DOWN
           MOBILE + TABLET + MOUSE + PEN
        ===================================================== */

        navScroller.addEventListener(
            "pointerdown",
            function (e) {

                /* =================================================
                   DESKTOP
                   Desktop = click only.
                ================================================= */

                if (
                    isDesktop()
                ) {
                    return;
                }


                /* =================================================
                   MOUSE BUTTON
                   Only left button.
                ================================================= */

                if (
                    e.pointerType === "mouse" &&
                    e.button !== 0
                ) {
                    return;
                }


                /* =================================================
                   INITIAL STATE
                ================================================= */

                isDragging =
                    true;


                dragStarted =
                    false;


                hasDragged =
                    false;


                suppressNextClick =
                    false;


                activePointerId =
                    e.pointerId;


                startX =
                    e.clientX;


                startY =
                    e.clientY;


                startScrollPosition =
                    getNormalizedScrollLeft();


                /* =================================================
                   LINK UNDER POINTER
                ================================================= */

                pointerDownOnLink =
                    e.target.closest(
                        ".tw-solutions-nav-list a"
                    );


                /* =================================================
                   DRAGGING CLASS
                ================================================= */

                navScroller.classList.add(
                    "is-dragging"
                );


                navScroller.classList.add(
                    "show-scrollbar"
                );


                clearTimeout(
                    scrollTimer
                );


                /* =================================================
                   POINTER CAPTURE
                ================================================= */

                try {

                    navScroller.setPointerCapture(
                        e.pointerId
                    );

                }
                catch (error) {}


            },
            {
                passive: false
            }
        );


        /* =====================================================
           POINTER MOVE

           IMPORTANT:
           We only preventDefault AFTER we know that
           the gesture is actually horizontal.
        ===================================================== */

        navScroller.addEventListener(
            "pointermove",
            function (e) {

                if (
                    !isDragging ||
                    isDesktop()
                ) {
                    return;
                }


                /* =================================================
                   IGNORE DIFFERENT POINTER
                ================================================= */

                if (
                    activePointerId !== null &&
                    e.pointerId !== activePointerId
                ) {
                    return;
                }


                /* =================================================
                   DISTANCE
                ================================================= */

                const distanceX =
                    e.clientX -
                    startX;


                const distanceY =
                    e.clientY -
                    startY;


                /* =================================================
                   WAIT FOR REAL HORIZONTAL DRAG
                ================================================= */

                if (
                    !dragStarted
                ) {

                    if (

                        Math.abs(distanceX) >=
                        dragThreshold

                        &&

                        Math.abs(distanceX) >
                        Math.abs(distanceY)

                    ) {

                        dragStarted =
                            true;


                        hasDragged =
                            true;


                        /*
                         * Take control of horizontal
                         * gesture only after threshold.
                         */
                        try {

                            e.preventDefault();

                        }
                        catch (error) {}


                    }
                    else {

                        /*
                         * Still a tap or vertical scroll.
                         */
                        return;

                    }

                }
                else {

                    /*
                     * Already dragging horizontally.
                     */
                    e.preventDefault();

                }


                /* =================================================
                   DRAG CALCULATION

                   Normalized position handles
                   RTL + LTR automatically.

                   Finger LEFT:
                       distanceX < 0
                       scroll position increases

                   Finger RIGHT:
                       distanceX > 0
                       scroll position decreases
                ================================================= */

                const newPosition =
                    startScrollPosition -
                    (
                        distanceX *
                        dragSpeed
                    );


                /* =================================================
                   APPLY SCROLL
                ================================================= */

                setNormalizedScrollLeft(
                    newPosition
                );


                /* =================================================
                   SCROLLBAR
                ================================================= */

                requestScrollbarUpdate();

            },
            {
                passive: false
            }
        );


        /* =====================================================
           FINISH POINTER
        ===================================================== */

        function finishPointer(
            e
        ) {

            if (
                !isDragging
            ) {
                return;
            }


            /* =================================================
               IGNORE DIFFERENT POINTER
            ================================================= */

            if (
                activePointerId !== null &&
                e &&
                e.pointerId !== undefined &&
                e.pointerId !== activePointerId
            ) {
                return;
            }


            /* =================================================
               WAS REAL DRAG?
            ================================================= */

            const wasDrag =
                dragStarted;


            const clickedLink =
                pointerDownOnLink;


            /* =================================================
               RESET MAIN STATE
            ================================================= */

            isDragging =
                false;


            navScroller.classList.remove(
                "is-dragging"
            );


            requestScrollbarUpdate();


            /* =================================================
               RELEASE POINTER CAPTURE
            ================================================= */

            try {

                if (
                    e &&
                    e.pointerId !== undefined &&
                    navScroller.hasPointerCapture(
                        e.pointerId
                    )
                ) {

                    navScroller.releasePointerCapture(
                        e.pointerId
                    );

                }

            }
            catch (error) {}


            activePointerId =
                null;


            /* =================================================
               REAL DRAG
            ================================================= */

            if (
                wasDrag
            ) {

                hasDragged =
                    true;


                suppressNextClick =
                    true;


                clearTimeout(
                    scrollTimer
                );


                scrollTimer =
                    setTimeout(
                        function () {

                            if (
                                !isDragging
                            ) {

                                navScroller.classList.remove(
                                    "show-scrollbar"
                                );

                            }

                        },
                        1200
                    );


                clearTimeout(
                    clickSuppressTimer
                );


                clickSuppressTimer =
                    setTimeout(
                        function () {

                            hasDragged =
                                false;


                            dragStarted =
                                false;


                            pointerDownOnLink =
                                null;


                            suppressNextClick =
                                false;

                        },
                        clickSuppressTime
                    );


                return;

            }


            /* =================================================
               NORMAL TAP
            ================================================= */

            if (
                clickedLink
            ) {

                suppressNextClick =
                    true;


                scrollToSection(
                    clickedLink
                );


                clearTimeout(
                    clickSuppressTimer
                );


                clickSuppressTimer =
                    setTimeout(
                        function () {

                            suppressNextClick =
                                false;

                        },
                        clickSuppressTime
                    );

            }


            /* =================================================
               RESET
            ================================================= */

            dragStarted =
                false;


            pointerDownOnLink =
                null;

        }


        /* =====================================================
           POINTER UP
        ===================================================== */

        navScroller.addEventListener(
            "pointerup",
            finishPointer
        );


        /* =====================================================
           POINTER CANCEL
        ===================================================== */

        navScroller.addEventListener(
            "pointercancel",
            function (e) {

                /*
                 * If browser cancels the pointer after
                 * an actual horizontal drag, keep the
                 * click suppressed.
                 */

                if (
                    dragStarted
                ) {

                    hasDragged =
                        true;


                    suppressNextClick =
                        true;


                    clearTimeout(
                        clickSuppressTimer
                    );


                    clickSuppressTimer =
                        setTimeout(
                            function () {

                                hasDragged =
                                    false;


                                suppressNextClick =
                                    false;


                                dragStarted =
                                    false;

                            },
                            clickSuppressTime
                        );

                }
                else {

                    hasDragged =
                        false;

                    suppressNextClick =
                        false;

                }


                isDragging =
                    false;


                activePointerId =
                    null;


                pointerDownOnLink =
                    null;


                navScroller.classList.remove(
                    "is-dragging"
                );


                requestScrollbarUpdate();

            }
        );


        /* =====================================================
           LOST POINTER CAPTURE
        ===================================================== */

        navScroller.addEventListener(
            "lostpointercapture",
            function () {

                if (
                    !isDragging
                ) {
                    return;
                }


                isDragging =
                    false;


                navScroller.classList.remove(
                    "is-dragging"
                );


                if (
                    dragStarted
                ) {

                    hasDragged =
                        true;


                    suppressNextClick =
                        true;

                }


                activePointerId =
                    null;


                requestScrollbarUpdate();

            }
        );


        /* =====================================================
           LINK CLICK
        ===================================================== */

        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (e) {

                        /* =================================================
                           BLOCK CLICK AFTER DRAG
                        ================================================= */

                        if (
                            hasDragged ||
                            suppressNextClick
                        ) {

                            e.preventDefault();

                            e.stopPropagation();

                            return;

                        }


                        /* =================================================
                           DESKTOP
                           CLICK ONLY
                        ================================================= */

                        if (
                            isDesktop()
                        ) {

                            e.preventDefault();

                            e.stopPropagation();


                            scrollToSection(
                                link
                            );


                            return;

                        }


                        /* =================================================
                           MOBILE / TABLET
                           NORMAL CLICK
                        ================================================= */

                        e.preventDefault();

                        e.stopPropagation();


                        scrollToSection(
                            link
                        );

                    }
                );

            }
        );


        /* =====================================================
           NATIVE SCROLL
        ===================================================== */

        navScroller.addEventListener(
            "scroll",
            function () {

                requestScrollbarUpdate();


                if (
                    !isDragging
                ) {

                    showScrollbar();

                }

            },
            {
                passive: true
            }
        );


        /* =====================================================
           MOUSE WHEEL / TRACKPAD
        ===================================================== */

        navScroller.addEventListener(
            "wheel",
            function (e) {

                if (
                    isDesktop()
                ) {
                    return;
                }


                /* =================================================
                   HORIZONTAL WHEEL
                ================================================= */

                if (
                    Math.abs(e.deltaX) >
                    Math.abs(e.deltaY)
                ) {

                    e.preventDefault();


                    const current =
                        getNormalizedScrollLeft();


                    const newPosition =
                        current +
                        e.deltaX;


                    setNormalizedScrollLeft(
                        newPosition
                    );


                    requestScrollbarUpdate();

                    showScrollbar();

                }

            },
            {
                passive: false
            }
        );


        /* =====================================================
           KEYBOARD NAVIGATION
        ===================================================== */

        navScroller.addEventListener(
            "keydown",
            function (e) {

                if (
                    isDesktop()
                ) {
                    return;
                }


                const step =
                    120;


                /* =================================================
                   ARROW RIGHT
                ================================================= */

                if (
                    e.key ===
                    "ArrowRight"
                ) {

                    e.preventDefault();


                    const current =
                        getNormalizedScrollLeft();


                    const newPosition =
                        current +
                        (
                            isRTL()
                                ? -step
                                : step
                        );


                    setNormalizedScrollLeft(
                        newPosition
                    );


                    requestScrollbarUpdate();

                    showScrollbar();

                }


                /* =================================================
                   ARROW LEFT
                ================================================= */

                if (
                    e.key ===
                    "ArrowLeft"
                ) {

                    e.preventDefault();


                    const current =
                        getNormalizedScrollLeft();


                    const newPosition =
                        current +
                        (
                            isRTL()
                                ? step
                                : -step
                        );


                    setNormalizedScrollLeft(
                        newPosition
                    );


                    requestScrollbarUpdate();

                    showScrollbar();

                }

            }
        );


        /* =====================================================
           WINDOW SCROLL
        ===================================================== */

        window.addEventListener(
            "scroll",
            function () {

                updateActiveLink();

            },
            {
                passive: true
            }
        );


        /* =====================================================
           WINDOW RESIZE
        ===================================================== */

        window.addEventListener(
            "resize",
            function () {

                detectRTLScrollType();

                updateActiveLink();

                requestScrollbarUpdate();

            }
        );


        /* =====================================================
           INITIALIZATION
        ===================================================== */

        updateActiveLink();

        requestScrollbarUpdate();


        /* =====================================================
           LAYOUT REFRESH
        ===================================================== */

        setTimeout(
            function () {

                requestScrollbarUpdate();

                updateActiveLink();

            },
            300
        );


        setTimeout(
            function () {

                requestScrollbarUpdate();

                updateActiveLink();

            },
            1000
        );


    }
);





/* =========================================================
                POWER BI — HOW IT WORKS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const section =
        document.querySelector(
            "#powerbi-how-it-works"
        );

    if (!section) {
        return;
    }



    const steps =
        section.querySelectorAll(
            ".pb-how-step"
        );

    const visuals =
        section.querySelectorAll(
            ".pb-how-step-visual"
        );

    const dashboard =
        section.querySelector(
            ".pb-how-dashboard"
        );

    const brand =
        section.querySelector(
            ".pb-how-brand"
        );

    const benefits =
        section.querySelectorAll(
            ".pb-how-benefit"
        );




    steps.forEach(function (step) {

        step.style.animationPlayState =
            "paused";

    });



    if (dashboard) {

        dashboard.style.opacity = "0";

        dashboard.style.transform =
            "perspective(1200px) translateY(35px) scale(.96)";
    }



    if (brand) {

        brand.style.opacity = "0";

        brand.style.transform =
            "translateY(25px)";
    }



    benefits.forEach(function (item) {

        item.style.opacity = "0";

        item.style.transform =
            "translateX(25px)";
    });



    const desktopTransforms = [

        "translateX(-50%) perspective(1000px) rotateX(13deg) rotateY(-8deg) rotateZ(-1deg)",

        "translateX(-50%) perspective(1000px) rotateX(11deg) rotateY(7deg) rotateZ(1deg)",

        "translateX(-50%) perspective(1000px) rotateX(14deg) rotateY(-3deg) rotateZ(0deg)",

        "translateX(-50%) perspective(1000px) rotateX(11deg) rotateY(7deg) rotateZ(-1deg)",

        "translateX(-50%) perspective(1000px) rotateX(13deg) rotateY(-7deg) rotateZ(1deg)"

    ];


    const hoverTransforms = [

        "translateX(-50%) translateY(-10px) perspective(1000px) rotateX(13deg) rotateY(-8deg) rotateZ(-1deg) scale(1.055)",

        "translateX(-50%) translateY(-10px) perspective(1000px) rotateX(11deg) rotateY(7deg) rotateZ(1deg) scale(1.055)",

        "translateX(-50%) translateY(-10px) perspective(1000px) rotateX(14deg) rotateY(-3deg) rotateZ(0deg) scale(1.055)",

        "translateX(-50%) translateY(-10px) perspective(1000px) rotateX(11deg) rotateY(7deg) rotateZ(-1deg) scale(1.055)",

        "translateX(-50%) translateY(-10px) perspective(1000px) rotateX(13deg) rotateY(-7deg) rotateZ(1deg) scale(1.055)"

    ];




    function isDesktop() {

        return window.innerWidth > 820;
    }



    visuals.forEach(function (visual, index) {

        if (!visual) {
            return;
        }


        visual.addEventListener(
            "mouseenter",
            function () {

                if (!isDesktop()) {
                    return;
                }

                visual.style.transition =
                    "transform .5s cubic-bezier(.16,1,.3,1), filter .45s ease";

                visual.style.transform =
                    hoverTransforms[index] ||
                    hoverTransforms[0];

                visual.style.filter =
                    "brightness(1.15)";
            }
        );



        visual.addEventListener(
            "mouseleave",
            function () {

                if (!isDesktop()) {
                    return;
                }

                visual.style.transition =
                    "transform .55s cubic-bezier(.16,1,.3,1), filter .45s ease";

                visual.style.transform =
                    desktopTransforms[index] ||
                    desktopTransforms[0];

                visual.style.filter =
                    "brightness(1)";
            }
        );


 

        visual.addEventListener(
            "touchstart",
            function () {

                if (!isDesktop()) {

                    visual.style.filter =
                        "brightness(1.08)";
                }
            },
            {
                passive: true
            }
        );

        visual.addEventListener(
            "touchend",
            function () {

                if (!isDesktop()) {

                    visual.style.filter =
                        "brightness(1)";
                }
            },
            {
                passive: true
            }
        );

    });



    const observer =
        new IntersectionObserver(

            function (entries, obs) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    section.classList.add(
                        "pb-how-visible"
                    );


                    steps.forEach(
                        function (step, index) {

                            setTimeout(
                                function () {

                                    step.style.animationPlayState =
                                        "running";

                                },
                                index * 140
                            );

                        }
                    );



                    if (dashboard) {

                        setTimeout(
                            function () {

                                dashboard.style.transition =
                                    "opacity .95s cubic-bezier(.16,1,.3,1), transform .95s cubic-bezier(.16,1,.3,1)";

                                dashboard.style.opacity =
                                    "1";

                                dashboard.style.transform =
                                    "perspective(1200px) translateY(0) scale(1)";

                            },
                            900
                        );
                    }



                    if (brand) {

                        setTimeout(
                            function () {

                                brand.style.transition =
                                    "opacity .75s ease, transform .75s cubic-bezier(.16,1,.3,1)";

                                brand.style.opacity =
                                    "1";

                                brand.style.transform =
                                    "translateY(0)";

                            },
                            1050
                        );
                    }



                    benefits.forEach(
                        function (item, index) {

                            setTimeout(
                                function () {

                                    item.style.transition =
                                        "opacity .65s ease, transform .65s cubic-bezier(.16,1,.3,1)";

                                    item.style.opacity =
                                        "1";

                                    item.style.transform =
                                        "translateX(0)";

                                },
                                1100 + (index * 140)
                            );

                        }
                    );



                    obs.unobserve(section);

                });

            },

            {
                threshold: 0.15,

                rootMargin:
                    "0px 0px -80px 0px"
            }

        );



    observer.observe(section);



    let resizeTimer = null;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(
                    function () {

                        if (!isDesktop()) {

                            visuals.forEach(
                                function (visual) {

                                    visual.style.transform =
                                        "translateX(-50%) perspective(850px) rotateX(10deg) rotateY(-3deg)";

                                    visual.style.filter =
                                        "brightness(1)";
                                }
                            );

                        } else {

                            visuals.forEach(
                                function (visual, index) {

                                    visual.style.transform =
                                        desktopTransforms[index] ||
                                        desktopTransforms[0];

                                    visual.style.filter =
                                        "brightness(1)";
                                }
                            );
                        }

                    },
                    180
                );

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function handleReducedMotion() {

        if (!reducedMotion.matches) {
            return;
        }


        steps.forEach(
            function (step) {

                step.style.animationPlayState =
                    "running";

                step.style.opacity =
                    "1";

                step.style.transform =
                    "translateY(0) scale(1)";
            }
        );


        if (dashboard) {

            dashboard.style.opacity =
                "1";

            dashboard.style.transform =
                "perspective(1200px) translateY(0) scale(1)";
        }


        if (brand) {

            brand.style.opacity =
                "1";

            brand.style.transform =
                "translateY(0)";
        }


        benefits.forEach(
            function (item) {

                item.style.opacity =
                    "1";

                item.style.transform =
                    "translateX(0)";
            }
        );
    }


    handleReducedMotion();


    if (reducedMotion.addEventListener) {

        reducedMotion.addEventListener(
            "change",
            handleReducedMotion
        );

    } else if (reducedMotion.addListener) {

        reducedMotion.addListener(
            handleReducedMotion
        );
    }

});




/* =========================================================
                   POWER BI SECTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const powerBISection =
        document.querySelector("#powerbi-features");

    if (!powerBISection) return;


    const revealElements =
        powerBISection.querySelectorAll(".pb-reveal");




    const observer =
        new IntersectionObserver(

            (entries, obs) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const element =
                        entry.target;



                    element.classList.add("pb-visible");



                    obs.unobserve(element);

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }

        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

});



/* =========================================================
               POWER BI VALUE SECTION 
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const pbValueSection =
        document.querySelector(".pb-section.pb-value");

    if (!pbValueSection) return;



    const pbValueObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        pbValueSection.classList.add(
                            "pb-visible"
                        );

                        observer.unobserve(
                            pbValueSection
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    pbValueObserver.observe(
        pbValueSection
    );

});


/* =========================================================
                 DYNAMICS 365 HERO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HERO SECTION
    ===================================================== */

    const heroSection =
        document.querySelector("#dynamics-hero");

    if (!heroSection) return;


    /* =====================================================
       ALL HERO REVEAL ELEMENTS
    ===================================================== */

    const revealItems =
        heroSection.querySelectorAll(

            /* ---------------------------------------------
               BACKGROUND
            --------------------------------------------- */

            ".dy-bg-glow, " +

            /* ---------------------------------------------
               LEFT CONTENT
            --------------------------------------------- */

            ".dy-eyebrow, " +
            ".dy-title, " +
            ".dy-subtitle, " +
            ".dy-actions, " +

            /* ---------------------------------------------
               BENEFITS
            --------------------------------------------- */

            ".dy-benefit, " +

            /* ---------------------------------------------
               RIGHT VISUAL
            --------------------------------------------- */

            ".dy-orbit, " +
            ".dy-media, " +
            ".dy-video-brand, " +
            ".dy-play-btn, " +
            ".dy-platform-card, " +

            /* ---------------------------------------------
               FLOATING CARDS
            --------------------------------------------- */

            ".dy-float-card"
        );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    revealItems.forEach((item, index) => {


        /* ---------------------------------------------
           Hide element
        --------------------------------------------- */

        item.style.opacity = "0";


        /* ---------------------------------------------
           Use translate instead of transform
           
           IMPORTANT:
           This does NOT destroy existing transform
           animations from the CSS.
        --------------------------------------------- */

        item.style.translate =
            "0 45px";


        /* ---------------------------------------------
           Smooth reveal
        --------------------------------------------- */

        item.style.transition =
            "opacity 0.8s ease, " +
            "translate 0.85s cubic-bezier(.2,.7,.2,1)";


        /* ---------------------------------------------
           Stagger
        --------------------------------------------- */

        item.style.transitionDelay =
            `${index * 0.08}s`;

    });


    /* =====================================================
       REVEAL FUNCTION
    ===================================================== */

    let heroRevealed = false;


    const revealHero = () => {


        /* ---------------------------------------------
           Prevent running more than once
        --------------------------------------------- */

        if (heroRevealed) return;


        heroRevealed = true;


        /* ---------------------------------------------
           Reveal ALL HERO ELEMENTS
        --------------------------------------------- */

        revealItems.forEach((item) => {

            item.style.opacity = "1";

            item.style.translate =
                "0 0";

        });


        /* ---------------------------------------------
           Remove scroll listener
        --------------------------------------------- */

        window.removeEventListener(
            "scroll",
            handleHeroScroll
        );

    };


    /* =====================================================
       CHECK HERO POSITION
    ===================================================== */

    const handleHeroScroll = () => {


        const rect =
            heroSection.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        /* ---------------------------------------------
           Hero is visible on screen
        --------------------------------------------- */

        const heroVisible =
            rect.top < viewportHeight &&
            rect.bottom > 0;


        if (heroVisible) {

            revealHero();

        }

    };


    /* =====================================================
       SCROLL LISTENER
    ===================================================== */

    window.addEventListener(
        "scroll",
        handleHeroScroll,
        {
            passive: true
        }
    );


});

/* =========================================================
              DYNAMICS 365 PLANS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const plansSection =
            document.querySelector(
                ".d365-plans-section"
            );

        if (!plansSection) return;


        const revealItems =
            plansSection.querySelectorAll(
                ".d365-plans-header, .d365-plan-card, .d365-center-connector, .d365-plans-cta"
            );




        revealItems.forEach(
            (item, index) => {

                item.style.opacity = "0";

                item.style.transform =
                    "translateY(35px)";

                item.style.transition =
                    `
                    opacity 0.8s ease,
                    transform 0.8s cubic-bezier(.2,.7,.2,1)
                    `;

                item.style.transitionDelay =
                    `${index * 0.12}s`;
            }
        );



        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.style.opacity =
                                "1";


                            entry.target.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealItems.forEach(
            item => {

                observer.observe(
                    item
                );

            }
        );

    }
);


/* =========================================================
              DYNAMICS 365 FEATURES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const featuresSection =
        document.querySelector("#dynamics-features");

    if (!featuresSection) return;




    const revealItems =
        featuresSection.querySelectorAll(
            ".dy-bg-glow, " +
            ".dy-orbit, " +
            ".dy-dots, " +
            ".dy-floating-dot, " +
            ".dy-cube, " +
            ".dy-features-header, " +
            ".dy-features-eyebrow, " +
            ".dy-features-title, " +
            ".dy-title-line, " +
            ".dy-features-subtitle, " +
            ".dy-feature-card, " +
            ".dy-features-cta"
        );




    revealItems.forEach((item, index) => {

        item.style.opacity = "0";


        item.style.translate = "0 45px";

        item.style.transition =
            "opacity 0.8s ease, " +
            "translate 0.85s cubic-bezier(.2,.7,.2,1)";


        item.style.transitionDelay =
            `${index * 0.07}s`;
    });




    let sectionRevealed = false;


    const revealFeatures = () => {

        if (sectionRevealed) return;

        sectionRevealed = true;


        revealItems.forEach((item) => {

            item.style.opacity = "1";
            item.style.translate = "0 0";

        });



        window.removeEventListener(
            "scroll",
            handleFeaturesScroll
        );
    };



    const handleFeaturesScroll = () => {

        const rect =
            featuresSection.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;


        const sectionVisible =
            rect.top < viewportHeight &&
            rect.bottom > 0;


        if (sectionVisible) {

            revealFeatures();

        }
    };




    window.addEventListener(
        "scroll",
        handleFeaturesScroll,
        { passive: true }
    );

});



/* =========================================================
               WHY CHOOSE TECHWORLD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const whySection =
        document.querySelector("#why-techworld");

    if (!whySection) return;




    const revealItems =
        whySection.querySelectorAll(
            ".dy-why-bg, " +
            ".dy-why-grid-pattern, " +
            ".dy-why-light-line, " +
            ".dy-why-eyebrow, " +
            ".dy-why-title, " +
            ".dy-why-text, " +
            ".dy-why-point, " +
            ".dy-why-orbit, " +
            ".dy-orbit-dot, " +
            ".dy-people-image-glow, " +
            ".dy-people-image-frame, " +
            ".dy-card-dynamics, " +
            ".dy-retail-card, " +
            ".dy-realestate-card, " +
            ".dy-construction-card, " +
            ".dy-manufacturing-card, " +
            ".dy-gold-card, " +
            ".dy-handwriting"
        );




    revealItems.forEach((item, index) => {

        item.style.opacity = "0";

        item.style.translate = "0 45px";

        item.style.transition =
            "opacity 0.8s ease, " +
            "translate 0.85s cubic-bezier(.2,.7,.2,1)";

        item.style.transitionDelay =
            `${index * 0.07}s`;

    });



    let sectionRevealed = false;


    const revealSection = () => {

        if (sectionRevealed) return;

        sectionRevealed = true;


        revealItems.forEach((item) => {

            item.style.opacity = "1";

            item.style.translate = "0 0";

        });


        window.removeEventListener(
            "scroll",
            handleWhyScroll
        );

    };




    const handleWhyScroll = () => {

        const rect =
            whySection.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;


        const sectionVisible =
            rect.top < viewportHeight &&
            rect.bottom > 0;


        if (sectionVisible) {

            revealSection();

        }

    };


    window.addEventListener(
        "scroll",
        handleWhyScroll,
        { passive: true }
    );

});


/* =========================================================
                       PARTNERS HERO
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const hero =
        document.getElementById("partnersHero");

    const grid =
        document.getElementById("partnersHeroGrid");

    if (!hero || !grid) {
        return;
    }


  

    function getGridColumns(width) {

        /* DESKTOP */
        if (width >= 1281) {
            return 32;
        }

        /* MEDIUM DESKTOP */
        if (width >= 1024) {
            return 30;
        }

        /* TABLET */
        if (width >= 885) {
            return 26;
        }

        /* SMALL TABLET */
        if (width >= 600) {
            return 20;
        }

        /* MOBILE LARGE */
        if (width >= 480) {
            return 14;
        }

        /* MOBILE
           320px → 479px
        */
        return 12;
    }




    function isPageRTL() {

        const htmlDir =
            document.documentElement.getAttribute("dir");

        const bodyDir =
            document.body
                ? document.body.getAttribute("dir")
                : null;

        return (
            htmlDir === "rtl" ||
            bodyDir === "rtl"
        );
    }


 

    function calculateGridRows(columns) {

        const gridWidth =
            grid.clientWidth;

        const gridHeight =
            grid.clientHeight;



        if (
            !gridWidth ||
            !gridHeight ||
            !columns
        ) {
            return 1;
        }


  

        const gap = 5;
        const padding = 18;



        const usableWidth =
            gridWidth -
            (padding * 2) -
            ((columns - 1) * gap);


        if (usableWidth <= 0) {
            return 1;
        }



        const cellWidth =
            usableWidth / columns;



        const estimatedRows =
            (
                gridHeight -
                (padding * 2) +
                gap
            ) /
            (
                cellWidth +
                gap
            );


        let rows =
            Math.round(
                estimatedRows
            );


        rows =
            Math.max(
                1,
                Math.min(
                    60,
                    rows
                )
            );


        return rows;
    }


    function buildPartnersGrid() {

        const columns =
            getGridColumns(
                window.innerWidth
            );


        const rows =
            calculateGridRows(
                columns
            );


        const isRTL =
            isPageRTL();



        grid.style.direction = "ltr";


        grid.style.setProperty(
            "--partners-grid-columns",
            columns
        );

        grid.style.setProperty(
            "--partners-grid-rows",
            rows
        );



        grid.classList.remove(
            "is-ltr",
            "is-rtl"
        );


        grid.classList.add(
            isRTL
                ? "is-rtl"
                : "is-ltr"
        );



        grid.innerHTML = "";


        const fragment =
            document.createDocumentFragment();


        for (
            let row = 0;
            row < rows;
            row++
        ) {

            for (
                let col = 0;
                col < columns;
                col++
            ) {

                const cell =
                    document.createElement("span");




                const visualColumn =
                    isRTL
                        ? columns - 1 - col
                        : col;



                const delay =
                    visualColumn * 0.12;


                cell.style.setProperty(
                    "--grid-delay",
                    `${delay}s`
                );



                if (
                    visualColumn % 2 === 0
                ) {

                    cell.classList.add(
                        "grid-light"
                    );

                } else {

                    cell.classList.add(
                        "grid-dark"
                    );
                }


                fragment.appendChild(
                    cell
                );
            }
        }


        grid.appendChild(
            fragment
        );
    }



    requestAnimationFrame(
        function () {

            buildPartnersGrid();

        }
    );




    let resizeTimer = null;

    let previousWidth =
        window.innerWidth;

    let previousHeight =
        hero.offsetHeight;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        const currentWidth =
                            window.innerWidth;

                        const currentHeight =
                            hero.offsetHeight;


       

                        const widthChanged =
                            Math.abs(
                                currentWidth -
                                previousWidth
                            ) > 1;




                        const heightChanged =
                            Math.abs(
                                currentHeight -
                                previousHeight
                            ) > 2;



                        if (
                            widthChanged ||
                            heightChanged
                        ) {

                            buildPartnersGrid();


                            previousWidth =
                                currentWidth;

                            previousHeight =
                                currentHeight;
                        }

                    },
                    180
                );
        }
    );



    const revealElements = [

        hero.querySelector(
            ".partners-kicker"
        ),

        hero.querySelector(
            ".partners-hero-title"
        ),

        hero.querySelector(
            ".partners-hero-subtitle"
        ),

        hero.querySelector(
            ".partners-hero-actions"
        ),

        hero.querySelector(
            ".partners-hero-meta"
        ),

        hero.querySelector(
            ".partners-hero-visual"
        )

    ].filter(Boolean);




    const revealObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.18,

                rootMargin:
                    "0px 0px -70px 0px"
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );



    window.addEventListener(
        "languageChanged",
        function () {



            requestAnimationFrame(
                function () {

                    buildPartnersGrid();

                }
            );



            revealElements.forEach(
                function (element) {

                    if (
                        element.classList.contains(
                            "is-visible"
                        )
                    ) {

                        element.classList.remove(
                            "is-visible"
                        );


                        /* Force browser reflow */

                        void element.offsetWidth;


                        element.classList.add(
                            "is-visible"
                        );
                    }

                }
            );

        }
    );

});



/* =========================================================
                ECOSYSTEM PARTNERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const section =
            document.getElementById(
                "technologyPartners"
            );

        if (!section) {
            return;
        }


        const grid =
            section.querySelector(
                ".partners-grid"
            );


        const cards =
            Array.from(
                section.querySelectorAll(
                    ".partner-card"
                )
            );


        if (!grid || !cards.length) {
            return;
        }



        function getColumnCount() {

            const columns =
                window
                    .getComputedStyle(grid)
                    .gridTemplateColumns
                    .split(" ")
                    .filter(Boolean)
                    .length;

            return columns || 4;
        }




        function isRTL() {

            return (
                document.documentElement
                    .getAttribute("dir") === "rtl"
                ||
                document.body
                    .getAttribute("dir") === "rtl"
            );
        }




        function prepareCardAnimation() {

            const rtl =
                isRTL();

            const columns =
                getColumnCount();


            cards.forEach(
                function (card, index) {


                    const row =
                        Math.floor(
                            index / columns
                        );



                    const column =
                        index % columns;



                    const visualColumn =
                        rtl
                            ? columns - 1 - column
                            : column;


                    const delay =
                        (
                            row * columns +
                            visualColumn
                        ) * 0.105;


                    card.style.setProperty(
                        "--card-delay",
                        `${delay}s`
                    );
                }
            );
        }


        /* =====================================================
           INITIAL PREPARATION
        ===================================================== */

        prepareCardAnimation();


        /* =====================================================
           INTERSECTION OBSERVER
        ===================================================== */

        let hasRevealed =
            false;


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    function (
                        entries,
                        observerInstance
                    ) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                if (
                                    !hasRevealed
                                ) {

                                    hasRevealed =
                                        true;


                                    section.classList.add(
                                        "partners-section-visible"
                                    );
                                }


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold:
                            0.12,

                        rootMargin:
                            "0px 0px -80px 0px"
                    }
                );


            observer.observe(
                section
            );

        } else {

            /*
             * Fallback
             */

            hasRevealed =
                true;

            section.classList.add(
                "partners-section-visible"
            );
        }


        /* =====================================================
           LANGUAGE CHANGE
        ===================================================== */

        window.addEventListener(
            "languageChanged",
            function () {

                /*
                 * Recalculate horizontal direction
                 */

                prepareCardAnimation();


                /*
                 * Restart only if already visible
                 */

                if (
                    section.classList.contains(
                        "partners-section-visible"
                    )
                ) {

                    section.classList.remove(
                        "partners-section-visible"
                    );


                    void section.offsetWidth;


                    section.classList.add(
                        "partners-section-visible"
                    );
                }

            }
        );


        /* =====================================================
           RESIZE
        ===================================================== */

        let resizeTimer =
            null;


        let lastColumns =
            getColumnCount();


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        function () {

                            const currentColumns =
                                getColumnCount();


                            if (
                                currentColumns !==
                                lastColumns
                            ) {

                                prepareCardAnimation();

                                lastColumns =
                                    currentColumns;
                            }

                        },
                        180
                    );
            }
        );

    }
);


document.addEventListener("DOMContentLoaded", function () {

    const partnershipSection =
        document.querySelector(".tw-partnership-section");

    if (!partnershipSection) return;


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        partnershipSection.classList.add(
                            "tw-partnership-section-visible"
                        );

                        observer.unobserve(
                            partnershipSection
                        );
                    }

                });

            },
            {
                threshold: 0.16
            }
        );


    observer.observe(
        partnershipSection
    );

});





/* =========================================================
              PARTNERSHIP VALUE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {



    const section =
        document.getElementById("partnership-value");

    if (!section) {
        return;
    }




    const cardsGrid =
        section.querySelector(".partners-value-cards");

    const cards =
        Array.from(
            section.querySelectorAll(
                ".partners-value-card"
            )
        );


    if (!cardsGrid || !cards.length) {
        return;
    }




    function getColumnCount() {

        const columns =
            window
                .getComputedStyle(cardsGrid)
                .gridTemplateColumns
                .split(" ")
                .filter(Boolean)
                .length;

        return columns || 3;
    }



    function isRTL() {

        return (
            document.documentElement
                .getAttribute("dir") === "rtl"
            ||
            document.body
                .getAttribute("dir") === "rtl"
        );
    }



    function prepareCardAnimation() {

        const rtl =
            isRTL();

        const columns =
            getColumnCount();


        cards.forEach(function (card, index) {



            const row =
                Math.floor(
                    index / columns
                );




            const column =
                index % columns;




            const visualColumn =
                rtl
                    ? columns - 1 - column
                    : column;




            const delay =
                (
                    row * columns +
                    visualColumn
                ) * 0.11;


            card.style.setProperty(
                "--partners-card-delay",
                `${delay}s`
            );

        });
    }




    prepareCardAnimation();




    let hasRevealed = false;


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                function (
                    entries,
                    observerInstance
                ) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }




                        if (!hasRevealed) {

                            hasRevealed = true;

                            section.classList.add(
                                "partners-value-section-visible"
                            );
                        }



                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.14,

                    rootMargin:
                        "0px 0px -70px 0px"
                }
            );


        observer.observe(section);

    } else {



        hasRevealed = true;

        section.classList.add(
            "partners-value-section-visible"
        );
    }




    window.addEventListener(
        "languageChanged",
        function () {

            prepareCardAnimation();



            if (
                section.classList.contains(
                    "partners-value-section-visible"
                )
            ) {

                section.classList.remove(
                    "partners-value-section-visible"
                );



                void section.offsetWidth;


                section.classList.add(
                    "partners-value-section-visible"
                );
            }

        }
    );




    let resizeTimer = null;

    let lastColumns =
        getColumnCount();


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(
                    function () {

                        const currentColumns =
                            getColumnCount();


                        if (
                            currentColumns !==
                            lastColumns
                        ) {

                            prepareCardAnimation();

                            lastColumns =
                                currentColumns;
                        }

                    },
                    180
                );
        }
    );

});




/* =========================================================
                  CLIENTS HERO
========================================================= */

(() => {



function initClientsHero() {

const clientsHero =
document.querySelector(".clients-hero");


if (!clientsHero) {
return;
}




if (
clientsHero.dataset.revealInitialized === "true"
) {
return;
}


clientsHero.dataset.revealInitialized =
"true";




const prefersReducedMotion =
window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;




clientsHero.classList.add(
"clients-reveal-ready"
);




const kicker =
clientsHero.querySelector(
    ".clients-hero-kicker"
);


const description =
clientsHero.querySelector(
    ".clients-hero-description"
);


const visual =
clientsHero.querySelector(
    ".clients-hero-visual"
);


const signature =
clientsHero.querySelector(
    ".clients-hero-signature"
);




const titleLines =
clientsHero.querySelectorAll(
    ".clients-hero-title > span"
);


titleLines.forEach(
(line, index) => {

    line.classList.add(
        "clients-title-reveal"
    );


    line.style.setProperty(
        "--title-delay",
        `${100 + index * 140}ms`
    );

}
);




const statCards =
clientsHero.querySelectorAll(
    ".clients-stat-card"
);


statCards.forEach(
(card, index) => {

    card.classList.add(
        "clients-scroll-reveal"
    );


    card.style.setProperty(
        "--reveal-delay",
        `${390 + index * 130}ms`
    );

}
);




const revealElements = [];


if (kicker) {

kicker.classList.add(
    "clients-scroll-reveal"
);

kicker.style.setProperty(
    "--reveal-delay",
    "0ms"
);

revealElements.push(
    kicker
);

}


if (description) {

description.classList.add(
    "clients-scroll-reveal"
);

description.style.setProperty(
    "--reveal-delay",
    "260ms"
);

revealElements.push(
    description
);

}


if (visual) {

visual.classList.add(
    "clients-scroll-reveal"
);

visual.style.setProperty(
    "--reveal-delay",
    "320ms"
);

revealElements.push(
    visual
);

}


if (signature) {

signature.classList.add(
    "clients-scroll-reveal"
);

signature.style.setProperty(
    "--reveal-delay",
    "920ms"
);

revealElements.push(
    signature
);

}




const counters =
clientsHero.querySelectorAll(
    ".clients-stat-number[data-target]"
);



const staticCounter =
clientsHero.querySelector(
    ".clients-stat-static"
);


if (staticCounter) {

staticCounter.textContent =
    "24/7";

}



const allRevealElements =
clientsHero.querySelectorAll(
    ".clients-scroll-reveal"
);



function showElement(element) {

if (!element) {
    return;
}


if (
    element.classList.contains(
        "clients-scroll-visible"
    )
) {
    return;
}


element.classList.add(
    "clients-scroll-visible"
);

}




function showTitle(line) {

if (!line) {
    return;
}


if (
    line.classList.contains(
        "clients-title-visible"
    )
) {
    return;
}


line.classList.add(
    "clients-title-visible"
);

}




function revealFirstHero() {

if (prefersReducedMotion) {

    allRevealElements.forEach(
        (element) => {

            showElement(
                element
            );

        }
    );


    titleLines.forEach(
        (line) => {

            showTitle(
                line
            );

        }
    );


    return;
}




if (kicker) {

    setTimeout(
        () => {

            showElement(
                kicker
            );

        },
        100
    );

}




titleLines.forEach(
    (line, index) => {

        setTimeout(
            () => {

                showTitle(
                    line
                );

            },

            200 +
            index * 140
        );

    }
);




if (description) {

    setTimeout(
        () => {

            showElement(
                description
            );

        },
        480
    );

}




statCards.forEach(
    (card, index) => {

        setTimeout(
            () => {

                showElement(
                    card
                );

            },

            620 +
            index * 130
        );

    }
);



if (visual) {

    setTimeout(
        () => {

            showElement(
                visual
            );

        },
        760
    );

}




if (signature) {

    setTimeout(
        () => {

            showElement(
                signature
            );

        },
        1100
    );

}

}



requestAnimationFrame(
() => {

    requestAnimationFrame(
        () => {

            revealFirstHero();

        }
    );

}
);




if (
!prefersReducedMotion
) {

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    showElement(
                        entry.target
                    );


                    observer.unobserve(
                        entry.target
                    );

                }
            );

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -70px 0px"
        }
    );




allRevealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);



const titleObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    showTitle(
                        entry.target
                    );


                    observer.unobserve(
                        entry.target
                    );

                }
            );

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -60px 0px"
        }
    );


titleLines.forEach(
    (line) => {

        titleObserver.observe(
            line
        );

    }
);

}




function animateCounter(counter) {

if (!counter) {
    return;
}


if (
    counter.dataset.animated === "true"
) {
    return;
}


counter.dataset.animated =
    "true";


const target =
    Number(
        counter.dataset.target
    );


const suffix =
    counter.dataset.suffix || "";


if (
    Number.isNaN(target)
) {
    return;
}


const duration =
    1800;


const startTime =
    performance.now();


function updateCounter(
    currentTime
) {

    const elapsed =
        currentTime -
        startTime;


    const progress =
        Math.min(
            elapsed / duration,
            1
        );


    const easedProgress =
        1 -
        Math.pow(
            1 - progress,
            3
        );


    const currentValue =
        Math.floor(
            easedProgress *
            target
        );


    counter.textContent =
        currentValue.toLocaleString(
            "en-US"
        ) + suffix;


    if (
        progress < 1
    ) {

        requestAnimationFrame(
            updateCounter
        );

    } else {

        counter.textContent =
            target.toLocaleString(
                "en-US"
            ) + suffix;

    }

}


requestAnimationFrame(
    updateCounter
);

}




const statsContainer =
clientsHero.querySelector(
    ".clients-hero-stats"
);


let countersStarted =
false;


function startCounters() {

if (countersStarted) {
    return;
}


countersStarted = true;


counters.forEach(
    (counter, index) => {

        setTimeout(
            () => {

                animateCounter(
                    counter
                );

            },

            index * 180
        );

    }
);

}




if (
statsContainer &&
!prefersReducedMotion
) {

const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    startCounters();


                    observer.unobserve(
                        entry.target
                    );

                }
            );

        },
        {
            threshold: 0.15,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


counterObserver.observe(
    statsContainer
);




setTimeout(
    () => {

        startCounters();

    },
    900
);

}




if (
prefersReducedMotion
) {

counters.forEach(
    (counter) => {

        const target =
            Number(
                counter.dataset.target
            );


        const suffix =
            counter.dataset.suffix ||
            "";


        counter.textContent =
            target.toLocaleString(
                "en-US"
            ) + suffix;

    }
);

}

}




if (
document.readyState === "loading"
) {

document.addEventListener(
"DOMContentLoaded",
initClientsHero,
{
    once: true
}
);

} else {

initClientsHero();

}

})();




/* =========================================================
              ORGANIZATIONS WE SERVE
========================================================= */

(() => {

function initRealClientsReveal() {

const section =
document.querySelector(
    ".real-clients-section"
);


if (!section) {
return;
}



if (
section.dataset.revealInitialized === "true"
) {
return;
}


section.dataset.revealInitialized =
"true";


const prefersReducedMotion =
window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;



const kicker =
section.querySelector(
    ".real-clients-kicker"
);


const title =
section.querySelector(
    ".real-clients-title"
);


const description =
section.querySelector(
    ".real-clients-description"
);


const cards =
section.querySelectorAll(
    ".real-client-card"
);


const note =
section.querySelector(
    ".real-clients-note"
);


const trust =
section.querySelector(
    ".real-client-trust"
);


const revealElements = [];


function prepareElement(
element,
delay
) {

if (!element) {
    return;
}


element.classList.add(
    "real-clients-reveal"
);


element.style.setProperty(
    "--real-delay",
    `${delay}ms`
);


revealElements.push(
    element
);

}



prepareElement(
kicker,
0
);


if (title) {

title.classList.add(
    "real-clients-title-reveal"
);


title.style.setProperty(
    "--real-delay",
    "110ms"
);


revealElements.push(
    title
);

}


prepareElement(
description,
220
);



cards.forEach(
(card, index) => {

    card.style.setProperty(
        "--real-delay",
        `${320 + index * 65}ms`
    );


    revealElements.push(
        card
    );

}
);




prepareElement(
note,
720
);


prepareElement(
trust,
860
);



section.classList.add(
"real-reveal-ready"
);




function revealElement(
element
) {

if (!element) {
    return;
}


if (
    element.classList.contains(
        "real-clients-visible"
    )
) {
    return;
}


element.classList.add(
    "real-clients-visible"
);

}



if (
prefersReducedMotion
) {

revealElements.forEach(
    (element) => {

        revealElement(
            element
        );

    }
);


return;
}


const observer =
new IntersectionObserver(
    (
        entries,
        obs
    ) => {

        entries.forEach(
            (entry) => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                revealElement(
                    entry.target
                );


                obs.unobserve(
                    entry.target
                );

            }
        );

    },
    {
        threshold:
            0.14,

        rootMargin:
            "0px 0px -90px 0px"
    }
);




revealElements.forEach(
(element) => {

    observer.observe(
        element
    );

}
);

}




if (
document.readyState ===
"loading"
) {

document.addEventListener(
"DOMContentLoaded",
initRealClientsReveal,
{
    once: true
}
);

} else {

initRealClientsReveal();

}

})();


/* =========================================================
              why-techworld
========================================================= */


document.addEventListener("DOMContentLoaded", () => {



    const revealItems = document.querySelectorAll(
        ".why-techworld-reveal"
    );

    if (!revealItems.length) return;


    let ticking = false;




    function revealOnScroll() {

        const windowHeight = window.innerHeight;


        revealItems.forEach((item) => {

            const elementTop =
                item.getBoundingClientRect().top;


            if (
                elementTop <
                windowHeight * 0.86
            ) {

                item.classList.add(
                    "is-visible"
                );

            }

        });


        ticking = false;
    }



    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    revealOnScroll
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    revealOnScroll();


});




/* =========================================================
              ABOUT HERO 
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector("#about-hero");

    if (!hero) return;



    const animatedElements = [
        hero.querySelector(".about-kicker"),
        hero.querySelector(".about-hero-title"),
        hero.querySelector(".about-hero-subtitle"),
        ...hero.querySelectorAll(".about-hero-stat"),
        hero.querySelector(".about-hero-visual")
    ].filter(Boolean);

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {

        animatedElements.forEach((element) => {
            element.classList.add(
                "about-reveal",
                "about-revealed"
            );
        });

    } else {

   

        animatedElements.forEach((element) => {
            element.classList.add("about-reveal");
        });


        const revealHero = () => {

            animatedElements.forEach((element, index) => {

                const delay = 500 + (index * 400);

                window.setTimeout(() => {

                    element.classList.add("about-revealed");

                }, delay);

            });

        };


        window.requestAnimationFrame(() => {

            window.requestAnimationFrame(() => {

                revealHero();

            });

        });

    }


    const video = hero.querySelector("#aboutHeroVideo");

    if (!video) return;



    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const startVideo = () => {

        const playPromise = video.play();

        if (playPromise !== undefined) {

            playPromise.catch((error) => {

 

                console.warn(
                    "About hero autoplay was prevented:",
                    error
                );

            });

        }

    };

    if (video.readyState >= 2) {

        startVideo();

    } else {

        video.addEventListener(
            "canplay",
            startVideo,
            { once: true }
        );

    }

});



/* =========================================================
                ABOUT INTRO 
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector("#about-intro");

    if (!section) return;

    const animatedElements = [
        ...section.querySelectorAll(".about-reveal")
    ];

    if (!animatedElements.length) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;



    if (reduceMotion) {
        animatedElements.forEach((element) => {
            element.classList.add(
                "about-revealed"
            );
        });

        return;
    }



    animatedElements.forEach((element, index) => {

        element.classList.remove("about-revealed");

        element.style.setProperty(
            "--about-reveal-delay",
            `${index * 220}ms`
        );

    });


    let hasRevealed = false;

    const revealSection = () => {

        if (hasRevealed) return;

        hasRevealed = true;

        animatedElements.forEach((element, index) => {

            window.setTimeout(() => {

                element.classList.add("about-revealed");

            }, index * 220);

        });

    };

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !hasRevealed
                    ) {

                        revealSection();

                        observer.disconnect();

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        observer.observe(section);

    } else {

        revealSection();

    }

});







/* =========================================================
                 ABOUT TRUSTBAR 
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#about-trustbar");

    if (!section) return;



    const desktopContainer = section.querySelector(
        ".about-trustbar-logos"
    );

    const rowUp = section.querySelector(
        ".about-trustbar-row-up"
    );

    const rowDown = section.querySelector(
        ".about-trustbar-row-down"
    );

    const responsiveContainer = section.querySelector(
        ".about-trustbar-tablet"
    );

    if (!desktopContainer || !rowUp || !rowDown) return;



    const INTERVAL = 4000;
    const EXIT_DURATION = 650;
    const ENTER_DURATION = 1400;
    const DISTANCE = 46;

    const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";



    const TABLET_QUERY = window.matchMedia(
        "(min-width: 601px) and (max-width: 1023px)"
    );

    const MOBILE_QUERY = window.matchMedia(
        "(min-width: 320px) and (max-width: 480px)"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );



    const groupA = [
        ["images/partners/Tech202432611742.png", "Microsoft"],
        ["images/partners/Tech202432774144.png", "Cisco"],
        ["images/partners/Tech2024415102258.png", "HP"],
        ["images/partners/Tech2024416102743.png", "QNAP"],
        ["images/partners/Tech202441610954.png", "Sophos"]
    ];

    const groupB = [
        ["images/partners/Tech2024416111850.png", "Dell"],
        ["images/partners/Tech2024416114935.png", "VMware"],
        ["images/partners/Tech2024416121126.png", "Lenovo"],
        [
            "images/partners/Tech2024416113539.png",
            "Hewlett Packard Enterprise"
        ],
        ["images/partners/Tech202441611568.png", "Red Hat"]
    ];

    const allLogos = [...groupA, ...groupB];



    const desktopRows = [
        {
            element: rowUp,
            groups: [groupA, groupB],
            index: 0,
            direction: -1
        },
        {
            element: rowDown,
            groups: [groupB, groupA],
            index: 0,
            direction: 1
        }
    ];



    const tabletRowSizes = [3, 3, 2, 2];

    const tabletDirections = [-1, -1, 1, 1];

    let tabletRows = [];

    let tabletOffset = 0;



    let mobileRows = [];

    const mobileDirections = [
        -1, -1, -1, -1, -1,
         1,  1,  1,  1,  1
    ];

    let mobileOffset = 0;

  

    let timer = null;
    let isVisible = false;
    let isPaused = false;
    let isAnimating = false;
    let animationVersion = 0;



    allLogos.forEach(([src]) => {
        const image = new Image();
        image.src = src;
    });



    function createCard([src, alt]) {
        const card = document.createElement("div");

        card.className = "about-trustbar-logo";

        const image = document.createElement("img");

        image.src = src;
        image.alt = alt;
        image.loading = "eager";
        image.decoding = "async";

        card.appendChild(image);

        return card;
    }



    function renderRow(row, logos) {
        const fragment = document.createDocumentFragment();

        logos.forEach((logo) => {
            fragment.appendChild(createCard(logo));
        });

        row.replaceChildren(fragment);
    }



    function isMobileMode() {
        return (
            MOBILE_QUERY.matches &&
            responsiveContainer
        );
    }

    function isTabletMode() {
        return (
            TABLET_QUERY.matches &&
            responsiveContainer
        );
    }

    function getActiveRows() {
        if (isMobileMode()) {
            return mobileRows;
        }

        if (isTabletMode()) {
            return tabletRows;
        }

        return desktopRows.map((item) => item.element);
    }



    function createResponsiveRows(count) {
        if (!responsiveContainer) return [];

        const fragment = document.createDocumentFragment();
        const rows = [];

        for (let i = 0; i < count; i++) {
            const row = document.createElement("div");

            row.className = "about-trustbar-tablet-row";
            row.dataset.row = String(i + 1);

            fragment.appendChild(row);
            rows.push(row);
        }

        responsiveContainer.replaceChildren(fragment);

        return rows;
    }



    function nextFrame() {
        return new Promise((resolve) => {
            requestAnimationFrame(resolve);
        });
    }

    function canContinue(version) {
        return (
            version === animationVersion &&
            isVisible &&
            !reduceMotion.matches
        );
    }

    function syncAnimationPlayback(element) {
        element.getAnimations().forEach((animation) => {
            if (isPaused) {
                animation.pause();
            } else {
                animation.play();
            }
        });
    }

    function resetElement(element) {
        element.getAnimations().forEach((animation) => {
            animation.cancel();
        });

        element.style.transition = "";
        element.style.opacity = "1";
        element.style.transform = "translate3d(0, 0, 0)";

        element.classList.remove("is-moving");
    }

  

    async function animateOut(element, direction, version) {
        if (!canContinue(version)) return false;

        element.classList.add("is-moving");

        const exitY = direction * DISTANCE;

        const animation = element.animate(
            [
                {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)"
                },
                {
                    opacity: 0,
                    transform: `translate3d(0, ${exitY}px, 0)`
                }
            ],
            {
                duration: EXIT_DURATION,
                easing: EASING,
                fill: "forwards"
            }
        );

        syncAnimationPlayback(element);

        try {
            await animation.finished;
        } catch {
            return false;
        }

        animation.cancel();

        return canContinue(version);
    }



    async function animateIn(element, direction, version) {
        if (!canContinue(version)) {
            resetElement(element);
            return;
        }

        const enterY = -direction * DISTANCE;

        element.style.transition = "none";
        element.style.opacity = "0";

        element.style.transform =
            `translate3d(0, ${enterY}px, 0)`;

        void element.offsetHeight;

        await nextFrame();

        if (!canContinue(version)) {
            resetElement(element);
            return;
        }

        const animation = element.animate(
            [
                {
                    opacity: 0,
                    transform: `translate3d(0, ${enterY}px, 0)`
                },
                {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)"
                }
            ],
            {
                duration: ENTER_DURATION,
                easing: EASING,
                fill: "forwards"
            }
        );

        syncAnimationPlayback(element);

        try {
            await animation.finished;
        } catch {
            return;
        }

        animation.cancel();

        if (version === animationVersion) {
            resetElement(element);
        }
    }



    async function rotateDesktop(version) {
        const changes = desktopRows.map(async (rowData) => {
            const nextIndex =
                (rowData.index + 1) % rowData.groups.length;

            const nextGroup = rowData.groups[nextIndex];

            const exited = await animateOut(
                rowData.element,
                rowData.direction,
                version
            );

            if (!exited || !canContinue(version)) {
                resetElement(rowData.element);
                return;
            }

            renderRow(rowData.element, nextGroup);

            rowData.index = nextIndex;

            await animateIn(
                rowData.element,
                rowData.direction,
                version
            );
        });

        await Promise.all(changes);
    }



    function getTabletGroups(offset) {
        const rotatedLogos = [
            ...allLogos.slice(offset),
            ...allLogos.slice(0, offset)
        ];

        let cursor = 0;

        return tabletRowSizes.map((size) => {
            const group = rotatedLogos.slice(
                cursor,
                cursor + size
            );

            cursor += size;

            return group;
        });
    }



    async function rotateTablet(version) {
        if (tabletRows.length !== 4) return;

        const nextOffset =
            (tabletOffset + 1) % allLogos.length;

        const nextGroups = getTabletGroups(nextOffset);

        const exitResults = await Promise.all(
            tabletRows.map((row, index) =>
                animateOut(
                    row,
                    tabletDirections[index],
                    version
                )
            )
        );

        if (
            !canContinue(version) ||
            exitResults.some((result) => !result)
        ) {
            tabletRows.forEach(resetElement);
            return;
        }

        tabletRows.forEach((row, index) => {
            renderRow(row, nextGroups[index]);
        });

        tabletOffset = nextOffset;

        await Promise.all(
            tabletRows.map((row, index) =>
                animateIn(
                    row,
                    tabletDirections[index],
                    version
                )
            )
        );
    }



    async function rotateMobile(version) {
        if (mobileRows.length !== 10) return;

        const nextOffset =
            (mobileOffset + 1) % allLogos.length;

        const rotatedLogos = [
            ...allLogos.slice(nextOffset),
            ...allLogos.slice(0, nextOffset)
        ];

        const exitResults = await Promise.all(
            mobileRows.map((row, index) =>
                animateOut(
                    row,
                    mobileDirections[index],
                    version
                )
            )
        );

        if (
            !canContinue(version) ||
            exitResults.some((result) => !result)
        ) {
            mobileRows.forEach(resetElement);
            return;
        }

     
        mobileRows.forEach((row, index) => {
            renderRow(row, [rotatedLogos[index]]);
        });

        mobileOffset = nextOffset;

        await Promise.all(
            mobileRows.map((row, index) =>
                animateIn(
                    row,
                    mobileDirections[index],
                    version
                )
            )
        );
    }



    async function rotateRows() {
        if (
            !isVisible ||
            isPaused ||
            isAnimating ||
            reduceMotion.matches
        ) {
            return;
        }

        isAnimating = true;

        const version = animationVersion;

        try {
            if (isMobileMode()) {
                await rotateMobile(version);
            } else if (isTabletMode()) {
                await rotateTablet(version);
            } else {
                await rotateDesktop(version);
            }
        } finally {
            isAnimating = false;
        }
    }



    function initializeDesktop() {
        desktopRows.forEach((rowData) => {
            renderRow(
                rowData.element,
                rowData.groups[rowData.index]
            );

            resetElement(rowData.element);
        });
    }



    function initializeTablet() {
        if (!responsiveContainer) return;

        tabletRows = createResponsiveRows(4);

        tabletOffset = 0;

        const groups = getTabletGroups(tabletOffset);

        tabletRows.forEach((row, index) => {
            renderRow(row, groups[index]);
            resetElement(row);
        });
    }



    function initializeMobile() {
        if (!responsiveContainer) return;

        mobileRows = createResponsiveRows(10);

        mobileOffset = 0;

        mobileRows.forEach((row, index) => {
            renderRow(row, [allLogos[index]]);
            resetElement(row);
        });
    }



    function initializeLayout() {
        stopRotation();

        initializeDesktop();

        if (isMobileMode()) {
            initializeMobile();
        } else if (isTabletMode()) {
            initializeTablet();
        } else if (responsiveContainer) {
            responsiveContainer.replaceChildren();

            tabletRows = [];
            mobileRows = [];
        }

        if (isVisible && !isPaused && !reduceMotion.matches) {
            startRotation();
        }
    }



    function startRotation() {
        if (
            timer !== null ||
            !isVisible ||
            isPaused ||
            reduceMotion.matches
        ) {
            return;
        }

        timer = window.setInterval(() => {
            rotateRows();
        }, INTERVAL);
    }

    function pauseRotation() {
        if (isPaused) return;

        isPaused = true;

        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }

        getActiveRows().forEach((element) => {
            element.getAnimations().forEach((animation) => {
                animation.pause();
            });
        });
    }

    function resumeRotation() {
        if (!isPaused) return;

        isPaused = false;

        if (!isVisible || reduceMotion.matches) return;

        getActiveRows().forEach((element) => {
            element.getAnimations().forEach((animation) => {
                animation.play();
            });
        });

        startRotation();
    }

    function stopRotation() {
        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }

        animationVersion++;

        getActiveRows().forEach((element) => {
            resetElement(element);
        });

        isAnimating = false;
    }



    function attachHoverPause(container) {
        if (!container) return;

        container.addEventListener("pointerover", (event) => {
            if (event.pointerType === "touch") return;

            const card = event.target.closest(
                ".about-trustbar-logo"
            );

            if (!card || !container.contains(card)) return;

            pauseRotation();
        });

        container.addEventListener("pointerout", (event) => {
            if (event.pointerType === "touch") return;

            const card = event.target.closest(
                ".about-trustbar-logo"
            );

            if (!card || !container.contains(card)) return;

            const nextTarget = event.relatedTarget;

            if (nextTarget && card.contains(nextTarget)) return;

            if (
                nextTarget &&
                container.contains(nextTarget) &&
                nextTarget.closest(".about-trustbar-logo")
            ) {
                return;
            }

            resumeRotation();
        });
    }

    attachHoverPause(desktopContainer);
    attachHoverPause(responsiveContainer);



    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                isVisible = entry.isIntersecting;

                if (isVisible) {
                    startRotation();
                } else {
                    stopRotation();
                }
            },
            {
                threshold: 0.15
            }
        );

        observer.observe(section);
    } else {
        isVisible = true;
    }

   

    function handleLayoutChange() {
        initializeLayout();
    }

    if (typeof TABLET_QUERY.addEventListener === "function") {
        TABLET_QUERY.addEventListener(
            "change",
            handleLayoutChange
        );
    } else {
        TABLET_QUERY.addListener(handleLayoutChange);
    }

    if (typeof MOBILE_QUERY.addEventListener === "function") {
        MOBILE_QUERY.addEventListener(
            "change",
            handleLayoutChange
        );
    } else {
        MOBILE_QUERY.addListener(handleLayoutChange);
    }

 

    function handleReducedMotionChange(event) {
        if (event.matches) {
            stopRotation();
        } else if (isVisible && !isPaused) {
            startRotation();
        }
    }

    if (typeof reduceMotion.addEventListener === "function") {
        reduceMotion.addEventListener(
            "change",
            handleReducedMotionChange
        );
    } else {
        reduceMotion.addListener(
            handleReducedMotionChange
        );
    }



    initializeDesktop();

    if (isMobileMode()) {
        initializeMobile();
    } else if (isTabletMode()) {
        initializeTablet();
    }

    startRotation();
});





/* =========================================================
                     ABOUT MISSION 
========================================================= */

(() => {
const initAboutMissionReveal = () => {
const section = document.querySelector("#about-mission");

if (!section || section.dataset.revealInitialized === "true") {
    return;
}

section.dataset.revealInitialized = "true";

const elements = section.querySelectorAll(".about-reveal");

if (!elements.length) {
    return;
}

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => {
        element.classList.add("is-visible");
    });

    return;
}


const revealDelay = 300;

elements.forEach((element, index) => {
    element.style.transitionDelay = `${index * revealDelay}ms`;
});


const observer = new IntersectionObserver(
    (entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");

            currentObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0,
        rootMargin: "0px 0px 180px 0px"
    }
);

elements.forEach((element) => {
    observer.observe(element);
});
};

if (document.readyState === "loading") {
document.addEventListener(
    "DOMContentLoaded",
    initAboutMissionReveal,
    { once: true }
);
} else {
initAboutMissionReveal();
}
})();



/* =========================================================
                  ABOUT WHY 
========================================================= */

(() => {
const initAboutWhyReveal = () => {
const section = document.querySelector("#about-why");

if (
!section ||
section.dataset.revealInitialized === "true"
) {
return;
}

section.dataset.revealInitialized = "true";

const elements = section.querySelectorAll(
".about-why-reveal"
);

if (!elements.length) {
return;
}

const prefersReducedMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

if (
prefersReducedMotion ||
!("IntersectionObserver" in window)
) {
elements.forEach((element) => {
element.classList.add("is-visible");
});

return;
}


const revealDelay = 180;

elements.forEach((element, index) => {
element.style.transitionDelay =
`${index * revealDelay}ms`;
});

const observer = new IntersectionObserver(
(entries, currentObserver) => {
entries.forEach((entry) => {
    if (!entry.isIntersecting) {
        return;
    }

    entry.target.classList.add("is-visible");

    currentObserver.unobserve(entry.target);
});
},
{
threshold: 0,
rootMargin: "0px 0px 180px 0px"
}
);

elements.forEach((element) => {
observer.observe(element);
});
};

if (document.readyState === "loading") {
document.addEventListener(
"DOMContentLoaded",
initAboutWhyReveal,
{ once: true }
);
} else {
initAboutWhyReveal();
}
})();



/* =========================================================
                  ABOUT VALUES 
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#about-values");

    if (!section) return;

    const revealElements = section.querySelectorAll(
        ".about-values-reveal"
    );

    if (!revealElements.length) return;

    

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    

    const cards = section.querySelectorAll(
        ".about-value-card.about-values-reveal"
    );

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 120}ms`;
    });

    

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

           

                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
});




/* =========================================================
                    CONTACT HERO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector("#contact-hero");

    if (!hero) return;

    const animatedElements = Array.from(
        hero.querySelectorAll(".enterprise-reveal")
    );

    if (!animatedElements.length) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {

        animatedElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        hero.classList.add("is-ready");

    } else {

     
        animatedElements.forEach((element) => {
            element.classList.remove("is-visible");
        });

        hero.classList.remove("is-ready");

      
        const revealHero = () => {

            animatedElements.forEach((element, index) => {

                const customDelay = element.getAttribute(
                    "data-reveal-delay"
                );

                const delay = customDelay !== null
                    ? (
                        /^\d+$/.test(customDelay.trim())
                            ? Number(customDelay.trim())
                            : 0
                    )
                    : 500 + (index * 400);

                window.setTimeout(() => {

                    hero.classList.add("is-ready");
                    element.classList.add("is-visible");

                }, delay);

            });

        };

   
        window.requestAnimationFrame(() => {

            window.requestAnimationFrame(() => {

                revealHero();

            });

        });

    }

});




/* =========================================================
   CONTACT — OFFICE LOCATIONS SCROLL REVEAL
========================================================= */

(function () {
    const section = document.getElementById("office-locations");

    if (!section) return;

    const revealItems = section.querySelectorAll(".office-reveal");

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => {
            item.classList.add("is-visible");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 120, 360)}ms`;
        revealObserver.observe(item);
    });
})();






/* =========================================================
   WHY CONTACT TECHWORLD — SCROLL REVEAL
========================================================= */

(function () {
    "use strict";

    function initWhyContactReveal() {
        const section = document.querySelector("#why-contact-pro");

        if (!section) return;

        /* Follow the page language direction */
        function syncDirection() {
            const pageDirection =
                document.documentElement.getAttribute("dir") ||
                document.body.getAttribute("dir") ||
                "ltr";

            section.setAttribute(
                "dir",
                pageDirection.toLowerCase() === "rtl" ? "rtl" : "ltr"
            );
        }

        syncDirection();

        /* Prepare the reveal sequence */
        const revealElements = section.querySelectorAll(".why-pro-reveal");

        revealElements.forEach(function (element, index) {
            const delay = index === 0
                ? 0
                : index < 2
                    ? 100
                    : 100 + (index - 1) * 130;

            element.style.setProperty(
                "--why-reveal-delay",
                delay + "ms"
            );
        });

        /* Fallback for browsers without IntersectionObserver */
        if (!("IntersectionObserver" in window)) {
            revealElements.forEach(function (element) {
                element.classList.add("is-visible");
            });

            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    } else {
                        entry.target.classList.remove("is-visible");
                    }
                });
            },
            {
                root: null,
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

        /* Keep RTL/LTR correct if the language changes dynamically */
        const directionObserver = new MutationObserver(syncDirection);

        directionObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["dir"]
        });

        directionObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ["dir"]
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initWhyContactReveal,
            { once: true }
        );
    } else {
        initWhyContactReveal();
    }
})();



/* =========================================================
            FAQ SCROLL REVEAL & ACCORDION
========================================================= */

(function () {
    "use strict";

    function initTechWorldFAQ() {
        const sections = document.querySelectorAll(".tw-faq");

        if (!sections.length) return;

        sections.forEach(function (section) {
            if (section.dataset.faqInitialized === "true") return;

            section.dataset.faqInitialized = "true";


            const revealElements = section.querySelectorAll(
                ".tw-faq-reveal"
            );

            revealElements.forEach(function (element, index) {
                element.style.setProperty(
                    "--faq-delay",
                    Math.min(index * 90, 650) + "ms"
                );
            });

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion || !("IntersectionObserver" in window)) {
                revealElements.forEach(function (element) {
                    element.classList.add("tw-faq-visible");
                });
            } else {
                const revealObserver = new IntersectionObserver(
                    function (entries, observer) {
                        entries.forEach(function (entry) {
                            if (!entry.isIntersecting) return;

                            entry.target.classList.add(
                                "tw-faq-visible"
                            );

                            observer.unobserve(entry.target);
                        });
                    },
                    {
                        threshold: 0.12,
                        rootMargin: "0px 0px -35px 0px"
                    }
                );

                revealElements.forEach(function (element) {
                    revealObserver.observe(element);
                });
            }



            const faqItems = section.querySelectorAll(
                ".tw-faq-item"
            );

            faqItems.forEach(function (item) {
                const summary = item.querySelector(
                    ".tw-faq-question"
                );

                if (!summary) return;

                summary.addEventListener("click", function (event) {
                    const wasOpen = item.open;

           
                    event.preventDefault();

                    faqItems.forEach(function (otherItem) {
                        if (otherItem !== item) {
                            otherItem.open = false;
                        }
                    });

                    item.open = !wasOpen;
                });
            });
        });
    }


    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initTechWorldFAQ,
            { once: true }
        );
    } else {
        initTechWorldFAQ();
    }
})();











