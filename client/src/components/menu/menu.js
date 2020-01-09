import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from '@material-ui/core';

import BinMap from '../../routes/binmap';
import App from '../../App';
import Employees from '../../routes/employees';
import User from '../../routes/user';
import Squads from '../../routes/squads';



const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    msScrollSnapX: true
  },
});


function displayPage(newValue){
  switch(newValue){
    case 0 :
      return (<BinMap/>);
    case 1 : 
      return (<Employees/>)
    case 2 :
      return (<User/>)  
      default :
      return (<App/>);
  }
}

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
          <Tab value={0} label="MAP"  component ={Link}>
          </Tab>

          <Tab value={1} label="EMPLOYES" component ={Link}>
          </Tab>

          <Tab value={2} label="UTILISATEUR"  component ={Link}>
          </Tab>
        </Tabs>
	{displayPage(value)}
      </Paper>

  );

}
