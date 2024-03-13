import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function NonAdminLayout ({ children }){
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });
  }, []);

  return (
    <>
      <div data-aos="fade">{children}</div>
    </>
  );
};

