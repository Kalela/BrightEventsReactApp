import React from 'react'
import Navbar from './Navbar'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Navbar', () => {
  it('loads the navbar page', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(1);
  });
});