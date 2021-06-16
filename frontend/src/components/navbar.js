import { Navbar, Dropdown , ButtonGroup , DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbarr = ({ logout, isAuthenticated }) => {
    const direction = 'left';
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">COMPAROR</Navbar.Brand>
        {isAuthenticated && <Navbar.Text><Link to='/home'>Home</Link></Navbar.Text>}
        {!isAuthenticated ? (
            <Navbar.Text className="ml-auto">
                <Link to="/login" >Login</Link><span >&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <Link to="/register" >Register</Link>
            </Navbar.Text>
        ) :
            (
                <Navbar.Text className="ml-auto">
                    <DropdownButton
                        as={ButtonGroup}
                        key={direction}
                        id={`dropdown-button-drop-${direction}`}
                        drop={direction}
                        variant="secondary">
                        <Dropdown.Item eventKey="1"><Link to="/home/user/settings" style={{ textDecoration: "none" , color:"black"}}>Settings</Link></Dropdown.Item>
                        <Dropdown.Item eventKey="2" style={{color:"black"}} onClick={() => { logout(); }}>Logout</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Text>
            )}
    </Navbar>
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logout })(Navbarr);