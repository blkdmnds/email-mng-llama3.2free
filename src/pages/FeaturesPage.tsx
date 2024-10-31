import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Sparkles, Shield, Clock, ArrowRight, Zap, Brain, Workflow } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      <Header transparent />

      <main className="relative pt-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Features that Make Email
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-indigo-200">
                Management Effortless
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discover how our AI-powered features can transform your email experience and boost your productivity.
            </p>
            <Link 
              to="/signup" 
              className="inline-flex items-center px-8 py-3 rounded-full bg-white text-purple-600 hover:bg-purple-50 transition-colors text-lg font-medium"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Analysis',
                description: 'Smart email analysis and categorization using advanced AI to help you focus on what matters most.'
              },
              {
                icon: Workflow,
                title: 'Custom Workflows',
                description: 'Create automated workflows to handle repetitive tasks and streamline your email management.'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Enterprise-grade security with end-to-end encryption to keep your emails safe and private.'
              },
              {
                icon: Sparkles,
                title: 'Smart Prioritization',
                description: 'AI-driven priority inbox that learns from your behavior to surface important emails first.'
              },
              {
                icon: Clock,
                title: 'Follow-up Reminders',
                description: 'Never miss an important follow-up with smart reminders and scheduling assistance.'
              },
              {
                icon: Zap,
                title: 'Quick Actions',
                description: 'Powerful shortcuts and quick actions to process emails faster than ever before.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
              >
                <div className="h-12 w-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Email Experience?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already revolutionized their email management with our AI-powered tools.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-purple-600 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer transparent />
    </div>
  );
};

export default FeaturesPage;