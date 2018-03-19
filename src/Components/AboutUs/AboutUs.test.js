import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from '../AboutUs';

describe('<AboutUs />', () =>{
  it('renders the about us page', () => {
      const aboutus = shallow(<AboutUs />);
      expect (aboutus.find('p').length).toEqual(1);
    });
});
