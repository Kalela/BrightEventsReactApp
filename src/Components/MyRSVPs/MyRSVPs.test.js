import React from 'react'
import MyRSVPs from './myRSVPs.js'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('MyRSVPs page', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<MyRSVPs />);
    expect(wrapper).toBeDefined();
  });
});
