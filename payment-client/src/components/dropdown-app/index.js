import React, { useState, useEffect, useRef } from 'react';
import listenForOutsideClick from './listen';
import { useMainContext } from 'context/main';
import { Divider } from 'antd';

function Dropdown({ value }) {
  const { user, func } = useMainContext();

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  return (
    <div className="group relative" ref={menuRef}>
      <div className="cursor-pointer font-normal" onClick={toggle}>
        {value}
      </div>
      {isOpen ? (
        <div
          className={`z-[999] w-[300px] bg-white text-[13px] border-gray-800 rounded-[4px] absolute sm:right-0 right-none top-[90%] transition-all translate-y-2 shadow-[0_0px_50px_rgba(141,141,141,0.35)]`}>
          <div className="py-[9px] pl-5 pr-[1.6rem]">
            <div className="text-[15px] font-bold">
              <p className=" font-semibold">{`${user?.first_name ? user.first_name : ''} ${
                user?.last_name ? user.last_name : ''
              }`}</p>
            </div>

            <button
              onClick={func.logout}
              className="w-full mt-[10px] py-1 px-3 bg-green-500  rounded hover:bg-green-600">
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;
