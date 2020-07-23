import Axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { SelectedDataContext } from '../../contexts/selected-data.context';
import SimpleDialogDemo from '../../components/theatre-list/theatre-list.modal.component';
import MovieCards from './movie-list.cards.components';

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
      <input onChange={handleDateChange} type="date" value={selectedData.date} />

      <MovieCards data={movieList} handleClick={handleClick} />
      <SimpleDialogDemo open={theatreModalOpen} setOpen={setTheatreModalOpen} />
    </div>
  );
};

export default MovieList;
