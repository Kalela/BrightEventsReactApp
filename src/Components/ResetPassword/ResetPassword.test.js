import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ResetPassword from './ResetPassword';
import ConfirmResetPassword from './ConfirmResetPassword';


Enzyme.configure({ adapter: new Adapter() });

describe('Reset password page', () => {
  it('loads the reset password page', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper).toBeDefined();
    // expect(wrapper.find('nav').length).toEqual(2);
  });
  it('loads change password page', () => {
    const wrapper = shallow(<ConfirmResetPassword />);
    expect(wrapper).toBeDefined();
    // expect(wrapper.find('nav').length).toEqual(2);
  });
});
