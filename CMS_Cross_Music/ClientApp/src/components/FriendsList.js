import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DUMMY_DATA = [
  {
    id_user: 2,
    user_name:'Pier'
  },
  {
    id_user: 3,
    user_name:'John'
  }
]


class FriendsList extends Component {

  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
        activeItemId: -1,
        ufl: [],
        friendlist: []
    };
    }


    componentDidMount() {
        fetch('friendlists?$expand=ufl($expand=userIdUserNavigation)&$select=Ufl&$filter=UserIdUser eq 1' + this.props.auth.idUser)
          .then(response => response.json())
            .then(data => {
              this.setState({
                  ufl: data[0]
              });

          });
        var user_list = [];
        this.sate.ufl.map(uf => {
            let u;
            u.id_user = uf.UserUserIdUserNavigation.idUser;
            u.user_name = uf.UserUserIdUserNavigation.UserName;
            user_list.push(u);
        });
        this.setState({ friendlist: user_list });
  }


  handleClick(id) {
     //   console.log('handleClick:', {idTopic, headLine});
        this.setState({ 
          activeItemId: id,
        });
     //   console.log('isPrivate, state:', this.state);

  }
  render() {
      return (
        <div className='border rounded'>
          <p className='text-dark'>FriendsList</p>
              <ListGroup>
                  {this.state.friendlist.map((friend, index) => {
                return (
              <ListGroupItem  active= {this.state.activeItemId === friend.id_user} color={this.state.activeItemId === friend.id_user?'light':null}
                key={friend.id_user} tag={Link} to={`/messages/${friend.id_user}` }
                action onClick={()=> this.handleClick(friend.id_user)}
              > 
                {friend.user_name}
              </ListGroupItem >
            )               
            })
          }
          </ListGroup>
        </div>
      )
  }
}
function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(FriendsList);