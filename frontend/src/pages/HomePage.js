import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/browse');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with movie posters */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="movies" x="0" y="0" width="200" height="300" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="180" height="270" fill="%23333" rx="8"/><rect x="10" y="10" width="160" height="240" fill="%23555" rx="4"/></pattern></defs><rect width="100%" height="100%" fill="url(%23movies)"/></svg>')`,
          backgroundSize: '200px 300px',
          opacity: 0.1
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="text-red-600 font-bold text-3xl">ALFLIX</div>
        <div className="flex items-center gap-4">
          <select className="bg-black/50 border border-gray-600 text-white px-3 py-1 rounded">
            <option>English</option>
          </select>
          <Button 
            variant="default" 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => navigate('/browse')}
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-gray-200">
          Starts at $7.99. Cancel anytime.
        </p>
        <p className="text-lg mb-8 text-gray-300">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* Email Signup */}
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-black/50 border-gray-600 text-white placeholder-gray-400 h-12 text-lg"
          />
          <Button
            onClick={handleGetStarted}
            className="bg-red-600 hover:bg-red-700 text-white h-12 px-8 text-lg font-semibold"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 border-t-8 border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto py-20 px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Enjoy on your TV.</h2>
              <p className="text-xl text-gray-300">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-8 aspect-video flex items-center justify-center">
                <div className="text-6xl opacity-20">📺</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="relative z-10 border-t-8 border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto py-20 px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg p-8 aspect-video flex items-center justify-center">
                <div className="text-6xl opacity-20">📱</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-4">Download your shows to watch offline.</h2>
              <p className="text-xl text-gray-300">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 border-t-8 border-gray-800 bg-black">
        <div className="max-w-4xl mx-auto py-20 px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              "What is Netflix?",
              "How much does Netflix cost?", 
              "Where can I watch?",
              "How do I cancel?",
              "What can I watch on Netflix?"
            ].map((question, index) => (
              <div key={index} className="bg-gray-800 hover:bg-gray-700 transition-colors">
                <button className="w-full text-left p-6 text-xl font-semibold flex justify-between items-center">
                  {question}
                  <span className="text-2xl">+</span>
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-8 text-gray-300">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
              <Input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-black/50 border-gray-600 text-white placeholder-gray-400 h-12 text-lg"
              />
              <Button
                onClick={handleGetStarted}
                className="bg-red-600 hover:bg-red-700 text-white h-12 px-8 text-lg font-semibold"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t-8 border-gray-800 bg-black py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-400 mb-8">Questions? Call 1-844-505-2993</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
            {[
              "FAQ", "Help Center", "Account", "Media Center",
              "Investor Relations", "Jobs", "Redeem Gift Cards", "Buy Gift Cards",
              "Ways to Watch", "Terms of Use", "Privacy", "Cookie Preferences",
              "Corporate Information", "Contact Us", "Speed Test", "Legal Notices"
            ].map((link, index) => (
              <a key={index} href="#" className="hover:underline">{link}</a>
            ))}
          </div>
          <div className="mt-8">
            <select className="bg-black border border-gray-600 text-gray-400 px-3 py-2 rounded">
              <option>English</option>
            </select>
          </div>
          <p className="text-gray-500 mt-6">ALFLIX - Stream Everything</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;