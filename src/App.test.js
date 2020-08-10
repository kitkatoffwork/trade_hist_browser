import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock("react-apexcharts", () => jest.fn(() => { return null; }) );
jest.mock("apexcharts", () => (
  {
    exec: jest.fn(() => {
      return new Promise(
        (resolve, reject) => { resolve("uri"); }
      );
    })
  }
));

test('renders hoge huga', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/hoge huga/i);
  expect(linkElement).toBeInTheDocument();
});
