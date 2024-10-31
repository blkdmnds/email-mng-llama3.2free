import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, Clock, Sparkles, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Alex Rodriguez',
      role: 'Head of AI',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      <Header transparent />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Mission to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-indigo-200">
                Revolutionize Email
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              We're building the future of email management through artificial intelligence,
              making your inbox work smarter, not harder.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Our Values</h2>
            <p className="mt-4 text-xl text-white/80">
              The principles that guide our mission and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'User-Centric',
                description: 'Every feature we build starts with user needs and feedback.',
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'Your data security and privacy are our top priorities.',
              },
              {
                icon: Clock,
                title: 'Time-Saving',
                description: 'We help you reclaim hours from your inbox every week.',
              },
              {
                icon: Sparkles,
                title: 'Innovation',
                description: 'Constantly pushing the boundaries of what is possible with AI.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Our Team</h2>
            <p className="mt-4 text-xl text-white/80">
              Meet the people behind Email AI Manager
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-pink-500/20 to-purple-600/20 backdrop-blur-sm"></div>
                </div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-white/80">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Join Us in Shaping the Future of Email
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Experience the power of AI-driven email management today.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-purple-600 transition-colors"
              >
                Get Started
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

export default AboutPage;