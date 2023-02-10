import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { logout } from '../../modules/authManager';

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md" fixed="top">
                <NavbarBrand tag={RRNavLink} to="/">CreatureCare</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/">Home</NavLink>
                            </NavItem>

                        }
                    </Nav>

                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavLink tag={RRNavLink} to="/staff">Staff</NavLink>
                                <NavLink tag={RRNavLink} to="/patients">Patient Files</NavLink>

                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>Appoinments</DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem tag={RRNavLink} to="/appointments/add">Schedule Appointment</DropdownItem>
                                        <DropdownItem tag={RRNavLink} to="/appointments">Appointment Tracker</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Reset</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                <NavLink tag={RRNavLink} to="/profile">Profile</NavLink>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>

                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}