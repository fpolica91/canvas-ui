import * as React from "react";
import type { SVGProps } from "react";
const SvgLambdaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#lambda_icon_svg__a)">
      <path fill="#ED7100" d="M24 0H0v24h24z" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.355 19H5.334l3.543-7.194 1.512 3.026zm.982-8.565a.518.518 0 0 0-.464-.282H8.87a.517.517 0 0 0-.464.284L4.05 19.285a.488.488 0 0 0 .03.482.52.52 0 0 0 .436.233H8.68c.2 0 .381-.111.467-.286l2.28-4.671a.492.492 0 0 0-.002-.432zM18.968 19h-3.17L10.176 7.289A.518.518 0 0 0 9.707 7H7.616l.002-2h4.17l5.599 11.71c.084.177.268.29.468.29h1.113zm.516-3h-1.3L12.587 4.29a.519.519 0 0 0-.47-.29H7.103a.508.508 0 0 0-.516.5l-.003 3c0 .132.055.259.152.354A.524.524 0 0 0 7.1 8h2.278l5.624 11.711a.518.518 0 0 0 .468.289h4.014a.508.508 0 0 0 .516-.5v-3c0-.276-.231-.5-.516-.5"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="lambda_icon_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLambdaIcon;
