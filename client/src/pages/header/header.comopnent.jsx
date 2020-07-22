import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CurrentUserContext } from '../../contexts/current-user.context';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { withRouter } from 'react-router-dom';

function Header({ history }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    history.push('/login');
    handleClose();
  };

  const handleTickets = () => {
    history.push('/ticket');
  };

  const handleMenu = () => {
    history.push('/');
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleRoundedIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {currentUser ? (
          <div>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            <MenuItem onClick={handleMenu}>Menu</MenuItem>
            <MenuItem onClick={handleTickets}>Tickets</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => history.push('/login')}>Sign In</MenuItem>
            <MenuItem onClick={() => history.push('/signup')}>Sign Up</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default withRouter(Header);
