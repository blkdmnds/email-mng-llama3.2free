import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">Email AI</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/login" className="btn btn-secondary">Log in</Link>
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;