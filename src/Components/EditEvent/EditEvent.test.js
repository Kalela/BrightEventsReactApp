import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EditModal from './EditEvent';

Enzyme.configure({ adapter: new Adapter() });

describe('Edit modal', () => {
  it('loads the delete modal', () => {
    const props = { dynamicData: { eventname: 'a' } };
    const wrapper = shallow(<EditModal {...props} />);
    expect(wrapper).toBeDefined();
  });
});
