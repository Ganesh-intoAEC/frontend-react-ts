import React from 'react';

const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 422 358" {...props}>
    <g>
        <path d="M403,179.99c-3.04,8.98-9.39,12.41-18.7,12.09c-11.6-0.39-23.23-0.05-34.84-0.13c-2.12-0.02-3.22,0.53-4.18,2.62   c-8.24,17.82-22.3,27.08-41.91,27.36c-11.97,0.17-24.05,0.6-35.91-0.71c-16.07-1.77-27.46-11.18-34.34-25.74   c-1.27-2.7-2.53-3.56-5.46-3.55c-63.32,0.09-126.64-0.02-189.96,0.17c-9.29,0.03-15.67-3.11-18.7-12.1c0-2,0-4,0-6   c3.02-9,9.4-12.13,18.69-12.1c63.08,0.2,126.15,0.08,189.23,0.16c3.15,0,4.84-0.62,6.41-3.86c8.04-16.63,21.58-25.57,40.07-26.08   c12.34-0.34,24.8-0.66,37.03,0.65c16.4,1.75,27.87,11.41,34.71,26.32c1.09,2.38,2.27,3,4.7,2.98c11.49-0.12,22.99,0.24,34.47-0.15   c9.31-0.31,15.68,3.09,18.7,12.09C403,175.99,403,177.99,403,179.99z M288.79,191.98c4.99,0,9.98,0.06,14.97-0.01   c8.73-0.14,15.31-6.73,15.22-15.16c-0.08-8.26-6.63-14.73-15.19-14.8c-9.86-0.09-19.71-0.09-29.57,0   c-8.56,0.08-15.12,6.53-15.22,14.77c-0.1,8.42,6.48,15.05,15.18,15.19C279.06,192.05,283.93,191.98,288.79,191.98z"/>
        <path d="M403,300c-3.04,8.98-9.4,12.13-18.7,12.1c-61.32-0.2-122.65-0.08-183.97-0.17c-2.93,0-4.16,0.89-5.46,3.56   c-8.11,16.76-21.6,25.9-40.26,26.41c-12.34,0.34-24.8,0.67-37.03-0.66c-16.37-1.78-27.88-11.39-34.72-26.32   c-1.09-2.38-2.27-2.99-4.7-2.97c-13.49,0.11-26.98-0.23-40.46,0.15c-9.31,0.26-15.67-3.1-18.7-12.1c0-2,0-4,0-6   c3.02-9,9.39-12.36,18.69-12.1c13.48,0.38,26.98,0.04,40.47,0.15c2.43,0.02,3.59-0.61,4.7-2.97c8.06-17.15,21.68-26.46,40.65-26.97   c12.46-0.34,25.05-0.63,37.4,0.72c15.62,1.71,26.84,10.88,33.59,25.02c1.61,3.38,3.38,4.24,6.94,4.24   c60.95-0.12,121.91,0.01,182.86-0.19c9.29-0.03,15.68,3.1,18.7,12.1C403,296,403,298,403,300z M138.92,282   c-4.87,0-9.73-0.05-14.6,0.01c-8.74,0.12-15.35,6.65-15.31,15.06c0.04,8.26,6.56,14.81,15.09,14.9c9.98,0.11,19.96,0.12,29.94-0.01   c8.48-0.11,14.98-6.78,14.94-15.05c-0.04-8.27-6.56-14.76-15.09-14.9C148.9,281.93,143.91,282,138.92,282z"/>
        <path d="M19,53.98c3.02-9,9.39-12.36,18.7-12.1c13.61,0.38,27.23,0.06,40.84,0.14c2.12,0.01,3.22-0.53,4.18-2.62   c8.16-17.67,22.09-27,41.54-27.34c12.34-0.22,24.83-0.71,37.03,0.8c22.88,2.83,39.27,24.3,37.62,47.48   c-1.63,22.83-21.02,41.36-43.9,41.57c-12.6,0.12-25.31,0.64-37.78-0.75c-16.22-1.81-27.59-11.46-34.36-26.24   c-1.08-2.37-2.25-3.01-4.69-2.99c-13.49,0.11-26.99-0.23-40.47,0.15c-9.31,0.26-15.68-3.1-18.7-12.1C19,57.98,19,55.98,19,53.98z    M139.33,41.98c-5.12,0-10.23-0.08-15.35,0.02c-8.48,0.16-14.99,6.75-14.97,15.02c0.02,8.26,6.54,14.84,15.05,14.93   c9.98,0.11,19.96,0.12,29.94,0c8.49-0.1,15-6.75,14.98-15.01c-0.02-8.27-6.54-14.79-15.06-14.94   C149.06,41.91,144.2,41.98,139.33,41.98z"/>
        <path d="M403,59.98c-3.04,8.99-9.41,12.15-18.72,12.11c-46.37-0.23-92.73-0.12-139.1-0.09c-6.76,0-11.91-2.65-14.79-8.87   c-4.53-9.78,2.42-20.86,13.3-21.1c8.87-0.19,17.75-0.05,26.62-0.05c37.99,0,75.99,0.15,113.98-0.11   c9.3-0.06,15.69,3.09,18.71,12.11C403,55.98,403,57.98,403,59.98z"/>
    </g>
    </svg>
);

export default FilterIcon;

