import React, { Component } from 'react';
import { Row } from 'react-flexbox-grid';

class SelectedLangauge extends Component {

  render() {
      let language = this.props.language;
      if (language) {
        return(
          <Row>
            <h3> Language selected : { this.props.language }</h3>
          </Row>
        );
      } else {
        return(
          <Row>
            <h3>No language selected.</h3>
          </Row>
        );
      }
  }
}

export default SelectedLangauge;
