import React from "react";
import Login from "../LoginPage";
import { shallow, configure } from 'enzyme';

import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

afterEach(cleanup);

test('should render login component', () => {
    render(<Login />);
    const loginElement = screen.getByTestId('login-1');
    expect(loginElement).toBeInTheDocument();
});

it('calls correct function to login', () => {
    global.fetch = jest.fn(() => Promise.resolve());
    const onButtonClickMock = jest.fn();
    const wrapper = shallow(
        <Login />,
    );
    const buttonElement = wrapper.find('.button1'); // step 1 above
    buttonElement.simulate('click'); // step 2

    expect(onButtonClickMock).toHaveBeenCalledTimes(1); // step 3
    expect(onButtonClickMock).toHaveBeenCalledWith('test', 'test');
});