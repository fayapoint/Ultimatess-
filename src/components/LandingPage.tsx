import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Calendar, Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">Ultimate Social Suite</span>
          </div>
          <div>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 mr-4">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Sign Up</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Simplify Your</span>
            <span className="block text-blue-600">Social Media Management</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Ultimate Social Suite helps you streamline your social media presence across multiple platforms, saving you time and boosting your engagement.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Key Features
          </h2>
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Automated Scheduling</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Plan and schedule your posts across multiple platforms with ease.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Analytics Dashboard</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Get insights into your social media performance with our comprehensive analytics.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Globe className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Multi-Platform Support</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Manage all your social media accounts from a single, intuitive dashboard.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Ultimate Social Suite</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400">About</a>
              <a href="#" className="hover:text-blue-400">Privacy</a>
              <a href="#" className="hover:text-blue-400">Terms</a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            © 2024 Ultimate Social Suite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;