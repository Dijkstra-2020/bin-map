import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Map from '../map/map'
import Settings from "../parametres/parametres"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    msScrollSnapX: true
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
      
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab label="MAP">
          </Tab>
          
          <Tab label="EMPLOYES">

          </Tab>

          <Tab label="EQUIPES">

          </Tab>
          <Tab label="PARAMETRES">
          </Tab>
        </Tabs>
      </Paper>
    );

}