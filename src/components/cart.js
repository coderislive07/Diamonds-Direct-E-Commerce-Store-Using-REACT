import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { ADD, DLT } from '../redux/actions/actions';
import { app } from '../firebase';

const db = getDatabase(app);

const getLocalCartData = () => {
  if (localStorage.getItem('myCart')) {
    return JSON.parse(localStorage.getItem('myCart'));
  } else {
    return [];
  }
}

const removeCartData = () => {
  localStorage.removeItem('myCart');
}

const getLocalQuantities = () => {
  if (localStorage.getItem('individualquantities')) {
    return JSON.parse(localStorage.getItem('individualquantities'));
  } else {
    return [];
  }
};

export { getLocalCartData }
export { removeCartData }
export { getLocalQuantities }

const Cart = () => {
  const cartItemsRedux = useSelector((state) => state.Cartreducer.carts);
  const [cartdata, setCartData] = useState(cartItemsRedux);
  const [quantities, setQuantities] = useState(() => {
    const localQuantities = getLocalQuantities();
    return localQuantities.length > 0 ? localQuantities : Array(cartItemsRedux.length).fill(1);
  });
  

  const sumquantities = quantities.reduce((accumulator, currentItem) => {
    return accumulator + currentItem;
  }, 0);

  const [subtotal, setSubtotal] = useState(0);
  const [cartItemsLength, setCartItemsLength] = useState(cartItemsRedux.length);

  useEffect(() => {
    const fetchData = async () => {
      const cartDataRef = ref(db, 'users/cart');
      const cartDataSnapshot = await get(cartDataRef);
      const cartDataVal = cartDataSnapshot.val();
      if (cartDataVal && cartDataVal.cartItems) {
        setCartItemsLength(cartDataVal.cartItems.length);
        setCartData(cartDataVal.cartItems);
        const localQuantities = getLocalQuantities();
        setQuantities(localQuantities.length > 0 ? localQuantities : Array(cartDataVal.cartItems.length).fill(1));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    putData();
    localStorage.setItem('myCart', JSON.stringify(cartdata));
    localStorage.setItem('individualquantities', JSON.stringify(quantities));
    localStorage.setItem('quantities', JSON.stringify(sumquantities));
  }, [cartdata, quantities]);

  useEffect(() => {
    let total = 0;
    if (cartdata.length > 0 && quantities.length > 0) {
      cartdata.forEach((item, index) => {
        const price = parseFloat(item.price.replace(/,/g, ''));
        total += price * quantities[index];
      });
    }
    setSubtotal(total);
  }, [cartdata, quantities]);

  const dispatch = useDispatch();

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

  const dlt = (index) => {
    dispatch(DLT(index));

    const newCartData = cartdata.filter((_, i) => i !== index);
    setCartData(newCartData);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
    setCartItemsLength(newCartData.length);

    localStorage.setItem('myCart', JSON.stringify(newCartData));
    localStorage.setItem('individualquantities', JSON.stringify(newQuantities));
    localStorage.setItem('quantities', JSON.stringify(newQuantities.reduce((acc, curr) => acc + curr, 0)));

    putData();
  };

  const putData = () => {
    set(ref(db, 'users/cart'), {
      cartItems: cartdata,
      quantities,
    });
  };

  return (
    <div className='w-full h-auto pb-10'>
    <h1 className='flex justify-end text-xl p-2 font-serif cursor-pointer border border-transparent bg-[#746274] text-white' style={{ marginTop: '210px', marginLeft: '1200px', width: '250px' }}>💎Passion Of Diamonds</h1>
    <hr style={{ marginRight: '70px', marginLeft: '200px', borderColor: '#782374', borderStyle: 'solid' }} />

    <div className='flex justify-center'>
      <h1 className='text-4xl my-10 font-medium'>Your Cart ({sumquantities}) item</h1>
    </div>
    <div className='Method mx-20'>
      <label htmlFor="Method">Method :</label>
      <select id="Method" className='border p-2 mx-2 w-96'>
        <option value="volvo">SHIP TO HOME</option>
        <option value="volvo">PICKUP IN STORE</option>
      </select>
    </div>
    <div className='product'>
      <div className='headings flex justify-center gap-x-96' style={{ marginTop: '40px' }}>
        <h1 className='text-lg font-medium'>Product</h1>
        <h1 className='text-lg font-medium'>Price</h1>
        <h1 className='text-lg font-medium'>Quantity</h1>
        <h1 className='text-lg font-medium'>Total</h1>
      </div>
      <hr className='mx-10 my-5'></hr>
      <div className='products relative'>
        {cartdata.map((item, index) => {
          const images = JSON.parse(item.images);
          const price = parseFloat(item.price.replace(/,/g, ''));
          const total = price * quantities[index];
          return (
            <div className='flex cartdata justify-center my-10 gap-96' key={item.key}>
              <div className='flex gap-10' style={{ marginLeft: '20px' }}>
                <img src={images[0].url_thumbnail} alt='product' className='w-20 h-20' />
                <div className='flex flex-col'>
                  <h1 className='font-medium'>{item.label}</h1>
                </div>
              </div>
              <h1 style={{ marginRight: '70px' }} className='font-medium'>₹{price}</h1>
              <div className="flex items-center border w-20 h-10 p-2">
                <button onClick={() => decreaseQuantity(index)}>-</button>
                <h1 className='font-medium mx-2'>{quantities[index]}</h1>
                <button onClick={() => increaseQuantity(index)}>+</button>
              </div>
              <div className='flex'>
                <h1 className='font-medium' style={{ marginRight: '40px', marginLeft: '-90px' }}>₹{total}</h1>
                <svg onClick={() => { dlt(index) }} style={{ cursor: 'pointer', marginRight: '20px' }} className="w-4 h-4 hover:bg-[#746274] hover:rounded-full hover:text-white  text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
              </div>
            </div>
          )
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
          <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
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
        <form action="/create-checkout-session" method="POST">
          <button type='submit' className='bg-transparent w-11/12 text-[#4e4351] font-serif text-xl py-3 px-20 border border-[#4e4351] hover:bg-[#4e4351] hover:border-[#4e4351] hover:text-white'>CHECKOUT</button>
        </form>
        <hr></hr>
      </div>
    </div>
  </div>
);
}


export default Cart;
