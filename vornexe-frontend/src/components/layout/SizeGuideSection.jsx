import React, { useState } from 'react';
import './SizeGuideSection.css';

const GARMENT_DATA = {
  'T-Shirts': {
    image: '/size-guide-diagram.jpg',
    measurements: ['LENGTH', 'CHEST WIDTH', 'SLEEVE'],
    note: 'Our garments are crafted for a heavy, structured, and boxy silhouette. They feature a signature oversized streetwear aesthetic.',
    data: [
      { size: 'XS', A: '65.5', B: '55.0', C: '62.5' },
      { size: 'S', A: '67.5', B: '57.0', C: '64.0' },
      { size: 'M', A: '69.5', B: '59.0', C: '65.5' },
      { size: 'L', A: '71.5', B: '61.0', C: '67.0' },
      { size: 'XL', A: '73.5', B: '63.0', C: '68.5' },
      { size: 'XXL', A: '75.5', B: '65.0', C: '70.0' },
    ]
  },
  'Jerseys': {
    image: '/size_guide_jersey.jpg',
    measurements: ['LENGTH', 'CHEST WIDTH', 'SLEEVE'],
    note: 'Athletic cut with a relaxed drape. Designed to sit comfortably loose across the chest and shoulders.',
    data: [
      { size: 'XS', A: '68.0', B: '53.0', C: '24.0' },
      { size: 'S', A: '70.0', B: '55.0', C: '25.0' },
      { size: 'M', A: '72.0', B: '57.0', C: '26.0' },
      { size: 'L', A: '74.0', B: '59.0', C: '27.0' },
      { size: 'XL', A: '76.0', B: '61.0', C: '28.0' },
      { size: 'XXL', A: '78.0', B: '63.0', C: '29.0' },
    ]
  },
  'Long Sleeves': {
    image: '/size_guide_long_sleeve.jpg',
    measurements: ['LENGTH', 'CHEST WIDTH', 'SLEEVE'],
    note: 'Boxy fit with elongated sleeves. Ribbed cuffs designed to stack elegantly at the wrist.',
    data: [
      { size: 'XS', A: '66.0', B: '54.0', C: '63.0' },
      { size: 'S', A: '68.0', B: '56.0', C: '64.5' },
      { size: 'M', A: '70.0', B: '58.0', C: '66.0' },
      { size: 'L', A: '72.0', B: '60.0', C: '67.5' },
      { size: 'XL', A: '74.0', B: '62.0', C: '69.0' },
      { size: 'XXL', A: '76.0', B: '64.0', C: '70.5' },
    ]
  },
  'Hoodies': {
    image: '/size_guide_hoodie.jpg',
    measurements: ['LENGTH', 'CHEST WIDTH', 'SLEEVE'],
    note: 'Heavyweight fleece with a cropped body and slightly dropped shoulders. True to size for intended look.',
    data: [
      { size: 'XS', A: '64.0', B: '58.0', C: '61.0' },
      { size: 'S', A: '66.0', B: '60.0', C: '62.5' },
      { size: 'M', A: '68.0', B: '62.0', C: '64.0' },
      { size: 'L', A: '70.0', B: '64.0', C: '65.5' },
      { size: 'XL', A: '72.0', B: '66.0', C: '67.0' },
      { size: 'XXL', A: '74.0', B: '68.0', C: '68.5' },
    ]
  },
  'Oversized Hoodies': {
    image: '/size_guide_oversized_hoodie.jpg',
    measurements: ['LENGTH', 'CHEST WIDTH', 'SLEEVE'],
    note: 'Exaggerated proportions with extremely dropped shoulders and a wider chest block.',
    data: [
      { size: 'XS', A: '68.0', B: '64.0', C: '60.0' },
      { size: 'S', A: '70.0', B: '66.0', C: '61.5' },
      { size: 'M', A: '72.0', B: '68.0', C: '63.0' },
      { size: 'L', A: '74.0', B: '70.0', C: '64.5' },
      { size: 'XL', A: '76.0', B: '72.0', C: '66.0' },
      { size: 'XXL', A: '78.0', B: '74.0', C: '67.5' },
    ]
  },
  'Leather Jackets': {
    image: '/size_guide_leather_jacket.jpg',
    measurements: ['LENGTH', 'CHEST WIDTH', 'SLEEVE'],
    note: 'Cropped vintage fit. Size up if you plan to layer thick hoodies underneath.',
    data: [
      { size: 'XS', A: '60.0', B: '54.0', C: '62.0' },
      { size: 'S', A: '62.0', B: '56.0', C: '63.5' },
      { size: 'M', A: '64.0', B: '58.0', C: '65.0' },
      { size: 'L', A: '66.0', B: '60.0', C: '66.5' },
      { size: 'XL', A: '68.0', B: '62.0', C: '68.0' },
      { size: 'XXL', A: '70.0', B: '64.0', C: '69.5' },
    ]
  },
  'Jeans': {
    image: '/size_guide_jeans.jpg',
    measurements: ['WAIST', 'INSEAM', 'LEG OPENING'],
    note: 'Classic straight-leg cut. Relaxed through the thigh with a slight stack at the ankle.',
    data: [
      { size: '28', A: '38.0', B: '78.0', C: '21.0' },
      { size: '30', A: '40.5', B: '80.0', C: '22.0' },
      { size: '32', A: '43.0', B: '81.0', C: '23.0' },
      { size: '34', A: '45.5', B: '81.0', C: '24.0' },
      { size: '36', A: '48.0', B: '82.0', C: '25.0' },
      { size: '38', A: '50.5', B: '82.0', C: '26.0' },
    ]
  },
  'Baggy Jeans': {
    image: '/size_guide_baggy_jeans.jpg',
    measurements: ['WAIST', 'INSEAM', 'LEG OPENING'],
    note: 'Extremely wide-leg fit designed to drag and stack aggressively. True to waist size.',
    data: [
      { size: '28', A: '38.0', B: '80.0', C: '26.0' },
      { size: '30', A: '40.5', B: '81.0', C: '27.0' },
      { size: '32', A: '43.0', B: '82.0', C: '28.0' },
      { size: '34', A: '45.5', B: '84.0', C: '29.0' },
      { size: '36', A: '48.0', B: '85.0', C: '30.0' },
      { size: '38', A: '50.5', B: '86.0', C: '31.0' },
    ]
  },
  'Shorts': {
    image: '/size_guide_shorts.jpg',
    measurements: ['WAIST', 'INSEAM', 'LEG OPENING'],
    note: 'Mesh streetwear shorts with a slightly cropped inseam designed to sit just above the knee.',
    data: [
      { size: 'XS', A: '34.0', B: '13.0', C: '29.0' },
      { size: 'S', A: '36.0', B: '14.0', C: '30.0' },
      { size: 'M', A: '38.0', B: '15.0', C: '31.0' },
      { size: 'L', A: '40.0', B: '16.0', C: '32.0' },
      { size: 'XL', A: '42.0', B: '17.0', C: '33.0' },
      { size: 'XXL', A: '44.0', B: '18.0', C: '34.0' },
    ]
  }
};

const CATEGORIES = Object.keys(GARMENT_DATA);

const SizeGuideSection = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const activeData = GARMENT_DATA[activeCategory];

  return (
    <section className="size-guide-section" id="size-guide">
      <div className="size-guide-container">
        <div className="size-guide-header">
          <h2>SIZE GUIDE</h2>
          <p className="size-guide-subtitle">MEASUREMENTS & FIT REFERENCE</p>
        </div>

        {/* Category Tabs */}
        <div className="size-guide-tabs">
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`size-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="size-guide-content">
          
          {/* Left Side: Technical Diagram */}
          <div className="size-guide-visual">
            <img 
              src={activeData.image} 
              alt={`${activeCategory} Technical Drawing`} 
              className="size-guide-image animate-fade-in"
              key={activeData.image} // Force re-render for animation on tab switch
            />
          </div>

          {/* Right Side: Info and Table */}
          <div className="size-guide-details">
            <div className="size-guide-info">
              <h3>HOW IT FITS</h3>
              <p>{activeData.note}</p>
              <ul>
                <li><strong>For a standard oversized fit:</strong> Take your regular size.</li>
                <li><strong>For a heavily exaggerated baggier fit:</strong> Size up once.</li>
              </ul>
              <p className="size-guide-note">
                *Measurements are in centimeters (cm). All 1-of-1 pieces follow this standard block.
              </p>
            </div>

            <div className="size-guide-table-wrapper">
              <table className="size-guide-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th><span className="key-marker">A</span> {activeData.measurements[0]}</th>
                    <th><span className="key-marker">B</span> {activeData.measurements[1]}</th>
                    <th><span className="key-marker">C</span> {activeData.measurements[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {activeData.data.map((row, index) => (
                    <tr key={index}>
                      <td><strong>{row.size}</strong></td>
                      <td>{row.A}</td>
                      <td>{row.B}</td>
                      <td>{row.C}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SizeGuideSection;
