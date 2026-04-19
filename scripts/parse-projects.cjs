const fs = require('fs');
const path = require('path');

const WEEEE_DIR = process.env.WEEEE_DIR || path.join(__dirname, '..', 'WEEEE', 'francescoshootsit.website');
const OUT_FILE = process.env.OUT_FILE || path.join(__dirname, '..', 'src', 'lib', 'projectDetails.json');

const result = {};

function decodeEntities(encodedString) {
  return encodedString.replace(/&amp;/g, '&')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/&quot;/g, '"')
                      .replace(/&#39;/g, "'");
}

function slugToTitle(slug) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function normalizeTitle(rawTitle, isSlug) {
  let title = isSlug ? slugToTitle(rawTitle) : rawTitle;
  return decodeEntities(title);
}

fs.readdirSync(WEEEE_DIR).forEach(file => {
  if (!file.endsWith('.html') || ['index.html', 'work.html', 'contact.html', 'welcome.html'].includes(file)) {
    return;
  }
  
  const content = fs.readFileSync(path.join(WEEEE_DIR, file), 'utf-8');
  
  // Extract Title
  let rawTitle = file.replace('.html', '');
  let isSlug = true;

  const titleMatch = content.match(/<h1[^>]*class="[^"]*title preserve-whitespace[^"]*"[^>]*>\s*(.*?)\s*<\/h1>/is);
  if (titleMatch && titleMatch[1]) {
    rawTitle = titleMatch[1].trim();
    isSlug = false;
  }
  
  let title = normalizeTitle(rawTitle, isSlug);
  
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
