import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-2">
            <div className="container mx-auto flex flex-col items-center justify-center">
                
                <p>Made By <a className='text-red-600 ' href="https://rushikeshbiradar.netlify.app/"
                    rel="noreferrer" target="_blank">Rushikesh Biradar.</a></p>
                <span>Copyright &copy; <a className='text-red-600 ' href="https://fashionframe.netlify.app/"
                    rel="noreferrer" target="_blank">FashionFrame.</a>  2023 All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
