import React from 'react';
import { FAQ, account, appointment, cart, location, logo, search, wishlist } from '../assets/index';
import { data } from './links'; // Importing data from links.js
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Header.css';



export default function Header() {
  return (
    <div className='w-full h-20 bg-white'>
      <div className='max-w-screen-lg my-3 mx-7 h-full flex items-center justify-start '>
      <Tippy content="Location"><img className='w-8 mx-4 cursor-pointer icon-container'  src={location} alt="Location"/></Tippy>
      <Tippy content="Request An Appointment"><img className='w-8 mx-4 cursor-pointer icon-container ' src={appointment} alt="Appointment"/></Tippy>
      <Tippy content="FAQ"><img className='w-8 mx-4 cursor-pointer icon-container ' src={FAQ} alt="FAQ"/></Tippy> 
        <img className='w-1/4 mx-96 cursor-pointer  ' src={logo} alt="Logo"/> 
        <Tippy content="Search"><img className='w-8 mx-5 cursor-pointer icon-container ' src={search} alt="Search" /></Tippy>
        <Tippy content="Wishlist"><img className='w-8 mx-5 cursor-pointer icon-container ' src={wishlist} alt="Wishlist"/></Tippy>
        <Tippy content="Sign In"><img className='w-8 h-10 mx-5 cursor-pointer icon-container ' src={account} alt="Account"/></Tippy>
        <Tippy content="Cart"><img className='w-8 mx-5 cursor-pointer icon-container ' src={cart} alt="Cart"title='Cart'/></Tippy>
      </div>
      <div className='flex mx-36 font-sans font-medium px-4 cursor-pointer '>
        {data.map((item) => (
          <div key={item.key} className='mx-7 nav relative '>{item.label}</div>
        ))}

    </div>
    </div>
  );
}
