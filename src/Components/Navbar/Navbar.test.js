import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navbar from './Navbar';


Enzyme.configure({ adapter: new Adapter() });

describe('Navbar', () => {
  it('loads the navbar page', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(1);
  });
});
