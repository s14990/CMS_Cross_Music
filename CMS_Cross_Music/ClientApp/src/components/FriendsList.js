import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/selected_user';
import Select from 'react-select';

class FriendsList extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.prep = this.prep.bind(this);
        this.state = {
            activeItemId: -1,
            ufl: [],
            friendlist: [],
            possible_friends: [],
            not_friend_ids: [],
            current_user: 0,
            selectedOption: ''
        };

    }


    async componentDidMount() {
       await this.prep();
    }


    async prep() {
        let user_id = this.props.auth.user.idUser;
        await fetch('api/friendlists?$expand=ufl($expand=userIdUserNavigation)&$filter=UserIdUser eq ' + user_id)
            .then(response => response.json())
            .then(data => {
                let result = data[0].Ufl.map(a => a.UserIdUser);
                this.setState({
                    ufl: data[0].Ufl, not_friend_ids: result, current_user: user_id, current_user_fl: data[0].IdFl
                });

            });


        await fetch('api/Usrs?$expand=friendlist&$filter=idUser in (' + this.state.not_friend_ids.join(',') + ') eq false and idUser ne ' + user_id)
            .then(response => response.json())
            .then(data => {
                var mapa = data;
                console.log(mapa);
                var searchList = mapa.map(
                    usr => {
                        return {
                            value: usr,
                            label: usr.UserName,
                        }
                    }
                );
                this.setState({
                    searchList
                });

            });

        var user_list = [];
        var list = this.state.ufl;

        for (var i = 0; i < list.length; i++) {
            let uf = list[i];
            let u = {
                id_user: uf.UserIdUserNavigation.IdUser,
                user_name: uf.UserIdUserNavigation.UserName
            }
            user_list.push(u);
        }
        this.setState({ friendlist: user_list });
        this.setState({ selectedOption: '' });
    }

    handleClick(id) {
        this.props.selectUser(id);
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
    }

    handleAdd() {
        var req1 = JSON.stringify({
            active: true,
            friendlistIdFl: this.state.current_user_fl,
            userIdUser: this.state.selectedOption.value.IdUser
        });
        console.log(req1);
        var req2 = JSON.stringify({
            active: true,
            friendlistIdFl: this.state.selectedOption.value.Friendlist.IdFl,
            userIdUser: this.state.current_user
        });
        fetch("/api/ufls", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: req1
        });
        fetch("/api/ufls", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: req2
        });
        console.log(req2);
        this.prep();
        /*
        fetch("/api/Zamowienies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: req
            */
    }

    render() {
        return (
            <div className='card border-primary bg-light m-0 p-0'>
                <div className='card-header'>Friends</div>
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
                <Select
                    value={this.state.selectedOption}
                    options={this.state.searchList}
                    onChange={this.handleChange}
                />
                {this.state.selectedOption &&
                    <Button color="warning" onClick={this.handleAdd}>Dodaj</Button>
                }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FriendsList);