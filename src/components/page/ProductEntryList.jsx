import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/ProductEntryList.css';
import * as XLSX from 'xlsx';

const ProductEntryList = () => {
  const [productEntries, setProductEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/entry');
        if (response.status === 200) {
          setProductEntries(response.data.Response);
        } else {
          alert('Erro ao criar o produto');
        }
      } catch (error) {
        setTimeout(() => {
          fetchData().catch((error) => {
            alert('Erro na segunda tentativa:', error);
          });
        }, 1000);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    return status === 'disponivel' ? 'green-row' : 'red-row';
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(productEntries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ProductEntries');
    XLSX.writeFile(wb, 'product_entries.xlsx');
  };

  return (
    <div className='product-entry-list-container'>
      <h1>Lista de Produtos</h1>
      <button onClick={exportToExcel}>Exportar para Excel</button>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Código do Produto</th>
            <th>Fabricante</th>
            <th>Nome do Produto</th>
            <th>Tipo do Produto</th>
            <th>Status</th>
            <th>Data da Entrada</th>
          </tr>
        </thead>
        <tbody>
          {productEntries && productEntries.map((entry) => (
            <tr key={entry.product_code} className={getStatusColor(entry.status)}>
              <td>{entry.description}</td>
              <td>{entry.product_code}</td>
              <td>{entry.product_manufacturer}</td>
              <td>{entry.product_name}</td>
              <td>{entry.product_type}</td>
              <td>{entry.status}</td>
              <td>{entry.status_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductEntryList;
