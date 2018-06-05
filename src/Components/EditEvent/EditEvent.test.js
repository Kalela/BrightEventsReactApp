import React from 'react'
import EditModal from './EditEvent'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Edit event modal', () => {
  it('edit modal is well defined', () => {
    const wrapper = shallow(<EditModal />);
    expect(wrapper).toBeDefined();
    // expect(wrapper.find('nav').length).toEqual(2);
  });
});
