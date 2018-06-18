import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DeleteModal from './DeleteModal';

Enzyme.configure({ adapter: new Adapter() });

describe('Delete modal', () => {
  it('loads the delete modal', () => {
    const props = { dynamicData: { eventname: 'a' } };
    const wrapper = shallow(<DeleteModal {...props} />);
    expect(wrapper).toBeDefined();
  });
});
