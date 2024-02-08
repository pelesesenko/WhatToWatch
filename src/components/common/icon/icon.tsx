import React, {FC} from 'react';

export const IconProps = {
  fullScreen: {id: 'full-screen', width: '27', height: '27'} as const,
  exitFullScreen: {id: 'exit-full-screen', width: '27', height: '27'} as const,
  add: {id: 'add', width: '19', height: '20'} as const,
  added: {id: 'in-list', width: '18', height: '14'} as const,
  pause: {id: 'pause', width: '14', height: '21'} as const,
  play: {id: 'play', width: '19', height: '19'} as const,
} as const;

type Props = typeof IconProps[keyof typeof IconProps]

const Icon:FC<Props> = ({width, height, id}) => (
  <svg
    data-testid = 'icon-svg'
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
  >
    <use
      data-testid = 'icon-use'
      xlinkHref={`#${id}`}
    />
  </svg>
);

export default Icon;
