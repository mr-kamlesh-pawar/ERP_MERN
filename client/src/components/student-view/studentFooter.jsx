import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-5">
      {/* Social Media Section */}
      <div className="footer-social text-center mb-8">
        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
        <div className="social-icons flex justify-center space-x-6">
          <a href="#" className="hover:opacity-75 transition-opacity duration-200">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="h-8 w-8"
            />
          </a>
          <a href="#" className="hover:opacity-75 transition-opacity duration-200">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwPSL_cdQB7I_jSW87kF7705j9uSV5v1jtVQ&s"
              alt="Twitter"
              className="h-8 w-8"
            />
          </a>
          <a href="#" className="hover:opacity-75 transition-opacity duration-200">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s"
              alt="LinkedIn"
              className="h-8 w-8"
            />
          </a>
          <a href="#" className="hover:opacity-75 transition-opacity duration-200">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOV02TN2b8bGp4gg9h7oXUObNj5Uqwf9NWxg&s"
              alt="Instagram"
              className="h-8 w-8"
            />
          </a>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom text-center border-t border-gray-700 pt-6">
        <p className="text-sm">
          &copy; 2025 Rasiklal M. Dhariwal Institute of Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;