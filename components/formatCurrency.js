
export default function formatCurrency({number,currencySymbol}){
    const CURRENCY_FORMATTER= new Intl.NumberFormat('en-MA',{
        currency:currencySymbol?currencySymbol:"MAD",
        style: 'currency',
    });
    return CURRENCY_FORMATTER.format(number)
}