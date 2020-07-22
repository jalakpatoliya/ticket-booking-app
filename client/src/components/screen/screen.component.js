import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import SeatPicker from 'react-seat-picker';
import { SelectedDataContext } from '../../contexts/selected-data.context';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Screen = ({ history }) => {
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
      const [rowId, index] = id.split(',');

      const obj = {
        rowId,
        index: [index],
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
      const [rowId, index] = id.split(',');

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

        // const bodyParameters = {
        //   date: selectedData.date,
        //   movieId: selectedData.movieId,
        //   theatreId: selectedData.theatreId,
        // };
        const bodyParameters = {
          date: selectedData.date,
          //   screenId: selectedData.screenId,
          screenId: '5f151d414daf9a148a2574bb',
        };
        const {
          data: {
            data: {
              seatData,
              allData: { _id: seatId },
            },
          },
        } = await Axios.post(`api/screen/seats`, bodyParameters, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });

        await setSelectedData({
          ...selectedData,
          seatId: seatId,
          theatreId: '5f151cf54daf9a148a2574ba',
          movieId: '5f151dfe4daf9a148a2574bf',
          screenId: '5f151d414daf9a148a2574bb',
        });
        await setRows([...seatData]);
      };
      fetchData();
    } catch (error) {
      alert(error.message);
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
      };
      await Axios.post(`api/seat/book`, bodyParameters, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      alert('Booked Successfully');
      history.push('/');
    } catch (error) {
      alert(error.message);
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
