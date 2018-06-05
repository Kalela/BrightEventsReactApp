import React from 'react'
import Events from './Events.js'
import MyEvents from './MyEvents.js'
import ViewSingleEvent from './ViewSingleEvent.js'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Events and My events page', () => {
  it('loads the event page', () => {
    const wrapper = shallow(<Events />);
    expect(wrapper).toBeDefined();
  });
  it('loads the my event page', () => {
    const wrapper = shallow(<MyEvents />);
    expect(wrapper).toBeDefined();
  });
  it('loads single event page', () => {
    const wrapper = shallow(<ViewSingleEvent />);
    expect(wrapper).toBeDefined();
  });
});
