import { useEffect, useState } from 'react';

const CountdownTimer = ({ endTime, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endTime).getTime();
      const now = new Date().getTime();
      const difference = end - now;

      if (difference > 0) {
        const timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };

        return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
      } else {
        
        if (onEnd && timeLeft !== 'Auktionen har avslutats.') {
          onEnd();
        }
        return 'Auktionen har avslutats.';
      }
    };

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

export default CountdownTimer;