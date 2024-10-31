import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  transparent?: boolean;
}

const Footer: React.FC<FooterProps> = ({ transparent }) => {
  return (
    <footer className={transparent ? 'bg-transparent' : 'bg-gray-50'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
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
            </div>
            <p className={`mb-4 max-w-md ${transparent ? 'text-white/80' : 'text-gray-600'}`}>
              Transform your inbox experience with AI-powered organization, smart prioritization, and automated follow-ups.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`transition-colors ${
                    transparent
                      ? 'text-white/60 hover:text-white'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {['Product', 'Support'].map((section, index) => (
            <div key={index}>
              <h3 className={`font-semibold mb-4 ${
                transparent ? 'text-white' : 'text-gray-900'
              }`}>
                {section}
              </h3>
              <ul className="space-y-3">
                {[
                  ...(section === 'Product'
                    ? ['Features', 'Pricing', 'About', 'Blog']
                    : ['Documentation', 'API Reference', 'Privacy Policy', 'Terms of Service']
                  )
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      className={`transition-colors ${
                        transparent
                          ? 'text-white/80 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`border-t ${
          transparent ? 'border-white/10' : 'border-gray-200'
        } mt-12 pt-8 text-center ${
          transparent ? 'text-white/60' : 'text-gray-600'
        }`}>
          <p>&copy; {new Date().getFullYear()} Email AI Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;