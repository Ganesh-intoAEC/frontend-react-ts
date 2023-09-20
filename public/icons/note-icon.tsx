import React from 'react';

const NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 12 12"  {...props}>
    <g clip-path="url(#clip0_1349_33392)">
      <path d="M7 1L10 4L10 10C10 10.55 9.55 11 9 11L2.995 11C2.445 11 2 10.55 2 10L2.005 2C2.005 1.45 2.45 1 3 1L7 1ZM9.25 4.5L6.5 1.75L6.5 4.5L9.25 4.5Z"  />
    </g>
    <defs>
      <clipPath id="clip0_1349_33392">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export default NoteIcon;