import { apiGet, apiPatch } from "../services.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/posts.php";
const data = await apiGet(API);

// 1. Safety Check: If data is null or empty, stop.
if (!data || !data.posts) {
    console.error("Failed to load posts data or 'posts' key is missing in JSON");
} else {
    // 2. The Loop: This defines what "card" and "index" are
    data.posts.forEach((card, index) => {
        // 3. Define the container ID dynamically
        const containerId = `#card-post-${index}`;
        const container = document.querySelector(containerId);

        // Only mount if the HTML element actually exists
        if (container) {
            ObjectEditor.mount({
                container: containerId,
                label: `Recent Post Card ${index + 1}`,
                data: card,
                fields: [
                    { key: "category", label: "Card Category" },
                    { key: "title", label: "Card Title" },
                    { key: "description", label: "Card Description" },
                    { key: "image", label: "Image Path" },
                    { key: "link", label: "Card Post Path" },
                ],
                // Don't forget the save logic!
                onSave: (updatedValue) => apiPatch(API, "posts", updatedValue, index),
            });
        }
    });
}