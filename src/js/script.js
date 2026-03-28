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

// Services cards - hover for desktop, click for mobile
['left', 'center', 'right'].forEach(id => {
  const card = document.getElementById(`card-${id}`);
  const img = document.getElementById(`card-${id}-img`);
  const hover = document.getElementById(`card-${id}-hover`);

  // Desktop hover
  card.addEventListener('mouseenter', () => {
    card.style.height = '480px';
    img.style.display = 'none';
    hover.style.display = 'flex';
  });

  card.addEventListener('mouseleave', () => {
    card.style.height = '340px';
    img.style.display = 'flex';
    hover.style.display = 'none';
  });

  // Mobile tap/click
  card.addEventListener('click', () => {
    const isOpen = card.style.height === '550px';

    // Close all cards first
    ['left', 'center', 'right'].forEach(otherId => {
      const otherCard = document.getElementById(`card-${otherId}`);
      const otherImg = document.getElementById(`card-${otherId}-img`);
      const otherHover = document.getElementById(`card-${otherId}-hover`);
      otherCard.style.height = '340px';
      otherImg.style.display = 'flex';
      otherHover.style.display = 'none';
    });

    // If it was closed, open it
    if (!isOpen) {
      card.style.height = '550px';
      img.style.display = 'none';
      hover.style.display = 'flex';
    }
  });
});
const logos = [
  { src: 'src/images/logo/logo2.png', href: 'https://www.facebook.com/biorganismcorpofficial' },
  { src: 'src/images/logo/logo4.png', href: 'https://www.facebook.com/profile.php?id=61565883182782' },
  { src: 'src/images/logo/logo3.png', href: 'https://www.facebook.com/profile.php?id=61566142224229' },
  { src: 'src/images/logo/logo1.png', href: 'https://www.facebook.com/profile.php?id=100086332025785' },
  { src: 'src/images/logo/logo5.png', href: 'https://www.facebook.com/profile.php?id=61565639982108' },
  { src: 'src/images/logo/logo6.png', href: 'https://www.facebook.com/profile.php?id=100093099265112' },
  { src: 'src/images/logo/logo7.png', href: 'https://facebook.com/your-link-here' },
];

const SMALL = 90;
const LARGE = 130;
const GAP = 16;

const track = document.getElementById('carousel-track');
const wrapper = document.getElementById('carousel-wrapper');

// Triple the array for infinite loop
const items = [...logos, ...logos, ...logos];
let centerIndex = logos.length; // start at middle copy

// Build all items
items.forEach((logo) => {
  const a = document.createElement('a');
  a.href = logo.href;
  a.target = '_blank';
  a.style.cssText = `
    flex-shrink: 0;
    width: ${SMALL}px;
    height: ${SMALL}px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition: width 0.5s ease, height 0.5s ease, background 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease;
  `;
  const img = document.createElement('img');
  img.src = logo.src;
  img.alt = 'Partner Logo';
  img.style.cssText = `width: 75%; height: 75%; object-fit: contain; pointer-events: none; display: block;`;
  a.appendChild(img);
  track.appendChild(a);
});

function getItemLeft(index) {
  // Each item is SMALL wide + GAP, except center which is LARGE
  // We calculate cumulative left position of each item
  let x = 0;
  for (let i = 0; i < index; i++) {
    x += (i === centerIndex ? LARGE : SMALL) + GAP;
  }
  return x;
}

function reposition(animate) {
  const nodes = track.children;
  const wrapperWidth = wrapper.offsetWidth;

  // Update sizes and opacity first
  for (let i = 0; i < nodes.length; i++) {
    const dist = Math.abs(i - centerIndex);
    if (dist === 0) {
      nodes[i].style.width = LARGE + 'px';
      nodes[i].style.height = LARGE + 'px';
      nodes[i].style.background = 'white';
      nodes[i].style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
      nodes[i].style.opacity = '1';
    } else {
      nodes[i].style.width = SMALL + 'px';
      nodes[i].style.height = SMALL + 'px';
      nodes[i].style.background = 'transparent';
      nodes[i].style.boxShadow = 'none';
      nodes[i].style.opacity = dist === 1 ? '0.8' : dist === 2 ? '0.5' : '0';
    }
  }

  // Calculate where center item starts
  let centerLeft = 0;
  for (let i = 0; i < centerIndex; i++) {
    centerLeft += SMALL + GAP;
  }
  // Center of the center item
  const centerItemMid = centerLeft + LARGE / 2;
  // Offset so it aligns to wrapper center
  const translateX = wrapperWidth / 2 - centerItemMid;

  track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
  track.style.transform = `translateX(${translateX}px)`;
}

let isAnimating = false;

function next() {
  if (isAnimating) return;
  isAnimating = true;
  centerIndex++;
  reposition(true);

  setTimeout(() => {
    // Silently jump back to middle copy if drifted too far
    if (centerIndex >= logos.length * 2) {
      centerIndex -= logos.length;
      reposition(false);
    }
    isAnimating = false;
  }, 520);
}

// Init
reposition(false);
setInterval(next, 3000);

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