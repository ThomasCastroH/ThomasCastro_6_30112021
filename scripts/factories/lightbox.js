function displayLightbox() {
    // Créé L'élément qui contient la lightbox
    const lightboxContainer = document.createElement('div');
    lightboxContainer.setAttribute('class', "lightboxContainer");
    document.body.appendChild(lightboxContainer);

    const lightbox = document.createElement('div');
    lightbox.setAttribute('class', 'lightbox');
    lightboxContainer.appendChild(lightbox);

    
    // Créé les boutons précédent, suivant et fermer
    const prev = document.createElement('button');
    prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prev.setAttribute('class', "lightbox-prev");
    const next = document.createElement('button');
    next.innerHTML = '<i class="fas fa-chevron-right"></i>';
    next.setAttribute('class', "lightbox-next");
    const close = document.createElement('button');
    close.innerHTML = '<i class="fas fa-times"></i>';
    close.setAttribute('class', "lightbox-close");

    // Créé la lightbox pour chaque image lorsque l'on clique dessus
    const images = document.querySelectorAll('.media');
    images.forEach(image => {
        const title = document.createElement('span');
        title.setAttribute('class', 'legend lightbox-legend');
        title.innerHTML = image.getAttribute('data-title');
        image.addEventListener('click', e => {
            lightboxContainer.classList.add('active')
            const img = document.createElement('img')
            img.setAttribute('class', 'lightbox-img')
            img.src = image.src
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img);
            lightbox.appendChild(prev);
            lightbox.appendChild(next);
            lightbox.appendChild(close);
            lightbox.appendChild(title);
        })
    })

    lightboxContainer.addEventListener('click', e => {
        lightboxContainer.classList.remove('active')
    })
}