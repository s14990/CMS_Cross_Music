import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/selected_user';

class FriendsList extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            activeItemId: -1,
            ufl: [],
            friendlist: []
        };
    }


    async componentDidMount() {
        let user_id = this.props.auth.user.idUser;
        await fetch('api/friendlists?$expand=ufl($expand=userIdUserNavigation)&$select=Ufl&$filter=UserIdUser eq ' + user_id)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ufl: data[0].Ufl
                });

            });


        var user_list = [];
        var list = this.state.ufl;
        
        console.log(this.state.ufl);
        for (var i = 0; i < list.length; i++) {
            let uf = list[i];
            let u = {
                id_user: uf.UserIdUserNavigation.IdUser,
                user_name: uf.UserIdUserNavigation.UserName
            }
            user_list.push(u);
        }
        this.setState({ friendlist: user_list });

    }


    handleClick(id) {
        this.props.selectUser(id);
    }

    render() {
        return (
            <div className='card border-primary text-white bg-secondary'>
                <div className='card-header'>FriendsList</div>
                <ListGroup>
                    {this.state.friendlist.map((friend, index) => {
                        return (
                            <ListGroupItem active={this.props.sel.selected_user === friend.id_user}
                                key={friend.id_user} tag={Link} to={`/messages/${friend.id_user}`}
                                action onClick={() => this.handleClick(friend.id_user)}
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

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FriendsList);