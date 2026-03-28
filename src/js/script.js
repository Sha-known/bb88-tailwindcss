//team cards tooltip script
const cards = document.querySelectorAll('.group[data-title]'); 
const bubble = document.getElementById('dynamic-desc-box');
const bTitle = document.getElementById('bubble-title');
const bText = document.getElementById('bubble-text');

// FIXED: Now looking for the correct container class (.max-w-375)
const container = document.querySelector('.max-w-375'); 

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    bTitle.textContent = card.getAttribute('data-title');
    bText.textContent = card.getAttribute('data-desc');

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
    const cardCenterInContainer = (cardRect.left - containerRect.left) + (cardRect.width / 2);
    const arrowLeftRel = cardCenterInContainer - leftPos - 20; 

    bubble.style.left = `${leftPos}px`;
    bubble.style.top = `${topPos}px`;
    bubble.style.setProperty('--arrow-left', `${arrowLeftRel}px`);
    
    bubble.classList.add('show');
  });

  card.addEventListener('mouseleave', () => {
    bubble.classList.remove('show');
  });
});

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





//hover effect sa Portfolio Flexcards
document.querySelectorAll('.portfolio-card').forEach(card => {
  const popup = card.querySelector('.floating-popup');

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
});

//filter portfolio
function filterPortfolio(category) {
  const cards = document.querySelectorAll('.portfolio-card');
  const buttons = document.querySelectorAll('.filter-btn');

  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  buttons.forEach(btn => {
    btn.classList.remove('bg-green-dark', 'text-white');
    btn.classList.add('bg-white', 'text-green-dark');
  });

  event.target.classList.add('bg-green-dark', 'text-white');
  event.target.classList.remove('bg-white', 'text-green-dark');
}

function seeMore() {
  const hiddenCards = document.querySelectorAll('.portfolio-card.hidden');
  hiddenCards.forEach(card => card.classList.remove('hidden'));
  document.getElementById('see-more-btn').style.display = 'none';
}

//filter


// portfolio filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

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