import { MemoryRouter } from 'react-router-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar';

import TestLink from './TestLink'
import TestButton from './TestButton';

afterEach(cleanup);

describe('Navbar', () => {
  it('Changes the style when clicked menu icon', () => {
    const { container } = render(<Navbar />, {wrapper: MemoryRouter});
  
    // before click
    expect(container.getElementsByClassName('fas fa-times')).toBeTruthy();
    expect(container.getElementsByClassName('nav-menu active')).toBeTruthy();
    expect(container.getElementsByClassName('btn-mobile-menu')).toBeTruthy();
   
    fireEvent.click(container.getElementsByClassName('menu-icon')[0]);
  
    // after click
    expect(container.getElementsByClassName('fas fa-bars')).toBeTruthy();
    expect(container.getElementsByClassName('nav-menu')).toBeTruthy();
    expect(container.getElementsByClassName('btn')).toBeTruthy();
  });
  
  it("Change location when click link", () => {
    TestLink(<Navbar />);
  });
})
