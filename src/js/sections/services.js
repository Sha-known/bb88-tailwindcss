const DATA_SERVICES = './api/public/get-section.php?section=services';

const renderServiceCards = (cards) => {
  return cards.map(({ id, title, image, description }) => `
    <div id="card-${id}" class="flex-1 max-w-70 mx-auto relative cursor-pointer overflow-hidden transition-all duration-300 origin-center" style="border: 10px solid #48887B; border-radius: 16px; height: 340px;">
      <div id="card-${id}-img" class="bg-white flex items-center justify-center p-4 w-full h-full">
        <img src="${image}" class="w-full object-contain" style="max-height: 250px;">
      </div>
      <div id="card-${id}-hover" class="hidden flex-col items-start p-6 w-full h-full" style="background: #48887B;">
        <div class="bg-white rounded-[10px] px-4 py-2 mb-4 w-full text-center">
          <h3 class="text-green-dark font-bold text-[15px] m-0">${title}</h3>
        </div>
        <p class="font-poppins text-white text-[13px] leading-[1.7] text-center">${description}</p>
      </div>
    </div>
  `).join('');
};

const renderServicesContent = ({ sectionTitle, cards }) => {
  return `
    <div class="relative z-10 max-w-275 mx-auto">
      <h2 class="font-poppins text-[clamp(35px,5vw,65px)] font-extrabold text-green-dark leading-none tracking-[-2px] [-webkit-text-stroke:1px_white] mb-2 px-4">
        ${sectionTitle}
      </h2>
      <div class="w-25 h-1 bg-green-light mx-auto mt-4 rounded"></div>

      <div class="flex flex-col lg:flex-row items-center justify-center gap-5 mb-10 relative mt-10 px-0 lg:px-16">
        ${renderServiceCards(cards)}
      </div>
    </div>
  `;
};

const injectVectors = (section) => {
  const vectors = [
    { src: 'src/images/vector/vector2.png',   cls: 'absolute top-0 left-0 pointer-events-none z-0 w-37.5 md:w-75 lg:w-125' },
    { src: 'src/images/vector/vector2.0.png', cls: 'absolute top-0 right-0 pointer-events-none z-0 w-37.5 md:w-75 lg:w-125' },
    { src: 'src/images/vector/vector2.1.png', cls: 'absolute bottom-0 left-0 pointer-events-none z-0 w-37.5 md:w-75 lg:w-125' },
    { src: 'src/images/vector/vector2.2.png', cls: 'absolute bottom-0 right-0 pointer-events-none z-0 w-37.5 md:w-75 lg:w-125' },
  ];

  vectors.forEach(({ src, cls }) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = cls;
    section.prepend(img);
  });
};

const initServiceInteractions = (cards) => {
  cards.forEach(({ id }) => {
    const card  = document.getElementById(`card-${id}`);
    const img   = document.getElementById(`card-${id}-img`);
    const hover = document.getElementById(`card-${id}-hover`);

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

    card.addEventListener('click', () => {
      const isOpen = card.style.height === '550px';

      cards.forEach(({ id: otherId }) => {
        const otherCard  = document.getElementById(`card-${otherId}`);
        const otherImg   = document.getElementById(`card-${otherId}-img`);
        const otherHover = document.getElementById(`card-${otherId}-hover`);
        otherCard.style.height = '340px';
        otherImg.style.display = 'flex';
        otherHover.style.display = 'none';
      });

      if (!isOpen) {
        card.style.height = '550px';
        img.style.display = 'none';
        hover.style.display = 'flex';
      }
    });
  });
};

export const loadServices = async () => {
  try {
    const res = await fetch(DATA_SERVICES);
    const data = await res.json();
    const { sectionTitle, bgImage,cards } = data;

    const section = document.getElementById('services');
    const container = document.getElementById('services-container');
    
    section.className = "relative py-10 px-5 md:px-10 overflow-hidden font-poppins text-center min-h-screen";

     //background galing sa JSON
    section.style.backgroundImage = `url('${bgImage}')`;
    section.style.backgroundSize = 'cover';
    section.style.backgroundPosition = 'center';
    section.style.backgroundRepeat = 'no-repeat';

    // Inject corner vectors directly onto the <section> so absolute positioning works correctly
    injectVectors(section);

    // Inject the title + cards into the inner container
    container.innerHTML = renderServicesContent({ sectionTitle, cards });

    initServiceInteractions(cards);
  } catch (error) {
    console.error('Services load error:', error);
  } 
};