import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Settings from './Settings';


Enzyme.configure({ adapter: new Adapter() });

describe('Settings page', () => {
  it('loads the settings page', () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(0);
  });
});
