import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navbar = (props) => {
  return (
    <div>
      <p>Todo list </p>
      <Nav>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">Login</NavLink>
        </NavItem>
      </Nav>
      <hr />
    </div>
  );
}

export default Navbar;