import React from 'react'
import CreateEvent from './CreateEvent'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Create event page', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<CreateEvent />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(2);
    expect(wrapper.find('.g').find('form').length).toEqual(1);
  });
});
