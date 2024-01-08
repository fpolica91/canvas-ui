import * as React from "react";
import type { SVGProps } from "react";
const SvgAwsLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path fill="url(#aws_logo_svg__a)" d="M0 0h40v40H0z" />
    <defs>
      <pattern
        id="aws_logo_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#aws_logo_svg__b" transform="scale(.025)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAEgElEQVRYCWNU0bdjGAjANBCWguwctZhuIT8a1KNBTbMQGE1ckKBVlJftaq46sH3V1VN7DmxbWZybyszMrKGmsnTuRHMTA4gaHw9nINdATwvC9XB1AHL5+fmkJMSn9DSdObj58slda5fMsDI3xhpdLFhFDfV1/v//N2navC9fv9pamWUkx7x7/3H1+q1G+jr+3m4nz1wA6gr29zQzNvB0dbxw6RqQGx7kA7Ty48dPi2b2CQsJdvRP//Tps6a6qqiIMFYrsFu8btN2IIJo2LXvsK21uZW50fwlq06cPg/xATMTE9ARZ85fNjHSAypjZWU1NtRdvnoTkKGuqgR04poN24DiQL1YbQUKYrcYKAF0tbGBDg8Pz4uXr4BuFxTgBwru2X+koapQRlpSSICfjY115rylMya0cnFx6mqpc3Jw7Np76Pfv3wcOnwgN9Aa6YOvOfcdPnfvz5w9Wu7Fb7Opo29tW8+79h7v3Hwnw86ooyV+/eQdk8YEj9ZUFQE/zcHNdvnbz+Kmz//79A3rd1Fj/9Zt35y9dBaopqW7NSo3183IFxsXrN2/L6zoOHzuFaTcj1obAkV1rf/365eoX/fffP6CeDctn//37NzgmA8het2zWw4dPODjZ79572DNp1vJ5k0+dvWBlbnL95u261j64BYyMjMBk2NFY8ePnT4/AOLg4nIElHzMxMQkJ8j9++hxiq4qSgqqyIi8vD0TPnn2HLcyMTA31Tp+7CBQB2upoZ6WrowGPTmAUAMX///8PTBDAoBYXEwE6Am4fnIElqIGht+/gMVcn25kT2799+26or33m/CVg8MrJSj16/AwY2oU5KUA3AVMW0BRgCs9Kjfv0+QvQGiBXWVF+zZLpQPtev36nrCRvaqQ3Y+4SoCPg9sEZ2IOag509OjwA6NG79x9u3Lr758+fQIu37z4A0QZMO9+//9iyYy+QC8zf0WH+Dx8/PXjkJETW2sLEztpcQlwUmLX2HTp+4PBxiDgaid1iNEW04GIJampZAyxPtDRUOTk5bt99cOMWKFMgAywWG+ppX7h8DWvEIOvEzw7wcXOytwZma011FRkpST1LdzT1zEIS8mhCpkb6DVVF3759u/fgEdnW37h1F5gmgEXK/YePjQx0lqxcj2YLFotv3bl39vyl2vK8xJhQPj7et+/ev//wEU0bQa6sjFRsRFBeRuKvX78fPHwMSfPIunAmLmB2TImLSIoNA1Y4N2/fO3zs5JVrt65evwVMwLiCQUxUREdLDVhzWJgaamuq7T90rLV7SllBRk1zD6bTcVoMcR2wHI4JD0yOCxcSFICIAOurV6/efvz8+SMw8375ysbGBiw+gSW5vKw0UDFQDbCMO3T05KLl644cPw0sOhQVZO/dfwTRi0wSsBiilIWFBVgg21mbATOohpoy1pIIWFZfvHLt5OkLW3bsefP2PbIdWNlEWYysE5g9REWERISERESEuLk4P3z8/OHDxxevXj9/8QpZGUE2yRYTNJFIBVgqCSJ1Uqhs1GIKA5B47aNBTXxYUahy5AU1AD0k0AuulD18AAAAAElFTkSuQmCC"
        id="aws_logo_svg__b"
        width={40}
        height={40}
      />
    </defs>
  </svg>
);
export default SvgAwsLogo;
