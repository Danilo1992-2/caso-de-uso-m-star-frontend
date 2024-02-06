import React from 'react';
import ReactDOM from 'react-dom';
import CreateProduct from './components/page/CreateProduct';
import ProductListDropdown from './components/page/ProductListDropdown';
import ChartPage from './components/page/ChartPage';
import ProductEntryList from './components/page/ProductEntryList';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <CreateProduct />
        </div>
        <div style={{ marginRight: '20px' }}>
          <ProductListDropdown />
        </div>
        <div>
          <ChartPage />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ProductEntryList />
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
