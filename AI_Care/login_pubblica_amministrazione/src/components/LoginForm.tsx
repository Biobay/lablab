import React from 'react';
import { AlertCircle } from 'lucide-react';

interface LoginFormProps {
  credentials: {
    username: string;
    password: string;
  };
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onCredentialsChange: (field: string, value: string) => void;
}

const LoginForm = ({ credentials, error, onSubmit, onCredentialsChange }: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Codice Dipendente Roma Capitale
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={credentials.username}
          onChange={(e) => onCredentialsChange('username', e.target.value)}
          placeholder="Inserisci il codice dipendente"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={credentials.password}
          onChange={(e) => onCredentialsChange('password', e.target.value)}
          placeholder="Inserisci la password"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Ricordami
          </label>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
          Password dimenticata?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Accedi
      </button>
    </form>
  );
};

export default LoginForm;