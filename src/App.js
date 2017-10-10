import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import SelectedLangauge from './components/selected_language';
import PopularRepositoriesList from './components/popular_repositories_list';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showLoader: false,
      repositoriesDataByLanguage: null
    };
    this.fetchLanguageDataFromGithub = this.fetchLanguageDataFromGithub.bind(this);
    this.setShowLoader = this.setShowLoader.bind(this);
  }

  fetchLanguageDataFromGithub = (language) =>   {
    let that = this;
    this.setShowLoader(true);
    fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`)
    .then( (response) => {
      return response.json();
    }).then( (json) => {
      that.setShowLoader(false);
      this.setState({repositoriesDataByLanguage: json});
      return json;
    })
  }

  setSelectedLanguage(language) {
    this.setState({selectedLangauge: language});
    this.fetchLanguageDataFromGithub(language);
  }

  setShowLoader(state) {
    this.setState({
      showLoader: state
    });
  }

  renderLoader = () => {
    if(this.state.showLoader === true) {
      return (
        <div>
          <img src='./loader.gif' alt='loader' width='80' height='80'></img>
          <br></br>
          <div>
            Hang on let us fetch and process the data for you.
          </div>
        </div>
      );
    }
  }

  render() {
    const languages = [
      'ruby',
      'javascript',
      'java',
      'crystal'
    ],
    style = {
      margin: 28,
    };
    return (
      <MuiThemeProvider>
      <div className="App">
          <Row>
            <Col xs={1} id="appLogoHolder">
              <img src='./github_21600.png' className="App-logo" alt="logo"></img>
            </Col>
            <Col xs={11} id="navHolder">
              <ul id="nav">
                <li className="navLink"><a href="#home">Home</a></li>
                <li className="navLink"><a href="#">Repositories</a></li>
                <li className="navLink"><a href="#">Users</a></li>
              </ul>
            </Col>
          </Row>
          <Grid fluid>
            <Row>
              <Col xs={10}>
              <AutoComplete
                floatingLabelText="Enter language to get stats"
                filter={AutoComplete.fuzzyFilter}
                dataSource={languages}
                maxSearchResults={5}
                fullWidth={true}
                onNewRequest={(value) => this.setSelectedLanguage(value)}
              />
              </Col>
              <Col xs={2}>
                {
                  // <!-- <RaisedButton label="Primary" primary={true} style={style} /> -->
                }

              </Col>
            </Row>
            <div>
              <SelectedLangauge language={this.state.selectedLangauge}></ SelectedLangauge>
              { this.renderLoader() }
            </div>
            <div id="resultWindow">
              <Row>
                <Col xs={6}>
                  <PopularRepositoriesList language={ this.state.selectedLangauge } data={ this.state.repositoriesDataByLanguage }></PopularRepositoriesList>
                </Col>
                <Col xs={6}>
                  <Card expanded={true}>
                    <CardTitle title="Card title" />
                    <CardText expandable={true}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                  </Card>
                </Col>
              </Row>
            </div>
          </Grid>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
