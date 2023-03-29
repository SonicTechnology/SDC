import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Overview from './Overview';
import RelatedItemsAndComparison from './RIC';
import QA from './QA';
import RatingsAndReviews from './RatingsAndReviews';
import ProductContext from '../contexts/ProductContext';
import Loading from './RIC/Loading';
import Navigation from './Navigation';

// const useFetchData = async (url, options) => {
//   const res = await axios.get(url, { headers: { Authorization: 'key'}, ...options});
//   return res.json()
// }

function App() {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products?count=${20}`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then((result) => {
        setProduct(result.data[2]);
      })
      .catch((err) => {
        throw new Error('Error in getting data', err);
      });
  }, []);

  const changeProdClick = (prodId) => {
    setProduct({});
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodId}`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then((result) => {
        setProduct(result.data);
      })
      .catch((err) => {
        throw new Error('Error in changing product', err);
      });
  };

  return (
    <ProductContext.Provider value={product}>
      {product.id === undefined
        ? <Loading />
        : (
          <div className="w-[75%] mx-auto">
            <Navigation />
            <div className="max-w-[75%] mx-auto">
              <Overview />
              <div className="h-[7rem]" />
              <RelatedItemsAndComparison changeProdClick={changeProdClick} />
              <div className="h-[40rem]" />
              <QA />
              <div className="h-[2rem]" />
              <RatingsAndReviews />
            </div>
          </div>
        )}
    </ProductContext.Provider>
  );
}

export default App;
