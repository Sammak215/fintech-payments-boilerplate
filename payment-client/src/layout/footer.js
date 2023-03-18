import React from 'react';

export default function Footer() {
  return (
    <footer className=" bg-gray-800">
      <div className="container mx-auto px-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 ">
        <span className="text-sm text-gray-500 sm:text-center :text-gray-400 mr-[20px]">
          © 2022
          <a href="/" className="hover:underline">
            us
          </a>
          . All Rights Reserved.
        </span>

        <ul className="flex flex-wrap items-center mt-3 text-sm  text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
