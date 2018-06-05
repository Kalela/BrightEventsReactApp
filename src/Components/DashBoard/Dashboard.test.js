import React from 'react'
import Dashboard from './Dashboard'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Create event page', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(2);
  });
});