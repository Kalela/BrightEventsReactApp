import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sidebar from './Sidebar';


Enzyme.configure({ adapter: new Adapter() });

describe('Sidebar', () => {
  it('loads the sidebar', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(1);
  });
});
