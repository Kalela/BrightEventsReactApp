import React from 'react'
import NavbarOptions from './NavbarOptions'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Create event page', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<NavbarOptions />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(0);
  });
});