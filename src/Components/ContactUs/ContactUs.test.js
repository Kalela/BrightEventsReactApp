import React from 'react'
import ContactUs from './contactUs'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Contact us page', () => {
  it('loads the contact us page', () => {
    const contactPage = shallow(<ContactUs />);
    expect(contactPage).toBeDefined();
    expect(contactPage.find('h1').text()).toBe("Contacts");
    expect(contactPage.find('h1').length).toEqual(1);
  });
});
