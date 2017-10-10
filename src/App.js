import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Homepage from './components/pages/homepage';
import Repositories from './components/pages/repositories';
import Users from './components/pages/users';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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
    return (
      <Router>
        <MuiThemeProvider>
          <div id="root">
            <Route exact path="/" component={Homepage}/>
            <Route path="/repos" component={Repositories}/>
            <Route path="/users" component={Users}/>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
