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
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Smart Ping - Stay updated with your team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaBell className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
            </div>
            <nav className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <button 
                onClick={() => setShowFaq(true)}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaQuestionCircle className="mr-1" /> FAQ
              </button>
              <a 
                href="https://github.com/manni2000/Smart-Ping-AI-Powered-Update-Feed-bootstrapped" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaGithub className="mr-1" /> GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      
      {/* FAQ Modal */}
      {showFaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <button 
                onClick={() => setShowFaq(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">What is Smart Ping?</h3>
                  <p className="mt-2 text-gray-600">
                    It is a lightweight, AI-enhanced update feed platform designed for small to mid-size teams (starting at ~100 daily active users). 
                    It provides a centralized space for team members to post updates and leverages AI to generate daily digests, 
                    enabling asynchronous collaboration and better knowledge tracking.
                  </p>
                  <p className="mt-2 text-gray-600">
                    This proof-of-concept is intentionally minimal — it excludes authentication, caching, and responsive design polish — 
                    and focuses entirely on the core value loop: updates in, summaries out.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Why We Need Smart Ping: Problems in Modern Teams</h3>
                  <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-2">
                    <li><strong>Async fatigue:</strong> Remote/distributed teams often post updates across tools (Slack, Notion, email), creating chaos.</li>
                    <li><strong>Cognitive overload:</strong> Team leads and PMs can't keep up with all threads, especially across time zones.</li>
                    <li><strong>Context loss:</strong> Important context from daily progress reports gets buried and forgotten.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sample Use Case</h3>
                  <p className="mt-2 text-gray-600">Imagine a 15-member dev team:</p>
                  <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-2">
                    <li>Each dev posts a short update daily: <em>"Finished payment integration, debugging sandbox mode."</em></li>
                    <li>At 11 PM, a cron job fetches all updates and generates: <em>"Team completed API integrations and began testing. Minor bugs in sandbox mode identified."</em></li>
                    <li>PMs get instant clarity the next morning. No Slack hunting.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
                  <p className="mt-2 text-gray-600">
                    Smart Ping offers a fast, AI-powered way to collect and distill team knowledge — perfect for the modern async workplace. 
                    Its POC is focused, simple, and powerful: type an update, and get the summary you wish your manager would write.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={() => setShowFaq(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="bg-white shadow-inner py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Smart Ping. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;