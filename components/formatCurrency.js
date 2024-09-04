const CURRENCY_FORMATTER= new Intl.NumberFormat('en-US',{
    currency:"MAD",
    style: 'currency',
});
export default function formatCurrency(number){
    return CURRENCY_FORMATTER.format(number)
}