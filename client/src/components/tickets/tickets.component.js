import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TicketCards from './tickets.cards.component';

export const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const {
          data: { data },
        } = await Axios.get(`api/user/bookings`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });

        console.log(data);
        setTickets(data);
      };
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return <div>{tickets.length == 0 ? 'No tickets Found' : <TicketCards tickets={tickets} />}</div>;
};
