import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NotFound from './NotFound';


Enzyme.configure({ adapter: new Adapter() });

describe('404 page', () => {
  it('loads the 404 page', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('h1').length).toEqual(1);
  });
});
