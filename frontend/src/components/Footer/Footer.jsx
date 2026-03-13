import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="w-full border-t py-4 text-center bg-white">
      
      {/* <p className="text-lg md:text-2xl font-semibold mb-2">
        Made By Vraj Patel
      </p> */}

      <div className="flex justify-center items-center gap-6 my-3">
        <a
          href="https://instagram.com/vrajpatel_453"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-pink-500 text-xl md:text-2xl"
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.linkedin.com/in/vraj-patel-08629a24b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-700 text-xl md:text-2xl"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://github.com/vrajpatel4503"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black text-xl md:text-2xl"
        >
          <FaGithub />
        </a>

        <a
          href="mailto:vrajpatel40503@gmail.com"
          className="text-gray-700 hover:text-black text-xl md:text-2xl"
        >
          <IoMdMail />
        </a>
      </div>

      <p className="text-sm md:text-base text-gray-600">
        © 2026 <span className="font-semibold">TrackMyAllJobs</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
