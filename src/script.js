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

//burger
// Burger Menu Toggle Script
function toggleMenu() {
  const nav = document.getElementById('nav-menu');
  // This flips the menu between hidden and visible on mobile
  nav.classList.toggle('hidden');
  nav.classList.toggle('flex');
}

//hover for cards (Our services)
['left', 'center', 'right'].forEach(id => {
  const card = document.getElementById(`card-${id}`);
  const img = document.getElementById(`card-${id}-img`);
  const hover = document.getElementById(`card-${id}-hover`);

  card.addEventListener('mouseenter', () => {
    card.classList.add('scale-y-[1.4]', 'z-50');
    img.style.display = 'none';
    hover.style.display = 'flex';
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('scale-y-[1.4]', 'z-50');
    img.style.display = 'flex';
    hover.style.display = 'none';
  });
});

//hover effect for partnered company

function goToSlide(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('bg-green-dark', 'w-3', 'h-3');
      dot.classList.remove('bg-gray-400', 'w-2', 'h-2');
    } else {
      dot.classList.remove('bg-green-dark', 'w-3', 'h-3');
      dot.classList.add('bg-gray-400', 'w-2', 'h-2');
    }
  });
}