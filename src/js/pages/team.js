import { apiGet, apiPatch } from "../services.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/team.php";
const data = await apiGet(API);

// If the data failed to fetch, stop here
if (!data) {
    console.error("Failed to load team data");
}

// 1. Combine the two arrays so we can loop through all 7 cards
const allCards = [...(data.cardsTop || []), ...(data.cardsBottom || [])];

// 2. Loop through the combined list
allCards.forEach((card, index) => {
  const containerId = `#card-team-${index}`;
  
  // Check if the container exists in HTML before mounting
  const container = document.querySelector(containerId);
  if (!container) return;

  ObjectEditor.mount({
    container: containerId,
    label: `Team Card ${index + 1}`,
    data: card,
    fields: [
      { key: "title", label: "Card Title" },
      { key: "desc", label: "Card Description" },
      { key: "icon", label: "Icon Path" },
      { key: "hoverIcon", label: "Hover Icon Path" },
    ],
    onSave: (value) => {
      // Logic to determine if we update cardsTop or cardsBottom
      // cardsTop has indices 0-3, cardsBottom has 4-6
      const isTop = index < 4;
      const fieldName = isTop ? "cardsTop" : "cardsBottom";
      const adjustedIndex = isTop ? index : index - 4;

      return apiPatch(API, fieldName, value, adjustedIndex);
    },
  });
});