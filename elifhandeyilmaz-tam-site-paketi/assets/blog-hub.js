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
