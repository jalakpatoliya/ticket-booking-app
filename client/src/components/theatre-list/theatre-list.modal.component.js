import Axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
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
import ScreenList from '../screen-list/screen-list.modal.component';

import { SelectedDataContext } from '../../contexts/selected-data.context';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const {
    screenListModalOpen,
    setScreenListModalOpen,
    onClose,
    open,
    theatreList,
    selectedData,
    setSelectedData,
  } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    setSelectedData({ ...selectedData, theatreId: value.theatreId });
    setScreenListModalOpen(true);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Theatres running the Movie</DialogTitle>
      <List>
        {theatreList.map((theatre) => (
          <ListItem button onClick={() => handleListItemClick(theatre)} key={theatre.theatreId}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={theatre.name} />
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
  const [selectedData, setSelectedData] = useContext(SelectedDataContext);
  const [theatreList, setTheatreList] = useState([]);
  const [screenListModalOpen, setScreenListModalOpen] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        // const bodyParameters = { date: selectedData.date, movieId: '5f151dfe4daf9a148a2574bf' };
        const bodyParameters = { date: selectedData.date, movieId: selectedData.movieId };
        const {
          data: { data },
        } = await Axios.post(`api/theatre/movie`, bodyParameters, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setTheatreList(data);
      };

      if (open) {
        fetchData();
      }
    } catch (error) {
      alert(error.message);
    }
  }, [selectedData.movieId]);

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <SimpleDialog
        screenListModalOpen={screenListModalOpen}
        setScreenListModalOpen={setScreenListModalOpen}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        theatreList={theatreList}
        open={open}
        onClose={handleClose}
      />
      <ScreenList open={screenListModalOpen} setOpen={setScreenListModalOpen} />
    </div>
  );
}
