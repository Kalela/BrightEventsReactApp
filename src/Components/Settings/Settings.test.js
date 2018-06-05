import React from 'react'
import Settings from './Settings.js'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Settings page', () => {
  it('loads the settings page', () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(0);
  });
});
