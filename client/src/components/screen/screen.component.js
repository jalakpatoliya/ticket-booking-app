import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import SeatPicker from 'react-seat-picker';
import { SelectedDataContext } from '../../contexts/selected-data.context';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Screen = ({ history, handleClose }) => {
  const [state, setState] = useState({ loading: false });
  const [selectedData, setSelectedData] = useContext(SelectedDataContext);
  const [rows, setRows] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const addSeatCallback = ({ row, number, id }, addCb) => {
    setState({
      loading: true,
    });
    const fun = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log(`Added seat ${number}, row ${row}, id ${id} }`);
      const newTooltip = `tooltip for id-${id} added by callback`;
      addCb(row, number, id, newTooltip);
      setState({ loading: false });

      //adding row to bookedseats
      const [rowId, rowName, index] = id.split(',');

      const obj = {
        rowName,
        rowId,
        index: [JSON.parse(index)],
      };
      setBookedSeats([...bookedSeats, { ...obj }]);
    };
    fun();
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    setState({
      loading: true,
    });

    const fun = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log(`Removed seat ${number}, row ${row}, id ${id}`);
      // A value of null will reset the tooltip to the original while '' will hide the tooltip
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : '';
      removeCb(row, number, newTooltip);
      setState({ loading: false });

      //removing row from bookedseats
      const [rowId, rowName, index] = id.split(',');

      setBookedSeats(
        bookedSeats.filter((row) => {
          if (row.rowId == rowId) {
            if (row.index[0] == index[0]) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        })
      );
    };
    fun();
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const bodyParameters = {
          date: selectedData.date,
          screenId: selectedData.screenId,
        };
        const {
          data: {
            data: {
              seatData,
              allData: { bookings },
            },
          },
        } = await Axios.post(`api/screen/seats`, bodyParameters, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        const [
          {
            seats: { _id: seatId },
          },
        ] = bookings;

        await setSelectedData({
          ...selectedData,
          seatId: seatId,
          theatreId: selectedData.theatreId,
          movieId: selectedData.movieId,
          screenId: selectedData.screenId,
        });
        await setRows([...seatData]);
      };
      fetchData();
    } catch (error) {
      alert(error);
    }
  }, [selectedData.date]);

  const handleBook = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const bodyParameters = {
        theatreId: selectedData.theatreId,
        screenId: selectedData.screenId,
        seatId: selectedData.seatId,
        rows: bookedSeats,
        date: selectedData.date,
      };
      await Axios.post(`api/seat/book`, bodyParameters, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      alert('Booked Successfully');
      handleClose();
      // history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1>Book Seats(max 5)</h1>
      <div style={{ marginTop: '100px' }}>
        {rows.length !== 0 ? (
          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={rows}
            maxReservableSeats={5}
            alpha
            visible
            selectedByDefault
            loading={state.loading}
            tooltipProps={{ multiline: true }}
          />
        ) : null}
      </div>
      <br />
      <br />
      <Button onClick={handleBook} variant="contained" color="primary">
        Book
      </Button>
    </div>
  );
};

export default withRouter(Screen);
