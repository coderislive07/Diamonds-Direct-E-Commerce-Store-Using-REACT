import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Cart() {
  const cartItems = useSelector((state) => state.Cartreducer.carts);
  const [quantities, setQuantities] = useState(cartItems.map(() => 1));
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item, index) => {
      const price = parseFloat(item.price.replace(/,/g, ''));
      total += price * quantities[index];
    });
    setSubtotal(total);
  }, [cartItems, quantities]);

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setQuantities(newQuantities);
    }
  };

  return (
    <div className='w-full h-auto pb-10'>
      <h1 className='flex justify-end text-xl p-2 font-serif cursor-pointer border border-transparent bg-[#746274] text-white' style={{ marginTop: '210px', marginLeft: '1200px', width: '250px' }}>💎Passion Of Diamonds</h1>
      <hr style={{ marginRight: '70px', marginLeft: '200px', borderColor: '#782374', borderStyle: 'solid' }} />

      <div className='flex justify-center'>
        <h1 className='text-4xl my-10 font-medium'>Your Cart ({cartItems.length}) item</h1>
      </div>
      <div className='Method mx-20'>
        <label htmlFor="Method">Method :</label>

        <select id="Method" className='border p-2 mx-2 w-96'>
          <option value="volvo">SHIP TO HOME</option>
          <option value="volvo">PICKUP IN STORE</option>
        </select>
      </div>
      <div className='product'>
        <div className='headings flex justify-center gap-96' style={{ marginTop: '40px' }}>
          <h1 className='text-lg font-medium'>Product</h1>
          <h1 className='text-lg font-medium'>Price</h1>
          <h1 className='text-lg font-medium'>Quantity</h1>
          <h1 className='text-lg font-medium'>Total</h1>
        </div>
        <hr className='mx-10 my-5'></hr>
        <div className='products-data'>
          {cartItems.map((item, index) => {
            const images = JSON.parse(item.images);
            const price = parseFloat(item.price.replace(/,/g, ''));
            const total = price * quantities[index];
            return (
              <div className='flex justify-center my-10 gap-96 ' key={item.id}>
                <div className='flex gap-10'style={{marginLeft:'20px'}}>
                  <img src={images[0].url_thumbnail} alt='product' className='w-20 h-20 ' />
                  <div className='flex flex-col'>
                    <h1 className='font-medium '>{item.label}</h1>
                  </div>
                </div>
                <h1 className='font-medium '>₹{price}</h1>
                <div className="flex items-center border w-96 h-10 p-2">
                  <button onClick={() => decreaseQuantity(index)}>-</button>
                  <h1 className='font-medium mx-2'>{quantities[index]}</h1>
                  <button onClick={() => increaseQuantity(index)}>+</button>
                </div>
                <h1 className='font-medium' style={{ marginRight: '50px' }}>₹{total}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <h1 className='mx-10 text-2xl font-medium text-[#782374] my-14'>When Will I Get My Order?</h1>
      <div className='checkout flex justify-between'>
        <div className='order-days'>
          <h1 className='text-[#31282F]' ><span className='font-medium mx-10 '>Engagement Rings (Setting + Diamond)</span> <span className='text-[#6D6672]'>- 3 - 8 weeks from order date</span></h1>
          <h1 className='my-5 text-[#31282F]' ><span className='font-medium mx-10 '>Engagement Rings (Setting + Diamond)</span> <span className='text-[#6D6672]'>- 5 - 7 weeks from order date</span></h1>
          <h1 className='my-5 text-[#31282F]'><span className='font-medium mx-10'>Engagement Rings (Setting + Diamond)</span> <span className='text-[#6D6672]'>- 3 - 8 weeks from order date</span></h1>
          <h1 className='my-5 text-[#31282F]'><span className='font-medium mx-10'>Engagement Rings (Setting + Diamond)</span> <span className='text-[#6D6672]'>- 3 - 5 weeks from order date</span></h1>
          <h1 className='my-5 text-[#31282F]'><span className='font-medium mx-10'>Engagement Rings (Setting + Diamond)</span> <span className='text-[#6D6672]'>- 3 - 8 weeks from order date</span></h1>
        </div>
        <div className='mx-20 w-4/12' style={{ marginRight: '60px', marginTop: '-100px' }}>
          <div className='subtotal flex gap-20'>
            <h1 className='text-lg text-[#31282F]'>Subtotal:</h1>
            <h1 className='text-lg text-[#31282F] mx-80 '>{subtotal}</h1>
          </div>
          <hr className='my-5'></hr>
          <div className='subtotal flex justify-between my-7'>
            <h1 className='text-lg text-[#31282F]'>Coupon Code:</h1>
            <em className='text-lg text-[#782374] underline cursor-pointer '>Add Coupon</em>
          </div>
          <hr className='my-5'></hr>
          <div className='subtotal flex justify-between my-7'>
            <h1 className='text-lg text-[#31282F]'>Grand Total:</h1>
            <h1 className='text-lg text-[#31282F]'>{subtotal}</h1>
          </div>
          <button className='bg-transparent w-11/12 text-[#4e4351] font-serif text-xl py-3 px-20 border border-[#4e4351] hover:bg-[#4e4351] hover:border-[#4e4351] hover:text-white'>CHECKOUT</button>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
