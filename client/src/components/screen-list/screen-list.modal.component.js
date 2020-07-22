import Axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { SelectedDataContext } from '../../contexts/selected-data.context';
import Screen from '../screen/screen.component';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, screenList, setScreenList } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select Screen of Theatre</DialogTitle>
      <List>
        {screenList.map((screen) => (
          <ListItem button onClick={() => handleListItemClick(screen)} key={screen._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={screen.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {
  const { open, setOpen } = props;
  //   const [open, setOpen] = React.useState(false);
  const [selectedData, setSelectedData] = useContext(SelectedDataContext);
  const [screenList, setScreenList] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const bodyParameters = {
          date: selectedData.date,
          movieId: selectedData.movieId,
          theatreId: selectedData.theatreId,
        };
        const {
          data: { data },
        } = await Axios.post(`api/screen/theatre`, bodyParameters, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setScreenList([...data]);
      };
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  }, [selectedData.theatreId]);

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <SimpleDialog
        screenList={screenList}
        setScreenList={setScreenList}
        open={open}
        onClose={handleClose}
      />
      <Screen />
    </div>
  );
}
