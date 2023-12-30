import * as React from "react";
import type { SVGProps } from "react";
const SvgS3Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#s3_icon_svg__a)">
      <path fill="#7AA116" d="M24 0H0v24h24z" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="m17.908 13.051.041-.244c.266.153.47.282.615.385a9.442 9.442 0 0 1-.656-.141m-1.859 5.042c-.05.303-1.07.907-4.571.907-3.434 0-4.435-.603-4.485-.91L5.259 7.965C6.696 8.668 9.152 9 11.5 9c2.35 0 4.811-.334 6.248-1.038l-.808 4.813c-1.555-.508-3.372-1.377-4.296-1.82l-.17-.082A.989.989 0 0 0 11.5 10a1.001 1.001 0 0 0 0 2 .974.974 0 0 0 .579-.207l.134.064c.971.466 2.906 1.39 4.56 1.913zM11.5 5c4.261 0 6.471 1.037 6.5 1.49v.029C17.946 6.977 15.735 8 11.5 8 7.27 8 5.059 6.98 5 6.521v-.032C5.03 6.035 7.242 5 11.5 5M19 6.5C19 4.782 15.112 4 11.5 4 7.887 4 4 4.782 4 6.5l.047.316 1.96 11.439C6.197 19.425 7.936 20 11.478 20c4.729 0 5.436-1.009 5.557-1.743l.707-4.214c.578.14.989.196 1.281.196.462 0 .638-.135.76-.279a.729.729 0 0 0 .159-.617c-.093-.475-.612-.927-1.817-1.583l.829-4.946z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="s3_icon_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgS3Icon;