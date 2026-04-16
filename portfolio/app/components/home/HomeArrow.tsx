import React from "react";

interface ArrowProps {
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const NameArrow: React.FC<ArrowProps> = ({ animated = false, className = "", style }) => (
  <svg width="540" height="102" viewBox="0 0 540 102" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <style>{`
      .draw-segment {
        stroke: #F5900B;
        stroke-width: 2;
        stroke-linecap: round;
        fill: none;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation-name: draw;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
      .main {
        animation-duration: 0.5s;
        animation-delay: 0s;
      }
      .head-a {
        animation-duration: 0.05s;
        animation-delay: 0.5s;
      }
      .head-b {
        animation-duration: 0.05s;
        animation-delay: 0.55s;
      }
      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>
    <path
      className={animated ? "draw-segment main" : undefined}
      pathLength={1}
      d="M1 92.2152C79.5 52.2153 209.321 148.269 261.211 64.5991C303 -2.7844 240 -8.78449 231 10.7155C209.648 56.9791 284.188 109.699 393 92.2154C501.812 74.7314 469.602 28.7192 538.5 32.7153"
    />
    <line
      className={animated ? "draw-segment head-a" : undefined}
      pathLength={1}
      x1={538.755}
      y1={32.6284}
      x2={532.413}
      y2={38.4784}
    />
    <line
      className={animated ? "draw-segment head-b" : undefined}
      pathLength={1}
      x1={533.35}
      y1={26.3403}
      x2={538.857}
      y2={32.4159}
    />
  </svg>
);

const BuildArrow: React.FC<ArrowProps> = ({
  animated = false,
  className = "",
  style,
}) => (
  <svg
    width="508"
    height="114"
    viewBox="0 0 508 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <style>{`
      .draw-segment {
        stroke: #0CAEFF;
        stroke-width: 2;
        stroke-linecap: round;
        fill: none;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation-name: draw;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }

      .main {
        animation-duration: 0.5s;
        animation-delay: 0s;
      }

      .head-a {
        animation-duration: 0.05s;
        animation-delay: 0.5s;
      }

      .head-b {
        animation-duration: 0.05s;
        animation-delay: 0.55s;
      }

      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>

    {/* MAIN CURVE */}
    <path
      className={animated ? "draw-segment main" : undefined}
      pathLength={1}
      d="M0 112.582C35.5499 112.582 110.5 117.082 169.232 65.8317C224.305 17.7752 262.369 -17.574 370.5 11.5818C449.065 32.7656 500.575 76.5603 506.5 80.5818"
    />

    {/* ARROW HEAD */}
    <line
      className={animated ? "draw-segment head-a" : undefined}
      pathLength={1}
      x1="505.163"
      y1="71.387"
      x2="506.805"
      y2="80.4193"
    />

    <line
      className={animated ? "draw-segment head-b" : undefined}
      pathLength={1}
      x1="498.784"
      y1="82.4053"
      x2="506.823"
      y2="80.7976"
    />
  </svg>
);

const DesignArrow: React.FC<ArrowProps> = ({
  animated = false,
  className = "",
  style,
}) => (
  <svg
    width="244"
    height="153"
    viewBox="0 0 244 153"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <style>{`
      .draw-segment {
        stroke: #1BAD0B;
        stroke-width: 2;
        stroke-linecap: round;
        fill: none;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation-name: draw;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }

      .main {
        animation-duration: 0.5s;
        animation-delay: 0s;
      }

      .head-a {
        animation-duration: 0.05s;
        animation-delay: 0.5s;
      }

      .head-b {
        animation-duration: 0.05s;
        animation-delay: 0.55s;
      }

      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>

    {/* MAIN CURVE */}
    <path
      className={animated ? "draw-segment main" : undefined}
      pathLength={1}
      d="M0.0839844 151.406C18.084 152.906 48.6087 111.473 98.584 128.906C163.084 151.406 160.02 125.244 152.584 70.4058C144.584 11.4059 218.584 5.40593 241.584 7.90593"
    />

    {/* ARROW HEAD */}
    <line
      className={animated ? "draw-segment head-a" : undefined}
      pathLength={1}
      x1="242.838"
      y1="8.29846"
      x2="234.477"
      y2="14.1515"
    />

    <line
      className={animated ? "draw-segment head-b" : undefined}
      pathLength={1}
      x1="236.495"
      y1="0.999834"
      x2="242.751"
      y2="8.14931"
    />
  </svg>
);

export { NameArrow, BuildArrow, DesignArrow };
  