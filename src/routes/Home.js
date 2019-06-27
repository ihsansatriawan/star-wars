/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { func, arrayOf, object, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loader from '../components/Loader';
import { changePersons, changeIsDataLoaded } from '../actions/app';

class Home extends Component {
  static propTypes = {
    changePersons: func,
    changeIsDataLoaded: func,
    persons: arrayOf(object),
    nextUrl: string,
    isDataLoaded: bool,
  }

  state = {
    loading: true,
    buttonLoading: false,
  }

  handleChangeLoader = (value) => {
    this.setState({
      loading: value,
    });
  }

  handleChangeButtonLoader = () => {
    this.setState({
      buttonLoading: !this.state.buttonLoading,
    });
  }

  handleNextPage = url => () => {
    this.handleChangeButtonLoader();
    axios.get(url)
      .then((res) => {
        const persons = res.data;
        this.props.changePersons({
          list: persons.results,
          nextUrl: persons.next,
        });
        this.handleChangeButtonLoader();
      });
  }

  componentDidMount() {
    this.props.persons.length === 0 && axios.get('https://swapi.co/api/people')
      .then((res) => {
        const persons = res.data;
        this.props.changePersons({
          list: persons.results,
          nextUrl: persons.next,
        });
        this.props.changeIsDataLoaded({
          isDataLoaded: true,
        });
      });
  }

  renderButtonNext = () => (
    <Button onClick={this.handleNextPage(this.props.nextUrl)} variant="raised" color="primary">
      Next Page
    </Button>
  )

  renderCardContent = (person, index) => {
    const { name } = person;
    const url = person.url.split('/');
    return (
      <Card key={`${name} - ${index}`}>
        <CardContent>
          <Typography variant="headline" component="h2">
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/person/${url[url.length - 2]}`}>
              {name}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }

  render() {
    const { persons, nextUrl, isDataLoaded } = this.props;
    const { buttonLoading } = this.state;

    if (!isDataLoaded) {
      return <Loader />;
    }

    return (
      <div>
        {
          persons.map((person, index) => this.renderCardContent(person, index))
        }
        {
          nextUrl !== '' && (buttonLoading ? <Loader /> : this.renderButtonNext())
        }
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  persons: app.persons || [],
  nextUrl: app.nextUrl || '',
  isDataLoaded: app.isDataLoaded || false,
});

const mapDispatchToProps = {
  changePersons,
  changeIsDataLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
