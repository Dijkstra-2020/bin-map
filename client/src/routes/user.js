import React, { Component } from 'react';


class User extends Component {
  constructor(props){
    super(props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user'))
    };
  }

  render(){
    return(
      <div>
        <h1> Profil </h1>
        <h2>{this.state.user.firstName} {this.state.user.lastName}</h2>
        <ul>
	  <li>Mail : {this.state.user.email}</li>
          <li>Equipe : {this.state.user.team}</li>
          <li>Role : {this.state.user.role}</li>
        </ul>
      </div>  
    )
    }

}

export default User;
