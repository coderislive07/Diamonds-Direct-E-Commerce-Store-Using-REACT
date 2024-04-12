import React, { useState, useEffect } from 'react';
import labgrowndata from './labgrowndata.json'; // Importing the JSON file
import Footer from '../../components/footer'
import { Link } from 'react-router-dom';
import Preloader from '../../components/preloader/preloader';

function Labgrowndiamond() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('ascending');
  useEffect(() => {
    setProducts(labgrowndata[0].Data.items);
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <Preloader />;
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };
  const sortByPrice = (a, b) => {
    const priceA = parseFloat(a.price_efi);
    const priceB = parseFloat(b.price_efi);
    if (sortOrder === 'ascending') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  };

  const sortedProducts = [...products].sort(sortByPrice);
  return (
    <div className="container mx-auto top-40 px-5">
      <div className='my-10'>
        <h1 className='text-black font-medium font-sans text-3xl mx-20'>Lab Grown Diamonds</h1>
        <h1 className='mx-20 py-4 font-sans font-normal'>Customize your engagement ring with high-quality, ethically sourced lab-grown diamonds.</h1>
      </div>
      <div className="flex justify-between w-full">
        <div className='productslist'>
      <h1 className='mx-20 my-20 text-[#8D8993]'>{sortedProducts.length} Products</h1> 
      </div>
      <div className='sorting my-20'>
        <label htmlFor="sort" className="mr-2">Sort By :</label>
        <select id="sort" value={sortOrder} onChange={toggleSortOrder} className="px-2 py-1 cursor-pointer rounded-md">
          <option value="ascending">Price - Low to High</option>
          <option value="descending">Price - High to Low</option>
        </select>
        </div>
      </div>  
      <div className="grid  md:grid-cols-4 gap-4">
        {error && <div>Error: {error.message}</div>}
        {sortedProducts.map(product => (
  
          <div key={product.sku_esi} className="p-4 rounded-lg cursor-pointer">
            <Link key={product.key} to={`/labgrowndiamond/${product.key}`}><img src={JSON.parse(product.images)[0].url_thumbnail} alt={product.label} className="w-full h-auto" /></Link>
            <div className="mt-4">
              <h1 className='hover:text-[#782374] text-lg font-medium'>{product.label}</h1>
              <h1 className='text-[#782374] text-lg font-semibold'>₹{product.price}</h1>
              
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
export default Labgrowndiamond;
