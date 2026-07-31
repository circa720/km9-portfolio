/**
 * KM9 STUDIO — Interactive Portfolio Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const bodyElement = document.getElementById('bodyElement');
  const headerPageTitle = document.getElementById('headerPageTitle');
  const headerLogoBtn = document.getElementById('headerLogoBtn');
  
  // Drawer Elements
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navDrawer = document.getElementById('navDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const themePills = document.querySelectorAll('.theme-pill');

  // Page Views
  const views = {
    home: document.getElementById('viewHome'),
    art: document.getElementById('viewArt'),
    design: document.getElementById('viewDesign'),
    web: document.getElementById('viewWeb')
  };

  // Home Pill Navigation Buttons
  const navPillBtns = document.querySelectorAll('.nav-pill-btn');
  const btnExploreArtGallery = document.getElementById('btnExploreArtGallery');

  // Logo 3D Parallax & Floating Elements
  const homeLogoWrapper = document.getElementById('homeLogoWrapper');
  const homeKm9Logo = document.getElementById('homeKm9Logo');

  // Modal Elements
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  // Interactive Cards
  const interactiveCards = document.querySelectorAll('.card-interactive');

  // Current State
  let activeView = 'home';
  let mouseX = 0;
  let mouseY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  // View Subtitles / Titles Mapping
  const viewTitles = {
    home: 'PORTFOLIO',
    art: 'ART GALLERY',
    design: 'DESIGN SYSTEM',
    web: 'CREATIVE WEB'
  };

  // Project Details for Lightbox Modal
  const projectDetails = {
    'acrylic-impasto': {
      title: 'FLUORESCENT IMPASTO NO. 04',
      category: 'ART // ACRYLIC ON LINEN',
      image: 'assets/art-impasto.jpg',
      description: 'Side project study exploring heavy body acrylic paints, palette knife layering, cyan/magenta contrast, and metallic gold glazes applied on unprimed raw linen.'
    },
    'spatial-forms': {
      title: 'FROSTED PRISMS & CHROMATIC LIGHT',
      category: 'ART // SCULPTURE & GLASS',
      image: 'assets/art-sculpture.jpg',
      description: 'Physical acrylic glass prism structures exploring ambient sunlight refraction and spectral color spill across white studio podiums.'
    },
    'sunset-lake': {
      title: 'TRANQUIL HORIZON REFLECTION',
      category: 'ART // PHOTOGRAPHY',
      image: 'assets/art-hero-sunset.jpg',
      description: 'A long-exposure study in evening reflections, chromatic purple gradients, and calm lake water symmetry captured at dusk.'
    },
    'brand-system-1': {
      title: 'AETERNA BRAND SYSTEM',
      category: 'DESIGN // BRAND IDENTITY',
      image: 'assets/design-brand.jpg',
      description: 'Complete brand architecture, corporate stationery, logo grid alignment guidelines, and minimalist typography system.'
    },
    'brand-system-2': {
      title: 'SWISS TYPE SPECIMEN',
      category: 'DESIGN // TYPOGRAPHY',
      image: 'assets/design-type.jpg',
      description: 'International typographic style poster series exploring heavy geometric sans-serif font hierarchy, red grid accents, and poster specs.'
    },
    'brand-system-3': {
      title: 'MINIMALIST SPATIAL UI',
      category: 'DESIGN // INTERFACE',
      image: 'assets/art-hero-sunset.jpg',
      description: 'High-key studio layout design with minimal line vectors, glassmorphism, and responsive design tokens.'
    },
    'web-kinetic': {
      title: 'KINETIC 3D TYPOGRAPHY SYNTH',
      category: 'WEB // WEBGL & THREE.JS',
      image: 'assets/web-kinetic.jpg',
      description: 'Interactive WebGL 3D typography synthesizer experiment combining particle physics, procedural audio, and custom variable font modulation.'
    },
    'web-dashboard': {
      title: 'ULTRA-MINIMALIST STUDIO SUITE',
      category: 'WEB // STUDIO APPS',
      image: 'assets/design-brand.jpg',
      description: 'High performance single-page web platform built with vanilla JavaScript, modern CSS Variables, and smooth slide view transitions.'
    },
    'web-shader': {
      title: 'PROCEDURAL GLSL SHADER LAB',
      category: 'WEB // SHADERS & GPU',
      image: 'assets/design-type.jpg',
      description: 'Real-time GPU fragment shader experiments exploring liquid noise algorithms, spectral light dispersion, and raymarching Signed Distance Fields.'
    }
  };

  /**
   * Art Medium Filtering Logic
   */
  const filterPills = document.querySelectorAll('.filter-pill');
  const artCardItems = document.querySelectorAll('.art-card-item');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;

      artCardItems.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  /**
   * Design Category Filtering Logic
   */
  const designFilterPills = document.querySelectorAll('.design-filter-pill');
  const designCardItems = document.querySelectorAll('.design-card-item');

  designFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      designFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.designFilter;

      designCardItems.forEach(card => {
        const cat = card.dataset.designCategory;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  /**
   * Web Category Filtering Logic
   */
  const webFilterPills = document.querySelectorAll('.web-filter-pill');
  const webCardItems = document.querySelectorAll('.web-card-item');

  webFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      webFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.webFilter;

      webCardItems.forEach(card => {
        const cat = card.dataset.webCategory;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'grid';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  /**
   * Switch Active View
   */
  function switchView(viewName) {
    if (!views[viewName]) return;

    activeView = viewName;

    // Update body view class
    bodyElement.className = bodyElement.className.replace(/view-\w+/g, '') + ` view-${viewName}`;

    if (viewName === 'home') {
      // Return to home: slide home back into active stage
      views.home.classList.remove('exiting');
      views.home.classList.add('active');

      Object.keys(views).forEach(key => {
        if (key !== 'home') {
          views[key].classList.remove('active');
        }
      });
    } else {
      // Transition from home or between pages: slide home out, slide new page up
      views.home.classList.add('exiting');
      views.home.classList.remove('active');

      Object.keys(views).forEach(key => {
        if (key === viewName) {
          views[key].classList.add('active');
        } else if (key !== 'home') {
          views[key].classList.remove('active');
        }
      });
    }

    // Update Header Title if element exists
    if (headerPageTitle) {
      headerPageTitle.textContent = viewTitles[viewName] || 'PORTFOLIO';
    }

    // Update Home Navigation Pills
    navPillBtns.forEach(btn => {
      if (btn.dataset.target === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Drawer Navigation Links
    drawerLinks.forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close Navigation Drawer if open
    closeDrawer();

    // Reset Scroll Position to Top of Page Immediately
    window.scrollTo(0, 0);
  }

  /**
   * Navigation Drawer Controls
   */
  function openDrawer() {
    navDrawer.classList.add('active');
    navDrawer.setAttribute('aria-hidden', 'false');
    bodyElement.classList.add('drawer-open');
  }

  function closeDrawer() {
    navDrawer.classList.remove('active');
    navDrawer.setAttribute('aria-hidden', 'true');
    bodyElement.classList.remove('drawer-open');
  }

  hamburgerBtn.addEventListener('click', () => {
    if (navDrawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerOverlay.addEventListener('click', closeDrawer);
  drawerCloseBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.dataset.view;
      switchView(targetView);
    });
  });

  // Home Logo Button in Header
  headerLogoBtn.addEventListener('click', () => {
    switchView('home');
  });

  // Home Pill Navigation Handler
  navPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.dataset.target;
      switchView(targetView);
    });
  });

  if (btnExploreArtGallery) {
    btnExploreArtGallery.addEventListener('click', () => {
      openModal(projectDetails['sunset-lake']);
    });
  }

  /**
   * Theme Switcher Handler
   */
  themePills.forEach(pill => {
    pill.addEventListener('click', () => {
      themePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const theme = pill.dataset.theme;

      if (theme === 'dark') {
        bodyElement.classList.remove('theme-light');
        bodyElement.classList.add('theme-dark');
      } else {
        bodyElement.classList.remove('theme-dark');
        bodyElement.classList.add('theme-light');
      }
    });
  });

  /**
   * Interactive Floating Physics & Mouse Parallax
   */
  window.addEventListener('mousemove', (e) => {
    if (activeView !== 'home' || !homeLogoWrapper) return;

    mouseX = e.clientX;
    mouseY = e.clientY;

    const normX = (mouseX / window.innerWidth) - 0.5;
    const normY = (mouseY / window.innerHeight) - 0.5;

    targetTiltY = normX * 18;
    targetTiltX = -normY * 18;
  });

  function animateLogoParallax() {
    if (homeLogoWrapper && activeView === 'home') {
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      homeKm9Logo.style.transform = `perspective(1000px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
    }

    requestAnimationFrame(animateLogoParallax);
  }
  requestAnimationFrame(animateLogoParallax);

  /**
   * Project Lightbox Modal Handler
   */
  function openModal(data) {
    if (!data) return;

    modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 16px;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: var(--text-muted);">${data.category}</span>
          <h2 style="font-family: var(--font-display); font-size: 32px; margin-top: 6px;">${data.title}</h2>
          <p style="font-size: 15px; line-height: 1.7; color: var(--text-muted); margin-top: 16px;">${data.description}</p>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  interactiveCards.forEach(card => {
    card.addEventListener('click', () => {
      const projKey = card.dataset.project;
      if (projKey && projectDetails[projKey]) {
        openModal(projectDetails[projKey]);
      }
    });
  });

  modalBackdrop.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeDrawer();
    }
  });

  // Initialize Home View
  switchView('home');
});
