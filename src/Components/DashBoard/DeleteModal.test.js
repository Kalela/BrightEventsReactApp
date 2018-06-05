import React from 'react'
import DeleteModal from './DeleteModal.js'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('DeleteModal', () => {
  it('delete modal is well defined', () => {
    const wrapper = shallow(<DeleteModal />);
    expect(wrapper).toBeDefined();
    // expect(wrapper.find('nav').length).toEqual(2);
  });
});
