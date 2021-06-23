import { Link } from 'react-router-dom'; 
import React, { Component } from 'react';
import axios from 'axios';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

class Inc extends Component {
    constructor (props) {
        super(props);
        this.state = {
          session: "",
          isLogin: false,
          redirect: false
        }

    };
    componentDidMount() {
        axios.get('/')
             .then(result => {
                this.setState({
                    isLogin: result.data.isLogin,
                    redirect :true
                })
              })
             .catch(error => console.log(error));
      };
    render(){
        return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <Collapse  navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to="/todo" className="nav-link">Todo </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link">Logout </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/login" className="nav-link">Login </Link>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
    }
};
export default Inc;
