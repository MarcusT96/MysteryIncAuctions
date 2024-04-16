import './Sidebar.css';
import './admin.css'

import React, { useState } from 'react';
import { adminIcons } from '../Data/Data';
import { LiaUserSecretSolid } from "react-icons/lia";
import { VscSignOut } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [selected, setSelected] = useState(0)
    const [expanded, setExpanded] = useState(true)
    const navigate = useNavigate();

    const sidebarVariants = {
        true: { left: '0' },
        false: { left: '-60%' }
    };

    const handleNavigation = (index) => {
        setSelected(index);
        const item = adminIcons[index];

        if (item.heading === "Startsida") {
            navigate('/dashboard');
        }
        if (item.heading === "Beställningar") {
            navigate('/dashboard/orders');
        }
        if (item.heading === "Användare") {
            navigate('/dashboard/users');
        }
        if (item.heading === "Produkter") {
            navigate('/dashboard/products');
        }

    };

    const handleLogout = () => {
        navigate('/profile');
    };

    return (
        <>
            <div className="app__sidebar-bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
                <RxHamburgerMenu />
            </div>
            <motion.div className='app__sidebar-sidebar'
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                <div className="app__sidebar-logo">
                    <LiaUserSecretSolid className="app__sidebar-icons" fontSize={30} />
                    <span>Ad<span>m</span>in</span>
                </div>

                <div className="app__sidebar-menu">
                    {adminIcons.map((item, index) => (
                        <div
                            className={selected === index ? "app__sidebar-menuItem active" : "app__sidebar-menuItem"}
                            key={index}
                            onClick={() => handleNavigation(index)}
                        >
                            <item.icon fontSize={20} />
                            <span>{item.heading}</span>
                        </div>
                    ))}
                    <button className="app__sidebar-logout" onClick={handleLogout}>
                        <VscSignOut fontSize={30} />
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
