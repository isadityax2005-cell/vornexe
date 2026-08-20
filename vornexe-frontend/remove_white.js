const Jimp = require('jimp');

Jimp.read('/Users/adityasingh/.gemini/antigravity-ide/brain/71035656-660a-4037-a0ea-c208ee23f551/.user_uploaded/media_1787123398556.png').then(image => {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // If pixel is very close to pure white, make it transparent
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // alpha = 0
    }
  });
  
  image.write('/Users/adityasingh/.gemini/antigravity-ide/scratch/vornexe/vornexe-frontend/public/logo_transparent.png', () => {
    console.log('Background removed!');
  });
}).catch(err => {
  console.error(err);
});
