import React, { Component } from 'react';
import '../css/styles.css';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: []
      };
  }
    
//  componentWillMount() {
//      fetch('https://bright-events-api-.herokuapp.com/api/v2/events')
//      .then((resp) => resp.json())
//      .then(data){
//          let events = data.resp;
//          console.log(events);
////          return events.map(
////              <div key={events.results}>
////                  <label> Event.events </label>
////              </div>
////              )
//          }
//      this.setState({events: events});
//      console.log("state", this.state.events);
//      })
//  }
  render(){
    return (
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src = "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>


         <nav class="navbar navbar-default">
            <div class="navbar-header">
             <a href="/" class="navbar-brand">EventHub</a>
             </div>
            </nav>   

        {% with messages = get_flashed_messages() %}
          {% if messages %}
            <ul class=flashes>
            {% for message in messages %}
              <li>{{ message }}</li>
            {% endfor %}
            </ul>
          {% endif %}
        {% endwith %}  


        <div class="container">
            <div class="col-md-6 text-center">
                <div class="g">
                <h1 class="head">Create New</h1>
                <p></p>
                    <form action="/api/v1/new_event" class="login" method="POST">
                        {{ form.hidden_tag() }}
                        {{ wtf.form_field(form.eventname)}} 
                        {{ wtf.form_field(form.eventdate)}}
                        {{ wtf.form_field(form.eventlocation)}}
                        {{ wtf.form_field(form.eventcategory)}}

                        <button class="btn btn-info">Create</button>

                    </form>
                </div>
            </div> 
            </div>
         );
  }
};

export default Events;