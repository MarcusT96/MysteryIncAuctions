import { useEffect, useState } from 'react';

export default function CountdownTimer({ endTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState('');

  // Använder useEffect hook för att sätta upp en timer som uppdaterar återstående tid varje sekund
  useEffect(() => {
    // Definiera en funktion för att beräkna återstående tid till endTime
    const calculateTimeLeft = () => {
      // Konvertera endTime prop till en tidsstämpel
      const end = new Date(endTime).getTime();
      // Hämta den aktuella tiden som en tidsstämpel
      const now = new Date().getTime();
      // Beräkna skillnaden mellan sluttiden och den nuvarande tiden
      const difference = end - now;

      // Om skillnaden är positiv har sluttiden inte nåtts ännu
      if (difference > 0) {
        // Beräknar dagar, timmar, minuter och sekunder som är kvar
        const timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };

        // Returnera den återstående tiden i ett formaterat strängformat
        return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
      } else {
        // Om skillnaden är negativ eller noll har sluttiden nåtts

        // Anropar onEnd callback om den finns och om timeLeft statet inte redan är satt till avslutningsmeddelandet
        if (onEnd && timeLeft !== 'Auktionen har avslutats.') {
          onEnd();
        }
    
        return 'Auktionen har avslutats.';
      }
    };

    // Ställ in en timer som uppdaterar den återstående tiden varje sekund
    const timer = setInterval(() => {
      const countdown = calculateTimeLeft();
      setTimeLeft(countdown);
    }, 1000);

   
    return () => clearInterval(timer);
  }, [endTime, timeLeft, onEnd]); 

  
  return (
    <>
      {timeLeft}
    </>
  );
};

