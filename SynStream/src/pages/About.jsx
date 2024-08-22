import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "flowbite-react";

export default function About() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Modify the translation speed for the pointer
  const pointerStyle = {
    transform: `translateY(${scrollY * 1}px)`,
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center mt-5 px-4 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-10 mt-0">
          About TechStack
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 sm:text-xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-1/2 mx-auto mb-10">
          Welcome to TechStack, where innovation meets precision. We are dedicated to transforming your ideas into powerful, responsive web solutions using the latest in MERN stack technologies and modern design frameworks.
        </p>
      </div>

      <p className="w-full h-[0.1px] bg-gray-500 blur-xs"></p>

      <div className="relative flex flex-col w-full min-h-screen justify-center items-center mt-0 px-4 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        {/* Background road */}
        <div className="absolute inset-0 pointer-events-none">
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 bg-black h-screen">
            <div
              className="w-6 ml-[-6px] h-6 bg-blue-500 rounded-full"
              style={pointerStyle}
            ></div>
            {/* White strips */}
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className="w-1 h-4 bg-white my-4 mx-auto"
                style={{ marginTop: "10px" }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-5xl z-10 flex flex-col items-center text-center animate-fadeInUp mb-20">
          <div className="flex w-full">
            <div className="w-1/2 pr-10 text-left">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                At TechStack, our mission is to empower businesses and individuals with cutting-edge technology solutions that drive growth and efficiency. We strive to blend creativity with technical expertise to deliver exceptional digital experiences.
              </p>
            </div>
            <div className="w-1/2 pl-10 text-right">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our team is a diverse group of passionate professionals who are committed to delivering excellence. With expertise in full-stack development, UI/UX design, and project management, we work collaboratively to ensure that every project exceeds expectations.
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-5xl z-10 flex flex-col items-center text-center animate-fadeInUp">
          <div className="flex w-full">
            <div className="w-1/2 pr-10 text-left">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Contact Us
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Have questions or want to start a project with us? Get in touch with our team to explore how we can work together to achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
