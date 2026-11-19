/* ==========================================================================
   gbnpsf — shared components
   The header, footer and portal shell are written once here and mounted into
   [data-site-header], [data-site-footer] and [data-portal]. Edit the school
   details in js/config.js; edit navigation in this file.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.GB_CONFIG;

  /* ---------------------------------------------------------------------
     Icons — 24×24 line icons, stroke inherited from CSS colour.
     --------------------------------------------------------------------- */
  var PATHS = {
    arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    arrowLeft: '<path d="M20 12H5"/><path d="m11 18-6-6 6-6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    phone: '<path d="M5 3h3.5l1.8 4.4-2.2 1.6a12 12 0 0 0 6 6l1.6-2.2L20 14.5V18a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 3.5 6.7 2.5 2.5 0 0 1 5 3Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.6 6.4 8.4 6 8.4-6"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.4l3 1.8"/>',
    download: '<path d="M12 4v10"/><path d="m7.5 10 4.5 4.5L16.5 10"/><path d="M5 19h14"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    play: '<path d="M8 5.5v13l11-6.5Z"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    facebook: '<path d="M14.5 8.5H17V5h-2.6C12 5 11 6.4 11 8.4V10H9v3.4h2V21h3.3v-7.6h2.3l.4-3.4h-2.7V8.9c0-.3.1-.4.2-.4Z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4.6"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="3" y="6" width="18" height="12" rx="3.4"/><path d="m10.5 9.6 5 2.4-5 2.4Z"/>',
    whatsapp: '<path d="M4 20l1.2-4A7.8 7.8 0 1 1 8 19Z"/><path d="M9 9.4c0 2.7 2.4 5 5 5 .8 0 1.2-.5 1.2-1.1l-1.6-.8-.9.9a5.6 5.6 0 0 1-2.2-2.2l.9-.9-.8-1.6c-.6 0-1.6.2-1.6 1.2"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V17M8 7.6v.1M12 17v-3.6c0-1.2.8-2 1.9-2s1.9.8 1.9 2V17"/>',
    book: '<path d="M4 5.5A2 2 0 0 1 6 4h4v15H6a2 2 0 0 0-2 1.5Z"/><path d="M20 5.5A2 2 0 0 0 18 4h-4v15h4a2 2 0 0 1 2 1.5Z"/>',
    spark: '<path d="m12 3 2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4Z"/>',
    users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.6a3 3 0 0 1 0 5.8M17.5 20a5 5 0 0 0-2-4"/>',
    leaf: '<path d="M20 4c-7 0-14 3-14 10a6 6 0 0 0 6 6c7 0 8-9 8-16Z"/><path d="M4 20c1.5-4.5 5-8 10-10"/>',
    award: '<circle cx="12" cy="9" r="5"/><path d="m8.5 13.4-1.3 6 4.8-2.3 4.8 2.3-1.3-6"/>',
    building: '<path d="M4 21V6.5L12 3l8 3.5V21"/><path d="M9 21v-5h6v5"/><path d="M8 9h2M14 9h2M8 12.5h2M14 12.5h2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 3.5 10.8c-.6.5-.9.9-.9 1.7h-5.2c0-.8-.3-1.2-.9-1.7A6 6 0 0 1 12 3Z"/>'
  };

  function icon(name, cls) {
    var body = PATHS[name] || PATHS.arrow;
    return (
      '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      body + "</svg>"
    );
  }

  /* ---------------------------------------------------------------------
     Navigation
     --------------------------------------------------------------------- */
  var NAV = [
    { key: "about", label: "About", href: "about.html" },
    { key: "academics", label: "Academics", href: "academics.html" },
    { key: "admissions", label: "Admissions", href: "admissions.html" },
    { key: "student-life", label: "Student Life", href: "student-life.html" },
    { key: "gallery", label: "Gallery", href: "gallery.html" },
    { key: "news", label: "News & Events", href: "news.html" },
    { key: "staff", label: "Staff", href: "staff.html" },
    { key: "contact", label: "Contact", href: "contact.html" }
  ];

  /* Reserved for the School Management System. Each entry is a real page in
     this build; wiring the backend later means giving it a real session. */
  var PORTALS = [
    { key: "student", label: "Student Portal", fr: "Espace élève", href: "student-portal.html" },
    { key: "parent", label: "Parent Portal", fr: "Espace parents", href: "parent-portal.html" },
    { key: "teacher", label: "Teacher Portal", fr: "Espace enseignants", href: "teacher-portal.html" },
    { key: "results", label: "Online Results", fr: "Résultats en ligne", href: "results.html" },
    { key: "fees", label: "Fee Payments", fr: "Paiement des frais", href: "fees.html" },
    { key: "elearning", label: "E-Learning", fr: "Apprentissage en ligne", href: "e-learning.html" },
    { key: "library", label: "Library System", fr: "Bibliothèque", href: "library.html" }
  ];

  var CREST =
    '<svg class="brand__mark" viewBox="0 0 48 48" role="img" aria-label="Grace Bilingual school crest">' +
    '<path d="M24 3.5 43 10v15.5C43 35 34.6 42.4 24 45 13.4 42.4 5 35 5 25.5V10Z" fill="none" stroke="#c9a55f" stroke-width="1.5"/>' +
    '<path d="M24 8.2 38.5 13v12.4c0 7.4-6.2 13.2-14.5 15.4-8.3-2.2-14.5-8-14.5-15.4V13Z" fill="#17362a"/>' +
    '<path d="M17 20.5c2.6-1.4 4.9-1.4 7 0 2.1-1.4 4.4-1.4 7 0v9.6c-2.6-1.3-4.9-1.3-7 0-2.1-1.3-4.4-1.3-7 0Z" fill="none" stroke="#e7d7b2" stroke-width="1.3" stroke-linejoin="round"/>' +
    '<path d="M24 21v9" stroke="#c9a55f" stroke-width="1.1"/>' +
    "</svg>";

  function brand(href) {
    return (
      '<a class="brand" href="' + (href || "index.html") + '">' + CREST +
      '<span class="brand__text">' +
      '<span class="brand__name">' + CFG.school.wordmark + "</span>" +
      '<span class="brand__sub">Nursery &amp; Primary · Foumban</span>' +
      "</span></a>"
    );
  }

  /* ---------------------------------------------------------------------
     Header
     --------------------------------------------------------------------- */
  function renderHeader(page) {
    var items = NAV.map(function (item) {
      var current = item.key === page ? ' aria-current="page"' : "";
      return '<li class="nav__item"><a class="nav__link" href="' + item.href + '"' + current + ">" +
        item.label + "</a></li>";
    }).join("");

    var portalLinks = PORTALS.map(function (p) {
      return '<a class="dropdown__link" href="' + p.href + '">' +
        "<strong>" + p.label + "</strong><span>" + p.fr + "</span></a>";
    }).join("");

    var isPortal = page === "portal";
    var portalCurrent = isPortal ? ' aria-current="page"' : "";

    return (
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header" data-header>' +
      '<div class="site-header__inner">' +
      brand("index.html") +
      '<nav class="nav" id="primary-nav" aria-label="Main">' +
      '<ul class="nav__list">' +
      items +
      '<li class="nav__item nav__item--menu" data-dropdown>' +
      '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="portals-menu"' + portalCurrent + ">" +
      "Portals " + icon("chevron") + "</button>" +
      '<div class="dropdown" id="portals-menu">' +
      portalLinks +
      '<div class="dropdown__foot"><span>School Management System · in preparation</span>' +
      '<a class="link-arrow" href="portal-roadmap.html">Roadmap ' + icon("arrow") + "</a></div>" +
      "</div></li>" +
      "</ul>" +
      "</nav>" +
      '<div class="header__cta">' +
      '<a class="btn btn--sm" href="admissions.html#apply">Apply now ' + icon("arrow") + "</a>" +
      '<button class="burger" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu" data-burger><span></span></button>' +
      "</div>" +
      "</div></header>"
    );
  }

  /* ---------------------------------------------------------------------
     Footer
     --------------------------------------------------------------------- */
  function renderFooter() {
    var s = CFG.school;
    var explore = [
      ["About the school", "about.html"],
      ["Academics", "academics.html"],
      ["Admissions", "admissions.html"],
      ["Student life", "student-life.html"],
      ["Gallery", "gallery.html"],
      ["News & events", "news.html"]
    ].map(function (l) {
      return '<li><a href="' + l[1] + '">' + l[0] + "</a></li>";
    }).join("");

    var community = [
      ["Our staff", "staff.html"],
      ["Contact us", "contact.html"],
      ["Apply online", "admissions.html#apply"],
      ["School calendar", "news.html#calendar"],
      ["Portal roadmap", "portal-roadmap.html"]
    ].map(function (l) {
      return '<li><a href="' + l[1] + '">' + l[0] + "</a></li>";
    }).join("");

    var portals = PORTALS.slice(0, 5).map(function (p) {
      return '<li><a href="' + p.href + '">' + p.label + "</a></li>";
    }).join("");

    var socials = [
      ["facebook", CFG.social.facebook, "Facebook"],
      ["instagram", CFG.social.instagram, "Instagram"],
      ["youtube", CFG.social.youtube, "YouTube"],
      ["whatsapp", CFG.social.whatsapp, "WhatsApp"]
    ].map(function (s) {
      return '<a href="' + s[1] + '" aria-label="' + s[2] + '" rel="noopener">' + icon(s[0]) + "</a>";
    }).join("");

    return (
      '<footer class="site-footer">' +
      '<div class="wrap--wide">' +
      '<div class="footer__top">' +
      '<div class="footer__brand">' + brand("index.html") +
      '<p class="footer__blurb">A bilingual nursery and primary school in Foumban, forming confident children in English and French since ' + s.founded + ".</p>" +
      '<div class="newsletter-block">' +
      '<h2 class="footer__title">School letter</h2>' +
      '<p>Term dates, results and event notices, once a month.</p>' +
      '<form class="newsletter" data-form="newsletter" novalidate>' +
      '<label class="sr-only" for="nl-email">Email address</label>' +
      '<input id="nl-email" name="email" type="email" placeholder="Your email address" required autocomplete="email">' +
      '<button class="btn btn--gold btn--sm" type="submit">Subscribe</button>' +
      '<p class="form-status" data-form-status hidden role="status"></p>' +
      "</form></div>" +
      '<div class="socials" style="margin-top:1.5rem">' + socials + "</div>" +
      "</div>" +
      '<div><h2 class="footer__title">Explore</h2><ul class="footer__links">' + explore + "</ul></div>" +
      '<div><h2 class="footer__title">Community</h2><ul class="footer__links">' + community + "</ul></div>" +
      '<div><h2 class="footer__title">Portals</h2><ul class="footer__links">' + portals +
      '<li><a href="portal-roadmap.html">All systems</a></li></ul></div>' +
      "</div>" +
      '<div class="footer__bottom">' +
      "<p>© <span data-year>" + new Date().getFullYear() + "</span> " + s.name + " Foumban. All rights reserved.</p>" +
      '<nav aria-label="Legal"><a href="privacy.html">Privacy</a><a href="accessibility.html">Accessibility</a>' +
      '<a href="sitemap.xml">Sitemap</a></nav>' +
      '<p class="footer__made">Made in Foumban</p>' +
      "</div>" +
      "</div></footer>"
    );
  }

  /* ---------------------------------------------------------------------
     Portal shells — one layout, seven reserved systems.
     --------------------------------------------------------------------- */
  var PORTAL_COPY = {
    student: {
      label: "Student Portal",
      title: "Your school day, in one place",
      lede: "Timetable, homework, results and library loans for pupils of the primary section, in English and French.",
      idLabel: "Student ID",
      idPlaceholder: "e.g. GBN-2026-0148",
      features: ["Today's timetable and room changes", "Homework set this week", "Term results and teacher comments", "Library loans and due dates"]
    },
    parent: {
      label: "Parent Portal",
      title: "Stay close to the classroom",
      lede: "Attendance, reports, fee statements and messages from your child's teacher — for guardians of nursery and primary pupils.",
      idLabel: "Parent account",
      idPlaceholder: "Phone number or email on file",
      features: ["Attendance and lateness records", "Termly reports and parent-meeting slots", "Fee statements and payment history", "Direct messages to the class teacher"]
    },
    teacher: {
      label: "Teacher Portal",
      title: "Teaching tools for our staff",
      lede: "Class lists, mark entry, lesson planning and parent communication for the teaching team.",
      idLabel: "Staff email",
      idPlaceholder: "name@gbnpsf.cm",
      features: ["Class lists and attendance registers", "Mark entry with moderation workflow", "Lesson plans and scheme of work", "Report writing and parent notes"]
    },
    results: {
      label: "Online Results",
      title: "Check a term result",
      lede: "Enter the student ID printed on the report slip to view continuous assessment and examination marks.",
      idLabel: "Student ID",
      idPlaceholder: "e.g. GBN-2026-0148",
      features: ["Continuous assessment and exam marks", "Class position and subject averages", "Teacher remarks per subject", "Printable term report"]
    },
    fees: {
      label: "Fee Payments",
      title: "School fees, clearly stated",
      lede: "View a statement, see what is outstanding and pay by mobile money or bank transfer. Receipts arrive by email.",
      idLabel: "Student ID",
      idPlaceholder: "e.g. GBN-2026-0148",
      features: ["Termly statement and balance", "Mobile money and bank transfer", "Instant digital receipts", "Payment plans for large families"]
    },
    elearning: {
      label: "E-Learning",
      title: "Lessons that travel home",
      lede: "Recorded lessons, reading packs and practice exercises for pupils who are absent or revising.",
      idLabel: "School email",
      idPlaceholder: "name@gbnpsf.cm",
      features: ["Recorded lessons by class and subject", "Downloadable reading packs", "Practice exercises with marking", "Progress visible to the class teacher"]
    },
    library: {
      label: "Library System",
      title: "Our catalogue, open",
      lede: "Search the school library in English and French, reserve a title and track what is on loan.",
      idLabel: "Library card",
      idPlaceholder: "Card number or student ID",
      features: ["Bilingual catalogue search", "Reservations and renewals", "Loan history and due dates", "Reading lists per class"]
    }
  };

  function renderPortal(key) {
    var p = PORTAL_COPY[key] || PORTAL_COPY.student;
    var features = p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("");
    var others = PORTALS.filter(function (x) { return x.key !== key; }).slice(0, 4).map(function (x) {
      return '<a class="btn btn--ghost btn--sm" href="' + x.href + '">' + x.label + "</a>";
    }).join("");

    return (
      '<div class="portal-shell">' +
      '<aside class="portal-shell__aside">' +
      "<div>" +
      '<p class="eyebrow" style="color:var(--gold-soft)">School management system</p>' +
      "<h1>" + p.title + "</h1>" +
      "<p>" + p.lede + "</p>" +
      '<ul class="portal-list">' + features + "</ul>" +
      "</div>" +
      '<div><a class="portal-back" href="index.html" style="color:rgba(247,243,234,.7)">' +
      icon("arrowLeft") + " Back to the school website</a></div>" +
      "</aside>" +
      '<div class="portal-shell__main">' +
      '<div class="portal-card">' +
      "<h2>Sign in to the " + p.label + "</h2>" +
      "<p>Accounts are issued by the school office at the start of each term.</p>" +
      '<form data-form="portal" novalidate>' +
      '<div class="field"><label for="portal-id">' + p.idLabel + ' <span class="req">*</span></label>' +
      '<input id="portal-id" name="identifier" type="text" placeholder="' + p.idPlaceholder + '" required autocomplete="username"></div>' +
      '<div class="field"><label for="portal-pass">Password <span class="req">*</span></label>' +
      '<input id="portal-pass" name="password" type="password" placeholder="••••••••" required autocomplete="current-password"></div>' +
      '<div class="field"><label for="portal-role">Sign in as</label>' +
      '<select id="portal-role" name="role"><option>' + p.label.replace(" Portal", "") + "</option>" +
      "<option>Parent or guardian</option><option>Member of staff</option></select></div>" +
      '<button class="btn btn--block" type="submit" style="margin-top:.5rem">Sign in ' + icon("arrow") + "</button>" +
      '<p class="form-status" data-form-status hidden role="status"></p>' +
      '<p class="portal-fine">Forgotten your password? The school office can reset it at ' +
      '<a href="mailto:' + CFG.school.email + '">' + CFG.school.email + "</a>.</p>" +
      "</form></div>" +
      '<div class="portal-note">' + icon("bulb") +
      "<div><strong>Reserved for the management system</strong>" +
      "This page is a working front-end shell. Authentication, data and payments are not connected yet — " +
      "see the <a href=\"portal-roadmap.html\">integration roadmap</a> for what each module will hold.</div></div>" +
      '<div class="btn-row">' + others + "</div>" +
      "</div></div>"
    );
  }

  /* ---------------------------------------------------------------------
     Mount everything
     --------------------------------------------------------------------- */
  function mount() {
    var page = document.body.getAttribute("data-page") || "";

    var header = document.querySelector("[data-site-header]");
    if (header) header.innerHTML = renderHeader(page);

    var footer = document.querySelector("[data-site-footer]");
    if (footer) footer.innerHTML = renderFooter();

    var portal = document.querySelector("[data-portal]");
    if (portal) portal.innerHTML = renderPortal(document.body.getAttribute("data-portal") || "student");

    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  window.GB_COMPONENTS = {
    icon: icon,
    nav: NAV,
    portals: PORTALS,
    portalCopy: PORTAL_COPY,
    renderHeader: renderHeader,
    renderFooter: renderFooter,
    renderPortal: renderPortal
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
