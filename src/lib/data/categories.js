import iconFiles from "../../assets/icons/cat-files.png";
import iconImages from "../../assets/icons/cat-images.png";
import iconDocuments from "../../assets/icons/cat-documents.png";
import iconText from "../../assets/icons/cat-text.png";
import iconDeveloper from "../../assets/icons/cat-developer.png";
import iconEveryday from "../../assets/icons/cat-everyday.png";
import iconSecurity from "../../assets/icons/cat-security.png";

// Matches the Project Plan's 7 V1 categories. Real tool listings per
// category are added in Phase 3 — for now each category page just
// shows a "coming soon" placeholder for any category with no tools
// assigned yet.
export const categories = [
  { id: "files", label: "Files", glyph: "F", icon: iconFiles },
  { id: "images", label: "Images", glyph: "Im", icon: iconImages },
  { id: "documents", label: "Documents", glyph: "D", icon: iconDocuments },
  { id: "text", label: "Text", glyph: "T", icon: iconText },
  { id: "developer", label: "Developer", glyph: "Dv", icon: iconDeveloper },
  { id: "everyday", label: "Everyday", glyph: "E", icon: iconEveryday },
  { id: "security", label: "Security", glyph: "S", icon: iconSecurity },
];
