import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreateEvent from './CreateEvent';


Enzyme.configure({ adapter: new Adapter() });

describe('Create event page', () => {
  it('loads the create event page', () => {
    const wrapper = shallow(<CreateEvent />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toEqual(2);
    expect(wrapper.find('.g').find('form').length).toEqual(1);
  });
  it('takes data from form on click', () => {
    const wrapper = shallow(<CreateEvent />);
    const submitButton = wrapper.find('button').at(1);
    submitButton.simulate('click');
    expect(wrapper.state().category).toEqual("Other")
  });
});
