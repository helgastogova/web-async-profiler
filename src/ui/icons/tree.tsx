import { IconType } from './types';

const TreeIcon = ({ className, width, height, fill }: IconType) => {
  return (
    <svg
      className={className}
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <path
          id="Path"
          d="M9 17H5C3.89543 17 3 16.1046 3 15V3"
          stroke={fill ?? '#A4A6B1'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Path_2"
          d="M9 7H3"
          stroke={fill ?? '#A4A6B1'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Path_3"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21 8.5V5C21 4.17157 20.3284 3.5 19.5 3.5H17.4381C17.1071 3.5 16.7975 3.33616 16.6113 3.06243L16.1863 2.43757C16.0001 2.16383 15.6905 1.99999 15.3594 2H13.5C12.6716 2 12 2.67157 12 3.5V8.5C12 9.32843 12.6716 10 13.5 10H19.5C20.3284 10 21 9.32843 21 8.5Z"
          stroke={fill ?? '#A4A6B1'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Path_4"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21 19.5V16C21 15.1716 20.3284 14.5 19.5 14.5H17.4381C17.1071 14.5 16.7975 14.3362 16.6113 14.0624L16.1863 13.4376C16.0001 13.1638 15.6905 13 15.3594 13H13.5C12.6716 13 12 13.6716 12 14.5V19.5C12 20.3284 12.6716 21 13.5 21H19.5C20.3284 21 21 20.3284 21 19.5Z"
          stroke={fill ?? '#A4A6B1'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default TreeIcon;
