import React from 'react';
import './SizeGuideSection.css';

const SizeGuideSection = () => {
  return (
    <section className="size-guide-section" id="size-guide">
      <div className="size-guide-container">
        <div className="size-guide-header">
          <h2>SIZE GUIDE</h2>
          <p className="size-guide-subtitle">MEASUREMENTS & FIT REFERENCE</p>
        </div>

        <div className="size-guide-content">
          
          {/* Left Side: Technical Diagram */}
          <div className="size-guide-visual">
            <img 
              src="/size-guide-diagram.jpg" 
              alt="T-Shirt Sizing Technical Drawing" 
              className="size-guide-image"
            />
          </div>

          {/* Right Side: Info and Table */}
          <div className="size-guide-details">
            <div className="size-guide-info">
              <h3>HOW IT FITS</h3>
              <p>
                Our garments are crafted for a heavy, structured, and boxy silhouette. 
                They feature a signature oversized streetwear aesthetic without being excessively baggy at the hem.
              </p>
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
                    <th><span className="key-marker">A</span> LENGTH</th>
                    <th><span className="key-marker">B</span> CHEST</th>
                    <th><span className="key-marker">C</span> SLEEVE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>XS</strong></td>
                    <td>65.5</td>
                    <td>55</td>
                    <td>62.5</td>
                  </tr>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>67.5</td>
                    <td>57</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>69.5</td>
                    <td>59</td>
                    <td>65.5</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>71.5</td>
                    <td>61</td>
                    <td>67</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>73.5</td>
                    <td>63</td>
                    <td>68.5</td>
                  </tr>
                  <tr>
                    <td><strong>XXL</strong></td>
                    <td>75.5</td>
                    <td>65</td>
                    <td>70</td>
                  </tr>
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
