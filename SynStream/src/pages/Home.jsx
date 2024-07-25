import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "flowbite-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-10 px-4">
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          TechStack is now public!
        </p>
      </div>
      <h1 className="max-w-4xl mt-10 text-3xl font-bold text-center sm:text-4xl md:text-5xl lg:text-6xl">
        Empowering <span className="text-blue-600">innovation </span>
        <span>with every line of code.</span>
      </h1>
      <p className="mt-6 max-w-prose text-center text-zinc-700 dark:text-zinc-300 sm:mt-10 sm:text-lg">
        Welcome to TechStack, where we blend innovation with precision. Using
        the latest in MERN stack and modern design frameworks, we turn your
        ideas into powerful, responsive web solutions. Explore our platform to
        see how we can bring your tech vision to life.
      </p>
      <div className="mt-10 mb-10">
        <Button className="flex items-center">
          <Link className="flex items-center" to="/dashboard?tab=profile">
            Get started <FaArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
