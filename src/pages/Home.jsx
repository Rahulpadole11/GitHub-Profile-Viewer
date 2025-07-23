// pages/Home.jsx
import React from "react";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white flex flex-col">
      <header className="text-center py-10">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
          🔍 GitHub Profile Viewer
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Instantly explore any GitHub user's public profile. Repositories,
          followers, activity – all in one place!
        </p>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <Link
          to="/ProfileViewer"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-xl transition duration-300"
        >
          🚀 Launch Viewer
        </Link>
        
      </main>

      <Footer />
    </div>
  );
};

export default Home;
