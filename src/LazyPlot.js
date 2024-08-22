import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

let lazyLoadCount = 0;  // Global variable to keep track of the number of lazy-loaded plots

const LazyPlot = ({ data, layout, config, style }) => {
  const plotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the element is in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    if (plotRef.current) {
      observer.observe(plotRef.current);
    }

    return () => {
      if (plotRef.current) {
        observer.unobserve(plotRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      lazyLoadCount += 1;
      console.log(`Lazy-loaded plots: ${lazyLoadCount}`);
    }
  }, [isVisible]);

  return (
    <div ref={plotRef} style={style}>
      {isVisible ? (
        <Plot data={data} layout={layout} config={config} />
      ) : (
        <div>Loading plot...</div>
      )}
    </div>
  );
};

export default LazyPlot;
