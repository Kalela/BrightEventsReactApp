import React, { Component } from 'react';

class SearchPage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="SearchPage" >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">BrightEvents</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
          </div>
        </nav>
        <form>
          <div className="form-row">
            <div className="col">
              <input type="text" className="form-control" placeholder="Search..." />
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Category</label>
                <select id="categorySelect" className="form-control">
                  <option>Other</option>
                  <option>Bridal</option>
                  <option>Educational</option>
                  <option>Commemorative</option>
                  <option>Product Launch</option>
                  <option>Social</option>
                  <option>VIP</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Location</label>
                <select id="categorySelect" className="form-control">
                  <option>Other</option>
                  <option>Bridal</option>
                  <option>Educational</option>
                  <option>Commemorative</option>
                  <option>Product Launch</option>
                  <option>Social</option>
                  <option>VIP</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

};

export default SearchPage;
