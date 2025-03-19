import { useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo';
import {InputBox}  from './components/index';


function App() {
 const [amount, setAmount] = useState();
 const [from, setFrom] = useState("usd");
 const [to, setTo] = useState("inr");
 const [convertedAmount, setConvertedAmount] = useState();



      const currencyInfo = useCurrencyInfo(from)
      const options = Object.keys(currencyInfo);
      const convert = () => {
        setConvertedAmount(amount * currencyInfo[to]);
      }

      const swap = () => {
        setFrom(to);  
        setTo(from);
        if (amount && convertedAmount) {
          setAmount(convertedAmount);
          setConvertedAmount(amount);
        }
      }
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=10000)",
      }}
    >
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
         <form onSubmit={(e)=>{
          e.preventDefault(); 
          convert();
         }}>
          <div className='w-full mb-1'>
            <InputBox
             label='from'
             amount={amount}
             currencyOptions={options}
             onCurrencyChange={(currency)=>setFrom(currency)}
             onAmountChange={(amount)=>setAmount(amount)}
             selectedCurrency={from}
             className='mb-3'
            />
          </div>
          <div className='relative w-full h-0.5'>
            <button onClick={swap} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-1 rounded-full'>Swap</button>
          </div>
          <div className='w-full mb-1'>
            <InputBox
             label='to'
             amount={convertedAmount}
             currencyOptions={options}
             onCurrencyChange={(currency)=>setTo(currency)}
             selectedCurrency={to}
             className='mb-3'
             amountDisabled={true}
            />
            <button type='submit' className='w-full bg-blue-500 text-white rounded-lg p-2'>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
          </div>
         </form>

        </div>
      </div>
    </div>
  );
  
}

export default App
