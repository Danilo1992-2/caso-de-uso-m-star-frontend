import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../style/ChartPage.css';
import jsPDF from 'jspdf';

const ChartPage = () => {
  const [entryData, setEntryData] = useState([]);
  const [outputData, setOutputData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entryResponse = await axios.get('http://localhost:5000/api/item/entry');
        const outputResponse = await axios.get('http://localhost:5000/api/item/output');

        setEntryData(entryResponse.data.Response);
        setOutputData(outputResponse.data.Response);
      } catch (error) {
        alert('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []);

  const mergedData = entryData.map((entry) => ({
    date: entry.Data,
    entryTotal: parseInt(entry.Total),
    outputTotal: 0,
  })).map((entry) => {
    const matchingOutput = outputData.find((output) => output.Data === entry.date);

    if (matchingOutput) {
      entry.outputTotal = parseInt(matchingOutput.Total);
    }

    return entry;
  });

  const downloadPDF = () => {
    const chartRef = document.getElementById('chart-container');

    const pdf = new jsPDF();
    pdf.text('Comparativo de Entrada e Saída', 20, 10);
    pdf.html(chartRef);
    pdf.save('chart-export.pdf');
  };

  return (
    <div className='chart-page-container'>
      <h1>Comparativo de Entrada e Saída</h1>
      <div id="chart-container">
        <BarChart width={600} height={400} data={mergedData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entryTotal" fill="#8884d8" name="Entrada" />
          <Bar dataKey="outputTotal" fill="#82ca9d" name="Saída" />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartPage;