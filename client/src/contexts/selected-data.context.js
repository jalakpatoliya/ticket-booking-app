import React, { createContext, useState } from 'react';

export const SelectedDataContext = createContext();

export const SelectedDataProvider = (props) => {
  let today = new Date().toISOString().slice(0, 10);
  const [selectedData, setSelectedData] = useState({
    date: today,
    theatreId: '',
    movieId: '',
    screenId: '',
    seatId: '',
  });

  return (
    <SelectedDataContext.Provider value={[selectedData, setSelectedData]}>
      {props.children}
    </SelectedDataContext.Provider>
  );
};
