import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';
// Use public folder path for logo
const logo = '/saridena/photos/saridena_logo.png';

const Loader: React.FC = () => {
  return (
    <motion.div
      className="loader-container"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={logo}
        alt="Logo"
        className="loader-logo-center"
        layoutId="main-logo"
        transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
      />
      <div className="progress-bar-container">
        <motion.div
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;