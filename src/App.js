import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import logo from './servicenowlogo.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      number: '',
      description: '',
      short_description: '',
      urgency: '',
      category: '',
      due: '',
      view_incident: false,
      view_list: true
    }
  }

  componentDidMount() {
    axios.get('/api/now/table/incident')
    .then(res => this.setState({ incidents: res.data.result }))
    }
  
  viewIncident (incidentId) {
    axios.get(`/api/now/table/incident/${ incidentId }`)
    .then(res => this.setState({ 
      view_incident: true, 
      view_list: false, 
      description: res.data.result.description, 
      number: res.data.result.number, 
      short_description: res.data.result.short_description, 
      category: res.data.result.category,
      state: res.data.result.state,
      urgency: res.data.result.urgency
     }))
  }

  viewList() {
    this.setState ({
      view_list: true,
      view_incident: false,
    })
  }

  render() {
    const { incidents, state } = this.state;
    const Incidents = () => {
      return (
        <section>
          <ul className='list-group'>
          {incidents.map((i) => 
            (i.state !== 7) ? 
              <li className={ `list-group-item`} key={i.sys_id}>{i.number}: {i.short_description} 
                <span className='incidentButton'><button className='btn btn-outline-dark' style={{fontWeight: 'bold'}} onClick={()=>this.viewIncident(i.sys_id)}>
                    View incident
                </button></span>
              </li>
            : ''
          )}
        </ul>
        </section>
      )
    }

    return (
      <div>
        <div className='container'>
          <div className='jumbotron' >
            <h1 className='display-4'>My open incidents</h1>
            <img style={{width: 110, textAlign: 'center', marginTop: 20 }} alt='servicenow logo' src={ logo } />
          </div>
          { this.state.view_incident === true ?
            <section className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Incident: {this.state.short_description}</h5>
                <p className='card-subtitle' style={{marginBottom: 5}}>Number: {this.state.number}</p>
                {(state === '1' ? <p className='card-text'>State: New</p> : 
                    (state === '2' ? <p className='card-text'>State: Assigned - Ticket has someone assigned to it and it is being worked.</p> : 
                      (state === '12' ? <p className='card-text'>State: Referred - Ticket has been assgiend to a group but not an individual yet.</p> : 
                        (state === '4' ? <p className='card-text'>State: Awaiting User Info</p> : 
                          (state === '5' ? <p className='card-text'>State: Awaiting Evidence</p> : 
                            (state === '10' ? <p className='card-text'>State: Awaiting Change</p> : 
                              (state === '8' ? <p className='card-text'>State: Awaiting Vendor</p> : 
                                <p className='card-text'>State: Resolved</p>
                )))))))}
                {(this.state.urgency === '1' ? <p className='card-text'>Priority: High</p> :
                  this.state.urgency === '1' ? <p className='card-text'>Priority: Medium</p> :
                  <p className='card-text'>Priority: Low</p>
                )}
                <p className='card-text'>Category: {this.state.category}</p>
                <p className='card-text'>Description: {this.state.description}</p>
                <p></p>
                <button className='btn btn-outline-dark' style={{marginTop: 15, fontWeight: 'bold'}} onClick={() => this.viewList()}>Go back to list</button>
              </div>
            </section>
            : <div></div>
          }
          {
            this.state.view_list === true ?
              <Incidents />
            : ''
          }
        </div>
      </div>
    )
  }
}