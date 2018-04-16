import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from '../LandingPage';

describe('<LandingPage />', () =>{
  it('renders the about us page', () => {
      const aboutus = shallow(<AboutUs />);
      expect (aboutus.find('p').length).toEqual(1);
    });
});
