// src/components/D3Visualization.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Visualization = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', 400)
        .attr('height', 400);

      // Example: Create a simple circle
      svg.append('circle')
        .attr('cx', 200)
        .attr('cy', 200)
        .attr('r', 100)
        .attr('fill', 'blue');
    }
  }, []);

  return <div ref={d3Container} />;
};

export default D3Visualization;
