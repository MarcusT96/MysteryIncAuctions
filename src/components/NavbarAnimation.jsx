import { useEffect } from "react";

function useScrollDirection(isAdminDashboard = false) {
    useEffect(() => {
        if (isAdminDashboard) return;

        let lastScrollY = window.scrollY;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const header = document.querySelector('.app__navbar');

            if (!header) return;

            if (scrollY > lastScrollY) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener('scroll', updateScrollDirection);

        return () => window.removeEventListener('scroll', updateScrollDirection);
    }, [isAdminDashboard]);
}

export default useScrollDirection;
