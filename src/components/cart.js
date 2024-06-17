  import React, { useState, useEffect } from 'react';
  import { getDatabase, ref, set, get } from 'firebase/database';
  import { useSelector, useDispatch } from 'react-redux';
  import { DLT, updateQuantities, updateCartItems } from '../redux/actions/actions';
  import { app } from '../firebase';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {loadStripe} from '@stripe/stripe-js';
  
  const auth = getAuth(app);
  const db = getDatabase(app);

  const Cart = ({onAccountIconClick}) => {
    const cartItems = useSelector((state) => state.Cartreducer.carts);
    console.log(cartItems)
    const quantities = useSelector((state) => state.Cartreducer.quantities);
    const dispatch = useDispatch();
 const [localQuantities, setLocalQuantities] = useState(() => {
  const storedQuantities = JSON.parse(localStorage.getItem('MyCartQuantity')) || [];
  return storedQuantities.length === cartItems.length ? storedQuantities : quantities; // Use quantities from Redux if localStorage doesn't match
});

    const [subtotal, setSubtotal] = useState(0);
    const [blurStates, setBlurStates] = useState(() => Array(cartItems.length).fill(false));
    const [user, setUser] = useState(null);
    const updateLocalStorage = (cartItems, localQuantities) => {
      localStorage.setItem('MyCart', JSON.stringify(cartItems));
      localStorage.setItem('MyCartQuantity', JSON.stringify(localQuantities));
    };
    useEffect(() => {
      const storedCartItems = JSON.parse(localStorage.getItem('MyCart')) || [];
      const storedQuantities = JSON.parse(localStorage.getItem('MyCartQuantity')) || [];
      if (storedCartItems.length === 0 || storedQuantities.length === 0) {
        const cartRef = ref(db, 'users/cart');
        get(cartRef).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            dispatch(updateCartItems(data.cartItems || []));
            dispatch(updateQuantities(data.quantities || []));
            setLocalQuantities(data.quantities || []);
            
            // Update localStorage with fetched data
            localStorage.setItem('MyCart', JSON.stringify(data.cartItems || []));
            localStorage.setItem('MyCartQuantity', JSON.stringify(data.quantities || []));
          }
        }).catch((error) => {
          console.error('Error fetching cart data from Firebase: ', error);
        });
      } else {
        // Use localStorage data if available
        dispatch(updateCartItems(storedCartItems));
        dispatch(updateQuantities(storedQuantities));
        setLocalQuantities(storedQuantities);
      }
    }, [dispatch]);
  
    
    const putData = (quantities = localQuantities, cartItemsData = cartItems) => {
      set(ref(db, 'users/cart'), {
        cartItems: cartItemsData,
        quantities,
      });
    };
    useEffect(() => {
      let total = 0;
      cartItems.forEach((item, index) => {
        const price = parseFloat(item.price.replace(/,/g, ''));
        total += price * localQuantities[index];
      });
      setSubtotal(total);
    }, [cartItems, localQuantities]);

    useEffect(() => {
      if (cartItems.length > 0 && localQuantities.length > 0) {
        putData(localQuantities, cartItems);
        updateLocalStorage(cartItems, localQuantities);
      }
    }, [cartItems, localQuantities]);
    const increaseQuantity = (index) => {
      if (blurStates[index]) {
        return;
      }
      setBlurStates((prev) => {
        const newBlurStates = [...prev];
        newBlurStates[index] = true;
        return newBlurStates;
      });
      const newQuantities = [...localQuantities];
      newQuantities[index]++;
      setLocalQuantities(newQuantities);
      dispatch(updateQuantities(newQuantities));
      putData(newQuantities);

      setTimeout(() => {
        setBlurStates((prev) => {
          const newBlurStates = [...prev];
          newBlurStates[index] = false;
          return newBlurStates;
        });
      }, 1000);
    };

    const decreaseQuantity = (index) => {
      if (blurStates[index]) {
        return;
      }
      if (localQuantities[index] > 1) {
        setBlurStates((prev) => {
          const newBlurStates = [...prev];
          newBlurStates[index] = true;
          return newBlurStates;
        });

        const newQuantities = [...localQuantities];
        newQuantities[index]--;
        setLocalQuantities(newQuantities);
        dispatch(updateQuantities(newQuantities));
        putData(newQuantities);

        setTimeout(() => {
          setBlurStates((prev) => {
            const newBlurStates = [...prev];
            newBlurStates[index] = false;
            return newBlurStates;
          });
        }, 1000);
      }
    };
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } 
      });
      return () => unsubscribe();
    }, []);
    const handleCheckout=async()=>
    {
      if(user)
        {
          const stripe = await loadStripe('pk_test_51PChnDSCqp5pfCQ2pW2KWdjkINlTtJrZTzVbHFoGGZk6lSUQGVNsUl7pRwJ1AT8pO1E7tgNpgWdrgalknXkJXxF800j3VgWeMM');
          const body=
          {
            cartItems:cartItems,
            quantities:localQuantities,
            subtotal:subtotal
          }
          const response=await fetch('http://localhost:3000/checkout',
          {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(body)
          });
          const session=await response.json();
          const result=stripe.redirectToCheckout(
            {
              sessionId:session.id
            }
          )
          if(result.error)
          {
            console.log(result.error.message);
          }

        }
        else
        {
          onAccountIconClick()
        }
    }
    const dlt = (index) => {
      const itemKey = cartItems[index].key;
      dispatch(DLT(itemKey));
      const newQuantities = [...localQuantities];
      newQuantities.splice(index, 1);
      setLocalQuantities(newQuantities);
      const newCartData = [...cartItems];
      newCartData.splice(index, 1);
      dispatch(updateQuantities(newQuantities));
      dispatch(updateCartItems(newCartData));
      set(ref(db, 'users/cart'), {
        cartItems: newCartData,
        quantities: newQuantities,
      }).then(() => {
        console.log('Item deleted successfully from Firebase');
    
        updateLocalStorage(newCartData, newQuantities);
      }).catch((error) => {
        console.error('Error deleting item from Firebase: ', error);
      });
    };
    
    return (
      <div className='w-full h-auto pb-10'>
        <ToastContainer />
        <h1 className='flex justify-end text-xl p-2 font-serif cursor-pointer border border-transparent bg-[#746274] text-white' style={{ marginTop: '210px', marginLeft: '1200px', width: '250px' }}>💎Passion Of Diamonds</h1>
        <hr style={{ marginRight: '70px', marginLeft: '200px', borderColor: '#782374', borderStyle: 'solid' }} />
        <div className='flex justify-center'>
          <h1 className='text-4xl my-10 font-medium'>
            Your Cart ({quantities.reduce((accumulator, currentVal) => accumulator + currentVal, 0)}) items
          </h1>
        </div>
        <div className='Method mx-20'>
          <label htmlFor="Method">Method :</label>
          <select id="Method" className='border p-2 mx-2 w-96'>
            <option value="volvo">SHIP TO HOME</option>
            <option value="volvo">PICKUP IN STORE</option>
          </select>
        </div>
        <div className='product '>
          <div className='headings  flex justify-center gap-x-96' style={{ marginTop: '40px' }}>
            <h1 className='text-lg font-medium'>Product</h1>
            <h1 className='text-lg  font-medium'>Price</h1>
            <h1 style={{marginRight:'-85px'}} className='text-lg  font-medium'>Quantity </h1>
            <h1 style={{marginRight:'-15px'}}  className='text-lg font-medium'> <h1 className='text-lg font-medium' style={{ marginRight: '-120px' }}>
    Total ({quantities.reduce((accumulator, currentVal) => accumulator + currentVal, 0)} {quantities.reduce((accumulator, currentVal) => accumulator + currentVal, 0) !== 1 ? "Items" : "Item"}):
  </h1>
  </h1>
          </div>
          <hr className='mx-10 my-5'></hr>
          <div className='products-data'>
    {cartItems.map((item, index) => {
      const images = JSON.parse(item.images);
      const price = parseFloat(item.price.replace(/,/g, ''));
      const total = price * quantities[index];
      return (
        <div className={` my-10 flex mx-2 justify-around ${blurStates[index] ? 'blur-[1px]' : ''}`} key={item.key} style={{ transition: 'filter 0.5s' }}>
          <div style={{marginLeft:'-150px'}} className='flex gap-x-5 '>
            <img src={images[0].url_thumbnail} alt='product' className='w-20 h-20 ' />
            <div className='flex flex-col max-w-44'>
              <h1 className='font-medium'>{item.label}</h1>
              <h1 className='text-sm text-gray-500'>SKU: {item.sku_esi}</h1>
            </div>
          </div>
          <h1 className='font-medium '>₹{price}</h1>
          <div style={{marginLeft:'50px'}} className="flex items-center border w-16 h-10 p-2">
            <button onClick={() => decreaseQuantity(index)}>-</button>
            <h1 className='font-medium mx-2'>{localQuantities[index]}</h1>
            <button onClick={() => increaseQuantity(index)}>+</button>
          </div>
          <div style={{marginRight:'-150px'}} className='flex gap-x-10'>
          <h1 className='font-medium'>₹{total}</h1>
          <svg onClick={() => { dlt(index) }} style={{ cursor: 'pointer' }} className="w-4 h-4 hover:bg-[#746274] hover:rounded-full hover:text-white  text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
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
            <button onClick={handleCheckout} className='bg-transparent w-11/12 text-[#4e4351] font-serif text-xl py-3 px-20 border border-[#4e4351] hover:bg-[#4e4351] hover:border-[#4e4351] hover:text-white'>CHECKOUT</button>
            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
  export default Cart;