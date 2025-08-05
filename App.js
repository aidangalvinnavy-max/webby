import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RepForm from './components/RepForm';
import InnovatorForm from './components/InnovatorForm';
import Matchmaking from './components/Matchmaking';

const App = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans leading-normal">
      <Header />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <RepForm />
        <InnovatorForm />
        <Matchmaking />
      </main>
      <Footer />
    </div>
  );
};

export default App;
