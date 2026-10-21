/* Techworld performance: defer below-the-fold video downloads until they are near the viewport. */
(function () {
  "use strict";
  var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-lazy-video]"));
  if (!videos.length) return;

  function loadVideo(video) {
    var sources = video.querySelectorAll("source[data-src]");
    sources.forEach(function (source) {
      source.src = source.getAttribute("data-src");
      source.removeAttribute("data-src");
    });
    video.removeAttribute("data-lazy-video");
    video.load();
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "300px 0px" });
    videos.forEach(function (video) { observer.observe(video); });
  } else {
    videos.forEach(loadVideo);
  }
})();
