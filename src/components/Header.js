  import React, { useState } from 'react';
  import Tippy from '@tippyjs/react';
  import { data } from './links';
  import { diamondshopnow } from "../assets/index";
  import { location, appointment, FAQ, logo, search, wishlist, account, cart } from '../assets/index';
  import './Header.css';

  export default function Header() {
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (itemKey) => {
      setHoveredItem(itemKey);
    };

    const handleMouseLeave = () => {
      setHoveredItem(null);
    };

    return (
      <div className='w-full bg-white sticky top-0 z-50'>
        <div className='max-w-screen-lg my-5 mx-7 h-full flex items-center justify-start'>
          <Tippy content="Location"><img className='w-8 mx-4 cursor-pointer icon-container' src={location} alt="Location" /></Tippy>
          <Tippy content="Request An Appointment"><img className='w-8 mx-4 cursor-pointer icon-container ' src={appointment} alt="Appointment" /></Tippy>
          <Tippy content="FAQ"><img className='w-8 mx-4 cursor-pointer icon-container ' src={FAQ} alt="FAQ" /></Tippy>
          <img className='w-1/4 mx-96 cursor-pointer' src={logo} alt="Logo" />
          <Tippy content="Search"><img className='w-8 mx-5 cursor-pointer icon-container ' src={search} alt="Search" /></Tippy>
          <Tippy content="Wishlist"><img className='w-8 mx-5 cursor-pointer icon-container ' src={wishlist} alt="Wishlist" /></Tippy>
          <Tippy content="Sign In"><img className='w-8 h-10 mx-5 cursor-pointer icon-container ' src={account} alt="Account" /></Tippy>
          <Tippy content="Cart"><img className='w-8 mx-5 cursor-pointer icon-container ' src={cart} alt="Cart" title='Cart' /></Tippy>
        </div>
        <div className='flex mx-36 my-8 font-sans font-medium px-4 cursor-pointer'>
          {data.map((item) => (
            <div
              key={item.key}
              index={item.index}
              margins={item.margins}
              className='mx-7 nav relative'
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={handleMouseLeave}
            >
              {item.label}
              {hoveredItem === item.key && item.children && (
                <div className="absolute top-full border border-x-gray-400 bg-white px-2 font-light text-black  shadow-md " style={{marginLeft:[item.margins], marginTop: '6px', width: '1420px', paddingBottom: '30px', paddingTop: '0px' }}>
                  <div className='flex'>
                    <div className='children'>
                      {item.children.map((childItem) => (
                        <div key={childItem.key}>
                          <h3 className="text-sm font-medium font-sans mb-2 px-8" style={{ marginTop: '30px' }}>{childItem.label}</h3>
                          <ul className='text-black px-8'>
                            {childItem.links.map((link) => (
                              <li key={link.label} className='py-1 hover:text-[#782374]'>
                                <a href={link.url}>{link.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className='Children1'>
                      {item.Children1 && item.Children1.map((childItem) => (
                        <div key={childItem.key}>
                          <h3 className="text-sm font-medium font-sans mb-2 px-8" style={{ marginTop: '30px' }}>{childItem.label}</h3>
                          <ul className='text-black px-8'>
                            {childItem.links.map((link) => (
                              <li key={link.label} className='py-1 hover:text-[#782374]'>
                                <a href={link.url}>{link.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className='Children2'>
                      {item.Children2 && item.Children2.map((childItem) => (
                        <div key={childItem.key}>
                          <h3 className="text-sm font-medium font-sans mb-2 px-8" style={{ marginTop: '30px' }}>{childItem.label}</h3>
                          <ul className='text-black px-8'>
                            {childItem.links.map((link) => (
                              <li key={link.label} className='py-1 hover:text-[#782374]'>
                                <a href={link.url}>{link.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className='Children3'>
                      {item.Children3 && item.Children3.map((childItem) => (
                        <div key={childItem.key}>
                          <h3 className="text-sm font-medium font-sans mb-2 px-8" style={{ marginTop: '30px' }}>{childItem.label}</h3>
                          <ul className='text-black px-8'>
                            {childItem.links.map((link) => (
                              <li key={link.label} className='py-1 hover:text-[#782374]'>
                                <a href={link.url}>{link.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className='Children4'>
  {item.Children4 && item.Children4.map((childItem) => (
    <div key={childItem.key}>
      <img className="text-sm font-medium font-sans mb-2 px-8" style={{ marginTop: '30px' }} src={childItem.label[childItem.key]} alt={childItem.key} />
      <ul className='text-black px-8'>
        {/* You can add list items or other content here if needed */}
      </ul>
    </div>
  ))}
</div>


                    <div className='Children5'>
                      {item.Children5 && item.Children5.map((childItem) => (
                        <div key={childItem.key}>
                          <h3 className="text-sm font-medium font-sans mb-2 px-8" style={{ marginTop: '30px' }}>{childItem.label}</h3>
                          <ul className='text-black px-8'>
                            {childItem.links.map((link) => (
                              <li key={link.label} className='py-1 hover:text-[#782374]'>
                                <a href={link.url}>{link.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
