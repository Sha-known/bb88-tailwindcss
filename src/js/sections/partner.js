const DATA_PARTNERS = './api/public/get-section.php?section=partner';

const initCarousel = (logos) => {
  const track = document.getElementById('carousel-track');
  const wrapper = document.getElementById('carousel-wrapper');

  if (!track || !wrapper) return;

  const SMALL = 90;
  const LARGE = 130;
  const GAP = 16;

  // Triple the array for infinite loop
  const items = [...logos, ...logos, ...logos];
  let centerIndex = logos.length; 

  // Build all items inside the track
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
    `;
    const img = document.createElement('img');
    img.src = logo.src;
    img.alt = 'Partner Logo';
    img.style.cssText = `width: 75%; height: 75%; object-fit: contain; pointer-events: none; display: block;`;
    a.appendChild(img);
    track.appendChild(a);
  });

  function reposition(animate) {
    const nodes = track.children;
    const wrapperWidth = wrapper.offsetWidth;

    // Determine if we should animate the items shrinking/growing
    const itemTransition = animate 
      ? 'width 0.5s ease, height 0.5s ease, background 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease' 
      : 'none';

    for (let i = 0; i < nodes.length; i++) {
      const dist = Math.abs(i - centerIndex);
      
      // Apply the transition dynamically to fix the "pitik" effect
      nodes[i].style.transition = itemTransition;

      if (dist === 0) {
        nodes[i].style.width = LARGE + 'px';
        nodes[i].style.height = LARGE + 'px';
        nodes[i].style.background = 'white';
        nodes[i].style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
        nodes[i].style.opacity = '1';
      } else {
        nodes[i].style.width = SMALL + 'px';
        nodes[i].style.height = SMALL + 'px';
        nodes[i].style.background = 'transparent';
        nodes[i].style.boxShadow = 'none';
        nodes[i].style.opacity = dist === 1 ? '0.8' : dist === 2 ? '0.5' : '0';
      }
    }

    let centerLeft = 0;
    for (let i = 0; i < centerIndex; i++) {
      centerLeft += SMALL + GAP;
    }
    const centerItemMid = centerLeft + LARGE / 2;
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
      if (centerIndex >= logos.length * 2) {
        centerIndex -= logos.length;
        reposition(false);
      }
      isAnimating = false;
    }, 520);
  }

  reposition(false);
  setInterval(next, 3000);
};

export const loadPartners = async () => {
  try {
    const res = await fetch(DATA_PARTNERS);
    const data = await res.json();
    const { logos } = data; 
    
    const section = document.getElementById('partners');

    section.className = "relative py-16 px-5 font-poppins text-center bg-[#C8E6E0] border-y-[6px] border-green-dark";

    const html = `
      <div class="relative z-10 max-w-275 mx-auto">
        <div id="carousel-wrapper" style="position:relative; width:100%; height:160px; overflow:hidden;">
          <div id="carousel-track" style="display:flex; align-items:center; gap:16px; position:absolute; top:0; left:0; height:100%;">
          </div>
        </div>
        <div class="flex justify-center items-center gap-2 mt-8">
          ${logos.map((_, index) => `
            <button class="rounded-full transition-all duration-300 ${index === 3 ? 'w-3 h-3 bg-green-dark' : 'w-2 h-2 bg-gray-400'}"></button>
          `).join('')}
        </div>
      </div>
    `;

    section.innerHTML = html;
    initCarousel(logos);

  } catch (error) {
    console.error('Partners load error:', error);
  }
};