import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {utils} from 'evisit-js-utils';
import Avatar from 'material-ui/Avatar';

class PopularRepositoriesList extends Component {

  constructor() {
    super();
    this.state = {
      language: utils.get(this, 'props.language', null),
      languageRepositoriesData: utils.get(this, 'props.data', null)
    };
  }

  componentWillReceiveProps(nextProps) {
    let updatedLanguage = utils.get(nextProps, 'language', null),
      updatedLanguageRepositoriesData = utils.get(nextProps, 'data', null);
    this.setState({
      language:                 updatedLanguage,
      languageRepositoriesData: updatedLanguageRepositoriesData
    });
  }

  renderRepositoryListItem(repository) {
    return (
      <ListItem
        leftAvatar={<Avatar src={utils.get(repository, 'owner.avatar_url')} />}
        // rightIcon={<Star/>}
        primaryText={utils.get(repository, 'name', '')}
        secondaryText={utils.get(repository, 'full_name', '')}
        key={`repo_${utils.get(repository, 'id')}`}
      />
    );
  }

  renderRepositoriesList(repositories) {
    let repositoriesList = [];
    for (var repository of repositories) {
      repositoriesList.push(this.renderRepositoryListItem(repository));
    }
    for (repository of repositories) {
      repositoriesList.push(this.renderRepositoryListItem(repository));
    }
    return repositoriesList;
  }

  render() {
      if (this.state.language && this.state.languageRepositoriesData) {
        return(
          <Card expanded={true}>
            <CardTitle title={`Popular ${ utils.get(this, 'state.language', '') } repositories`} />
            <CardText>
            <List>
              { this.renderRepositoriesList(utils.get(this, 'state.languageRepositoriesData.items', [])) }
            </List>
            </CardText>
          </Card>
        );
      } else {
        return false;
      }
  }
}

export default PopularRepositoriesList;
