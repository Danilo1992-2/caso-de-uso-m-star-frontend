import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/ProductListDropdown.css';

const ProductListDropdown = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product');
        if (response.status === 200) {
          setProducts(response.data.Response);
        } else {
          alert('Erro ao obter produtos:', response.data.Response);
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

  

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find((product) => product.id === parseInt(selectedProductId));
    setSelectedProduct(selectedProduct);
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/product/${selectedProduct.product_code}`);
        if (response.status === 200) {
          alert(`Produto deletado!`);
        } else {
          alert('Erro ao deletar o produto:', response.data.Response);
        }
      } catch (error) {
        alert('Erro ao deletar o produto:', error);
      }
    } else {
      alert('Nenhum produto selecionado para deletar.');
    }
  };

  const handleEntry = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/item/entry', {
        product_id: selectedProduct ? selectedProduct.id : null,
      });
      if (response.status === 200) {
        alert(`Entrada registrada com sucesso!`);
      } else {
        alert(`Erro ao registrar entrada:`, response.data.Response);
      }
    } catch (error) {
      alert(`Erro ao registrar entrada:`, error);
    }
  };

  const handleOutput = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/item/output', {
        product_id: selectedProduct ? selectedProduct.id : null,
      });
      if (response.status === 200) {
        alert(`Saída registrada com sucesso!`);
      } else {
        alert(`Erro ao registrar saída:`, response.data.Response);
      }
    } catch (error) {
      alert(`Erro ao registrar saída:`, error);
    }
  };

  return (
    <div className="product-list-dropdown">
      <h1>Lista de Produtos</h1>
      <label htmlFor="productDropdown">Selecione um produto:</label>
      <select id="productDropdown" onChange={handleProductChange}>
        <option value="">Selecione um produto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.product_name} - {product.product_code}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <div className="selected-product-details">
          <h2>Detalhes do Produto Selecionado</h2>
          <p>
            <strong>Nome do Produto:</strong> {selectedProduct.product_name}
          </p>
          <p>
            <strong>Descrição:</strong> {selectedProduct.description}
          </p>
          <button className="delete-button" onClick={handleDeleteProduct}>
            Deletar Produto
          </button>
          <button className="entry-button" onClick={handleEntry}>
            Registrar Entrada
          </button>
          <button className="output-button" onClick={handleOutput}>
            Registrar Saída
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListDropdown;