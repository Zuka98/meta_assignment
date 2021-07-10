import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import MyButton from '../MyButton.jsx';
import Adapter from 'enzyme-adapter-react-16.1';

configure({adapter: new Adapter()});

describe('MyButton', () => {
  const mockFn = jest.fn();
  it('Should be defined', () => {
    expect(MyButton).toBeDefined();
  });
  it('Should render correctly', () => {
    const tree = shallow(
      <MyButton name='1' handleClick={mockFn} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('Should have a button value', () => {
    const tree = shallow(
      <MyButton name='1' handleClick={mockFn} />
    );
    expect(typeof(tree.getElement('button').props.value)).toBe('string');
    expect(tree.getElement('button').props.value).toEqual('btn1');
  });
  it('Should have a click function', () => {
    const tree = shallow(
      <MyButton name='1' handleClick={mockFn} />
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
