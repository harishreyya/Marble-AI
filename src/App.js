import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import './App.css'; // Import the CSS file

const data = [
  { name: 'Jan', metric1: 20, metric2: 15, metric3: 30 },
  { name: 'Feb', metric1: 25, metric2: 18, metric3: 20 },
  { name: 'Mar', metric1: 30, metric2: 22, metric3: 43 },
  { name: 'Apr', metric1: 25, metric2: 20, metric3: 37 },
  { name: 'May', metric1: 22, metric2: 30, metric3: 34 },
  { name: 'Jun', metric1: 34, metric2: 24, metric3: 28 },
  { name: 'July', metric1: 19, metric2: 18, metric3: 43 },
];

const ChartPanel = ({ selectedMetrics, timePeriods }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const newData = data.filter((entry) => timePeriods.includes(entry.name));
      setFilteredData(newData);
    };

    fetchData();
  }, [timePeriods]);

  return (
    <div className="chart-container">
      <LineChart
        width={600}
        height={300}
        data={filteredData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        {selectedMetrics.map((metric) => (
          <Line
            type="monotone"
            dataKey={metric}
            key={metric}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        ))}
      </LineChart>
    </div>
  );
};

const App = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(['metric1', 'metric2']);
  const [timePeriods, setTimePeriods] = useState([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
  ]);

  const handleMetricChange = (newMetrics) => {
    setSelectedMetrics(newMetrics);
  };

  const handleTimePeriodChange = (newTimePeriods) => {
    setTimePeriods(newTimePeriods);
  };

  return (
    <div className="app-container">
      <h1>Marble AI Graph</h1>
      <div className="select-container">
        <label>Select Metrics: </label>
        <select
          multiple
          value={selectedMetrics}
          onChange={(e) =>
            handleMetricChange(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="metric1">Metric 1</option>
          <option value="metric2">Metric 2</option>
          <option value="metric3">Metric 3</option>
        </select>
      </div>
      <div className="select-container">
        <label>Select Time Periods: </label>
        <select
          multiple
          value={timePeriods}
          onChange={(e) =>
            handleTimePeriodChange(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {data.map((entry) => (
            <option value={entry.name} key={entry.name}>
              {entry.name}
            </option>
          ))}
        </select>
      </div>
      <ChartPanel selectedMetrics={selectedMetrics} timePeriods={timePeriods} />
    </div>
  );
};

export default App;
