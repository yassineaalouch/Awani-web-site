"use client";
import { createContext, useState, useEffect } from 'react';
export const converterCurrency = createContext();

export function ConverterCurrencyProvider({ children }) {

    const [conversionRate, setConversionRate] = useState([]);
    const [currencyWanted,setCurrencyWanted]=useState('MAD')
    return (
        <converterCurrency.Provider value={{ conversionRate, setConversionRate,currencyWanted,setCurrencyWanted }}>
            {children}
        </converterCurrency.Provider>
    );
}

