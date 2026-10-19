/* A small, consistent set of decorative course icons. Labels carry the meaning. */
(() => {
  const paths = {
    vocab: '<path d="M12 6.5c-2.2-1.4-5-1.8-8-1.2v13c3-.6 5.8-.2 8 1.2 2.2-1.4 5-1.8 8-1.2v-13c-3-.6-5.8-.2-8 1.2Z"/><path d="M12 6.5v13"/>',
    grammar: '<path d="M4 5h16M4 12h16M4 19h16"/><path d="M8 3v4M15 10v4M10 17v4"/>',
    style: '<path d="M4 7h16M4 12h11M4 17h16"/><path d="m17 11 2 2 3-4"/>',
    listening: '<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/>',
    reading: '<path d="M12 6.5c-2.2-1.4-5-1.8-8-1.2v13c3-.6 5.8-.2 8 1.2 2.2-1.4 5-1.8 8-1.2v-13c-3-.6-5.8-.2-8 1.2Z"/><path d="M12 6.5v13M6.5 9h3M14.5 9h3"/>',
    writing: '<path d="M4 20h16M6 16.5 16.8 5.7a2 2 0 0 1 2.8 2.8L8.8 19.3 5 20l1-3.5Z"/>',
    speaking: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/>',
    forms: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8 10h8M8 14h8M8 18h5"/>',
    message: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    exam: '<path d="M7 3h8l4 4v14H7zM15 3v5h4M10 13h6M10 17h6"/>'
  };
  window.A1Visual = {
    icon(name) {
      return `<span class="icon suite-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.vocab}</svg></span>`;
    }
  };
})();
