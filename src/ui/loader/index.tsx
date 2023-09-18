import React from 'react';
import cx from 'classnames';
import s from './loader.module.css';

const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cx(s.loader, className)}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Loader;
