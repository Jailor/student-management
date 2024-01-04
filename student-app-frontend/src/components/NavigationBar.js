import React from 'react'
import logo from '../logo.svg';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';


const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => {
 return (
    <div>
        <Navbar color="dark" light expand="md">
          
            <Nav className="mr-auto" navbar>
            <NavbarBrand href="/home">
                <img src={logo} width={"75"}
                     height={"35"} alt="react-logo" />
            </NavbarBrand>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu end >

                        <DropdownItem>
                            <NavLink href="/home"> Home</NavLink>
                        </DropdownItem>
                   
                        <DropdownItem>
                            <NavLink href="/courses">Courses</NavLink>
                        </DropdownItem>

             
                        <DropdownItem>
                            <NavLink href="/students">Students</NavLink>
                        </DropdownItem>
                        
                        {/* 
                        <DropdownItem>
                            <NavLink href="/enrollments">Enrollments</NavLink>
                        </DropdownItem> */}

                        <DropdownItem>
                            <NavLink href="/logout"> Logout</NavLink>
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>
        </Navbar>
    </div>
 );
}

export default NavigationBar;