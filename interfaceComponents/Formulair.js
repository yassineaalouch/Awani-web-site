import { useEffect, useState } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isPossiblePhoneNumber } from 'react-phone-number-input'


export default function Formulair(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [company_Name, setCompany_Name] = useState('');
  const [telephone, setTelephone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [invalidPhoneNumber,setInvalidPhoneNumber] = useState(false)
  const [emailCount, setEmailCount] = useState(0);
  const emailLimit = 5;
  const resetTime = 2 * 60 * 1000; // 4 minutes en millisecondes

  useEffect(() => {
    const storedCount = localStorage.getItem('emailCount');
    const storedTime = localStorage.getItem('emailTimestamp');
    const currentTime = new Date().getTime();

    if (storedCount) {
      if (currentTime - storedTime > resetTime) {
        localStorage.setItem('emailCount', 0);
        setEmailCount(0);
      } else {
        setEmailCount(parseInt(storedCount, 10));
      }
    }
  },[]);

  async function sendUserMessage(ev) {
    ev.preventDefault();
    if(telephone&&isPossiblePhoneNumber(telephone)===true){
    const currentTime = new Date().getTime();
    const storedTime = localStorage.getItem('emailTimestamp') || currentTime;
    
    if (emailCount >= emailLimit) {
      if (currentTime - storedTime > resetTime) {
        // Réinitialiser le compteur si plus de 4 minutes se sont écoulées
        localStorage.setItem('emailCount', 0);
        setEmailCount(0);
      } else {
        alert('You have reached the email limit. Please wait 4 minutes before trying again.');
        return;
      }
    }

    setIsLoading(true);
    const messageData = { email, company_Name, telephone, subject, message };
    
    if (!props.blacklist.includes(email)) {
      await axios.post('/api/usersEmailsHandler', messageData,{ headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }});
      const newCount = emailCount + 1;
      setEmailCount(newCount);
      localStorage.setItem('emailCount', newCount);
      localStorage.setItem('emailTimestamp', currentTime);
    }

    setIsLoading(false);
    setEmail('');
    setCompany_Name('');
    setTelephone('');
    setSubject('');
    setMessage('');
    setInvalidPhoneNumber(false)
  }else{
    setInvalidPhoneNumber(true)
  }
  }

  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 mb-4 sm:p-8 max-w-lg w-fit ${props.className}`}>
      <h2 className="text-2xl font-bold mb-6 text-yellow-500">Contact Us</h2>
      
      <form onSubmit={sendUserMessage} className="w-fit lg:w-96 space-y-2 lg:space-y-6">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-6">
          <div className="block">
            <label htmlFor="email" className="block text-md font-semibold text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-[250px] sm:w-[320px] md:w-[400px] lg:w-full px-4 py-2 outline-none text-md border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="lg:block">
            <label htmlFor="Company_Name" className="block text-md font-semibold outline-none text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              id="Company_Name"
              name="Company_Name"
              onChange={(e) => setCompany_Name(e.target.value)}
              value={company_Name}
              className="w-[250px] sm:w-[320px] md:w-[400px] lg:w-full px-4 py-2 text-md outline-none border  border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Company Name"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-2 lg:gap-6">
          <div className="block">
            <label htmlFor="Telephone" className="block text-md font-semibold text-gray-700 mb-2">Telephone *</label>
            <PhoneInput
              defaultCountry={'MA'}
              id="Telephone"
              name="Telephone"
              onChange={(e) => setTelephone(e)}
              value={telephone}
              required 
              autoCompleteType="tel"
              keyboardType="phone-pad"
              className="w-[250px] sm:w-[320px] md:w-[400px] lg:w-full px-2 py-2 text-md border outline-none border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="enter your phone"
            />
          </div>

          <div className="block">
            <label htmlFor="subject" className="block text-md font-semibold text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              className="w-[250px] outline-none sm:w-[320px] md:w-[400px] lg:w-full px-4 py-2 text-md border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="subject"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-md font-semibold text-gray-700 mb-2">Message *</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="w-[250px] outline-none sm:w-[320px] md:w-[400px] lg:w-full px-4 py-2 text-md border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Your message here..."
          ></textarea>
        {invalidPhoneNumber&&<div className=" text-red-500 text-sm mb-0 mt-0">Invalid phone number</div>}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-[250px] sm:w-[320px] md:w-[400px] lg:w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200"
        >
          {isLoading ? 'Sending...' : 'Send message'}
        </button>
      </form>
    </div>
  );
}
