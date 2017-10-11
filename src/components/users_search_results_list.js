import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {utils} from 'evisit-js-utils';
import Avatar from 'material-ui/Avatar';

class UsersSearchResultsList extends Component {

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

  renderUserListItem(user) {
    return (
      <ListItem
        leftAvatar={<Avatar src={utils.get(user, 'avatar_url')} />}
        primaryText={utils.get(user, 'login', '')}
        key={`repo_${utils.get(user, 'id')}`}
      />
    );
  }

  renderUsersList(users) {
    let usersList = [];
    for (var user of users) {
      usersList.push(this.renderUserListItem(user));
    }
    return usersList;
  }

  render() {
      if (this.state.searchResults) {
        return(
          <Card expanded={true}>
            <CardTitle title={"Search Results"} />
            <CardText>
            <List>
              { this.renderUsersList(utils.get(this, 'state.searchResults.items', [])) }
            </List>
            </CardText>
          </Card>
        );
      } else {
        return false;
      }
  }
}

export default UsersSearchResultsList;
