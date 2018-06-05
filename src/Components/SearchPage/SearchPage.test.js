import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchPage from './SearchPage';


Enzyme.configure({ adapter: new Adapter() });

describe('Search page', () => {
  it('loads the search page', () => {
    const wrapper = shallow(<SearchPage />);
    expect(wrapper).toBeDefined();
  });
});
