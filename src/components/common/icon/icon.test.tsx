import React from 'react';
import {render, screen} from '../../../tests/utils';
import Icon from './icon';

const id = 'add';
const width = '19';
const height = '20';

describe('Icon component should render', () => {

  it('svg element with correct attributes', () => {
    render(<Icon id={id} width={width} height={height} />);

    const svg = screen.getByTestId('icon-svg');

    expect(svg).toHaveAttribute('viewBox', `0 0 ${width} ${height}`);
    expect(svg).toHaveAttribute('width', width);
    expect(svg).toHaveAttribute('height', height);
  });

  it('use element with correct attribute', () => {
    render(<Icon id={id} width={width} height={height} />);

    expect(screen.getByTestId('icon-use')).toHaveAttribute('xlink:href', `#${id}`);
  });
});

