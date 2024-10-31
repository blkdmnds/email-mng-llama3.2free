import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Sparkles, Shield, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      <Header transparent />

      <main className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Email Management
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-indigo-200">
                  Reimagined with AI
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Transform your inbox experience with AI-powered organization, smart prioritization, and automated follow-ups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/login" 
                  className="inline-flex items-center px-8 py-3 rounded-full bg-white text-purple-600 hover:bg-purple-50 transition-colors text-lg font-medium"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/demo" 
                  className="inline-flex items-center px-8 py-3 rounded-full bg-purple-700/30 text-white hover:bg-purple-700/40 transition-colors text-lg font-medium"
                >
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* Right Column - Floating UI Elements */}
            <div className="relative hidden lg:block">
              <div className="absolute top-0 right-0 -translate-y-12 animate-float">
                <div className="w-64 h-48 bg-gradient-to-br from-pink-400/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl"></div>
              </div>
              <div className="absolute top-24 right-24 animate-float delay-100">
                <div className="w-80 h-56 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl"></div>
              </div>
              <div className="absolute top-48 right-12 animate-float delay-200">
                <div className="w-72 h-52 bg-gradient-to-br from-purple-400/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
              <div className="h-12 w-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Powered</h3>
              <p className="text-white/80">
                Smart email categorization and priority management using advanced AI algorithms.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
              <p className="text-white/80">
                Enterprise-grade security with end-to-end encryption for your sensitive communications.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-400 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Scheduling</h3>
              <p className="text-white/80">
                Intelligent follow-up reminders and automated scheduling for better time management.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer transparent />
    </div>
  );
};

export default LandingPage;