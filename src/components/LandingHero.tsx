import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { useABTestVariant } from '../hooks/useABTestVariant';
import { useABTest } from '../contexts/ABTestContext';

const LandingHero = () => {
  const { data } = useABTestVariant('landing-hero');
  const { trackConversion } = useABTest();

  const handleCTAClick = () => {
    trackConversion('landing-hero');
  };

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">{data.heading}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your inbox experience with AI-powered organization, smart prioritization, and automated follow-ups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/login" 
                className="btn btn-gradient"
                onClick={handleCTAClick}
              >
                {data.cta}
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/demo" className="btn btn-secondary">
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Rest of the component remains the same */}
        </div>
      </div>
    </div>
  );
};