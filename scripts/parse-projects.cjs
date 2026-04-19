const fs = require('fs');
const path = require('path');

const WEEEE_DIR = 'e:\\FRANCESSCO\\WEEEE\\francescoshootsit.website';
const OUT_FILE = 'e:\\FRANCESSCO\\src\\lib\\projectDetails.json';

const result = {};

fs.readdirSync(WEEEE_DIR).forEach(file => {
  if (!file.endsWith('.html') || ['index.html', 'work.html', 'contact.html', 'welcome.html'].includes(file)) {
    return;
  }
  
  const content = fs.readFileSync(path.join(WEEEE_DIR, file), 'utf-8');
  
  // Extract Title
  let title = file.replace('.html', '');
  const titleMatch = content.match(/<h1[^>]*class="[^"]*title preserve-whitespace[^"]*"[^>]*>\s*(.*?)\s*<\/h1>/is);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1].trim();
  }
  
  // Extract Images
  const images = [];
  const regex = /data-src="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
     images.push(match[1]);
  }
  
  // Clean up dupes 
  const uniqueImages = [...new Set(images)];
  
  if (uniqueImages.length > 0) {
    result[file.replace('.html', '')] = {
      title,
      images: uniqueImages
    };
  }
});

fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2));
console.log('Project details generated successfully with ' + Object.keys(result).length + ' projects.');
