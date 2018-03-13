import React, { Component } from 'react';
import './styles.css';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: []
      };
  }
    
  componentDidMount(){
      fetch('https://bright-events-api-.herokuapp.com/api/v2/events', {method:POST})
      .then(response => response.json())
      .then((parsedJSON) => {
         console.log(parsedJSON) 
      })
      .catch(error => console.log('parsing failed', error))
  }
  render(){
    return (
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src = "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>


         <nav class="navbar navbar-default">
            <div class="navbar-header">
             <a href="/" class="navbar-brand">EventHub</a>
             </div>
            </nav>   
//        {% with messages = get_flashed_messages() %}
//          {% if messages %}
//            <ul class=flashes>
//            {% for message in messages %}
//              <li>{{ message }}</li>
//            {% endfor %}
//            </ul>
//          {% endif %}
//        {% endwith %}  
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