// Naturaldiamond.js
import React, { useState, useEffect } from 'react';
import { data, images } from '../../assets/Pearls/naturaldiamonds/naturald';
import './Naturaldiamond.css';
import { Link } from 'react-router-dom';
import wishlist from '../../assets/wishlist.svg';
import Tippy from '@tippyjs/react';
import Footer from '../../components/footer';
import Preloader from '../../components/preloader/preloader';

export default function Naturaldiamond() {
  const [sortOrder, setSortOrder] = useState('ascending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const sortByPrice = (a, b) => {
    const priceA = parseFloat(a.price.replace(/,/g, ''));
    const priceB = parseFloat(b.price.replace(/,/g, ''));
    return sortOrder === 'ascending' ? priceA - priceB : priceB - priceA;
  };

  const sortedData = [...data].sort(sortByPrice);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className='w-full h-auto'>
      <div className='my-52'>
        <h1 className='text-black font-medium font-sans text-3xl mx-20'>Natural Diamonds</h1>
        <h1 className='mx-20 py-4 font-serif'>Select a timeless natural diamond for an engagement ring that symbolizes your lasting love.</h1>
      </div>
      <div className="flex flex-wrap justify-between mx-20" style={{ marginTop: '-168px' }}>
        <h1 className='mx-0 my-14 text-[#8D8993]'>{sortedData.length} Products</h1>
        <div className="flex items-center justify-end mb-4 w-full">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" className="ml-2" onChange={toggleSortOrder}>
            <option value="ascending">Price - Low to High</option>
            <option value="descending">Price - High to Low</option>
          </select>
        </div>
        {sortedData.map((item, index) => (
          <Link key={index}  to={`/naturaldiamond/${item.key}`} className='w-1/4 mb-10 product-card cursor-pointer' style={{ width: '25%' }}>
            <div className='product-content' style={{ width: '100%', height: '300px', position: 'relative' }}>
              <img src={images[item.key]} alt='diamond' className='absolute inset-0 w-full h-full object-cover' />
              <Tippy content="Add To My Wishlist">
                <img src={wishlist} alt='wishlist' className='absolute top-0 right-0 mt-2 mr-2 wishlist-icon' style={{ width: '30px', height: '30px' }} />
              </Tippy>
              <div className='product-details'>
                <h1 className='text-black product-label'>{item.label}</h1>
                <h1 className='text-[#782374] product-price'>₹{item.price}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
