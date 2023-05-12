import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelects>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>ThieveShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <LinkContainer to='/login'>
                            <Nav.Link><FaUser /> Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
