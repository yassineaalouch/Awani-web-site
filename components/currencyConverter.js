"use client";
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const converterCurrency = createContext({});

export function ConverterCurrencyProvider({ children }) {
    // async function converterCurrencyFunction(){
    
    //     const host = 'api.frankfurter.app';
    //     axios.get(`https://${host}/latest?amount=10&from=GBP&to=USD`)
    //     .then(resp => console.log('converterCurrencyFunction',resp))
    //     }
    
    //   async function GetCurrencyFunction(){
        
    //     const host = 'api.frankfurter.app';
    //     axios.get(`https://${host}/currencies`)
    //     .then(resp => console.log('GetCurrencyFunction',resp))
    //     }
    
    //     useEffect(()=>{
    //         converterCurrencyFunction()
    //         GetCurrencyFunction()
    //     },[])
    const [conversionRate, setConversionRate] = useState(null);
    useEffect(()=>{
        localStorage.setItem('conversionRate',conversionRate)
    },[conversionRate])
    return (
        <converterCurrency.Provider value={{ conversionRate, setConversionRate }}>
            {children}
        </converterCurrency.Provider>
    );
}

