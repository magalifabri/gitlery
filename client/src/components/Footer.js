import React from 'react';
import {motion} from 'framer-motion';
import '../styling/Footer.scss';


const Footer = ({setInfoModalVisible}) => {
    return (
        <>


            <footer className="footer">
                <motion.span className="footer__info-link btn"
                      onClick={() => setInfoModalVisible(true)}
                             layout
                >info</motion.span>
            </footer>
        </>
    );
};

export default Footer;
