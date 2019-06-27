import React, { Component } from 'react';
import axios from 'axios';
import { node, object } from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import { Link } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Loader from '../components/Loader';
import Film from '../components/Film';

const TabContainer = props => <Typography component="div" style={{ padding: 8 * 3 }}>
  {props.children}
</Typography>;

TabContainer.propTypes = {
  children: node,
};

export default class personDetail extends Component {
  static propTypes = {
    children: node,
    match: object,
  }

  state = {
    loading: true,
    data: {},
    value: 0,
  }

  handleChangeLoader = (value) => {
    this.setState({
      loading: value,
    });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`https://swapi.co/api/people/${params.id}`)
      .then((res) => {
        const person = res.data;
        this.setState({
          data: person,
        });
        this.handleChangeLoader(false);
      });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderDataCommon = data => (<div>
    <div>
      {data.name}
    </div>
    <div>
      {data.eye_color}
    </div>
    <div>
      {data.birth_year}
    </div>
    <div>
      {data.mass}
    </div>
    <div>
      {data.height}
    </div>
  </div>)

  renderSubTitleContent = text => <Typography variant="headline" component="h2">
    {text}
  </Typography>

  renderDataSpec = (data) => {
    const { films } = data;

    const renderFilm = films.map((value, index) => <Film key={`${index}-${value}`} url={value} />);

    return (
      <div>
        {this.renderSubTitleContent('Film')}
        {renderFilm}
      </div>
    );
  }

  render() {
    const { loading, data, value } = this.state;

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Data Common" />
          <Tab label="Data Spec" />
        </Tabs>
        {value === 0 && <TabContainer>{this.renderDataCommon(data)}</TabContainer>}
        {value === 1 && <TabContainer>{this.renderDataSpec(data)}</TabContainer>}
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
          <Button variant="raised" color="primary">
            Back
          </Button>
        </Link>
      </div>
    );
  }
}
