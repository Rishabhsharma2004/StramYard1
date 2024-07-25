import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "flowbite-react";

export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center mt-10 px-4 bg-gray-50 dark:bg-gray-900">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          About TechStack
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
          Welcome to TechStack, where innovation meets precision. We are dedicated to transforming your ideas into powerful, responsive web solutions using the latest in MERN stack technologies and modern design frameworks.
        </p>
      </div>
      
      <section className="mb-10 max-w-3xl text-center animate-fadeInUp">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          At TechStack, our mission is to empower businesses and individuals with cutting-edge technology solutions that drive growth and efficiency. We strive to blend creativity with technical expertise to deliver exceptional digital experiences.
        </p>
      </section>

      <section className="mb-10 max-w-3xl text-center animate-fadeInUp">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Our Team</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Our team is a diverse group of passionate professionals who are committed to delivering excellence. With expertise in full-stack development, UI/UX design, and project management, we work collaboratively to ensure that every project exceeds expectations.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <img src="/images/team-member1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full object-cover shadow-md" />
          <img src="/images/team-member2.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full object-cover shadow-md" />
          <img src="/images/team-member3.jpg" alt="Team Member 3" className="w-32 h-32 rounded-full object-cover shadow-md" />
        </div>
      </section>

      <section className="mb-10 max-w-3xl text-center animate-fadeInUp">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Contact Us</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Have questions or want to start a project with us? Get in touch with our team to explore how we can work together to achieve your goals.
        </p>
        <div className="mt-6">
          <Button className="flex items-center">
            <Link className="flex items-center" to="/contact">
              Contact Us <FaArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
