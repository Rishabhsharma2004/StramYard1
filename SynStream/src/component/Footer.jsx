import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
  BsLinkedin
} from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto sm: m-5 sm:items-center sm:justify-between">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1 ">
          <div className="">
            <Link
              to="/"
              className="self-center flex whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <img className=" h-20 w-20" src="logo.png" alt="" />{" "}
              <span className=" mt-6 flex">
                Tech<p className=" text-orange-400">Stack .</p>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-4 sm:grid-cols-3 sm:gap-6 m-5">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://heyrishabh.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/rishabhsharma2004"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms &amp: Counditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Rishabh's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon target="_blank" href="https://www.linkedin.com/in/rishabh-sharma-55b735229/" icon={BsLinkedin} />
            <Footer.Icon target="_blank" href="https://github.com/Rishabhsharma2004" icon={BsGithub} />
            <Footer.Icon target="_blank" href="https://www.instagram.com/cs__wala_r553" icon={BsInstagram} />
            {/* <Footer.Icon target="_blank" href="#" icon={BsTwitter} /> */}
            <Footer.Icon target="_blank" href="#" icon={BsFacebook} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
