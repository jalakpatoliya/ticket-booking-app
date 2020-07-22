import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardHeader } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function TicketWrapper({ tickets }) {
  const classes = useStyles();
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={3} key={tickets.indexOf(ticket)}>
            <Card>
              <CardHeader
                title={`Theatre Name : ${ticket.theatreName}`}
                subheader={`date: ${ticket.date}`}
              />
              <CardContent>
                <Typography variant="h6">screen Name: {ticket.screenName}</Typography>
                <Typography variant="h6">row Name.: {ticket.rowName}</Typography>
                <Typography variant="h6">seat no.: {ticket.seatNumber}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
