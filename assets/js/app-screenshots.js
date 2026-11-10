(() => {
    const preview = document.querySelector('[data-screenshot-lightbox]');
    if (!preview || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

    const english = document.documentElement.lang.startsWith('en');
    const labels = english
        ? { close: 'Close', zoom: 'Zoom in', fit: 'Fit to screen' }
        : { close: 'Schließen', zoom: 'Vergrößern', fit: 'Einpassen' };
    const dialog = document.createElement('dialog');
    dialog.className = 'screenshot-lightbox';
    dialog.setAttribute('aria-labelledby', 'screenshot-lightbox-title');
    const header = document.createElement('div');
    header.className = 'screenshot-lightbox__header';
    const title = document.createElement('h2');
    title.id = 'screenshot-lightbox-title';
    title.className = 'screenshot-lightbox__title';
    title.textContent = preview.dataset.title;
    const actions = document.createElement('div');
    actions.className = 'screenshot-lightbox__actions';
    const zoom = document.createElement('button');
    zoom.type = 'button';
    zoom.textContent = labels.zoom;
    zoom.setAttribute('aria-pressed', 'false');
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = labels.close;
    close.autofocus = true;
    const viewport = document.createElement('div');
    viewport.className = 'screenshot-lightbox__viewport';
    viewport.id = 'screenshot-lightbox-viewport';
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', preview.dataset.title);
    zoom.setAttribute('aria-controls', viewport.id);
    const image = document.createElement('img');
    image.className = 'screenshot-lightbox__image';
    image.alt = preview.querySelector('img').alt;
    image.decoding = 'async';
    viewport.append(image);
    actions.append(zoom, close);
    header.append(title, actions);
    dialog.append(header, viewport);
    document.body.append(dialog);

    const setZoom = (expanded) => {
        viewport.classList.toggle('is-zoomed', expanded);
        zoom.setAttribute('aria-pressed', String(expanded));
        zoom.textContent = expanded ? labels.fit : labels.zoom;
        viewport.scrollTo(0, 0);
    };
    const toggleZoom = () => setZoom(zoom.getAttribute('aria-pressed') !== 'true');
    let previousOverflow = '';
    preview.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        image.src = preview.href;
        setZoom(window.matchMedia('(max-width: 767px)').matches);
        previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        dialog.showModal();
    });
    zoom.addEventListener('click', toggleZoom);
    image.addEventListener('click', toggleZoom);
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
        document.documentElement.style.overflow = previousOverflow;
        setZoom(false);
    });
})();
