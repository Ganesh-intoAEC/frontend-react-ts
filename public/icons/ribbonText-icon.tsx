import React from 'react';

const RibbonTextIcon:  React.FC<{ RibbonLabel: string } & React.SVGProps<SVGSVGElement>> = ({ RibbonLabel, ...props }) => (
    
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 25" width='90px' height='30px' {...props}>
  <path  clip-rule="evenodd" d="M100 12.5204L87.7005 24.9803V24.9854H87.6954L87.681 25V24.9854H0V24.9493L12.2949 12.4878L0 0.0263396V0.0136719H87.681V0L87.6945 0.0136719H87.7005V0.0197886L100 12.5204Z" />
  <text x="33" y="16" fill="#ffffff"> {/* Adjust the position and styling as needed */}
      {RibbonLabel}
    </text>
</svg>
);

export default RibbonTextIcon;








