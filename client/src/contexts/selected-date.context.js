import React, { createContext, useState } from 'react';

export const SelectedDateContext = createContext();

export const SelectedDateProvider = (props) => {
  let today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <SelectedDateContext.Provider value={[selectedDate, setSelectedDate]}>
      {props.children}
    </SelectedDateContext.Provider>
  );
};
