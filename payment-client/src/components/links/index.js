import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function LinkComponent({
  children,
  dropdown,
  mbDropdown,
  href,
  headerLink,
  className,
  onClick,
  ...otherProps
}) {
  return (
    <Link onClick={onClick && onClick} href={href ? href : "#"} passHref>
      <a
        href={href}
        onClick={onClick && onClick}
        className={`group relative  cursor-pointer`}
        {...otherProps}
      >
        <div
          className={`${className ? className : "text-[#4673E5]"}  group ${
            children === "Pricing" && "text-[#3E3E3E]"
          }  group-hover:text-[#287DFF]  font-normal  ${
            headerLink ? "text-[#828282]" : ""
          } rounded-btn flex items-center mx-auto`}
        >
          {children}
          {dropdown && (
            <MdKeyboardArrowDown
              className="group-hover:fill-[#287DFF]"
              size={24}
              fill="#828282"
            />
          )}
        </div>

        <div
          className={`bg-white invisible text-[13px] border-gray-800 rounded-btn w-60 absolute z-50 ${
            mbDropdown && "top-[-24%] left-[92px] w-[12rem]"
          } transition-all opacity-0  group-hover:visible group-hover:opacity-100 left-0 top-full group-hover:translate-y-2 group-focus-within:translate-y-1`}
          tabIndex="-1"
        >
          {dropdown &&
            dropdown.map((j, index) => {
              return (
                <ul key={index} className="py-1">
                  <li>
                    <Link href={j?.link}>
                      <a
                        href={j?.link}
                        className={`block px-4 py-2 hover:bg-gray-100`}
                      >
                        {j?.label}
                      </a>
                    </Link>
                  </li>
                </ul>
              );
            })}
        </div>
      </a>
    </Link>
  );
}
