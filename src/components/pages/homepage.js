import React, { Component } from 'react';
import '../../App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import SelectedLangauge from '../selected_language';
import PopularRepositoriesList from '../popular_repositories_list';
import Navbar from '../navbar';

class Homepage extends Component {

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
    const languages = [
      'ruby',
      'javascript',
      'java',
      'crystal'
    ];
    return (
      <div className="App">
          <Navbar  />
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
    );
  }
}

export default Homepage;
