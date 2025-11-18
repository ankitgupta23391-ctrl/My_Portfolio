 // ===== Theme Toggle (persist in localStorage) =====
    const root = document.documentElement;
    const themeBtn = document.getElementById('themeBtn');
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') root.classList.add('light');
    themeBtn.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });

    // ===== Mobile Menu =====
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    menuBtn.addEventListener('click', () => {
      const hidden = menu.hasAttribute('hidden');
      menu.toggleAttribute('hidden');
      menuBtn.setAttribute('aria-expanded', hidden ? 'true' : 'false');
    });

    // Close menu on nav click (mobile)
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') menu.setAttribute('hidden', '');
    });

    // ===== Smooth Scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', href);
        }
      });
    });

    // ===== Reveal on scroll =====
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // ===== Skills animated bars =====
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-fill]').forEach(span => {
            const pct = span.getAttribute('data-fill');
            span.style.width = pct + '%';
            span.style.transition = 'width 1s ease';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .2 });
    document.getElementById('skills') && skillObserver.observe(document.getElementById('skills'));

    // ===== Project Filtering =====
    const filter = document.getElementById('filter');
    const projectGrid = document.getElementById('projectGrid');
    filter.addEventListener('change', () => {
      const val = filter.value;
      [...projectGrid.children].forEach(card => {
        const show = val === 'all' || card.dataset.tags.includes(val);
        card.style.display = show ? '' : 'none';
      });
    });

    // ===== Simple Form Validation (no backend) =====
    const form = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name').trim();
      const email = data.get('email').trim();
      const message = data.get('message').trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill out all fields.';
        formNote.style.color = '#ef4444';
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        formNote.textContent = 'Please enter a valid email address.';
        formNote.style.color = '#ef4444';
        return;
      }

      // Simulate success
      form.reset();
      formNote.textContent = 'Thanks! Your message has been sent.';
      formNote.style.color = 'var(--accent)';
    });

    // ===== Year + Dynamic Experience =====
    document.getElementById('year').textContent = new Date().getFullYear();
    // Change the base year to yours
    const startYear = 2022; // <- update to your career start year
    const exp = Math.max(1, new Date().getFullYear() - startYear);
    document.getElementById('expYears').textContent = exp + '+';