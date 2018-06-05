import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from './Login';


Enzyme.configure({ adapter: new Adapter() });

describe('Login page', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(1);
    expect(wrapper.find('.g').find('form').length).toEqual(1);
  });
});
