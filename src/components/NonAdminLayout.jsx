import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

//Använder AOS-biblioteket för att få till en fade effekt när man byter sida för en behagligare navigering
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

