(() => {
  document.querySelectorAll("[data-content-tabs]").forEach((hub) => {
    const tabs = [...hub.querySelectorAll('[role="tab"]')];
    const panels = [...hub.querySelectorAll('[role="tabpanel"]')];
    const languageSwitch = document.querySelector(".language-switch");

    if (!tabs.length || !panels.length) return;

    const activate = (name, { focus = false, updateHash = false } = {}) => {
      const selectedTab = tabs.find((tab) => tab.dataset.tab === name) || tabs[0];

      tabs.forEach((tab) => {
        const selected = tab === selectedTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== selectedTab.dataset.tab;
      });

      if (languageSwitch) {
        const alternateHref = selectedTab.dataset.tab === "videos"
          ? languageSwitch.dataset.videoHref
          : languageSwitch.dataset.articlesHref;
        if (alternateHref) languageSwitch.href = alternateHref;
      }

      if (updateHash && selectedTab.dataset.tabHash) {
        history.replaceState(null, "", selectedTab.dataset.tabHash);
      }

      if (focus) selectedTab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab.dataset.tab, { updateHash: true }));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activate(tabs[nextIndex].dataset.tab, { focus: true, updateHash: true });
      });
    });

    hub.querySelectorAll("[data-tab-switch]").forEach((control) => {
      control.addEventListener("click", () => activate(control.dataset.tabSwitch, { focus: true, updateHash: true }));
    });

    const syncFromHash = () => {
      const matchingTab = tabs.find((tab) => tab.dataset.tabHash === window.location.hash);
      activate(matchingTab?.dataset.tab || "articles");
    };

    window.addEventListener("hashchange", syncFromHash);
    syncFromHash();
  });
})();

/* Progressive enhancement: regular YouTube links continue to work without JS. */
(() => {
  const videoLinks = [...document.querySelectorAll("[data-video-id]")];
  if (!videoLinks.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "video-watch-dialog";
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
  const closeLabel = isEnglish ? "Close video" : "Videoyu kapat";
  const youtubeLabel = isEnglish ? "Watch on YouTube ↗" : "YouTube'da izle ↗";
  dialog.innerHTML = '<div class="video-dialog-header"><h2 class="video-dialog-title"></h2><button class="video-dialog-close" type="button" aria-label="' + closeLabel + '">×</button></div><div class="video-dialog-player"></div><a class="video-dialog-external" target="_blank" rel="noopener noreferrer">' + youtubeLabel + '</a>';
  document.body.append(dialog);
  const player = dialog.querySelector(".video-dialog-player");
  const title = dialog.querySelector(".video-dialog-title");
  const external = dialog.querySelector(".video-dialog-external");
  let triggeringLink = null;

  const close = () => dialog.close();
  dialog.querySelector(".video-dialog-close").addEventListener("click", close);
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener("close", () => {
    player.replaceChildren(); // Stop playback and prevent offscreen activity.
    triggeringLink?.focus();
    triggeringLink = null;
  });

  videoLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.dataset.videoId || "";
      if (!/^[A-Za-z0-9_-]{11}$/.test(id) || typeof dialog.showModal !== "function") return;
      event.preventDefault();
      triggeringLink = link;
      title.textContent = link.dataset.videoTitle || (isEnglish ? "Video tutorial" : "Video eğitim");
      external.href = "https://www.youtube.com/shorts/" + id;

      const iframe = document.createElement("iframe");
      iframe.title = title.textContent;
      iframe.loading = "eager";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&playsinline=1&rel=0";
      player.replaceChildren(iframe);
      dialog.showModal();
      dialog.querySelector(".video-dialog-close").focus();
    });
  });
})();
