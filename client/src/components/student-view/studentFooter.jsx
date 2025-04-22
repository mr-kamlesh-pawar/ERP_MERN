import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="py-10 border-t border-gray-200"
      style={{ background: "linear-gradient(to bottom, #d7e8fc, #ffffff)" }}
    >
      <div className="container mx-auto px-6">
        {/* Social Media Section */}
        <div className="footer-social text-center mb-8">
          <h3 className="text-xl font-semibold mb-4">Follow Us 🌟</h3>
          <div className="social-icons flex justify-center space-x-6">
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="hover:text-gray-700 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          </div>
        </div>

        {/* Developed By Section */}
        <div className="developed-by text-center mb-8">
          <h4 className="text-lg font-semibold mb-2">Developed With ❤️ By</h4>
          <div className="flex justify-center space-x-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Darshan Wagh
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Aakash Raut
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              
              Atif Shaikh
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
             
              Om Chaudhary
            </span>
          </div>
        </div> 

        {/* Footer Bottom Section */}
        <div className="footer-bottom text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            &copy; 2025 Rasiklal M. Dhariwal Institute of Technology. All rights reserved. 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;