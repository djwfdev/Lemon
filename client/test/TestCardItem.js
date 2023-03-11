import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';

import CardItem from '../src/components/CardItem';

import TestLink from './TestLink'

afterEach(cleanup);

export default function TestCardItem(src, text, path) {
  TestLink(<CardItem
    src={src}
    text={text}
    path={path}
  />);

  const { container } = render(<CardItem src={src}
    text={text}
    path={path}
  />, {wrapper: MemoryRouter});

  const img = container.querySelector('img');
  expect(img.src).toContain(src);
  expect(img.alt).toContain('CardItem');

  const textContainer = container.getElementsByClassName('cards__item__text');
  [...textContainer].forEach((renderText) => {
    expect(renderText.innerHTML).toContain(text);
  });
}
