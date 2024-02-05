import React, { useState } from 'react';
import axios from 'axios';
import '../style/CreateProduct.css';

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_code: '',
    product_manufacturer: '',
    product_type: '',
    description: '',
    user_id: 1,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
  
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const accentRegex = /[À-ÖØ-öø-ÿ]/;
  
    Object.keys(newProduct).forEach((key) => {
      if (!newProduct[key]) {
        newErrors[key] = 'Campo obrigatório';
      } else if (specialCharsRegex.test(newProduct[key])) {
        newErrors[key] = 'Não deve conter caracteres especiais';
      } else if (accentRegex.test(newProduct[key])) {
        newErrors[key] = 'Não deve conter acentuação';
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProduct = async () => {
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/api/product', newProduct);
        alert('Novo produto criado com sucesso!');
      } catch (error) {
        alert('Erro ao criar o produto:', error);
      }
    }
  };

  return (
    <div className="create-product-container">
      <h1>Criar Novo Produto</h1>
      <form className="create-product-form">
        <div className="form-group">
          <label htmlFor="productName">Nome do Produto:</label>
          <input
            type="text"
            id="productName"
            name="product_name"
            value={newProduct.product_name}
            onChange={handleChange}
          />
          {errors.product_name && <span className="error">{errors.product_name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="productCode">Código do Produto:</label>
          <input
            type="number"
            id="productCode"
            name="product_code"
            value={newProduct.product_code}
            onChange={handleChange}
          />
          {errors.product_code && <span className="error">{errors.product_code}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="productManufacturer">Fabricante:</label>
          <input
            type="text"
            id="productManufacturer"
            name="product_manufacturer"
            value={newProduct.product_manufacturer}
            onChange={handleChange}
          />
          {errors.product_manufacturer && <span className="error">{errors.product_manufacturer}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="productType">Tipo do Produto:</label>
          <input
            type="text"
            id="productType"
            name="product_type"
            value={newProduct.product_type}
            onChange={handleChange}
          />
          {errors.product_type && <span className="error">{errors.product_type}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Descrição do Produto:</label>
          <textarea
            id="productDescription"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <button type="button" onClick={handleCreateProduct}>
          Criar Produto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;