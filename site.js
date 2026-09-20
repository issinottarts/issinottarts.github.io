// Minimal replacement for the Squarespace runtime.
(function () {
  // Lazy images: Squarespace stores the real file in data-src / data-image.
  document.querySelectorAll("img[data-src]").forEach(function (img) {
    if (!img.getAttribute("src")) img.src = img.getAttribute("data-src");
    img.setAttribute("data-load", "true");
    img.classList.add("loaded");
  });

  // Header height variable used by the theme CSS.
  var header = document.getElementById("header");
  if (header) {
    var setH = function () {
      document.documentElement.style.setProperty("--header-height", header.getBoundingClientRect().height + "px");
    };
    setH();
    window.addEventListener("resize", setH);
  }

  // Mobile menu.
  var burger = document.querySelector(".header-burger-btn");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("header--menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Accordions (About page: Awards & Exhibitions).
  document.querySelectorAll(".accordion-item__click-target").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) panel.classList.toggle("accordion-item__dropdown--open", !open);
      var item = btn.closest(".accordion-item");
      if (item) item.classList.toggle("accordion-item--open", !open);
    });
  });
})();
