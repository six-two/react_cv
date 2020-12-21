import { useState } from 'react';
import menuIcon from '../img/menu.svg';
import Sidebar from './Sidebar';

interface Props {
    children: any,
}

const SidebarManager = (props: Props) => {
    const [visible, setVisible] = useState(true);
    const toggleMenu = () => setVisible(!visible);

    const rootClassName = "sidebar-manager " + (visible ? "show-sidebar" : "hide-sidebar");
    return <div className={rootClassName}>
        <div className="side">
            <div
                className="menu-trigger"
                onClick={toggleMenu} >
                <img
                    src={menuIcon}
                    alt="Menu Trigger" />
            </div>
            <Sidebar />
        </div>
        <div className="app-content">
            {props.children}
        </div>
    </div>
}

export default SidebarManager;
