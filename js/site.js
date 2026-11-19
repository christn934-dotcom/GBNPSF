/* ==========================================================================
   gbnpsf — site behaviour
   Small, dependency-free enhancements: sticky header, mobile drawer, portal
   dropdown, scroll reveals, counters, gallery filtering and lightbox, the
   events calendar, and form handling that degrades to an honest demo message
   until a backend endpoint is configured in js/config.js.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.GB_CONFIG || {};
  var DATA = window.GB_DATA || { events: [], photos: [], videos: [] };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  /* ------------------------------------------------------------------ header */
  function initHeader() {
    var header = $("[data-header]");
    var burger = $("[data-burger]");
    var nav = $("#primary-nav");

    function onScroll() {
      if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (burger && nav) {
      var setDrawer = function (open) {
        document.body.classList.toggle("nav-open", open);
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        if (!open) {
          $$("[data-dropdown]").forEach(function (d) {
            d.setAttribute("data-open", "false");
            var b = $(".nav__toggle", d);
            if (b) b.setAttribute("aria-expanded", "false");
          });
        }
      };

      burger.addEventListener("click", function () {
        setDrawer(!document.body.classList.contains("nav-open"));
      });

      $$(".nav__link", nav).forEach(function (link) {
        link.addEventListener("click", function () { setDrawer(false); });
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setDrawer(false);
      });

      // A resize back to desktop should never leave the page locked.
      window.addEventListener("resize", function () {
        if (window.innerWidth > 1080 && document.body.classList.contains("nav-open")) {
          setDrawer(false);
        }
      });
    }

    /* Portal dropdown — click to open, closes on outside click or Escape. */
    $$("[data-dropdown]").forEach(function (drop) {
      var toggle = $(".nav__toggle", drop);
      if (!toggle) return;

      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = drop.getAttribute("data-open") === "true";
        $$("[data-dropdown]").forEach(function (other) {
          if (other !== drop) {
            other.setAttribute("data-open", "false");
            var b = $(".nav__toggle", other);
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });
        drop.setAttribute("data-open", String(!open));
        toggle.setAttribute("aria-expanded", String(!open));
      });

      drop.addEventListener("click", function (e) { e.stopPropagation(); });
    });

    document.addEventListener("click", function () {
      $$("[data-dropdown]").forEach(function (drop) {
        drop.setAttribute("data-open", "false");
        var b = $(".nav__toggle", drop);
        if (b) b.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      $$("[data-dropdown]").forEach(function (drop) {
        drop.setAttribute("data-open", "false");
        var b = $(".nav__toggle", drop);
        if (b) b.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------------- reveal */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    // Stagger siblings that share a parent, so grids arrive in sequence.
    var groups = new Map();
    items.forEach(function (el) {
      var parent = el.parentElement;
      var index = groups.get(parent) || 0;
      groups.set(parent, index + 1);
      if (index > 0 && !el.style.getPropertyValue("--delay")) {
        el.style.setProperty("--delay", Math.min(index * 90, 540) + "ms");
      }
    });

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------------- counters */
  function initCounters() {
    var counters = $$("[data-count]");
    if (!counters.length) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1500;
      var start = null;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = target + suffix;
        return;
      }

      function step(now) {
        if (start === null) start = now;
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------ forms */
  function initForms() {
    $$("form[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var status = $("[data-form-status]", form);
        var submit = form.querySelector("[type=submit]");
        var endpoint = CFG.forms && CFG.forms.endpoint;

        var say = function (message) {
          if (!status) return;
          status.hidden = false;
          status.textContent = message;
        };

        if (!endpoint) {
          say((CFG.forms && CFG.forms.demoMessage) ||
            "Thank you — this form is not connected to a server yet, so nothing was sent.");
          form.reset();
          return;
        }

        if (submit) { submit.disabled = true; submit.dataset.label = submit.textContent; submit.textContent = "Sending…"; }

        var payload = {};
        new FormData(form).forEach(function (value, key) { payload[key] = value; });

        fetch(endpoint, {
          method: (CFG.forms && CFG.forms.method) || "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (response) {
            if (!response.ok) throw new Error("Request failed");
            say("Thank you — your message has reached the school office. We reply within two working days.");
            form.reset();
          })
          .catch(function () {
            say("Sorry, the form could not be sent. Please call the office on " + (CFG.school ? CFG.school.phone : "") + ".");
          })
          .then(function () {
            if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label || "Send"; }
          });
      });
    });
  }

  /* --------------------------------------------------------------- lightbox */
  var lightbox = null;

  function ensureLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("data-open", "false");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image preview");
    lightbox.innerHTML =
      '<div class="lightbox__panel">' +
      '<div class="lightbox__stage"></div>' +
      '<div class="lightbox__bar">' +
      "<div><strong></strong><p></p></div>" +
      '<button class="lightbox__close" type="button" aria-label="Close preview">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>' +
      "</button></div></div>";
    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox__close")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
    return lightbox;
  }

  function openLightbox(opts) {
    var box = ensureLightbox();
    var stage = box.querySelector(".lightbox__stage");
    stage.innerHTML = '<div class="ph' + (opts.dark ? " ph--dark" : "") + '" data-label="' + opts.label + '"' +
      (opts.hint ? ' data-hint="' + opts.hint + '"' : "") + "></div>";
    box.querySelector("strong").textContent = opts.title || "";
    box.querySelector("p").textContent = opts.caption || "";
    box.setAttribute("data-open", "true");
    document.body.style.overflow = "hidden";
    box.querySelector(".lightbox__close").focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.getAttribute("data-open") !== "true") return;
    lightbox.setAttribute("data-open", "false");
    document.body.style.overflow = "";
  }

  /* ----------------------------------------------------------------- gallery */
  function initGallery() {
    var grid = $("[data-gallery]");
    if (!grid) return;

    var photos = DATA.photos || [];
    grid.innerHTML = photos.map(function (p, i) {
      return '<button class="gallery-item" type="button" data-cat="' + p.cat + '"' +
        ' data-title="' + p.title.replace(/"/g, "&quot;") + '"' +
        ' data-label="' + p.label + '" data-hint="' + (p.hint || "") + '">' +
        '<div class="ph" data-label="' + p.label + '" data-hint="' + (p.hint || "") + '"></div>' +
        '<span class="gallery-item__cap"><strong>' + p.title + "</strong><span>" + (i + 1) + " / " + photos.length + "</span></span>" +
        "</button>";
    }).join("");

    var items = $$(".gallery-item", grid);
    var empty = $("[data-gallery-empty]");
    var search = $("[data-gallery-search]");
    var activeCat = "all";

    function apply() {
      var term = (search && search.value ? search.value : "").trim().toLowerCase();
      var shown = 0;
      items.forEach(function (item) {
        var catOk = activeCat === "all" || item.getAttribute("data-cat") === activeCat;
        var textOk = !term || item.getAttribute("data-title").toLowerCase().indexOf(term) > -1;
        var show = catOk && textOk;
        item.style.display = show ? "" : "none";
        if (show) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      var count = $("[data-gallery-count]");
      if (count) count.textContent = shown + (shown === 1 ? " item" : " items");
    }

    $$("[data-filter]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeCat = chip.getAttribute("data-filter");
        $$("[data-filter]").forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        apply();
      });
    });

    if (search) search.addEventListener("input", apply);

    grid.addEventListener("click", function (e) {
      var item = e.target.closest(".gallery-item");
      if (!item) return;
      openLightbox({
        title: item.getAttribute("data-title"),
        caption: item.getAttribute("data-hint") + " — replace this slot in js/data.js",
        label: item.getAttribute("data-label"),
        hint: item.getAttribute("data-hint")
      });
    });

    apply();
  }

  function initVideos() {
    var grid = $("[data-videos]");
    if (!grid) return;
    var videos = DATA.videos || [];

    grid.innerHTML = videos.map(function (v) {
      return '<article class="video-card">' +
        '<button class="video-card__frame" type="button" data-video="' + v.title.replace(/"/g, "&quot;") + '" data-label="' + v.label + '">' +
        '<div class="ph ph--dark" data-label="' + v.label + '"></div>' +
        '<span class="video-card__play"><span><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5Z"/></svg></span></span>' +
        "</button>" +
        "<h3>" + v.title + "</h3><p>" + v.meta + "</p></article>";
    }).join("");

    grid.addEventListener("click", function (e) {
      var frame = e.target.closest("[data-video]");
      if (!frame) return;
      openLightbox({
        title: frame.getAttribute("data-video"),
        caption: "Video slot ready — add the file to assets/videos/ and replace this placeholder.",
        label: frame.getAttribute("data-label"),
        dark: true
      });
    });
  }

  /* ------------------------------------------------------------------- news */
  function initEvents() {
    var list = $("[data-event-list]");
    var events = (DATA.events || []).slice().sort(function (a, b) {
      return a.date < b.date ? -1 : 1;
    });

    function fmt(iso) {
      var d = new Date(iso + "T00:00:00");
      return {
        day: String(d.getDate()).padStart(2, "0"),
        month: d.toLocaleString("en-GB", { month: "short" })
      };
    }

    if (list) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var upcoming = events.filter(function (e) {
        return new Date(e.date + "T00:00:00") >= today;
      }).slice(0, 6);
      if (!upcoming.length) upcoming = events.slice(-3);

      list.innerHTML = upcoming.map(function (e) {
        var d = fmt(e.date);
        return '<article class="event">' +
          '<div class="event__date"><span>' + d.month + "</span><strong>" + d.day + "</strong></div>" +
          "<div><h3>" + e.title + "</h3><p>" + e.desc + "</p>" +
          '<div class="event__meta"><span>' + e.time + "</span><span>" + e.place + "</span></div></div>" +
          '<div class="event__cta"><span class="tag tag--gold">' + e.tag + "</span></div>" +
          "</article>";
      }).join("");
    }
  }

  /* --------------------------------------------------------------- calendar */
  function initCalendar() {
    var root = $("[data-calendar]");
    if (!root) return;

    var events = DATA.events || [];
    var byDate = {};
    events.forEach(function (e) {
      (byDate[e.date] = byDate[e.date] || []).push(e);
    });

    var start = new Date();
    start.setDate(1);
    var current = new Date(start.getFullYear(), start.getMonth(), 1);

    function iso(date) {
      return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
    }

    function render() {
      var year = current.getFullYear();
      var month = current.getMonth();
      var title = current.toLocaleString("en-GB", { month: "long", year: "numeric" });
      var first = new Date(year, month, 1);
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var offset = (first.getDay() + 6) % 7; // Monday-first grid
      var todayIso = iso(new Date());

      var cells = "";
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(function (d) {
        cells += '<div class="calendar__dow">' + d + "</div>";
      });

      for (var i = 0; i < offset; i++) cells += '<div class="calendar__day is-muted"></div>';

      for (var day = 1; day <= daysInMonth; day++) {
        var dIso = iso(new Date(year, month, day));
        var has = !!byDate[dIso];
        cells += '<div class="calendar__day' + (has ? " has-event" : "") + (dIso === todayIso ? " is-today" : "") + '"' +
          (has ? ' role="button" tabindex="0" data-day="' + dIso + '"' : "") + ">" + day + "</div>";
      }

      root.innerHTML =
        '<div class="calendar__head">' +
        '<h3 class="calendar__title">' + title + "</h3>" +
        '<div class="calendar__nav">' +
        '<button type="button" data-cal-prev aria-label="Previous month">&larr;</button>' +
        '<button type="button" data-cal-next aria-label="Next month">&rarr;</button>' +
        "</div></div>" +
        '<div class="calendar__grid">' + cells + "</div>" +
        '<p class="calendar__legend"><i></i> School event — select a date to read more</p>' +
        '<div data-cal-day></div>';
    }

    function showDay(dIso) {
      var panel = $("[data-cal-day]", root);
      var list = byDate[dIso];
      if (!panel || !list) return;
      panel.innerHTML = list.map(function (e) {
        return '<div class="announcement" style="margin-top:.85rem"><time>' + e.date + " · " + e.time +
          "</time><strong>" + e.title + "</strong><p>" + e.desc + "</p></div>";
      }).join("");
    }

    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-cal-prev]")) {
        current = new Date(current.getFullYear(), current.getMonth() - 1, 1);
        render();
      } else if (e.target.closest("[data-cal-next]")) {
        current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
        render();
      } else {
        var day = e.target.closest("[data-day]");
        if (day) showDay(day.getAttribute("data-day"));
      }
    });

    root.addEventListener("keydown", function (e) {
      var day = e.target.closest("[data-day]");
      if (day && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        showDay(day.getAttribute("data-day"));
      }
    });

    render();
  }

  /* ---------------------------------------------------------------- progress */
  function initProgress() {
    var bar = $("[data-progress]");
    if (!bar) return;
    var update = function () {
      var height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.scale = (height > 0 ? window.scrollY / height : 0) + " 1";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ------------------------------------------------------------------- init */
  function init() {
    initHeader();
    initReveal();
    initCounters();
    initForms();
    initGallery();
    initVideos();
    initEvents();
    initCalendar();
    initProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
