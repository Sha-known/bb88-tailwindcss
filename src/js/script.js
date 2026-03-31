//TEAM TOOLTIP FUNCTION
export function initTeamTooltip() {
  const cards = document.querySelectorAll('.group[data-title]');
  const bubble = document.getElementById('dynamic-desc-box');
  const bTitle = document.getElementById('bubble-title');
  const bText = document.getElementById('bubble-text');
  const container = document.querySelector('.max-w-375');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      bTitle.textContent = card.dataset.title;
      bText.textContent = card.dataset.desc;

      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const bubbleWidth = bubble.offsetWidth;

      const isSmallScreen = window.innerWidth <= 768;

      let leftPos;
      if (isSmallScreen) {
        leftPos = (containerRect.width - bubbleWidth) / 2;
      } else {
        leftPos = cardRect.left - containerRect.left;
        if (leftPos + bubbleWidth > containerRect.width) {
          leftPos = containerRect.width - bubbleWidth;
        }
      }

      if (leftPos < 0) leftPos = 0;

      const topPos = (cardRect.top - containerRect.top) + cardRect.height + 20;
      const cardCenter = (cardRect.left - containerRect.left) + (cardRect.width / 2);
      const arrowLeft = cardCenter - leftPos - 20;

      bubble.style.left = `${leftPos}px`;
      bubble.style.top = `${topPos}px`;
      bubble.style.setProperty('--arrow-left', `${arrowLeft}px`);

      bubble.classList.add('show');
    });

    card.addEventListener('mouseleave', () => {
      bubble.classList.remove('show');
    });
  });
}

//burger nav function
export function initNavInteractions() {
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('nav-menu');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('hidden');
      nav.classList.toggle('flex');
    });
  }
}



// --- PORTFOLIO SECTION SCRIPTS ---

export function initPortfolioInteractions() {
  
  // 1. Hover effect for Portfolio Flexcards
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const popup = card.querySelector('.floating-popup');
    if (popup) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        popup.style.left = (x + 15) + 'px';
        popup.style.top = (y + 15) + 'px';
        popup.style.opacity = '1';
        popup.style.visibility = 'visible';
      });

      card.addEventListener('mouseleave', () => {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
      });
    }
  });

  // 2. See More Button Logic
  const seeMoreBtn = document.getElementById('see-more-btn');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.portfolio-card.hidden');
      hiddenCards.forEach(card => card.classList.remove('hidden', 'extra-card'));
      seeMoreBtn.style.display = 'none';
    });
  }

  // 3. Portfolio Filter Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // A. Reset all buttons to the default (Green text, transparent bg, with hover effect)
      filterButtons.forEach(b => {
        b.classList.remove('bg-green-dark', 'text-white');
        b.classList.add('text-green-dark', 'hover:bg-gray-50');
      });

      // B. Highlight the clicked button (Green bg, white text)
      const clickedBtn = e.currentTarget;
      clickedBtn.classList.add('bg-green-dark', 'text-white');
      clickedBtn.classList.remove('text-green-dark', 'hover:bg-gray-50');

      // C. Filter the cards
      const targetCategory = clickedBtn.dataset.filter;
      
      portfolioCards.forEach(card => {
        if (targetCategory === 'all' || card.dataset.category === targetCategory) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

//about cards hover function
export function initCardHover() {
  document.querySelectorAll('.about-card-hover').forEach(card => {
    const img = card.querySelector('.card-icon');

    card.addEventListener('mouseenter', () => {
      img.src = card.dataset.hover;
    });

    card.addEventListener('mouseleave', () => {
      img.src = card.dataset.icon;
    });
  });
}