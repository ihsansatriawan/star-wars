import React, { Component } from 'react';
import { object } from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Home from './Home';
import personDetail from './personDetail';
import withRoot from './withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  },
});

class Index extends Component {
  static propTypes = {
    classes: object.isRequired,
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/person/:id' component={personDetail} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
