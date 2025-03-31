import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Reviewer names to generate unique avatars
const reviewers = ['Michael Chen', 'Sarah Johnson', 'David Wilson', 'Emma Davis'];

// Create avatars directory if it doesn't exist
const avatarsDir = path.join(__dirname, '../public/avatars/reviewers');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Function to download avatar
function downloadAvatar(name, id) {
  const seed = name.toLowerCase().replace(/\s+/g, '-');
  const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1f4d9,ffd5dc,ffdfbf`;
  const filePath = path.join(avatarsDir, `${id}.svg`);

  https
    .get(url, response => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filePath));
        console.log(`Downloaded avatar for ${name}`);
      } else {
        console.error(`Failed to download avatar for ${name}`);
      }
    })
    .on('error', err => {
      console.error(`Error downloading avatar for ${name}:`, err);
    });
}

// Generate avatars for each reviewer
reviewers.forEach((name, index) => {
  const id = `reviewer-${(index + 1).toString().padStart(3, '0')}`;
  downloadAvatar(name, id);
});
