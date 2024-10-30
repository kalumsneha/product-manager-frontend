import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {NavLink, useNavigate } from 'react-router-dom'

function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const navigate = useNavigate();

    function logOut() {
        localStorage.clear()
        navigate('/login')

    }
    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Product Manager</Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper">
                        {localStorage.getItem('user-info') && user.name ?
                            <>
                                <NavLink className="navops" to='/'>Home</NavLink>
                                <NavLink className="navops" to='/search'>Search</NavLink>
                            </> :
                            <>
                                <NavLink className="navops" to='/login'>Log In</NavLink>
                                <NavLink className="navops" to='/register'>Register</NavLink>
                            </>
                        }
                    </Nav>
                    {localStorage.getItem('user-info') && user.name?
                        <Nav>
                            <NavDropdown title={user.name}>
                                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                    }

                </Container>
            </Navbar>
        </div>
    )
}

export default Header