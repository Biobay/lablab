import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="w-16 h-16 text-blue-600" />
        <img 
          src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop"
          alt="Roma Capitale"
          className="w-16 h-16 object-cover rounded-full border-2 border-blue-600"
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 text-center">AI CARE Roma</h1>
      <h2 className="text-lg text-gray-600 text-center mt-2">Segnalazioni Intelligenti con Chatbot</h2>
      <p className="text-sm text-gray-500 text-center mt-2">
        Portale Amministrazione Roma Capitale
      </p>
    </div>
  );
};

export default Header;