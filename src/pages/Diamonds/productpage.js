import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import naturald from '../../assets/Pearls/naturaldiamonds/naturald.json';
import Labgrowndata from '../../pages/Diamonds/labgrowndata.json';
import solitaire from '../../assets/Pearls/solitaire/solitaire.json';
import halo from '../../assets/Pearls/Halo/halo.json';
import threestone from '../../assets/Pearls/threestone/threestone.json';
import twist from '../../assets/Pearls/twist/twist.json';
import diamondaccented from '../../assets/Pearls/Diamondaccented/diamondaccented.json';
import { useDispatch } from 'react-redux';
import { ADD } from '../../redux/actions/actions';
import difference1 from '../../assets/diffimg1.png';
import difference2 from '../../assets/diffimg2.png';
import Difference from '../../components/Difference';

const Productpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { pagename, id } = useParams();
  const dataMap = {
    naturald: naturald,
    labgrown: Labgrowndata,
    solitaire: solitaire,
    halo: halo,
    threestone: threestone,
    twist: twist,
    diamondaccented: diamondaccented,
  };
  const getProduct = (pagename, id) => {
    const data = dataMap[pagename];
    if (data) {
      return data[0].Data.items.find(item => item.key === id);
    }
    return null;
  };
  const product = getProduct(pagename, id);
  if (!product) {
    return <div>Product not found</div>;
  }

  const send = (e) => {
    dispatch(ADD(e));
  };
  return (
    <div className='w-full h-auto'>
      <div className='header'>
        <Header />
      </div>
      <h1 className='flex justify-end text-xl p-2 font-serif cursor-pointer border border-transparent bg-[#746274] text-white' style={{ marginTop: '210px', marginLeft: '1200px', width: '250px' }}>💎Passion Of Diamonds</h1>
      <hr style={{ marginRight: '70px', marginLeft: '200px', borderColor: '#782374', borderStyle: 'solid' }} />
      <div className='flex justify-between h-auto w-full' style={{ marginTop: '60px' }}> 
        <div className='w-full h-auto mx-20'>
          {pagename.startsWith("labgrown") ? (
            <img className='border pt-4 pb-4' src={JSON.parse(product.images)[0].url_thumbnail} alt={product.label} style={{ height: '500px', width: '750px' }} />
          ) : pagename.startsWith("engagement")? ( 
            <img className='border pt-4 pb-4' src={JSON.parse(product.images)[0].url_thumbnail} alt={product.label} style={{ height: '500px', width: '750px' }} />
          ) : pagename.startsWith("natural") ? ( 
            <img className='border pt-4 pb-4' src={JSON.parse(product.images)[0].url_thumbnail} alt={product.label} style={{ height: '500px', width: '750px' }} />
          ) : <img className='border pt-4 pb-4' src={JSON.parse(product.images)[0].url_thumbnail} alt={product.label} style={{ height: '500px', width: '750px' }} /> }
        </div>    
        <div className='w-full h-full' style={{ marginRight: '150px' }}>
          <h2 className='text-3xl'>{product.label}</h2>
          <p className='text-[#782374] my-2 text-2xl'>₹{product.price}</p>
          <div className='flex my-3'>
          <svg className='cursor-pointer fill-[#782374]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="star"><path fill="none" stroke="#782374" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.2135354,0.441329894 L12.5301907,5.09668871 C12.6437709,5.3306716 12.8673229,5.49423715 13.1274534,5.53368599 L18.3127795,6.28282419 C18.5232013,6.31151358 18.713271,6.4218659 18.8407265,6.58934431 C18.9681821,6.75682272 19.0224584,6.9675444 18.9914871,7.17465538 C18.9654336,7.34490401 18.8826605,7.50177662 18.7562018,7.62057098 L15.0006864,11.2592422 C14.8108765,11.4385657 14.7257803,11.7002187 14.7744505,11.9548706 L15.679394,17.0828999 C15.7448774,17.5054355 15.4552147,17.9019154 15.0278347,17.9747311 C14.8516089,18.001936 14.6711642,17.9738576 14.5120169,17.8944663 L9.88775575,15.4776038 C9.65675721,15.3522485 9.37670064,15.3522485 9.1457021,15.4776038 L4.49429266,17.9123029 C4.1040442,18.1096521 3.62530757,17.962958 3.41740993,17.5823254 C3.33635184,17.4288523 3.30778438,17.2536748 3.33596502,17.0828999 L4.24090849,11.9548706 C4.28467865,11.7005405 4.20030563,11.441111 4.01467262,11.2592422 L0.23200891,7.62057098 C-0.0773363034,7.31150312 -0.0773363034,6.81484985 0.23200891,6.50578199 C0.358259148,6.3905834 0.515216648,6.31324177 0.684480646,6.28282419 L5.86980673,5.53368599 C6.12870837,5.49136141 6.35105151,5.32868032 6.46706943,5.09668871 L8.78372471,0.441329894 C8.87526213,0.25256864 9.04026912,0.108236628 9.24131794,0.0410719808 C9.44236677,-0.0260926667 9.66241783,-0.0103975019 9.85155801,0.0845974179 C10.0076083,0.16259069 10.1343954,0.287540724 10.2135354,0.441329894 Z" transform="translate(2.5 3)"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg " className='cursor-pointer  fill-[#782374]'width="24" height="24" viewBox="0 0 24 24" id="star"><path fill="none" stroke="#782374" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.2135354,0.441329894 L12.5301907,5.09668871 C12.6437709,5.3306716 12.8673229,5.49423715 13.1274534,5.53368599 L18.3127795,6.28282419 C18.5232013,6.31151358 18.713271,6.4218659 18.8407265,6.58934431 C18.9681821,6.75682272 19.0224584,6.9675444 18.9914871,7.17465538 C18.9654336,7.34490401 18.8826605,7.50177662 18.7562018,7.62057098 L15.0006864,11.2592422 C14.8108765,11.4385657 14.7257803,11.7002187 14.7744505,11.9548706 L15.679394,17.0828999 C15.7448774,17.5054355 15.4552147,17.9019154 15.0278347,17.9747311 C14.8516089,18.001936 14.6711642,17.9738576 14.5120169,17.8944663 L9.88775575,15.4776038 C9.65675721,15.3522485 9.37670064,15.3522485 9.1457021,15.4776038 L4.49429266,17.9123029 C4.1040442,18.1096521 3.62530757,17.962958 3.41740993,17.5823254 C3.33635184,17.4288523 3.30778438,17.2536748 3.33596502,17.0828999 L4.24090849,11.9548706 C4.28467865,11.7005405 4.20030563,11.441111 4.01467262,11.2592422 L0.23200891,7.62057098 C-0.0773363034,7.31150312 -0.0773363034,6.81484985 0.23200891,6.50578199 C0.358259148,6.3905834 0.515216648,6.31324177 0.684480646,6.28282419 L5.86980673,5.53368599 C6.12870837,5.49136141 6.35105151,5.32868032 6.46706943,5.09668871 L8.78372471,0.441329894 C8.87526213,0.25256864 9.04026912,0.108236628 9.24131794,0.0410719808 C9.44236677,-0.0260926667 9.66241783,-0.0103975019 9.85155801,0.0845974179 C10.0076083,0.16259069 10.1343954,0.287540724 10.2135354,0.441329894 Z" transform="translate(2.5 3)"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer  fill-[#782374]'width="24" height="24" viewBox="0 0 24 24" id="star"><path fill="none" stroke="#782374" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.2135354,0.441329894 L12.5301907,5.09668871 C12.6437709,5.3306716 12.8673229,5.49423715 13.1274534,5.53368599 L18.3127795,6.28282419 C18.5232013,6.31151358 18.713271,6.4218659 18.8407265,6.58934431 C18.9681821,6.75682272 19.0224584,6.9675444 18.9914871,7.17465538 C18.9654336,7.34490401 18.8826605,7.50177662 18.7562018,7.62057098 L15.0006864,11.2592422 C14.8108765,11.4385657 14.7257803,11.7002187 14.7744505,11.9548706 L15.679394,17.0828999 C15.7448774,17.5054355 15.4552147,17.9019154 15.0278347,17.9747311 C14.8516089,18.001936 14.6711642,17.9738576 14.5120169,17.8944663 L9.88775575,15.4776038 C9.65675721,15.3522485 9.37670064,15.3522485 9.1457021,15.4776038 L4.49429266,17.9123029 C4.1040442,18.1096521 3.62530757,17.962958 3.41740993,17.5823254 C3.33635184,17.4288523 3.30778438,17.2536748 3.33596502,17.0828999 L4.24090849,11.9548706 C4.28467865,11.7005405 4.20030563,11.441111 4.01467262,11.2592422 L0.23200891,7.62057098 C-0.0773363034,7.31150312 -0.0773363034,6.81484985 0.23200891,6.50578199 C0.358259148,6.3905834 0.515216648,6.31324177 0.684480646,6.28282419 L5.86980673,5.53368599 C6.12870837,5.49136141 6.35105151,5.32868032 6.46706943,5.09668871 L8.78372471,0.441329894 C8.87526213,0.25256864 9.04026912,0.108236628 9.24131794,0.0410719808 C9.44236677,-0.0260926667 9.66241783,-0.0103975019 9.85155801,0.0845974179 C10.0076083,0.16259069 10.1343954,0.287540724 10.2135354,0.441329894 Z" transform="translate(2.5 3)"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer  fill-[#782374]' width="24" height="24" viewBox="0 0 24 24" id="star"><path fill="none" stroke="#782374" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.2135354,0.441329894 L12.5301907,5.09668871 C12.6437709,5.3306716 12.8673229,5.49423715 13.1274534,5.53368599 L18.3127795,6.28282419 C18.5232013,6.31151358 18.713271,6.4218659 18.8407265,6.58934431 C18.9681821,6.75682272 19.0224584,6.9675444 18.9914871,7.17465538 C18.9654336,7.34490401 18.8826605,7.50177662 18.7562018,7.62057098 L15.0006864,11.2592422 C14.8108765,11.4385657 14.7257803,11.7002187 14.7744505,11.9548706 L15.679394,17.0828999 C15.7448774,17.5054355 15.4552147,17.9019154 15.0278347,17.9747311 C14.8516089,18.001936 14.6711642,17.9738576 14.5120169,17.8944663 L9.88775575,15.4776038 C9.65675721,15.3522485 9.37670064,15.3522485 9.1457021,15.4776038 L4.49429266,17.9123029 C4.1040442,18.1096521 3.62530757,17.962958 3.41740993,17.5823254 C3.33635184,17.4288523 3.30778438,17.2536748 3.33596502,17.0828999 L4.24090849,11.9548706 C4.28467865,11.7005405 4.20030563,11.441111 4.01467262,11.2592422 L0.23200891,7.62057098 C-0.0773363034,7.31150312 -0.0773363034,6.81484985 0.23200891,6.50578199 C0.358259148,6.3905834 0.515216648,6.31324177 0.684480646,6.28282419 L5.86980673,5.53368599 C6.12870837,5.49136141 6.35105151,5.32868032 6.46706943,5.09668871 L8.78372471,0.441329894 C8.87526213,0.25256864 9.04026912,0.108236628 9.24131794,0.0410719808 C9.44236677,-0.0260926667 9.66241783,-0.0103975019 9.85155801,0.0845974179 C10.0076083,0.16259069 10.1343954,0.287540724 10.2135354,0.441329894 Z" transform="translate(2.5 3)"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg"className='cursor-pointer  fill-[#782374]' width="24" height="24" viewBox="0 0 24 24" id="star"><path fill="none" stroke="#782374" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.2135354,0.441329894 L12.5301907,5.09668871 C12.6437709,5.3306716 12.8673229,5.49423715 13.1274534,5.53368599 L18.3127795,6.28282419 C18.5232013,6.31151358 18.713271,6.4218659 18.8407265,6.58934431 C18.9681821,6.75682272 19.0224584,6.9675444 18.9914871,7.17465538 C18.9654336,7.34490401 18.8826605,7.50177662 18.7562018,7.62057098 L15.0006864,11.2592422 C14.8108765,11.4385657 14.7257803,11.7002187 14.7744505,11.9548706 L15.679394,17.0828999 C15.7448774,17.5054355 15.4552147,17.9019154 15.0278347,17.9747311 C14.8516089,18.001936 14.6711642,17.9738576 14.5120169,17.8944663 L9.88775575,15.4776038 C9.65675721,15.3522485 9.37670064,15.3522485 9.1457021,15.4776038 L4.49429266,17.9123029 C4.1040442,18.1096521 3.62530757,17.962958 3.41740993,17.5823254 C3.33635184,17.4288523 3.30778438,17.2536748 3.33596502,17.0828999 L4.24090849,11.9548706 C4.28467865,11.7005405 4.20030563,11.441111 4.01467262,11.2592422 L0.23200891,7.62057098 C-0.0773363034,7.31150312 -0.0773363034,6.81484985 0.23200891,6.50578199 C0.358259148,6.3905834 0.515216648,6.31324177 0.684480646,6.28282419 L5.86980673,5.53368599 C6.12870837,5.49136141 6.35105151,5.32868032 6.46706943,5.09668871 L8.78372471,0.441329894 C8.87526213,0.25256864 9.04026912,0.108236628 9.24131794,0.0410719808 C9.44236677,-0.0260926667 9.66241783,-0.0103975019 9.85155801,0.0845974179 C10.0076083,0.16259069 10.1343954,0.287540724 10.2135354,0.441329894 Z" transform="translate(2.5 3)"></path></svg>
          </div>
          <hr className='my-10 w-full'></hr>
          <div className='flex gap-6'>
         <button onClick={()=>send(product)}   className='text-[#31282f] text-xl p-2 w-80 border border-[#31282f] hover:bg-[#746274] hover:text-white transition-all'>ADD TO CART</button>
          <button className='text-[#31282f] text-xl p-2 w-12 border border-[#31282f] hover:bg-[#746274] hover:fill-white transition-all'><svg className='w-6 h-6 flex justify-center mx-1' version="1.1" xmlns="http://www.w3.org/2000/svg" width="983" height="1024" viewBox="0 0 983 1024"><title></title><g id="icomoon-ignore"></g><path fill="" d="M309.658 158.496c-108.638 0-197.018 88.503-197.018 198.246 0 133.139 61.468 239.815 138.823 319.073 77.726 79.639 169.602 129.52 224.587 148.292l0.299 0.098v0.004c2.654 0.934 8.151 1.933 15.172 1.933s12.517-0.999 15.172-1.933l0.299-0.106v0.004c54.985-18.772 146.862-68.653 224.588-148.292 77.353-79.258 138.822-185.934 138.822-319.073 0-109.744-88.379-198.246-197.018-198.246-63.988 0-121.364 31.093-157.2 79.346-5.796 7.804-14.942 12.404-24.662 12.404s-18.866-4.6-24.662-12.404c-35.856-48.278-92.833-79.346-157.2-79.346zM51.2 356.742c0-143.389 115.601-259.686 258.458-259.686 71.137 0 135.356 28.917 181.875 75.56 46.621-46.657 111.079-75.56 181.85-75.56 142.856 0 258.458 116.298 258.458 259.686 0 153.578-71.242 274.844-156.295 361.987-84.619 86.704-184.758 141.66-248.566 163.475-11.235 3.936-24.101 5.378-35.459 5.378s-24.224-1.442-35.459-5.378c-63.805-21.815-163.947-76.771-248.567-163.475-85.051-87.142-156.294-208.409-156.294-361.987z"></path></svg></button>
          <button className='text-[#31282f] text-xl p-2 w-12 border border-[#31282f] hover:bg-[#746274] hover:fill-white transition-all'><svg className='w-6 h-6 flex justify-center mx-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
         <path d="M 40 0 C 34.53125 0 30.066406 4.421875 30 9.875 L 15.90625 16.9375 C 14.25 15.71875 12.207031 15 10 15 C 4.488281 15 0 19.488281 0 25 C 0 30.511719 4.488281 35 10 35 C 12.207031 35 14.25 34.28125 15.90625 33.0625 L 30 40.125 C 30.066406 45.578125 34.53125 50 40 50 C 45.511719 50 50 45.511719 50 40 C 50 34.488281 45.511719 30 40 30 C 37.875 30 35.902344 30.675781 34.28125 31.8125 L 20.625 25 L 34.28125 18.1875 C 35.902344 19.324219 37.875 20 40 20 C 45.511719 20 50 15.511719 50 10 C 50 4.488281 45.511719 0 40 0 Z M 40 2 C 44.429688 2 48 5.570313 48 10 C 48 14.429688 44.429688 18 40 18 C 38.363281 18 36.859375 17.492188 35.59375 16.65625 C 35.46875 16.238281 35.089844 15.949219 34.65625 15.9375 C 34.652344 15.933594 34.628906 15.941406 34.625 15.9375 C 33.230469 14.675781 32.292969 12.910156 32.0625 10.9375 C 32.273438 10.585938 32.25 10.140625 32 9.8125 C 32.101563 5.472656 35.632813 2 40 2 Z M 30.21875 12 C 30.589844 13.808594 31.449219 15.4375 32.65625 16.75 L 19.8125 23.1875 C 19.472656 21.359375 18.65625 19.710938 17.46875 18.375 Z M 10 17 C 11.851563 17 13.554688 17.609375 14.90625 18.65625 C 14.917969 18.664063 14.925781 18.679688 14.9375 18.6875 C 14.945313 18.707031 14.957031 18.730469 14.96875 18.75 C 15.054688 18.855469 15.160156 18.9375 15.28125 19 C 15.285156 19.003906 15.308594 18.996094 15.3125 19 C 16.808594 20.328125 17.796875 22.222656 17.96875 24.34375 C 17.855469 24.617188 17.867188 24.925781 18 25.1875 C 17.980469 25.269531 17.96875 25.351563 17.96875 25.4375 C 17.847656 27.65625 16.839844 29.628906 15.28125 31 C 15.1875 31.058594 15.101563 31.132813 15.03125 31.21875 C 13.65625 32.332031 11.914063 33 10 33 C 5.570313 33 2 29.429688 2 25 C 2 20.570313 5.570313 17 10 17 Z M 19.8125 26.8125 L 32.65625 33.25 C 31.449219 34.5625 30.589844 36.191406 30.21875 38 L 17.46875 31.625 C 18.65625 30.289063 19.472656 28.640625 19.8125 26.8125 Z M 40 32 C 44.429688 32 48 35.570313 48 40 C 48 44.429688 44.429688 48 40 48 C 35.570313 48 32 44.429688 32 40 C 32 37.59375 33.046875 35.433594 34.71875 33.96875 C 34.742188 33.949219 34.761719 33.929688 34.78125 33.90625 C 34.785156 33.902344 34.808594 33.910156 34.8125 33.90625 C 34.972656 33.839844 35.113281 33.730469 35.21875 33.59375 C 36.554688 32.597656 38.199219 32 40 32 Z"></path>
         </svg></button>
          </div>
          <hr className='my-10 w-full'></hr>
          <div className="learn-more flex my-2  p-4 border rounded-xl border-[#6a6769]">
            <div className='my-6 mx-2'  >
             <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><title></title><g id="icomoon-ignore"></g><path fill="#782374" d="M69.536 69.553c-21.831 21.831-33.462 57.626-33.462 115.25v142.429c0 57.623 11.632 93.419 33.462 115.251 21.831 21.83 57.626 33.462 115.25 33.462h142.43c57.623 0 93.419-11.632 115.249-33.462 21.832-21.832 33.464-57.628 33.464-115.251v-142.429c0-82.132-66.584-148.713-148.715-148.713h-142.428c-57.624 0-93.42 11.632-115.251 33.462zM44.852 44.868c31.581-31.581 78.868-43.687 139.935-43.687h142.428c101.413 0 183.624 82.21 183.624 183.622v142.429c0 61.067-12.109 108.353-43.688 139.935-31.581 31.581-78.869 43.688-139.935 43.688h-142.43c-61.067 0-108.355-12.106-139.935-43.688s-43.687-78.866-43.687-139.935v-142.429c0-61.067 12.107-108.355 43.687-139.935zM263.277 98.932c9.642 0 17.454 7.814 17.454 17.454v21.25h8.32c37.683 0 68.771 29.796 68.771 67.564 0 9.64-7.813 17.454-17.454 17.454-9.639 0-17.454-7.815-17.454-17.454 0-17.718-14.68-32.655-33.862-32.655h-8.32v70.061l34.591 11.18c10.24 3.377 21.541 8.479 29.987 18.502 8.755 10.392 12.514 23.699 12.514 39.582 0 34.166-28.372 61.112-62.299 61.112h-14.792v13.368c0 9.639-7.813 17.454-17.454 17.454-9.639 0-17.454-7.815-17.454-17.454v-13.368h-8.317c-37.684 0-68.772-29.796-68.772-67.565 0-9.639 7.815-17.454 17.454-17.454s17.454 7.815 17.454 17.454c0 17.72 14.68 32.656 33.863 32.656h8.317v-70.063l-34.589-11.18c-10.239-3.377-21.54-8.476-29.987-18.502-8.755-10.391-12.515-23.698-12.515-39.581 0-34.167 28.372-61.112 62.299-61.112h14.791v-21.25c0-9.64 7.815-17.454 17.455-17.454zM245.823 172.546h-14.791c-15.541 0-27.39 12.197-27.39 26.203 0 10.355 2.365 14.79 4.302 17.088 2.24 2.658 6.184 5.187 14.174 7.827 0.016 0.005 0.032 0.011 0.048 0.016l23.656 7.646v-58.779zM280.732 279.293v58.78h14.792c15.541 0 27.389-12.197 27.389-26.203 0-10.356-2.365-14.79-4.301-17.089-2.239-2.658-6.183-5.185-14.175-7.827-0.014-0.005-0.031-0.010-0.046-0.017l-23.659-7.645z"></path></svg> 
             </div>
             <div className='mx-1'>
             <h1>Flexible Payment Options:<em>*subject to approval</em></h1>
            <h1 className='my-2  font-normal text-[#782374]'>💎Special financing options with Wells Fargo. <a className='text-[#782374]' href="#">Learn more</a></h1>
            </div> 
          </div>  
          <div className='mx-6 flex gap-32 my-8 w-full'>
            <div className='riskfree'>
              <div className='flex'>
              <img className='w-14 h-14' src={difference1}></img>
              <h1 className='font-semibold'>RISK FREE SHOPPING</h1>
              </div>
              <h1 className='mx-10'>30-day returns</h1>
              </div>
            <div className='warranty'>
              <div className='flex'>
              <img className='w-14 h-14' src={difference2}></img>
              <h1 className='font-semibold'>LIFETIME WARRANTY</h1>
              </div>
              <h1 className='mx-10'>Complimentary repairs & care</h1>
              </div>
            <div className='freeshopping w-full'style={{marginLeft:'-100px'}}>
              <div className='flex'>
              <svg className='top-10'  width="32" height="32" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4767 13.186H0.732558C0.332093 13.186 0 12.854 0 12.4535V4.63953C0 2.08047 2.08047 0 4.63953 0H13.4302C13.8307 0 14.1628 0.332093 14.1628 0.732558V10.5C14.1628 11.9847 12.9614 13.186 11.4767 13.186ZM1.46512 11.7209H11.4767C12.1507 11.7209 12.6977 11.174 12.6977 10.5V1.46512H4.63953C2.89116 1.46512 1.46512 2.89116 1.46512 4.63953V11.7209Z" fill="#782374"></path><path d="M17.3372 19.0465H16.3605C15.96 19.0465 15.6279 18.7144 15.6279 18.3139C15.6279 17.6399 15.0809 17.093 14.407 17.093C13.733 17.093 13.186 17.6399 13.186 18.3139C13.186 18.7144 12.854 19.0465 12.4535 19.0465H8.54651C8.14605 19.0465 7.81395 18.7144 7.81395 18.3139C7.81395 17.6399 7.26698 17.093 6.59302 17.093C5.91907 17.093 5.37209 17.6399 5.37209 18.3139C5.37209 18.7144 5.04 19.0465 4.63953 19.0465H3.66279C1.64093 19.0465 0 17.4055 0 15.3837V12.4534C0 12.053 0.332093 11.7209 0.732558 11.7209H11.4767C12.1507 11.7209 12.6977 11.1739 12.6977 10.4999V3.66273C12.6977 3.26227 13.0298 2.93018 13.4302 2.93018H15.2274C16.1944 2.93018 17.0833 3.44786 17.5619 4.28786L19.2321 7.20832C19.3591 7.43297 19.3591 7.71623 19.2321 7.94088C19.1051 8.16553 18.8609 8.30227 18.5972 8.30227H17.3372C17.2005 8.30227 17.093 8.40971 17.093 8.54645V11.4767C17.093 11.6134 17.2005 11.7209 17.3372 11.7209H20.2674C20.6679 11.7209 21 12.053 21 12.4534V15.3837C21 17.4055 19.3591 19.0465 17.3372 19.0465ZM16.9953 17.5813H17.3372C18.5484 17.5813 19.5349 16.5948 19.5349 15.3837V13.186H17.3372C16.3995 13.186 15.6279 12.4144 15.6279 11.4767V8.54645C15.6279 7.60878 16.3898 6.83715 17.3372 6.83715L16.2921 5.01065C16.0772 4.62972 15.667 4.39529 15.2274 4.39529H14.1628V10.4999C14.1628 11.9846 12.9614 13.186 11.4767 13.186H1.46512V15.3837C1.46512 16.5948 2.45163 17.5813 3.66279 17.5813H4.00466C4.32698 16.4581 5.36233 15.6279 6.59302 15.6279C7.82372 15.6279 8.85906 16.4581 9.18139 17.5813H11.8284C12.1507 16.4581 13.1861 15.6279 14.4168 15.6279C15.6475 15.6279 16.673 16.4581 16.9953 17.5813Z" fill="#782374"></path><path d="M6.59303 21C5.10838 21 3.90698 19.7986 3.90698 18.314C3.90698 16.8293 5.10838 15.6279 6.59303 15.6279C8.07768 15.6279 9.27908 16.8293 9.27908 18.314C9.27908 19.7986 8.07768 21 6.59303 21ZM6.59303 17.093C5.91908 17.093 5.3721 17.64 5.3721 18.314C5.3721 18.9879 5.91908 19.5349 6.59303 19.5349C7.26698 19.5349 7.81396 18.9879 7.81396 18.314C7.81396 17.64 7.26698 17.093 6.59303 17.093Z" fill="#782374"></path><path d="M14.407 21C12.9223 21 11.7209 19.7986 11.7209 18.314C11.7209 16.8293 12.9223 15.6279 14.407 15.6279C15.8916 15.6279 17.093 16.8293 17.093 18.314C17.093 19.7986 15.8916 21 14.407 21ZM14.407 17.093C13.733 17.093 13.1861 17.64 13.1861 18.314C13.1861 18.9879 13.733 19.5349 14.407 19.5349C15.0809 19.5349 15.6279 18.9879 15.6279 18.314C15.6279 17.64 15.0809 17.093 14.407 17.093Z" fill="#782374"></path><path d="M20.2675 13.1862H17.3372C16.3996 13.1862 15.6279 12.4146 15.6279 11.4769V8.5467C15.6279 7.60903 16.3996 6.8374 17.3372 6.8374H18.5972C18.861 6.8374 19.1051 6.97415 19.2321 7.20857L20.9023 10.1388C20.9609 10.2462 21 10.3732 21 10.5002V12.4537C21 12.8541 20.6679 13.1862 20.2675 13.1862ZM17.3372 8.30252C17.2005 8.30252 17.093 8.40996 17.093 8.5467V11.4769C17.093 11.6137 17.2005 11.7211 17.3372 11.7211H19.5349V10.6956L18.1675 8.30252H17.3372Z" fill="#782374==="></path></svg>
              <h1 className='font-semibold mx-2 '>FREE SHOPPING</h1>
              </div>
              <h1 className='mx-8'>On every order</h1>
              </div>
            </div>
      </div>
        </div>
      <Difference/>
      <ToastContainer />
    </div>
    
  );
};

export default Productpage;
