import React, { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/email/sendmessage", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status) {
        console.log("SUCCESS!");
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          message: "",
          email: "",
        });
      }
    } catch (error) {
      console.log("FAILED...", error);
    }
  };

  return (
    <>
      <section className="z bg-gray-100 text-black dark:bg-gray-800 dark:text-white py-20 lg:py-[120px] lg:px-[8vw] flex items-center justify-center mx-2">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 mx-2 max-w-[570px] lg:mb-0">
                <h2 className="mb-6 text-[32px] text-center font-bold uppercase text-gray-900 dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  GET IN TOUCH WITH US
                </h2>
                <p className="mb-9 text-base text-justify leading-relaxed text-gray-700 dark:text-gray-300">
                  We value your feedback, questions, and ideas. Whether you're
                  curious about our articles, need assistance, or have
                  suggestions, our team is here to help.
                </p>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 sm:h-[70px] sm:max-w-[70px]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                      Our Location
                    </h4>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      MMMUT Gorakhpur (273010), India
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 sm:h-[70px] sm:max-w-[70px]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 4.7998H3.99998C2.29998 4.7998 0.849976 6.1998 0.849976 7.9498V24.1498C0.849976 25.8498 2.24998 27.2998 3.99998 27.2998H28C29.7 27.2998 31.15 25.8998 31.15 24.1498V7.8998C31.15 6.1998 29.7 4.7998 28 4.7998ZM28 7.0498C28.05 7.0498 28.1 7.0498 28.15 7.0498L16 14.8498L3.84998 7.0498C3.89998 7.0498 3.94998 7.0498 3.99998 7.0498H28ZM28 24.9498H3.99998C3.49998 24.9498 3.09998 24.5498 3.09998 24.0498V9.2498L14.8 16.7498C15.15 16.9998 15.55 17.0998 15.95 17.0998C16.35 17.0998 16.75 16.9998 17.1 16.7498L28.8 9.2498V24.0998C28.9 24.5998 28.5 24.9498 28 24.9498Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                      Email Address
                    </h4>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      rishabhsharma919319@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 shadow-lg sm:p-12">
                <form
                  onSubmit={sendEmail}
                  className="flex flex-col justify-center"
                >
                  <div className="mb-6">
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      placeholder="Your Name"
                      className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-[14px] text-base placeholder-gray-600 dark:placeholder-gray-400 outline-none focus:border-blue-600 focus-visible:shadow-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      placeholder="Your Email"
                      className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-[14px] text-base placeholder-gray-600 dark:placeholder-gray-400 outline-none focus:border-blue-600 focus-visible:shadow-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      name="phone"
                      type="text"
                      value={formData.phone}
                      placeholder="Your Phone"
                      className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-[14px] text-base placeholder-gray-600 dark:placeholder-gray-400 outline-none focus:border-blue-600 focus-visible:shadow-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <textarea
                      name="message"
                      value={formData.message}
                      placeholder="Your Message"
                      className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-[14px] text-base placeholder-gray-600 dark:placeholder-gray-400 outline-none focus:border-blue-600 focus-visible:shadow-none"
                      rows="2"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full hover:bg-blue-700 dark:hover:bg-blue-700 rounded border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-800 py-3 px-[14px] text-base text-gray-900 dark:text-gray-200 outline-none focus:border-blue-600 focus-visible:shadow-none"
                    >
                      Send Message
                    </Button>
                  </div>
                  {success && (
                    <p className="mt-3 text-green-500">Message sent successfully!</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
