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
        // Here, we check if there's an onEnd callback provided and if the timer just reached zero
        // We only want to call onEnd if the countdown actually finished (difference <= 0)
        // This condition prevents calling onEnd more than once
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

    // Cleanup on component unmount
    return () => clearInterval(timer);
  }, [endTime, timeLeft, onEnd]); // Added timeLeft and onEnd to the dependency array to ensure the effect is aware of their updates

  return (
    <>
      {timeLeft}
    </>
  );
};

export default CountdownTimer;