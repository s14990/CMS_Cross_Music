import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/selected_user';

const DUMMY_DATA = [
    {
        id_user: 2,
        user_name: 'Pier'
    },
    {
        id_user: 3,
        user_name: 'John'
    }
]


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
        //   console.log('handleClick:', {idTopic, headLine});
        this.setState({
            activeItemId: id,
        });
        this.props.selectUser(id);
        //   console.log('isPrivate, state:', this.state);

    }
    render() {
        return (
            <div className='border rounded'>
                <p className='text-dark'>FriendsList</p>
                <ListGroup>
                    {this.state.friendlist.map((friend, index) => {
                        return (
                            <ListGroupItem active={this.state.activeItemId === friend.id_user} color={this.state.activeItemId === friend.id_user ? 'light' : null}
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
function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FriendsList);