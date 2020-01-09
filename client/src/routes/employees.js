import React, { Component } from 'react';
import { userService } from '../_services/user.service';
import Card from 'react-bootstrap/Card';

const CardCustom = ({ item }) => {
    const { firstName, lastName, email, team, role } = item;

        return (
            <Card class="card mt-5 col-sm">
		<Card.Body>
                    <h2>{'Prénom :' + firstName + ' Nom :' + lastName}</h2>
                    <p>{'Email : ' + email}</p>
		    <p>{"Equipe : "+team}</p>
		    <p>{"Role : " + role}</p>
                </Card.Body>
            </Card>
        )
}

class Employees extends Component {
  constructor(props){
    super(props);
    this.state = {
            users: []
        };
  }

  componentDidMount() {
    this.setState({ 
            users: { loading: true }
        });
    userService.getAll().then(users => this.setState({ users }));
    }

  render(){
    return(
    <div>
    <h1>Liste des employés</h1>
    {
	this.state.users.length > 0 ? (
		this.state.users.map(item => 
			<CardCustom item={item}/>)) : 
		(<Card class="card mt-5 col-sm">
     	            <Card.Body class="card-body">Aucun employé</Card.Body>
                 </Card>)
}
</div>
    )
  }

}

export default Employees;
