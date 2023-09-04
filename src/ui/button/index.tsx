import cx from 'classnames';
import s from './button.module.css';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className,
}) => {
  if (!children) return null;
  return (
    <button className={cx(s.root, className)} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
