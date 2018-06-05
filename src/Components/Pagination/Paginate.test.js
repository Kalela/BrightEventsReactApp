import React from 'react'
import Paginate from './paginate.js'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('the pagination component', () => {
  it('defines pagination component', () => {
    const wrapper = shallow(<Paginate />);
    expect(wrapper).toBeDefined();
    // expect(wrapper.find('nav').length).toEqual(2);
  });
});
