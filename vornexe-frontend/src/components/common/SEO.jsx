import { useEffect } from 'react';

const SEO = ({ title, description, image, url, type = 'website', productData }) => {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = `${title} | VORNEXE`;
    } else {
      document.title = 'VORNEXE';
    }

    // 2. Update standard meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = description;
      }
    }

    // 3. Update Open Graph tags
    const setMetaTag = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    if (title) setMetaTag('og:title', title);
    if (description) setMetaTag('og:description', description);
    if (image) setMetaTag('og:image', image);
    if (url) setMetaTag('og:url', url);
    if (type) setMetaTag('og:type', type);

    // 4. Update Twitter Card tags
    const setTwitterTag = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    if (title) setTwitterTag('twitter:title', title);
    if (description) setTwitterTag('twitter:description', description);
    if (image) setTwitterTag('twitter:image', image);

    // 5. Inject Structured Data (JSON-LD) for Products
    let script = document.querySelector('script[type="application/ld+json"]');
    if (productData) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productData.name,
        "image": productData.imageUrls,
        "description": productData.description,
        "brand": {
          "@type": "Brand",
          "name": "Vornexe"
        },
        "offers": {
          "@type": "Offer",
          "url": url || window.location.href,
          "priceCurrency": "INR",
          "price": productData.price,
          "availability": productData.isSoldOut 
            ? "https://schema.org/OutOfStock" 
            : "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      };
      
      script.text = JSON.stringify(structuredData);
    } else if (script) {
      // Remove product schema if we navigate away from a product page
      script.remove();
    }

    // Cleanup function to reset default title when component unmounts
    // Optional depending on SPA behavior, but good practice
    return () => {
      document.title = 'VORNEXE';
    };
  }, [title, description, image, url, type, productData]);

  return null; // This component doesn't render any visible UI
};

export default SEO;
