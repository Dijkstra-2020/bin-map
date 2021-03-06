import React from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../_services/user.service';
import { Route } from "react-router-dom";
import BinMap from '../routes/binmap'
import TabMenu from './menu/menu'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { user, users } = this.state;
        return (
          	 
          		<div>
                	<TabMenu/>
	                <p>
	                    <Link to="/login">Logout</Link>
	                </p>
                </div>
          
        );
    }
}

export { HomePage };
