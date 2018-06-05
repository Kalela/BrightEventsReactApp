import React from 'react'
import ResetPassword from './ResetPassword.js'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Reset password page', () => {
  it('loads the reset password page', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper).toBeDefined();
    // expect(wrapper.find('nav').length).toEqual(2);
  });
});
