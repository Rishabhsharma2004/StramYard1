import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaArrowRight } from "react-icons/fa";
import { Button, Accordion } from "flowbite-react";
import { Link } from "react-router-dom";
import techs from "../component/tech";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
export default function Home() {
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState("");
  const [tech, setTech] = useState("");
  const [tech2, setTech2] = useState("");
  // Function to calculate and set the Tech of the Day
  function getTechOfTheDay() {
    const startDate = new Date("2024-01-01T00:00:00Z"); // Fixed start date
    const currentDate = new Date();
    const diffInDays = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const techIndex = diffInDays % techs.length;
    const techIndex2 = (diffInDays + 1) % techs.length;
    setTech(techs[techIndex]);
    setTech2(techs[techIndex2]);
  }

  useEffect(() => {
    // Set the initial Tech of the Day
    getTechOfTheDay();

    // Set the initial time until next midnight
    const updateTimeUntilMidnight = () => {
      const currentDate = new Date();
      const nextMidnight = new Date(currentDate);
      nextMidnight.setDate(currentDate.getDate() + 1);
      nextMidnight.setHours(0, 0, 0, 0);

      // Calculate the time difference
      const timeDifference = nextMidnight - currentDate;

      // Calculate hours, minutes, and seconds
      let remainingMilliseconds = timeDifference;
      const hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
      remainingMilliseconds %= 1000 * 60 * 60;
      const minutes = Math.floor(remainingMilliseconds / (1000 * 60));
      remainingMilliseconds %= 1000 * 60;
      const seconds = Math.floor(remainingMilliseconds / 1000);

      // Format and set the remaining time
      const remainingTime = `${hours} hr ${minutes} min ${seconds} sec`;
      setTime(remainingTime);

      // Schedule the next update for the Tech of the Day at midnight
      const timeoutId = setTimeout(() => {
        getTechOfTheDay();
        setInterval(() => {
          getTechOfTheDay();
        }, 24 * 60 * 60 * 1000); // Repeat every 24 hours
      }, timeDifference);

      return () => clearTimeout(timeoutId);
    };

    // Update the countdown timer every second
    const intervalId = setInterval(updateTimeUntilMidnight, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to apply custom class to the current date
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return date.toDateString() === new Date().toDateString()
        ? "react-calendar__tile--current"
        : "react-calendar__tile--hoverable";
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-20 px-4">
      <style>
        {`.react-calendar__tile--current {
            background-color: #FFA500 !important;
            color: white !important;
            border-radius: 100% !important;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .react-calendar__tile--hoverable:hover {
            background-color: #87CEEB !important;
            border-radius: 100% !important;
            color: black !important;
          }

          .react-calendar__tile {
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .gradient-text {
            background: linear-gradient(270deg, #ff6ec4, #7873f5);
            background-size: 200% 200%;
            animation: gradient-animation 4s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .card {
            background-color: #f9f9f9;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 16px;
            text-align: center;
            transition: transform 0.3s ease;
          }

          .card:hover {
            transform: scale(1.05);
          }
          `}
      </style>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-x-4 w-full max-w-7xl">
        <div className="flex flex-col justify-center items-center text-center lg:text-left">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Empowering <span className="text-blue-600">innovation </span>
            <span>with every line of code.</span>
          </h1>
          <p className="mt-6 text-center p-5 lg:text-left text-zinc-700 dark:text-zinc-300 sm:mt-10 sm:text-lg">
            Welcome to TechStack, where we blend innovation with precision.
            Using the latest in MERN stack and modern design frameworks, we turn
            your ideas into powerful, responsive web solutions. Explore our
            platform to see how we can bring your tech vision to life.
          </p>
          <div className="mt-10 mb-10 flex flex-col lg:flex-row items-center gap-4">
            <Card variant="solid" color="warning" invertedColors>
              <CardContent orientation="horizontal">
                <CircularProgress size="lg" determinate value={20}>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </SvgIcon>
                </CircularProgress>
                <CardContent>
                  <Typography level="body-md">Tech of the Day</Typography>
                  <Typography level="h2">{tech}</Typography>
                </CardContent>
              </CardContent>
              <CardActions>
                <Button variant="soft" color={'warning'} size="sm">
                  {time}
                </Button>
                <Link className="flex items-center" to="/create-post">
                <Button variant="solid" color={'warning'} size="sm">
                  Create new post
                </Button>
                </Link>
              </CardActions>
            </Card>
            <Card variant="solid" color="primary" invertedColors >
              <CardContent orientation="horizontal">
                <CircularProgress size="lg" determinate value={20}>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </SvgIcon>
                </CircularProgress>
                <CardContent>
                  <Typography level="body-md">Tech of the Day</Typography>
                  <Typography level="h2">{tech2}</Typography>
                </CardContent>
              </CardContent>
              <CardActions>
                <Button variant="soft" size="sm">
                  {time}
                </Button>
                <Link className="flex items-center" to="/create-post">
                <Button variant="solid" size="sm">
                 Create new post
                </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-end">
          <div className="p-4 bg-gray-300 dark:bg-gray-800 rounded-xl shadow-lg text-black dark:text-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex flex-col items-center bg-gray-300 dark:bg-gray-800">
              <div className="text-sm mb-2">
                <span className="ml-1">{time} Left</span>
              </div>
              <Calendar
                onChange={setValue}
                value={value}
                className="dark:text-gray-200 bg-gray-300 dark:bg-gray-800 border-0 w-full"
                tileClassName={tileClassName} // Apply custom class to tiles
              />
              <p className="mt-4">
                ........................................................................
              </p>
              <div className="mt-4 text-center">
                <div className="bg-[#FFA500] p-2 text-md text-black py-1 px-3 rounded-full">
                  Tech of the day
                </div>
                <div className="text-sm font-semibold mt-1">1. {tech}</div>
                <div className="mt-1 text-sm text-green-400">2. {tech2}</div>
              </div>
              <div className="text-xs mt-1">Rules</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-7xl mb-10 px-4 mt-20">
        <div className="flex justify-center items-center">
          <video
            src="Chatbot.mp4"
            autoPlay
            loop
            muted
            className="w-full h-auto border rounded-xl overflow-hidden object-cover"
            style={{ width: "90%" }} // Adjust this percentage to your preference
          ></video>
        </div>
        <div className="flex flex-col justify-center items-center text-center mb-20">
          <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl animate-pulse">
            Seamless Integration
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl animate-fadeIn">
            Our solutions seamlessly integrate with your existing systems,
            providing a smooth transition and enhanced functionality.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          Empowering Innovation
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 gradient-text">
          At TechStack, we believe in the power of technology to transform ideas
          into reality. Join us in this journey and see how we can make a
          difference.
        </p>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Join us at TechStack and experience the synergy of innovation and
          expertise. Together, let's create something extraordinary.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-7xl px-4 mt-20 mb-20">
        <div
          className="flex flex-col justify-center items-center lg:items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          style={{ transform: "perspective(600px) rotateY(15deg)" }}
        >
          <img src="moon.png" alt="" />
        </div>
        <div className="flex justify-center items-center">
          <img
            src="img1.jpg"
            alt="3D Tech Image"
            className="w-full h-auto rounded-lg shadow-lg"
            style={{ transform: "perspective(600px) rotateY(-15deg)" }}
          />
        </div>
      </div>
      <div className="w-full max-w-7xl px-4 mb-20">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
          Frequently Asked Questions
        </h2>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>What is TechStack?</Accordion.Title>
            <Accordion.Content>
              <p className="text-base text-gray-700 dark:text-gray-300">
                TechStack is a platform that blends innovation with precision to
                provide powerful, responsive web solutions using the latest in
                MERN stack and modern design frameworks.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>How do I get started?</Accordion.Title>
            <Accordion.Content>
              <p className="text-base text-gray-700 dark:text-gray-300">
                You can get started by visiting our{" "}
                <Link
                  to="/create-post"
                  className="text-blue-600 hover:underline"
                >
                  Create Post
                </Link>{" "}
                page or by exploring our platform to see how we can help with
                your tech vision.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>What technologies do you use?</Accordion.Title>
            <Accordion.Content>
              <p className="text-base text-gray-700 dark:text-gray-300">
                We use the latest technologies including the MERN stack
                (MongoDB, Express.js, React.js, Node.js), Tailwind CSS, and
                other modern design frameworks to ensure our solutions are
                cutting-edge and responsive.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>How can I contact support?</Accordion.Title>
            <Accordion.Content>
              <p className="text-base text-gray-700 dark:text-gray-300">
                You can contact our support team through our{" "}
                <Link to="/contact" className="text-blue-600 hover:underline">
                  Contact
                </Link>{" "}
                page for any assistance or queries you may have.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
}
