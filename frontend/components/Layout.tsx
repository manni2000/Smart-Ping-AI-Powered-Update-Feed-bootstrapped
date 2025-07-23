import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import { FaBell, FaGithub, FaQuestionCircle, FaTimes } from 'react-icons/fa';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Smart Ping' }: LayoutProps) => {
  const [showFaq, setShowFaq] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Disclaimer Banner */}
      <div className="bg-yellow-100 text-yellow-800 text-center text-sm p-2">
        Disclaimer: Using free OpenRouter API key for local development—summary and update feed may not load. Download the code from GitHub and run locally for full functionality.
      </div>

      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Smart Ping - Stay updated with your team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4">
            <div className="flex items-center mb-4 sm:mb-0">
              <FaBell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mr-2 sm:mr-3" />
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">{title}</h1>
            </div>
            <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium">
                Dashboard
              </a>
              <button 
                onClick={() => setShowFaq(true)}
                className="text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center"
              >
                <FaQuestionCircle className="mr-1" /> FAQ
              </button>
              <a 
                href="https://github.com/manni2000/Smart-Ping-AI-Powered-Update-Feed-bootstrapped" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center"
              >
                <FaGithub className="mr-1" /> GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
      
      {/* FAQ Modal */}
      {showFaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-3 sm:p-6 border-b">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <button 
                onClick={() => setShowFaq(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
            <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800">What is Smart Ping?</h3>
                <p className="mt-1 text-gray-600">Smart Ping is an AI-powered update feed platform that lets team members post daily progress and automatically generates a concise summary each day, improving visibility and reducing noise.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Is authentication required?</h3>
                <p className="mt-1 text-gray-600">No. The POC is intentionally open for simplicity. All updates are anonymous. Future versions may support user authentication and team isolation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">How often are summaries generated?</h3>
                <p className="mt-1 text-gray-600">Summaries run once daily at 23:55 UTC by a scheduled cron job. You can adjust the schedule in <code>cron.js</code> or your deployment platform.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Can I customize the summary length?</h3>
                <p className="mt-1 text-gray-600">Yes. Modify the prompt in the AI client (<code>utils/aiClient.js</code>) to adjust word limits or summary style.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Why do we need Smart Ping in modern days?</h3>
                <p className="mt-1 text-gray-600">In today’s distributed and asynchronous work environments, teams face information overload and fragmented communication across multiple tools. Smart Ping centralizes daily updates and uses AI summarization to reduce noise, improve visibility, and ensure key insights are easily accessible—helping teams stay aligned, make faster decisions, and maintain productivity.</p>
              </div>
               <div>
                <h3 className="font-semibold text-gray-800">Do I need an API key?</h3>
                <p className="mt-1 text-gray-600">Yes. For production use, provide a valid OpenRouter (or OpenAI) API key. Local development can use the free tier, but summaries may not generate reliably.</p>
              </div>
            </div>
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-t flex justify-end">
              <button
                onClick={() => setShowFaq(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="bg-white shadow-inner py-4 sm:py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs sm:text-sm mb-4 md:mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()} Smart Ping. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-3 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500 text-xs sm:text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-gray-500 text-xs sm:text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-gray-500 text-xs sm:text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
