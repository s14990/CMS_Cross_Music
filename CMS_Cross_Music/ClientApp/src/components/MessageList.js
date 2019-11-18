import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';

const DUMMY_DATA = [
    {
        autorId: 2,
        UserName: 'Pier',
        text: 'Hey, how is it going?',
        date: '2019-10-08',
        time: '19:23'
    },
    {
        autorId: 1,
        UserName: 'Admin',
        text: 'Great! How about you?',
        date: '2019-10-08',
        time: '19:46'
    },
    {
        autorId: 2,
        UserName: 'Pier',
        text: 'Good to hear! I am great as well',
        date: '2019-10-09',
        time: '07:15'
    }
]

class MessageList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loged_user_id: '',
            target_user_id: '',
            msg: [],
        };
    }

    async componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            let user_id = this.props.auth.user.idUser;
            let list = [];
            let friend_id = this.props.match.params.id;
            await fetch('api/Msgs?$expand=userIdAuthorNavigation,userIdTargerNavigation&$filter=(userIdAuthor eq ' + user_id + ' and userIdTarger eq ' + friend_id +
                ' )  or (userIdAuthor eq ' + friend_id + ' and userIdTarger eq ' + user_id + ' )')
                .then(response => response.json())
                .then(data => {
                    list = data;
                });


            var msg_list = [];
            console.log(list);
            for (var i = 0; i < list.length; i++) {
                let uf = list[i];
                let u = {
                    autorId: uf.UserIdAuthor,
                    UserName: uf.UserIdAuthorNavigation.UserName,
                    //UserName of target is UserIdTargerNavigation.UserName
                    text: uf.Text,
                    date: uf.MsgDate
                }
                msg_list.push(u);
            }
            console.log(msg_list);
            this.setState({ msg: msg_list });

        }
    }


    render() {
        let previousDate = '1900-01-01';
        return (
            <div className='border rounded'>
                <p>MessageList</p>
                {DUMMY_DATA.map((message, index) => {
                    return (
                        <div ><p className='d-flex justify-content-center text-dark'> {previousDate != message.date ? previousDate = message.date : ''}</p>

                            <div className={`d-flex p-1 bd-highlight justify-content${message.autorId === 1 ? '-end' : '-start'}`}>
                                <div className='d-flex flex-column bd-highlight'>
                                    <div className='d-flex bd-highlight'>
                                        <div className='mr-auto  bd-highlight text-dark' >{message.UserName}</div>
                                        <div className='bd-highlight text-dark' >{message.time}</div>
                                    </div>
                                    <Alert style={{ display: 'inline-block' }}
                                        color={message.autorId === 1 ? 'info' : 'light'}>{message.text}
                                    </Alert>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(MessageList);