import React from 'react'
import Events from './Events'
import MyEvents from './MyEvents'
import ViewSingleEvent from './ViewSingleEvent'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Events and My events page', () => {
  it('loads the event page', () => {
    const wrapper = shallow(<Events />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(2);
  });
  it('loads the my event page', () => {
    const wrapper = shallow(<MyEvents />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(0);
  });
});
