import Axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { SelectedDataContext } from '../../contexts/selected-data.context';
import SimpleDialogDemo from '../../components/theatre-list/theatre-list.modal.component';

const MovieList = () => {
  const [selectedData, setSelectedData] = useContext(SelectedDataContext);
  const [movieList, setmovieList] = useState([]);
  const [theatreModalOpen, setTheatreModalOpen] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const bodyParameters = { date: selectedData.date };
        const {
          data: { data },
        } = await Axios.post(`api/movie/list`, bodyParameters, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });

        setmovieList([...data]);
        console.log('called');
      };
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  }, [selectedData.date]);

  const handleDateChange = (e) => {
    setSelectedData({ ...selectedData, date: e.target.value });
  };

  const handleClick = ({ movieId }) => {
    setSelectedData({ ...selectedData, movieId });
    setTheatreModalOpen(true);
  };

  return (
    <div>
      {movieList.map((movie) => {
        return (
          <div>
            <input onChange={handleDateChange} type="date" value={selectedData.date} />
            <Link
              onClick={(e) => {
                handleClick({ movieId: movie._id });
              }}
            >
              <div key={movie._id}>{movie.name}</div>
            </Link>
          </div>
        );
      })}

      <SimpleDialogDemo open={theatreModalOpen} setOpen={setTheatreModalOpen} />
    </div>
  );
};

export default MovieList;
