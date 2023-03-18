import Link from "components/links";
import { useMainContext } from "context/main";
import DropdownApp from "components/dropdown-app";
import { AiOutlineAlert } from "react-icons/ai";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiTyphoonLine } from "react-icons/ri";
import versionNumber from "../../package.json";

export default function Header({ isSearchListener }) {
  const { user, func } = useMainContext();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const profileData = [
    {
      label: "Profile",
      value: "/account/profile",
      show: true,

      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      ),
    },

    {
      label: "Sharing",
      value: "/cname",
      show: true,
      svg: <AiOutlineAlert size={18} />,
    },

    {
      label: "Billing",
      value: "/billing",
      show: true,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-coin"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
          <path
            fillRule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            fillRule="evenodd"
            d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
          />
        </svg>
      ),
    },
    {
      label: "Usage",
      value: "/account/usage",
      show: true,
      svg: <RiTyphoonLine size={18} />,
    },

    {
      label: "Logout",
      show: true,

      action: () => func.logout(),
      // img: "https://d21b0h47110qhi.cloudfront.net/old-free/manage-bwiRBBRj3Ch6dYj.png",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right-circle"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
          />
        </svg>
      ),
      last: true,
    },
  ];

  const navItems = (show) => {
    return (
      <ul
        className={`${show} md:flex md:flex-row flex-col items-baseline justify-around w-[100%]`}
      >
        <Link
          href="/projects"
          className="uppercase md:mb-0  mb-10 text-[14px] md:text-[16px]"
          mbDropdown={show === "hidden" ? false : true}
        >
          <a>Project</a>
        </Link>
        <Link
          href="/keywords"
          className="uppercase md:mb-0  mb-10 text-[14px] md:text-[16px]"
          mbDropdown={show === "hidden" ? false : true}
        >
          <a>Project</a>
        </Link>
        <Link
          href="/backlinks"
          className="uppercase md:mb-0  mb-10 text-[14px] md:text-[16px]"
          mbDropdown={show === "hidden" ? false : true}
        >
          <a>Project</a>
        </Link>
        <Link
          href="/audit"
          className="uppercase md:mb-0  mb-10 text-[14px] md:text-[16px]"
          mbDropdown={show === "hidden" ? false : true}
        >
          <a>Project</a>
        </Link>
        <Link
          href="/lists"
          className="uppercase md:mb-0  mb-10 text-[14px] md:text-[16px]"
          mbDropdown={show === "hidden" ? false : true}
        >
          <a>Project</a>
        </Link>
        <Link
          className="uppercase md:mb-0  mb-10 text-[14px] md:text-[16px]"
          href="/v30"
          mbDropdown={show === "hidden" ? false : true}
        >
          <a>Project</a>
        </Link>
        <Link
          href="/"
          onClick={() => func.logout()}
          className="uppercase md:mb-0  mb-10 text-[14px] md:text-[16px] text-[#000]"
          mbDropdown={show === "hidden" ? false : true}
        >
          Logout
        </Link>
      </ul>
    );
  };

  return (
    <header
      className={`px-5 py-[10px] border-b  md:px-8 bg-white ${
        isSearchListener === "Search Listener" || isSearchListener === true
          ? "shadow-[0_4px_16px_0px_rgba(111,111,111,0.09)]"
          : ""
      }`}
    >
      <nav className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <a href="/" className="inline-block mr-[60px] xl:mr-[80px] relative">
            <span className="text-[20px]">Payment System</span>
            <span className="absolute right-[-45px] top-0 text-[#8B8B8B] text-[12px] font-normal">
              v{versionNumber.version}0
            </span>
          </a>

          <ul className="hidden lg:flex items-center justify-around">
            <Link
              href="/"
              className={` text-[13px] xl:text-[14px] font-semibold mr-[15px] py-2 px-3 ${
                router.pathname === "/"
                  ? "text-[#0047FF] bg-[#DFE8FF]"
                  : "text-[#3A3B40]"
              } hover:text-[#0047FF]`}
            >
              <a>Home</a>
            </Link>
            <Link
              href="/balances"
              className={` text-[13px] xl:text-[14px] font-semibold  mr-[15px] py-2 px-3 ${
                router.pathname.replace("/[id]", "") === "/balances"
                  ? "text-[#0047FF] bg-[#DFE8FF]"
                  : "text-[#3A3B40]"
              } hover:text-[#1890ff]`}
            >
              <a>Balances</a>
            </Link>

            <Link
              href="/payments"
              className={` text-[13px] xl:text-[14px] font-semibold  mr-[15px] py-2 px-3 ${
                router.pathname.replace("/[id]", "") === "/payment"
                  ? "text-[#0047FF] bg-[#DFE8FF]"
                  : "text-[#3A3B40]"
              } hover:text-[#1890ff]`}
            >
              <a>Payment</a>
            </Link>
            {/* <Link
              href="/audit"
              className={`text-[13px] xl:text-[14px] font-semibold mr-[25px] py-2 px-3 ${
                router.pathname.replace("/[id]", "") === "/audit"
                  ? "text-[#0047FF] bg-[#DFE8FF]"
                  : "text-[#3A3B40]"
              } hover:text-[#1890ff]`}
            >
              <a>Project</a>
            </Link> */}
          </ul>
        </div>
        <ul className="hidden lg:flex items-center">
          <li className="mr-[20px]">
            <DropdownApp
              value={
                <div className="flex justify-center items-center rounded-[50%] w-[35px] xl:w-[40px] h-[35px] xl:h-[40px] bg-[#0047FF] text-[13px] xl:text-[16px] text-[#fff] relative">
                  {user?.first_name && user.first_name[0]}
                </div>
              }
              data={profileData}
              limits
            />
          </li>
          <li></li>
        </ul>

        <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          <img className="w-5" src="/icons/menu.svg" alt="hamburger menu" />
        </div>
        <div
          className={`bg-white py-6 px-5 flex justify-between flex-col shadow absolute left-[-18px] top-[-1px] w-[90%] h-screen z-50 ${
            isOpen ? "flex" : "hidden"
          }`}
          data-modal="backdrop"
        >
          <div>
            <div className="flex justify-between mb-10">
              <img
                className="object-scale-down w-[46%]"
                src="https://d21b0h47110qhi.cloudfront.net/brandoverflow/bdweb-PygonNlic0TxGvm.png"
              />
              <img
                className="object-contain"
                src="https://d21b0h47110qhi.cloudfront.net/old-free/cancel-lIflUpowTsE5XYn.png"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <div className="p-6">{navItems("flex")}</div>
          </div>
        </div>
      </nav>
    </header>
  );
}
