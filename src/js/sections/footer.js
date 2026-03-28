const DATA_FOOTER = './src/data/footer.json';

export async function loadFooter() {
  try {
    const res = await fetch(DATA_FOOTER);

    if (!res.ok) {
      throw new Error(`Failed to fetch footer: ${res.status}`);
    }

    const data = await res.json();

    const footer = document.getElementById("footer");

    if (!footer) {
      throw new Error("Footer element not found");
    }
      //footer class
    footer.className = "bg-green-dark text-white flex flex-col font-poppins";

    footer.innerHTML = `
      <div class="pt-7.5-5 pb-5 text-center">
        <h2 class="font-pacifico text-[clamp(1.6rem,2.5vw,3rem)] font-normal mb-3.75 text-white tracking-[1px]">
          ${data.title}
        </h2>

        <div class="flex justify-center gap-6">
          ${data.socials.map(social => `
            <a href="${social.link}" aria-label="${social.label}"
              class="flex items-center justify-center w-9 h-9 bg-white text-green-dark rounded-full text-[1.1rem] transition-all duration-300 outline outline-white outline-offset-[3px] hover:bg-green-dark hover:text-cream hover:scale-110">
              <i class="fa-brands ${social.icon}"></i>
            </a>
          `).join("")}
        </div>
      </div>

      <div class="border-t-4 border-black/10 p-5 flex flex-col md:flex-row justify-center items-center gap-6.25 text-[clamp(0.75rem,0.9vw,1rem)] text-white text-center">
        <span>${data.copyright}</span>
        <span>${data.credits}</span>
      </div>
    `;

  } catch (error) {
    console.error("Error loading footer:", error);

    const footer = document.getElementById("footer");
    if (footer) {
      // Dinagdag ko rin ang styling dito para kahit mag-error, presentable pa rin
      footer.className = "bg-green-dark text-white flex flex-col font-poppins";
      footer.innerHTML = `
        <p class="text-red-300 text-center p-5">
          Failed to load footer.
        </p>
      `;
    }
  }
}