import axios from 'axios';
import { useEffect, useState } from 'react';
export default function LanguageCurrencySettings() {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');


  return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-64">
        <h2 className="text-xl font-semibold mb-4 text-center">Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>
  );
}