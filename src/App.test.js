import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders hoge huga', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/hoge huga/i);
  expect(linkElement).toBeInTheDocument();
});
