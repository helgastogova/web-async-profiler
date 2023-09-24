import { IconType } from './types';

const ArrowIcon = ({ className, width, height, fill }: IconType) => {
  return (
    <svg
      className={className}
      width={width ?? 20}
      height={height ?? 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33331 13.3333L11.6666 9.99999L8.33331 6.66666"
        stroke={fill ?? '#A4A6B1'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
