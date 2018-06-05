import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LandingPage from './LandingPage';

Enzyme.configure({ adapter: new Adapter() });

describe('Landing page', () => {
  it('loads the landing page', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper).toBeDefined();
  });
});
