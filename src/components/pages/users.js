import React, { Component } from 'react';
import '../../App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import SelectedLangauge from '../selected_language';
import PopularRepositoriesList from '../popular_repositories_list';
import Navbar from '../navbar';

class Users extends Component {

  constructor() {
    super();
    this.state = {
    };
  }


  renderLoader = () => {
    if(this.state.showLoader === true) {
      return (
        <div>
          <img src='../loader.gif' alt='loader' width='80' height='80'></img>
          <br></br>
          <div>
            Hang on let us fetch and process the data for you.
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
          <Navbar  />
          <Grid fluid>
            <h1> Users Page </h1>
          </Grid>
      </div>
    );
  }
}

export default Users;
