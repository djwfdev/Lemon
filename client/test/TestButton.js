import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import { Button, STYLES, SIZES } from '../src/components/Button';

import TestLink from './TestLink'
import { Experimental_CssVarsProvider } from '@mui/material';

afterEach(cleanup);


export default function TestButton({ 
  content,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  linkto, 
}) {
  const button =  <Button 
                    linkto={linkto}
                    type={type}
                    onClick={onClick}
                    buttonStyle={buttonStyle}
                    buttonSize={buttonSize}
                  >{content}</Button>
  TestLink("btn-mobile", button);

  const { container } = render(button, {wrapper: MemoryRouter});

  // check button styles
  const btn = container.querySelector('button');

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  expect(btn.className).toContain(checkButtonStyle);
  expect(btn.className).toContain(checkButtonSize);

  // check button content
  expect(btn.innerHTML).toContain(content);

  // check onclick
}
