import { apiGet, apiPatch } from "../services.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/services.php";
const data = await apiGet(API);

// 1. Safety Check: If data is null or empty, stop.
if (!data || !data.cards) {
    console.error("Failed to load posts data or 'services' key is missing in JSON");
} else {
    // 2. The Loop: This defines what "card" and "index" are
    data.cards.forEach((cards, index) => {
        // 3. Define the container ID dynamically
        const containerId = `#cards-services-${index}`;
        const container = document.querySelector(containerId);

        // Only mount if the HTML element actually exists
        if (container) {
            ObjectEditor.mount({
                container: containerId,
                label: `Recent Post Card ${index + 1}`,
                data: card,
                fields: [
                    { key: "id", label: "ID" },
                    { key: "title", label: "Card Title" },
                    { key: "image", label: "Image Path" },
                    { key: "description", label: "Card Description" },
                    
                    
                ],
                // Don't forget the save logic!
                onSave: (updatedValue) => apiPatch(API, "cards", updatedValue, index),
            });
        }
    });
}