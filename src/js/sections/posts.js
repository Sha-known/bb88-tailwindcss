const DATA_POSTS = './src/data/posts.json';

export async function loadPosts() {
  try {
    const res = await fetch(DATA_POSTS);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Target the main section instead of the inner container
    const section = document.getElementById("posts");

    if (!section) {
      throw new Error('posts section element not found in DOM');
    }

    if (!data?.posts || !Array.isArray(data.posts)) {
      throw new Error('Invalid posts data format');
    }

    // 1. Inject the Tailwind classes directly into the section tag
    section.className = "relative px-5 md:px-10 py-25 min-h-screen bg-white text-center overflow-hidden font-poppins";

    // 2. Inject the Vectors, Title, Container, AND map the Posts inside it
    section.innerHTML = `
      <img src="src/images/vector/vector2.png" class="absolute top-0 left-0 w-[clamp(150px,20vw,600px)] pointer-events-none z-0" alt="">
      <img src="src/images/vector/vector2.0.png" class="absolute top-0 right-0 w-[clamp(150px,20vw,600px)] pointer-events-none z-0" alt="">
      
      <div class="relative z-10 mb-12">
        <h2 class="font-poppins text-[clamp(35px,5vw,65px)] font-extrabold text-green-dark leading-none tracking-[-2px] [-webkit-text-stroke:1px_white] mb-2 px-4">
            Recent Posts
        </h2>
        <div class="w-25 h-1 bg-green-light mx-auto mt-4 rounded"></div>
      </div>

      <div id="posts-container" class="flex flex-col lg:flex-row justify-center items-stretch gap-7.5 max-w-300 mx-auto relative z-10">
        ${data.posts.map(post => `
          <div class="group flex-1 bg-white border-[3px] border-green-dark rounded-2xl p-1.5 transition-all duration-400 ease-in-out cursor-pointer hover:scale-[1.03] hover:-translate-y-1.5 hover:border-white hover:shadow-[0_0_15px_rgba(230,223,184,0.8)] hover:bg-green-dark">
            
            <div class="bg-green-dark rounded-[10px] p-3 h-full flex flex-col transition-colors duration-400 ease-in-out group-hover:bg-cream">
              
              <div class="w-full h-50 rounded-md overflow-hidden border-[3px] border-white">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
              </div>

              <div class="pt-3.75 px-1.25 pb-1.25 flex flex-col grow text-center">
                
                <span class="text-white text-[14px] mb-2 transition-colors duration-400 group-hover:text-green-dark">
                  ${post.category}
                </span>

                <div class="bg-white rounded-lg py-3 px-2.5 mb-3.75 transition-colors duration-400 group-hover:bg-green-dark">
                  <h3 class="text-green-dark font-bold text-[clamp(14px,1.2vw,20px)] m-0 transition-colors duration-400 group-hover:text-white">
                    ${post.title}
                  </h3>
                </div>

                <p class="text-white text-[14px] leading-normal mb-5 transition-colors duration-400 group-hover:text-green-dark">
                  ${post.description}
                </p>

                <a href="${post.link}" class="text-white text-[14px] font-semibold mt-auto self-start px-3 py-1.5 rounded-md transition-all duration-400 group-hover:bg-green-dark group-hover:text-white hover:bg-white hover:text-green-dark hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(45,106,45,0.2)]">
                  Read More ➔
                </a>

              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;

  } catch (error) {
    console.error("Error loading posts:", error);

    const section = document.getElementById("posts");
    if (section) {
      section.innerHTML = `
        <p class="text-red-500 font-semibold mt-10">
          Failed to load posts. Please try again later.
        </p>
      `;
    }
  }
}