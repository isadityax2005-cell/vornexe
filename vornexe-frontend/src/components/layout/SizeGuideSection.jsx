import React from 'react';
import './SizeGuideSection.css';

const SizeGuideSection = () => {
  return (
    <section className="size-guide-section">
      <div className="size-guide-container">
        <div className="size-guide-header">
          <h2>SIZE CHART</h2>
          <p className="size-guide-subtitle">UNIVERSAL SIZING REFERENCE</p>
        </div>

        <div className="size-guide-content">
          <div className="size-guide-info">
            <h3>FIT & SIZING</h3>
            <p>
              Our garments are crafted to have a heavy, structured, and boxy silhouette. 
              While they feature a signature oversized style, they are not excessively baggy.
            </p>
            <ul>
              <li><strong>For a standard, intended fit:</strong> Take your regular size.</li>
              <li><strong>For a baggier fit:</strong> Consider sizing up once.</li>
            </ul>
            <p className="size-guide-note">
              *All 1-of-1 pieces follow this general sizing structure. Measurements are in cm.
            </p>
          </div>

          <div className="size-guide-table-wrapper">
            <table className="size-guide-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>LENGTH</th>
                  <th>CHEST WIDTH</th>
                  <th>SLEEVE</th>
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
    </section>
  );
};

export default SizeGuideSection;
