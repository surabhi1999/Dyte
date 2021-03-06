import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import { Data } from './Data';
import './Navbar.css';


function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <div className="navbar">
          <Link to="#" className="menu-bar">
              <FaIcons.FaBars onClick={showSidebar}/>
              </Link>  
        </div>

        <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className="navbar-toggle">
                 <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                 </Link>
                </li>
                {Data.map((obj, index) => {
                  return (
                <li key={index} className={obj.cName}>
                  <Link to={obj.path}>
                    {obj.icon}
                    <span>{obj.title}</span>
                  </Link>
                </li>
              );
            })}

            </ul>
        </nav>
        </>
    )
}

export default Navbar
