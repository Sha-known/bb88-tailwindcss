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