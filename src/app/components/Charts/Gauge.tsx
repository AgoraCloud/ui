import React from 'react';
import Plot from 'react-plotly.js';



export const GaugeChart = (props) => {
  console.log(props)
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
    layout={ {width: "100%", height: "100%", paper_bgcolor:"transparent"} }
    {...props}
  />
}