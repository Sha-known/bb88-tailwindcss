import { initCardHover } from '../script.js';

const DATA_HOME = 'src/data/home.json';

export const loadHome = async () => {
  try {
    const res = await fetch(DATA_HOME);
    const data = await res.json();

    const { hero, about } = data;

    const html = `
<section id="home" class="hero-line relative min-h-[200vh] bg-white -mt-30 pt-27.5 pb-20 overflow-x-hidden"
style="background-image: url('${hero.bgImage}'); background-position: top; background-repeat: no-repeat;">

  <!-- VECTOR -->
  <img src="${hero.vectorImage}" class="mobile-fade absolute pointer-events-none z-0 top-0 right-0 w-[65vw] -mr-10 md:mr-0 md:w-[70vw] lg:w-[55vw] lg:min-w-175 transition-opacity duration-500">

  <!-- HERO CONTENT -->
  <div class="px-5 md:px-15 py-10 md:pr-20 md:pb-15 mb-32 flex flex-col justify-center relative z-10 text-center md:text-left items-center md:items-start">

    <h1 class="font-anton font-medium text-[clamp(40px,11vw,110px)] md:text-[clamp(60px,5.7vw,110px)] text-green-dark leading-none tracking-wide whitespace-normal md:whitespace-nowrap animate-slide-up delay-200">
      ${hero.title}
    </h1>

    ${hero.lines.map(line => `
      <p class="text-[clamp(18px,4vw,50px)] md:text-[clamp(24px,2.5vw,50px)] font-semibold text-text-dark mt-2 max-w-200 animate-slide-up delay-350">
        ${line}
      </p>
    `).join('')}

    <div class="flex flex-col gap-5 mt-11 animate-slide-up delay-500 w-full md:w-auto items-center md:items-start">

      <a href="${hero.cta.link}" class="inline-flex items-center justify-center bg-green-dark text-white font-poppins font-semibold text-[clamp(16px,1.5vw,26px)] px-[2.4em] py-[0.4em] border-2 border-green-dark rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(45,106,45,0.35)] hover:bg-transparent hover:text-green-dark hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(45,106,45,0.2)]">
        ${hero.cta.text}
      </a>

      <a href="${hero.video.link}" class="group inline-flex items-center gap-[clamp(10px,1.5vw,20px)] text-text-dark font-semibold text-[clamp(16px,1.5vw,26px)] transition-all duration-300 hover:text-green-mid hover:-translate-y-0.5">

        <div class="w-[clamp(45px,4vw,65px)] h-[clamp(45px,4vw,65px)] rounded-full border-2 border-text-dark flex items-center justify-center relative shrink-0 transition-all duration-300 group-hover:border-green-mid group-hover:scale-110 group-hover:shadow-[0_4px_15px_rgba(45,106,45,0.15)]">
          <div class="w-0 h-0 border-t-[clamp(8px,0.7vw,12px)] border-t-transparent border-b-[clamp(8px,0.7vw,12px)] border-b-transparent border-l-[clamp(14px,1.2vw,20px)] border-l-text-dark ml-1 transition-all duration-300 group-hover:border-l-green-mid group-hover:scale-110 group-hover:translate-x-0.5"></div>
        </div>

        ${hero.video.text}
      </a>
    </div>
  </div>

  <!-- ABOUT TITLE -->
  <div id="about" class="sticky z-20 text-center mb-12 mt-10 md:mt-[18vw] w-full scroll-mt-30">
    <h2 class="font-poppins text-[clamp(35px,5vw,65px)] font-extrabold text-green-dark leading-none tracking-[-2px] [-webkit-text-stroke:1px_white] mb-2 px-4">
      ${about.title}
    </h2>
    <div class="w-25 h-1 bg-green-light mx-auto mt-4 rounded"></div>
  </div>

  <!-- CARDS -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 justify-items-center mb-12 px-5">

    ${about.cards.map(card => `
      <div class="about-card-hover group relative w-[clamp(180px,100%,280px)] h-50 bg-green-dark rounded-tl-[40px] rounded-br-[40px] flex flex-col items-center justify-center p-5 text-center border-2 border-[#d4e8c2] z-10 transition-colors duration-300 shadow-[0_6px_22px_rgba(0,0,0,0.12)] hover:bg-white cursor-pointer about-card-shape"
        data-icon="${card.icon}"
        data-hover="${card.hoverIcon}">

        <img src="${card.icon}" class="card-icon w-[clamp(60px,5vw,80px)] h-[clamp(60px,5vw,80px)] object-contain mb-3.5 relative z-20 transition-all duration-200">

        <h5 class="font-anton text-[15px] text-green-dark group-hover:text-white relative z-20 transition-colors duration-300">
          ${card.title}
        </h5>
      </div>
    `).join('')}

  </div>

  <!-- ABOUT BOX -->
  <div class="bg-white p-[clamp(20px,3vw,40px)] md:px-[clamp(40px,5vw,100px)] max-w-400 w-[90%] mx-auto rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] text-center relative z-20">

    <h3 class="font-poppins text-[clamp(25px,3vw,50px)] text-green-dark font-bold leading-none tracking-[-2px] [-webkit-text-stroke:1px_white] mb-1">
      ${about.box.title}
    </h3>

    <div class="w-25 h-1 bg-green-light mx-auto mt-4 rounded"></div>

    <h4 class="font-poppins text-[clamp(20px,2vw,30px)] text-green-dark font-bold leading-none [-webkit-text-stroke:1px_white] mt-7 mb-2">
      ${about.box.subtitle}
    </h4>

    ${about.box.paragraphs.map(p => `
      <p class="mt-5 text-[clamp(16px,1.2vw,22px)] leading-[1.8] text-text-dark max-w-250 mx-auto mb-5">
        ${p}
      </p>
    `).join('')}

  </div>

</section>
    `;

    document.getElementById('home-section').innerHTML = html;
    initCardHover();

  } catch (err) {
    console.error(err);
  }
};