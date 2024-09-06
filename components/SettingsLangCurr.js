import { useEffect, useState } from 'react';
import { useContext } from "react";
import { converterCurrency } from "@/components/currencyConverter";
import Select from "react-select";

export default function LanguageCurrencySettings() {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [currenciesSymbol,setCurrenciesSymbol] = useState([])
  const {conversionRate,currencyWanted,setCurrencyWanted,setConversionRate} = useContext(converterCurrency)


  useEffect(() => {
    // Only proceed if conversionRate exists and has data
      console.log('conversionRate',conversionRate)
      const list = Object.keys(conversionRate);
      setCurrenciesSymbol(list);
    
  }, [conversionRate]); // Trigger useEffect when conversionRate changes


  useEffect(() => {
    console.log('currenciesSymbol:', currenciesSymbol);
    console.log('conversionRate:', conversionRate);
  }, [currenciesSymbol, conversionRate]);

  return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-48 border border-slate-100 md:w-64">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Currency</label>
          <Select
            value={{value:currencyWanted,label:currencyWanted}}
            defaultValue={{value:'MAD',label:'MAD'}}
            options={currenciesSymbol.map((ele)=>({value:ele,label:ele}))}
            onChange={(e) => {setCurrencyWanted(e.value),console.log(currencyWanted)}}
            className="w-full border-gray-300 rounded"
          />
          
        </div>
      </div>
  );
}