import { initNavInteractions } from "../script.js";

const DATA_NAV = '/src/data/nav.json';

export const loadNav = async () => {
  try {
    const res = await fetch(DATA_NAV);
    const data = await res.json();

    const { logo, links } = data; // destructuring

    const navHTML = `
      <nav class="w-full py-4 px-5 md:px-10 flex justify-center sticky top-0 z-999 bg-transparent">
        <div class="flex justify-between items-center w-full max-w-300 py-2 px-4 bg-white rounded-full shadow-[0_2px_16px_rgba(0,0,0,0.08)] relative">
          
          <!-- LOGO -->
          <div class="flex items-center mr-5">
            <div class="w-[clamp(120px,40vw,200px)] h-auto">
              <img src="${logo}" class="w-full h-auto object-contain">
            </div>
          </div>

          <!-- BURGER -->
          <div id="burger-btn" class="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-50">
            <span class="w-[clamp(16px,4vw,22px)] h-0.5 bg-green-dark rounded"></span>
            <span class="w-[clamp(16px,4vw,22px)] h-0.5 bg-green-dark rounded"></span>
            <span class="w-[clamp(16px,4vw,22px)] h-0.5 bg-green-dark rounded"></span>
          </div>

          <!-- MENU -->
          <div id="nav-menu" class="hidden lg:flex flex-col lg:flex-row absolute lg:static top-[120%] left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-xl lg:shadow-none p-5 lg:p-0 rounded-2xl lg:rounded-none items-center gap-3 ml-auto z-40">

            ${links.map(link => `
              <a href="${link.href}"
                 class="relative text-[clamp(14px,1vw,18px)] font-semibold px-4 py-2 rounded-full transition-colors duration-200
                 ${link.active 
                    ? 'text-white bg-green-dark' 
                    : 'text-text-dark hover:bg-green-dark hover:text-white'}">
                ${link.name}
              </a>
            `).join('')}

          </div>
        </div>
      </nav>
    `;

    document.getElementById('nav-container').innerHTML = navHTML;
    initNavInteractions(); // Initialize interactions after loading HTML

  } catch (error) {
    console.error('Nav load error:', error);
  }

};