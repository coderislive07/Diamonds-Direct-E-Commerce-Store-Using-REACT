import React, { useState } from 'react';
import { data } from '../../assets/Pearls/naturaldiamonds/naturald';
import './Naturaldiamond.css';
import { images } from '../../assets/Pearls/naturaldiamonds/naturald';
import wishlist from '../../assets/wishlist.svg';
import Tippy from '@tippyjs/react';
import Footer from '../../components/footer'

export default function Naturaldiamond() {
  const [sortOrder, setSortOrder] = useState('ascending'); // State to manage sorting order

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const sortByPrice = (a, b) => {
    const priceA = parseFloat(a.price.replace(/,/g, ''));
    const priceB = parseFloat(b.price.replace(/,/g, ''));

    if (sortOrder === 'ascending') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  };

  const sortedData = [...data].sort(sortByPrice);

  console.log('Sort Order:', sortOrder);
  console.log('Sorted Data:', sortedData);

  return (
    <div className='w-full h-auto'>
      <div className='my-52'>
        <h1 className='text-black font-medium font-sans text-3xl mx-20'>Natural Diamonds</h1>
        <h1 className='mx-20 py-4 font-serif'>Select a timeless natural diamond for an engagement ring that symbolizes your lasting love.</h1>
      </div>
      <div>
      </div>
      <div className="flex flex-wrap justify-between mx-20" style={{ marginTop: '-168px' }}>
        <h1 className='mx-0 my-14 text-[#8D8993]'>{sortedData.length} Products</h1>
        <div className="flex items-center justify-end mb-4 w-full" style={{ marginTop: '-98px' }}>
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" className="ml-2" onChange={toggleSortOrder}>
            <option value="ascending">Price - Low to High</option>
            <option value="descending">Price - High to Low</option>
          </select>
        </div>
        {sortedData.map((item, index) => (
          <div key={index} className='w-1/4 mb-10 product-card cursor-pointer' style={{ width: '25%' }}>
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
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  
  );
}
