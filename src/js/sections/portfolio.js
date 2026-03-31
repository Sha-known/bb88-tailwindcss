import { initPortfolioInteractions } from '../script.js';

const DATA_PORTFOLIO = './api/public/get-section.php?section=portfolio';

export const loadPortfolio = async () => {
  try {
    const res = await fetch(DATA_PORTFOLIO);
    const data = await res.json();
    const { sectionTitle, filters, projects } = data;

    const section = document.getElementById('portfolio');
    section.className = "relative py-16 px-5 md:px-10 overflow-hidden font-poppins text-center bg-portfolio";

    section.innerHTML = `
      <div class="relative z-10 max-w-275 mx-auto">

        <h2 class="font-poppins text-[clamp(35px,5vw,65px)] font-extrabold text-green-dark leading-none tracking-[-2px] [-webkit-text-stroke:1px_white] mb-2 px-4">
          ${sectionTitle}
        </h2>
        <div class="w-25 h-1 bg-green-light mx-auto mt-4 rounded"></div>
        <br>

        <!-- FILTER BUTTONS -->
        <div class="flex justify-center mb-10 w-full px-2 font-sans">
          <div class="filter-scroll flex items-center bg-white text-[#458B7B] rounded-full p-2 shadow-[2px_8px_15px_-3px_rgba(0,0,0,0.25)] gap-1 md:gap-4.5 overflow-x-auto w-full md:w-auto">
            ${filters.map(f => `
              <button
                class="filter-btn shrink-0 ${f.padding} py-1 rounded-lg text-[15px] transition-all duration-200 ${f.isActive ? 'bg-green-dark text-white' : 'text-green-dark hover:bg-gray-50'}"
                data-filter="${f.id}">
                ${f.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- PORTFOLIO CARDS GRID -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          ${projects.map(proj => `
            <div class="portfolio-card ${proj.isHidden ? 'extra-card hidden' : ''} group relative rounded-[20px] cursor-pointer shadow-[0_6px_22px_rgba(0,0,0,0.12)]"
                 data-category="${proj.category}"
                 style="border: 5px solid #48887B;">

              <div class="w-full h-65 overflow-hidden rounded-t-[20px]">
                <img src="${proj.img}" alt="${proj.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
              </div>

              <div class="px-4 py-4 rounded-b-[20px]" style="background: #48887B;">
                <div class="bg-white rounded-full px-4 py-2 text-center">
                  <h3 class="text-green-dark font-bold text-[15px] m-0">${proj.title}</h3>
                </div>
              </div>

              <div class="floating-popup absolute z-50 bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.15)] px-6 pt-2 pb-6 w-55 opacity-0 invisible transition-opacity duration-200 pointer-events-none" style="top: 0; left: 0;">
                <div class="w-13.75 h-13.75 rounded-full overflow-hidden mx-auto -mt-7 mb-3 shadow-md border-2 border-green-dark">
                  <img src="${proj.img}" alt="logo" class="w-full h-full object-cover">
                </div>
                <div class="bg-green-dark rounded-lg px-4 py-2 mb-1 w-full text-center">
                  <h3 class="text-white font-bold text-[14px] m-0">${proj.title}</h3>
                </div>
                <div class="w-full border-t-2 border-dashed border-[#9fbdb4] my-3"></div>
                <p class="text-gray-600 text-[12px] leading-[1.7] text-center">${proj.desc}</p>
                <div class="w-full border-t-2 border-dashed border-[#9fbdb4] my-3"></div>
              </div>

            </div>
          `).join('')}
        </div>

        <!-- SEE MORE BUTTON -->
        <div class="col-span-full flex justify-center mt-10">
          <button id="see-more-btn" class="inline-flex items-center justify-center px-10 py-3 bg-white text-green-dark font-semibold text-[15px] border-2 border-green-dark rounded-full transition-all duration-300 hover:bg-green-dark hover:text-white hover:shadow-lg">
            See More
          </button>
        </div>

      </div>
    `;

    initPortfolioInteractions();

  } catch (error) {
    console.error('Portfolio load error:', error);
  }
};