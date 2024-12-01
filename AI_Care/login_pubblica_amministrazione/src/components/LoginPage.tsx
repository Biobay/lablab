import React, { useState } from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import Footer from './Footer';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      console.log('Login attempted for Roma Capitale employee');
    } else {
      setError('Per favore, inserisci le tue credenziali di Roma Capitale');
    }
  };

  const handleCredentialsChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 w-full max-w-md">
        <Header />
        <LoginForm 
          credentials={credentials}
          error={error}
          onSubmit={handleSubmit}
          onCredentialsChange={handleCredentialsChange}
        />
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;