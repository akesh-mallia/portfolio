/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* Reusable project photo carousel. */
document.querySelectorAll('.project-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.project-carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.project-carousel__slide'));
  const dots = carousel.querySelector('.project-carousel__dots');
  const previousButton = carousel.querySelector('[data-carousel-previous]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  let currentSlide = 0;
  let lastFocusedElement;

  const closeButton = document.createElement('button');
  closeButton.className = 'project-carousel__button project-carousel__close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close enlarged gallery');
  closeButton.textContent = '×';
  carousel.appendChild(closeButton);

  const goToSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.querySelectorAll('.project-carousel__dot').forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', String(dotIndex === currentSlide));
    });
  };

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = 'project-carousel__dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show photo ${index + 1}`);
    dot.setAttribute('aria-current', String(index === 0));
    dot.addEventListener('click', () => goToSlide(index));
    dots.appendChild(dot);
  });

  previousButton.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));

  const closeLightbox = () => {
    carousel.classList.remove('project-carousel--lightbox');
    document.body.classList.remove('lightbox-open');
    lastFocusedElement?.focus();
  };

  const openLightbox = (image) => {
    lastFocusedElement = image;
    carousel.classList.add('project-carousel--lightbox');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };

  closeButton.addEventListener('click', closeLightbox);
  slides.forEach((slide) => {
    const image = slide.querySelector('img');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt}. Enlarge photo`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (event.key === 'ArrowRight') goToSlide(currentSlide + 1);
    if (event.key === 'Escape' && carousel.classList.contains('project-carousel--lightbox')) {
      closeLightbox();
    }
  });
});

/* Reusable lightbox for project images. Videos are intentionally excluded. */
document.querySelectorAll('img.project-media__content').forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `${image.alt}. Enlarge image`);

  const openLightbox = () => {
    const lightbox = document.createElement('div');
    const closeButton = document.createElement('button');
    const fullImage = document.createElement('img');
    const closeLightbox = () => {
      lightbox.remove();
      document.body.classList.remove('lightbox-open');
      image.focus();
    };

    lightbox.className = 'project-image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Enlarged project image');
    closeButton.className = 'project-carousel__button project-image-lightbox__close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close enlarged image');
    closeButton.textContent = '×';
    fullImage.className = 'project-image-lightbox__image';
    fullImage.src = image.currentSrc || image.src;
    fullImage.alt = image.alt;
    lightbox.append(closeButton, fullImage);
    document.body.appendChild(lightbox);
    document.body.classList.add('lightbox-open');
    closeButton.focus();

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
    });
  };

  image.addEventListener('click', openLightbox);
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox();
    }
  });
});
