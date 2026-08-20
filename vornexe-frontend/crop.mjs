import sharp from 'sharp';

sharp('/Users/adityasingh/.gemini/antigravity-ide/scratch/vornexe/vornexe-frontend/public/logo_transparent.png')
  .trim({ threshold: 10 })
  .toFile('/Users/adityasingh/.gemini/antigravity-ide/scratch/vornexe/vornexe-frontend/public/logo.png')
  .then(info => console.log('Cropped successfully:', info))
  .catch(err => console.error('Error:', err));
