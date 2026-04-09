import React from 'react';

type ToolTipProps = {
  tooltipText: string;
};

export default function ToolTip({ tooltipText }: ToolTipProps) {
  return (
    <div
      className='absolute inline-block px-1.25 py-0.5 rounded bg-[#E9E6DE] text-sm font-sans text-detail-color shadow-[0_0_4px_0_rgba(204,202,193,0.5)] w-max'
    >
      {tooltipText}
    </div>
  );
}

