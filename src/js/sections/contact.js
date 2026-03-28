const DATA_CONTACT = './src/data/contact.json';

export async function loadContact() {
  try {
    const res = await fetch(DATA_CONTACT);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch contact data: ${res.status}`);
    }
    
    const data = await res.json();
    const section = document.getElementById("contact");

    if (!section) {
      throw new Error('Contact section element not found in DOM');
    }

    // 1. Inject the Tailwind classes directly into the section tag
    section.className = "relative py-16 px-5 md:px-10 overflow-hidden font-poppins bg-white";

    // 2. Cook the HTML
    section.innerHTML = `
      <img src="src/images/bg/vector5.0.png" class="absolute bottom-0 right-0 pointer-events-none z-0 w-30 md:w-60">
      <img src="src/images/bg/vector5.png" class="absolute top-0 left-0 pointer-events-none z-0 w-30 md:w-60">

      <h2 class="text-center font-poppins text-[clamp(35px,5vw,65px)] font-extrabold text-green-dark leading-none tracking-[-2px] [-webkit-text-stroke:1px_white] mb-2 px-4">
          ${data.title}
      </h2>
      <div class="w-25 h-1 bg-green-light mx-auto mt-4 rounded"></div>
      <p class="text-center text-gray-700 text-[clamp(14px,1.2vw,18px)] mb-8">${data.subtitle}</p>

      <div class="relative z-10 max-w-275 mx-auto">

        <div class="w-full h-55 rounded-2xl overflow-hidden mb-8 border-2 border-gray-200">
          <iframe src="${data.mapSrc}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">

          <div class="flex flex-col gap-4 flex-1">
            
            ${data.contactInfo.map(info => `
              <div class="flex items-center rounded-[10px] overflow-visible" style="background: #48887B;">
                <div class="${info.circleClass} rounded-full shrink-0 flex items-center justify-center border-4 border-white -ml-10 z-10 bg-white">
                  <img src="${info.icon}" alt="${info.label}" class="${info.iconClass} object-contain">
                </div>
                <div class="flex-1 bg-white mx-2 my-2 rounded-lg px-4 py-3">
                  <p class="text-green-dark font-bold text-[14px] m-0">${info.label}</p>
                  <p class="text-gray-600 text-[13px] m-0">${info.value}</p>
                </div>
              </div>
            `).join('')}

            <div class="mt-4">
              <p class="text-green-dark font-semibold text-[clamp(16px,2vw,31px)]">${data.company.name}</p>
              <p class="text-green-dark text-[clamp(12px,1.5vw,22px)]">${data.company.suffix}</p>
            </div>
          </div>

          <div class="flex flex-col flex-1">
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <input type="text" placeholder="Your name" class="flex-1 border-2 border-gray-200 rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-green-dark transition-all duration-300">
              <input type="email" placeholder="Your email" class="flex-1 border-2 border-gray-200 rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-green-dark transition-all duration-300">
            </div>
            <input type="text" placeholder="Subject" class="w-full border-2 border-gray-200 rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-green-dark transition-all duration-300 mb-4">
            <textarea placeholder="Message" class="w-full flex-1 border-2 border-gray-200 rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-green-dark transition-all duration-300 resize-none mb-4"></textarea>
            <div class="flex justify-center">
              <button class="px-10 py-3 text-white font-semibold text-[15px] transition-all duration-300 hover:opacity-90" style="background: #48887B;">Send Message</button>
            </div>
          </div>

        </div>
      </div>
    `;

  } catch (error) {
    console.error("Error loading contact:", error);
  }
}