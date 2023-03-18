import React, { useState, useEffect, useRef } from "react";
import listenForOutsideClick from "./listen";
import { useMainContext } from "context/main";
import { defaultColor } from "components/colors";
// import Button from "elements/Button";
import { Progress, Divider } from "antd";

function Dropdown({ data, value, workspace, limits }) {
  const { user, func } = useMainContext();

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  // const initValue = value ? value : data[0];
  const onclickFuntion = (value, bgColor) => {
    toggle();
    func.change_workspace(value, bgColor);
  };

  return (
    <div className="group relative" ref={menuRef}>
      <div className="cursor-pointer font-normal" onClick={toggle}>
        {value}
      </div>
      {isOpen ? (
        <div
          className={`z-[999] w-[300px] bg-white text-[13px] border-gray-800 rounded-[4px] absolute sm:right-0 right-none top-full transition-all translate-y-2 shadow-[0_0px_50px_rgba(141,141,141,0.35)]`}
        >
          <ul>
            {data.map((i, idx) => {
              return (
                i.show === true && (
                  <li
                    className="last:mt-2 first:mt-2"
                    key={Math.random() + idx}
                    onClick={i.action}
                  >
                    <a
                      href={i.value && i.value}
                      className={`${
                        i.last && "border-t border-[#E2E2E2]"
                      } flex justify-start items-center  px-5 py-3 hover:bg-[#CADFFF] text-[#525252] text-[16px] leading-[22px] cursor-pointer`}
                    >
                      {i.img && (
                        <img className="object-contain mr-2" src={i.img} />
                      )}
                      {i.svg && <div className="mr-2"> {i.svg} </div>}
                      {i.label}
                    </a>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;
