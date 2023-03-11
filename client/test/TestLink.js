import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { Router } from 'react-router';

const historyWrapper = (history) => ({ children }) => (
  <Router history={history}>{children}</Router>
);

export default function TextLink(component) {
  const history = createMemoryHistory();
  const { container } = render(component, {wrapper: historyWrapper(history)});
  const links = container.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    let href = links[i].href;
    console.log(href);
    const id = href.lastIndexOf("/");
    href = href.slice(id, href.length);
    console.log(href);
    fireEvent.click(links[i]);
    expect(history.location.pathname).toBe(href);
  }
}
