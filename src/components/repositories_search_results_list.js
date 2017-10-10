import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {utils} from 'evisit-js-utils';
import Avatar from 'material-ui/Avatar';

class RepositoriesSearchResultsList extends Component {

  constructor() {
    super();
    this.state = {
      searchResults: utils.get(this, 'props.data', null)
    };
  }

  componentWillReceiveProps(nextProps) {
    let updatedsearchResults = utils.get(nextProps, 'data', null);
    this.setState({
      searchResults: updatedsearchResults
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
      if (this.state.searchResults) {
        return(
          <Card expanded={true}>
            <CardTitle title={"Search Results"} />
            <CardText>
            <List>
              { this.renderRepositoriesList(utils.get(this, 'state.searchResults.items', [])) }
            </List>
            </CardText>
          </Card>
        );
      } else {
        return false;
      }
  }
}

export default RepositoriesSearchResultsList;
