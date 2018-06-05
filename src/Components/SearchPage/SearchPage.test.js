import React from 'react'
import SearchPage from './SearchPage'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Search page', () => {
  it('loads the search page', () => {
    const wrapper = shallow(<SearchPage />);
    expect(wrapper).toBeDefined();
  });
});
