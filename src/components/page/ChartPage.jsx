import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../style/ChartPage.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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
  const downloadPDF = async () => {

      const entryResponse = await axios.get('http://localhost:5000/api/product/entry');
      const outputResponse = await axios.get('http://localhost:5000/api/product/output');
  
      const entryProductData = entryResponse.data.Response;
      const outputProductData = outputResponse.data.Response;
  
      const pdf = new jsPDF();
      pdf.text('Entradas e saídas', 20, 10);

      const objectColumns = ['product_name','description', 'product_code', 'product_manufacturer', 'product_type', 'data entrada/saida', 'status']
      pdf.autoTable({
        head: [objectColumns],
        body: entryProductData.map(obj => [obj.product_name, 
                                            obj.description, 
                                            obj.product_code, 
                                            obj.product_manufacturer, 
                                            obj.product_type, 
                                            obj.status_date,
                                            'entrada']),
      });
      pdf.autoTable({
        head: [objectColumns],
        body: outputProductData.map(obj => [obj.product_name, 
                                            obj.description, 
                                            obj.product_code, 
                                            obj.product_manufacturer, 
                                            obj.product_type, 
                                            obj.status_date,
                                            'saída'],
                                            ),
      });
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
      <button onClick={downloadPDF}>Exportar para PDF</button>
    </div>
  );
};

export default ChartPage;
