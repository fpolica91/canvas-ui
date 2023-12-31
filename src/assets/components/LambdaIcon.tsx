import * as React from "react";
import type { SVGProps } from "react";
const SvgLambdaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <g clipPath="url(#lambda_icon_svg__a)">
      <path fill="#ED7100" d="M64 0H0v64h64z" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M22.68 52h-9.106l10.264-21.59 4.562 9.451zm2.047-24.333a.994.994 0 0 0-.896-.564h-.003a.994.994 0 0 0-.896.569L11.097 52.569A1.002 1.002 0 0 0 11.996 54H23.31a.997.997 0 0 0 .9-.572l6.194-13.144a1.003 1.003 0 0 0-.005-.864zM51.008 52h-9.022L26.955 19.578a.996.996 0 0 0-.902-.578h-5.925l.007-7h11.68l14.96 32.42c.163.354.516.58.904.58h3.33zm.996-9h-3.69l-14.96-32.42a.995.995 0 0 0-.903-.58H19.14a.999.999 0 0 0-.996.999l-.008 9A.993.993 0 0 0 19.131 21h6.286l15.03 32.422a.995.995 0 0 0 .903.578h10.654c.55 0 .996-.448.996-1v-9c0-.552-.445-1-.996-1"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="lambda_icon_svg__a">
        <path fill="#fff" d="M0 0h64v64H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLambdaIcon;
