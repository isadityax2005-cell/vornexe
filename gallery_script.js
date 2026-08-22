const fs = require('fs');
const path = require('path');

const dir = '/Users/adityasingh/.gemini/antigravity-ide/scratch/vornexe/thrift_pictures_temp/Thrift New Images';
const files = fs.readdirSync(dir).filter(f => f !== '.DS_Store').sort();

let html = '<html><body><h1>Product Gallery</h1><div style="display: flex; flex-direction: column; gap: 20px;">';

for (let i = 0; i < files.length; i += 2) {
  const f1 = files[i];
  const f2 = files[i+1] || '';
  
  html += `
    <div style="border: 2px solid black; padding: 10px; display: flex; gap: 20px;">
      <div>
        <h3>${f1}</h3>
        <img src="file://${path.join(dir, f1)}" style="max-height: 400px; max-width: 400px;" />
      </div>
      ${f2 ? `
      <div>
        <h3>${f2}</h3>
        <img src="file://${path.join(dir, f2)}" style="max-height: 400px; max-width: 400px;" />
      </div>
      ` : ''}
    </div>
  `;
}

html += '</div></body></html>';
fs.writeFileSync('/Users/adityasingh/.gemini/antigravity-ide/scratch/vornexe/gallery.html', html);
console.log('Gallery created');
