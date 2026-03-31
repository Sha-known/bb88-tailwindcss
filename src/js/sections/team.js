import { initTeamTooltip } from '../script.js';

const DATA_TEAM = './api/public/get-section.php?section=team';

export const loadTeam = async () => {
  try {
    const res = await fetch(DATA_TEAM);
    const data = await res.json();

    const { title, cardsTop, cardsBottom } = data;

    const createCard = (card) => `
      <div class="group relative bg-green-dark rounded-[15px] w-full p-3 flex flex-col items-center justify-center min-h-82.5 border-4 border-transparent z-20 cursor-pointer transition-all duration-400 hover:bg-[#a1a1a1c9] hover:border-10 hover:border-white hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:pb-3"
           data-title="${card.title}"
           data-desc="${card.desc}">

        <div class="bg-white rounded-[10px] h-57.5 w-full flex items-center justify-center overflow-hidden relative transition-all duration-400 group-hover:bg-transparent group-hover:h-32.5 group-hover:opacity-0 group-hover:m-0">
          <img src="${card.icon}" class="absolute max-w-62.5 h-auto transition-all duration-400 block group-hover:opacity-0">
        </div>

        <!-- INVERTED ICON -->
        <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 invisible transition-opacity duration-300 z-10 group-hover:opacity-100 group-hover:visible">
          <img src="${card.hoverIcon}" class="max-w-62.5 h-auto block">
        </div>

        <div class="text-white text-[clamp(14px,0.5rem+1vw,22px)] font-semibold mt-3 p-1.5 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2.5 group-hover:h-0 group-hover:m-0 group-hover:p-0">
          ${card.title}
        </div>
      </div>
    `;

    const html = `
<section id="team" class="team-section font-poppins relative mt-2 pt-2">

  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 8px; background-color: #48887B; z-index: 9999;"></div>

  <div class="team-cloud-bg"></div>
  <div class="team-vector-bg"></div>

  <div class="relative z-10 mb-12 pt-10">
    <h2 class="font-poppins text-[clamp(35px,5vw,65px)] font-extrabold text-green-dark leading-none tracking-[-2px] [-webkit-text-stroke:1px_white] mb-2 px-4">
      ${title}
    </h2>
    <div class="w-25 h-1 bg-green-light mx-auto mt-4 rounded"></div>
  </div>

  <div class="max-w-375 mx-auto relative z-10">

    <!-- TOP CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6.25 mb-6.25">
      ${cardsTop.map(createCard).join('')}
    </div>

    <!-- BOTTOM CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.25 mb-6.25 w-full lg:w-[75%] mx-auto">
      ${cardsBottom.map(createCard).join('')}
    </div>

    <!-- TOOLTIP -->
    <div id="dynamic-desc-box" class="absolute bg-white border-4 border-gray-300 rounded-2xl py-5 px-7.5 w-100 max-w-[calc(100vw-40px)] text-left shadow-[0_15px_40px_rgba(0,0,0,0.1)] z-100 opacity-0 invisible pointer-events-none translate-y-2.5 transition-all duration-300 team-bubble">
      <div>
        <h3 id="bubble-title" class="text-green-dark font-extrabold text-[clamp(22px,1.8vw,32px)] m-0 mb-2.5"></h3>
        <p id="bubble-text" class="text-gray-800 leading-[1.6] text-[clamp(15px,1.2vw,20px)] m-0"></p>
      </div>
    </div>

  </div>
</section>
    `;

    document.getElementById('team-section').innerHTML = html;
    initTeamTooltip();

  } catch (err) {
    console.error(err);
  }
};