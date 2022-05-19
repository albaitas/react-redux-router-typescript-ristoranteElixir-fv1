import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [nav, setNav] = useState({ isNavOpen: false });
  const [modal, setModal] = useState({ isModalOpen: false });

  const [val, setVal] = useState({
    username: '',
    password: '',
    remember: false
  });

  const toggleNav = () => {
    setNav({ isNavOpen: !nav.isNavOpen });
  };

  const toggleModal = () => {
    setModal({ isModalOpen: !modal.isModalOpen });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setVal({ ...val, [name]: value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    const { username, password, remember } = val;
    toggleModal();
    e.preventDefault();
    console.log('a', username, password, remember);
    setVal({ username: '', password: '', remember: false });
  };

  return (
    <>
      <Navbar sticky='top' dark expand='md'>
        <div className='container'>
          <NavbarToggler onClick={toggleNav} />
          <NavbarBrand className='mr-auto' href='/'>
            <img src='assets/images/logo.png' height='30' width='80' alt='Ristorante Elixir' />
          </NavbarBrand>
          <Collapse isOpen={nav.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link className='nav-link' to='/home'>
                  <span className='fa fa-home fa-lg'></span> Home
                </Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/aboutus'>
                  <span className='fa fa-info fa-lg'></span> About Us
                </Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/menu'>
                  <span className='fa fa-list fa-lg'></span> Menu
                </Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/contactus'>
                  <span className='fa fa-address-card fa-lg'></span> Contact Us
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Button outline onClick={toggleModal}>
                <span className='fa fa-sign-in fa-lg'></span> Login
              </Button>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
      <Jumbotron>
        <div className='container'>
          <div className='row row-header'>
            <div className='col-12 col-sm-6'>
              <h1>Ristorante Elixir</h1>
              <p>
                We take inspiration from the World's best cuisines, and create a unique fusion experience. Our
                lipsmacking creations will tickle your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Modal isOpen={modal.isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor='username'>Username</Label>
              <Input type='text' id='username' name='username' value={val.username} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <Input type='number' id='password' name='password' value={val.password} onChange={handleChange} />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='checkbox' name='remember' checked={val.remember} onChange={handleChange} />
                Remember me
              </Label>
            </FormGroup>

            <Button type='submit' value='submit' color='primary'>
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
export default Header;
