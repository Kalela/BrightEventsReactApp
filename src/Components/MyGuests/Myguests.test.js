import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MyGuests from './MyGuests';


Enzyme.configure({ adapter: new Adapter() });

describe('MyGuests page', () => {
  it('loads the my guests page', () => {
    const wrapper = shallow(<MyGuests />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(1);
  });
});
