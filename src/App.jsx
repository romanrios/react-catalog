import './App.css';
import Header from './Header';
import Spinner from './Spinner';
import SearchPage from './SearchPage';
import Footer from './Footer';
import Product from './Product'
import { useEffect, useState } from 'react';
import CONFIG from './config/config';
import { mockdata } from './constants/products';
import { Route, Routes } from "react-router-dom";
import NotFound from './NotFound';

function App() {
  const [loading, setLoading] = useState(true);
  const [allResults, setAllResults] = useState(null);

  useEffect(() => {
    if (CONFIG.use_server) {
      async function fetchData() {
        const res = await fetch(CONFIG.server_url);
        const myjson = await res.json();
        setAllResults(myjson.products);
        setLoading(false);
      }
      fetchData();
    } else {
      setTimeout(() => {
        setLoading(false);
        setAllResults(mockdata.products);
      }, CONFIG.loading_timeout_ms);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <main>

        <Routes>
          <Route path="/" element={
            loading ? <Spinner /> : <div>
              <SearchPage theproducts={allResults} />
            </div>
          } />

          <Route path="/products/:productId" element={<Product setLoading={setLoading} loading={loading} />} />

          <Route path="*" element={<NotFound setLoading={setLoading} loading={loading} />} />

        </Routes>

      </main>
      <Footer />
    </div>
  );
}

export default App;
