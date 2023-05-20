import React from 'react';
import { describe } from '@jest/globals';
import {test} from '@jest/globals';
import {expect} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import Documents from './src/Pages/Documents/Documents.jsx';


describe('Documents component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Documents />);
    expect(getByText('Avaliable Documents')).toBeInTheDocument();
  });
  
  describe('Accordion', () => {
    test('expands and collapses correctly', () => {
      const { getByText } = render(<Documents />);
      fireEvent.click(getByText('How to get the Passport?'));
      expect(getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
      fireEvent.click(getByText('How to get the Passport?'));
      expect(getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).not.toBeInTheDocument();
    });
  });
});

// 
// export function add(a, b) {
//   return a + b;
// }

//
// // import { add } from './app.js';

// describe('add function', () => {
//   test('adds two numbers correctly', () => {
//     expect(add(2, 3)).toBe(5);
//   });
// });

