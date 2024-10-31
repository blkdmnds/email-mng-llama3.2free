import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent }) => {
  return (
    <nav className={`fixed w-full z-50 ${
      transparent 
        ? 'bg-transparent' 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
              transparent
                ? 'bg-white/10 backdrop-blur-md'
                : 'bg-gradient-to-r from-pink-500 to-violet-500'
            }`}>
              <Mail className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${
              transparent
                ? 'text-white'
                : 'bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'
            }`}>
              Email AI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/features" 
              className={transparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
            >
              Features
            </Link>
            <Link 
              to="/about"
              className={transparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
            >
              About
            </Link>
            <Link 
              to="/pricing"
              className={transparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
            >
              Pricing
            </Link>
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-xl transition-colors ${
                transparent
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className={`px-4 py-2 rounded-xl transition-colors ${
                transparent
                  ? 'bg-white text-purple-600 hover:bg-purple-50'
                  : 'bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600'
              }`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;