import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardHeader } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function Cards({ data, handleClick }) {
  const classes = useStyles();
  const [shadow, setShadow] = useState(0);
  const onMouseOver = () => setShadow(4);
  const onMouseOut = () => setShadow(0);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        {data.map((ele) => (
          <Grid item xs={12} sm={6} md={3} key={ele._id}>
            <Box boxShadow={shadow} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
              <Card
                onClick={(e) => {
                  handleClick({ movieId: ele._id });
                }}
              >
                <CardHeader
                  title={` ${ele.name}`}
                  // subheader={`date: ${ele.date}`}
                />
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
