import React from "react";

type AnimatedNameProps = {
  animated?: boolean;
  size?: number;
};

export const AnimatedName: React.FC<AnimatedNameProps> = ({ animated = false, size }) => {
  const svgProps = size
    ? { width: size, height: Math.round(size * (60 / 111)) }
    : {};
  return (
    <svg
      viewBox="0 0 111 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={size ? undefined : "w-32"}
      {...svgProps}
    >
      {animated && (
      <style>{`
        .draw-path {
          fill: none;
          stroke: #F5900B;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: var(--length);
          stroke-dashoffset: var(--length);
          animation: draw var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .path-0 { --length: 140; --duration: 0.5s; animation-delay: 0s; }
        .path-1 { --length: 180; --duration: 0.45s; animation-delay: 0.3s; }
        .path-2 { --length: 200; --duration: 0.55s; animation-delay: 0.50s; }
        .path-3 { --length: 150; --duration: 0.4s; animation-delay: 0.8s; }
        .path-4 { --length: 200; --duration: 0.45s; animation-delay: 0.95s; }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    )}
    <path
      className={animated ? "draw-path path-0" : undefined}
      style={!animated ? { fill: "none", stroke: "#F5900B", strokeWidth: 3, strokeLinecap: "round" } : undefined}
      d="M18.9077 21.7327C12.9168 15.6807 -0.287236 23.68 6.81275 30.3455C14.4993 37.5616 15.0645 38.4924 18.9077 42.9151C23.4925 48.1911 17.2122 55.6014 12.2385 56.4162C7.2649 57.2309 3.53467 55.1359 1.5 50.3639"
    />
    <path
      className={animated ? "draw-path path-1" : undefined}
      style={!animated ? { fill: "none", stroke: "#F5900B", strokeWidth: 3, strokeLinecap: "round" } : undefined}
      d="M34.0536 37.8361C33.2307 33.2548 28.4104 32.9783 25.4011 42.9008C21.6394 55.304 24.4607 56.1979 25.4011 56.4214C26.3415 56.6449 32.3365 50.9461 34.0998 45.3591C35.8631 39.7721 35.9806 35.3025 35.1578 35.3025C34.3349 35.3025 31.1626 48.1927 31.8663 51.7283C32.6892 55.8627 34.5 56.5879 35.1578 57.0918"
    />
    <path
      className={animated ? "draw-path path-2" : undefined}
      style={!animated ? { fill: "none", stroke: "#F5900B", strokeWidth: 3, strokeLinecap: "round" } : undefined}
      d="M41.0746 38.7373C41.2313 43.6539 41.3567 54.0234 40.6044 56.1688C39.664 58.8505 45.3064 36.1673 48.3628 36.6143C51.4191 37.0612 48.0101 55.3866 47.8925 56.6157C47.775 57.8449 52.8297 35.7204 56.8264 36.6143C60.8232 37.5082 58.3546 54.3809 58.5897 55.0514"
    />
    <path
      className={animated ? "draw-path path-3" : undefined}
      style={!animated ? { fill: "none", stroke: "#F5900B", strokeWidth: 3, strokeLinecap: "round" } : undefined}
      d="M64.0208 38.2732C63.2723 44.8979 62.7591 58.0332 66.6941 57.5763C70.6291 57.1194 73.5376 44.0603 74.5 37.5879"
    />
    <path
      className={animated ? "draw-path path-4" : undefined}
      style={!animated ? { fill: "none", stroke: "#F5900B", strokeWidth: 3, strokeLinecap: "round" } : undefined}
      d="M77.6686 47.8779C80.7412 47.1917 85.3602 44.6272 86.8864 43.0746C89.3595 40.5586 90.8201 32.3244 85.0871 33.8111C79.3541 35.2978 77.1926 43.0525 76.7693 46.2768C76.3189 49.7077 75.7566 57.7131 81.2648 56.4551C85.6713 55.4487 90.9322 49.3647 94.7552 44.9044C101.837 31.257 111.018 2.59413 108.5 1.58773C105.352 0.329726 100.083 12.8854 97.5645 25.8057C93.5742 46.2769 95.5967 53.7661 97.1148 55.3115C99.0248 57.2557 101.162 56.9126 105.995 54.1678"
    />
    </svg>
  );
};