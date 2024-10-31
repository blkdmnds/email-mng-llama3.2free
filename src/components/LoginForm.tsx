import React from 'react';
import { useABTestVariant } from '../hooks/useABTestVariant';
import { useABTest } from '../contexts/ABTestContext';

const LoginForm = () => {
  const { data } = useABTestVariant('login-form');
  const { trackConversion } = useABTest();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    trackConversion('login-form');
    // Handle login logic
  };

  const socialButtons = (
    <div className="space-y-3">
      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </button>
      {/* Add other social buttons */}
    </div>
  );

  return (
    <div className={`bg-white p-8 rounded-lg shadow-md ${data.layout === 'compact' ? 'max-w-md' : 'max-w-lg'}`}>
      {data.socialButtonsPosition === 'top' && socialButtons}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Sign in
        </button>
      </form>

      {data.socialButtonsPosition === 'bottom' && (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6">{socialButtons}</div>
        </div>
      )}
    </div>
  );
};