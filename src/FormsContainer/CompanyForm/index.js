import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 400
  },
  title: {
    fontSize: 20
  },
  pos: {
    marginBottom: 12
  }
});

const CompanyForm = () => {
  const [state, setState] = React.useState({
    name: ""
  });
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <form>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Create Company
        </Typography>
        <TextField id="standard-basic" label="Company Name" />
    
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      </form>
    </Card>
  );
};

export default CompanyForm;
