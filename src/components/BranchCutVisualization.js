import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const BranchCutVisualization = () => {
  const [equation, setEquation] = useState('log(z)');
  const [plotType, setPlotType] = useState('2D plot');
  const [plotData, setPlotData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://0.0.0.0:8080/start_branch_cut_visualization', {
        equation,
        visualization_type: plotType,
      });
      setPlotData(response.data.result);
    } catch (error) {
      console.error('Error fetching visualization:', error);
    }
  };

  return (
    <div>
      <h1>Branch Cut Visualization</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Equation:
          <input type="text" value={equation} onChange={(e) => setEquation(e.target.value)} />
        </label>
        <br />
        <label>
          Plot Type:
          <select value={plotType} onChange={(e) => setPlotType(e.target.value)}>
            <option value="2D plot">2D plot</option>
            <option value="3D plot">3D plot</option>
          </select>
        </label>
        <br />
        <button type="submit">Visualize</button>
      </form>
      {plotData && plotType === '2D plot' && (
        <Plot
          data={[
            {
              z: plotData.z,
              x: plotData.x,
              y: plotData.y,
              type: 'contour',
              colorscale: 'HSV',
            },
          ]}
          layout={{ title: `Branch Cut of ${equation}`, xaxis: { title: 'Re(z)' }, yaxis: { title: 'Im(z)' } }}
        />
      )}
      {plotData && plotType === '3D plot' && (
        <Plot
          data={[
            {
              z: plotData.z,
              x: plotData.x,
              y: plotData.y,
              type: 'surface',
              colorscale: 'HSV',
            },
          ]}
          layout={{
            title: `Branch Cut of ${equation}`,
            scene: {
              xaxis: { title: 'Re(z)' },
              yaxis: { title: 'Im(z)' },
              zaxis: { title: 'Angle (radians)', tickvals: [-Math.PI, -Math.PI/2, 0, Math.PI/2, Math.PI], ticktext: ['-π', '-π/2', '0', 'π/2', 'π'] },
            },
          }}
        />
      )}
    </div>
  );
};

export default BranchCutVisualization;
