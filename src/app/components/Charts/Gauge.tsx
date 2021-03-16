import React from 'react';
import Plot from 'react-plotly.js';



export const GaugeChart = (props) => {
  return <Plot
    data={[
      {
        domain: { x: [0, 100], y: [0, 1] },
        value: 270,
        // title: { text: "Speed" },
        type: "indicator",
        mode: "gauge+number"
      }
    ]}
    layout={{ paper_bgcolor: "transparent", autosize: true }}
    // style={{ width: width, height: height }}
    useResizeHandler={true}
    style={{ width: "100%", height: "100%" }}
    {...props}
  />
}