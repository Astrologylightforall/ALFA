const fs = require('fs');
const path = require('path');

const filesToFix = [
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\ui\\AnimatedText.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\WhyChooseALFA.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\StatsBar.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\ServicesGrid.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\ServiceHero.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\InstagramFeed.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\Hero.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\CTABanner.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\ContactSnippet.tsx",
  "c:\\Users\\pc\\Desktop\\ALFA\\components\\sections\\AboutSnippet.tsx"
];

const registrationBlock = `import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
`;

filesToFix.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if ScrollTrigger is already registered or imported
    if (!content.includes('gsap.registerPlugin') && content.includes('import gsap from "gsap";')) {
      content = content.replace('import gsap from "gsap";', registrationBlock);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated: ${path.basename(filePath)}`);
    } else {
      console.log(`Skipped (already registered or missing import): ${path.basename(filePath)}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
