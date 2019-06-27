import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const Loader = () => <CircularProgress style={{ color: purple[500] }} thickness={7} />;

export default Loader;
