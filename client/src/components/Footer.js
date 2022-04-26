import React from 'react';
import {motion} from 'framer-motion';
import '../styling/Footer.scss';


const Footer = ({setModalVisible}) => {
    return (
        <>


            <footer className="footer">
                <motion.span className="footer__info-link"
                      onClick={() => setModalVisible(true)}
                             layout
                >info</motion.span>
            </footer>
        </>
    );
};

export default Footer;
