import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Events from './Events';
import MyEvents from './MyEvents';
import ViewSingleEvent from './ViewSingleEvent';


Enzyme.configure({ adapter: new Adapter() });

describe('Events and My events page', () => {
  it('loads the event page', () => {
    const wrapper = shallow(<Events />);
    expect(wrapper).toBeDefined();
  });
  it('loads the single events page', () => {
    const props = { match: { params: { username: 'a', eventname: 'a' } } };
    const wrapper = shallow(<ViewSingleEvent {...props} />);
    expect(wrapper).toBeDefined();
  });
  // it('loads the my events page', () => {
  //   const wrapper = shallow(<MyEvents />);
  //   expect(wrapper).toBeDefined();
  // });
});
