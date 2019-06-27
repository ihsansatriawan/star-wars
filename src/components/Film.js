import React, { Component } from 'react';
import { string } from 'prop-types';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Loader from './Loader';

export default class Film extends Component {
  static propTypes = {
    url: string.isRequired,
  }

  state = {
    loading: true,
    data: {},
  }

  handleChangeLoader = (value) => {
    this.setState({
      loading: value,
    });
  }

  componentDidMount() {
    const { url } = this.props;
    axios.get(url)
      .then((res) => {
        const film = res.data;
        this.setState({
          data: film,
        });
        this.handleChangeLoader(false);
      });
  }

  render() {
    const { loading, data } = this.state;
    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <div>Title: {data.title}</div>
        <div>Director: {data.director}</div>
        <div>Producer: {data.producer}</div>
        <Divider />
      </div>
    );
  }
}
