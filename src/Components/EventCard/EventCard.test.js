import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EventCard from './EventCard';

Enzyme.configure({ adapter: new Adapter() });

describe('Event card component', () => {
  it('loads the event cards', () => {
    const wrapper = shallow(<EventCard />);
    expect(wrapper).toBeDefined();
  });
});
