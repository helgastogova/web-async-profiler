import React from 'react';
import s from './loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={s.loader}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Loader;
