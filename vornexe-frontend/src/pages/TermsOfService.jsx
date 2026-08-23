import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './PrivacyPolicy.css'; 

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">TERMS OF SERVICE</h1>
          <p className="legal-updated">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="legal-content">
            <section>
              <h2>1. Introduction</h2>
              <p>
                Welcome to VORNEXE ("we", "our", or "us"). By accessing or using our website and purchasing our products, 
                you agree to be bound by these Terms of Service. VORNEXE is an archive system specializing in curated, 
                1-of-1 thrifted and vintage garments. Our platform is designed for individuals who appreciate the unique history 
                and exclusive nature of rare apparel.
              </p>
            </section>
            
            <section>
              <h2>2. The Nature of Thrift & Vintage</h2>
              <p>
                VORNEXE operates as an exclusive 1-of-1 archive. This means every item listed on our website is a pre-owned, 
                vintage, or thrifted garment. By purchasing from us, you explicitly understand and accept the following conditions 
                regarding the nature of our products:
              </p>
              <ul>
                <li><strong>Pre-Loved Condition:</strong> Items have been previously worn and may exhibit signs of wear, age, fading, or minor distressing. These are not considered defects but rather the unique character of vintage clothing.</li>
                <li><strong>Visual Representation:</strong> We strive to present our garments as artistically and accurately as possible through editorial and detailed photography. However, you acknowledge that the actual product may differ slightly in color, fit, or physical appearance from the digital previews on our website.</li>
                <li><strong>Sizing:</strong> Vintage sizing often differs from modern standard sizing. We provide detailed measurements where possible, but the buyer assumes responsibility for understanding that a vintage "Large" may fit differently than a contemporary "Large".</li>
              </ul>
            </section>

            <section>
              <h2>3. Exclusivity and Availability</h2>
              <p>
                Because our entire catalog consists of 1-of-1 pieces, inventory is strictly limited. Once an item is sold, it is permanently 
                removed from the available archive and marked as "SOLD OUT". Adding an item to your cart does not guarantee reservation; 
                the item is only secured once checkout and payment are fully completed.
              </p>
            </section>

            <section>
              <h2>4. Purchase and Payment</h2>
              <p>
                All prices are listed in INR (₹) unless otherwise stated. We reserve the right to modify prices at any time without prior notice. 
                Payments are processed securely via our trusted payment gateways. By submitting your payment information, you represent and 
                warrant that you are authorized to use the designated payment method.
              </p>
            </section>

            <section>
              <h2>5. Limitation of Liability</h2>
              <p>
                VORNEXE shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or 
                inability to use our website, or from the purchase of our thrifted items. We make no warranties, express or implied, regarding 
                the durability, longevity, or specific condition of any vintage garment sold.
              </p>
            </section>

            <section>
              <h2>6. Intellectual Property</h2>
              <p>
                All content on this website, including but not limited to editorial photography, logos, graphics, text, and branding (collectively "Content"), 
                is the exclusive property of VORNEXE. You may not reproduce, distribute, or use any Content for commercial purposes without our 
                explicit written consent.
              </p>
            </section>

            <section>
              <h2>7. Modifications to the Service</h2>
              <p>
                We reserve the right to withdraw, amend, or restrict access to our website or archive at any time, for any reason, without liability. 
                These Terms of Service may be updated periodically, and your continued use of the platform constitutes acceptance of those changes.
              </p>
            </section>

            <section>
              <h2>8. Contact Information</h2>
              <p>
                If you have any questions or concerns regarding these Terms of Service, please reach out to our team at <strong>vornexe.official@gmail.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
