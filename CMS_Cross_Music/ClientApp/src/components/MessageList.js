import React from 'react';
import {Alert} from 'reactstrap';

const DUMMY_DATA = [
  {
      autorId: 2,
      UserName:'Pier',
      text: 'Hey, how is it going?',
      date:'2019-10-08',
      time:'19:23'
  },
  {
      autorId: 1,
      UserName:'Admin',
      text: 'Great! How about you?',
      date:'2019-10-08',
      time:'19:46'
  },
  {
      autorId: 2,
      UserName:'Pier',
      text: 'Good to hear! I am great as well',
      date:'2019-10-09',
      time:'07:15'
  }
]

class MessageList extends React.Component {
    render() {
      let previousDate = '1900-01-01';
        return (
          <div className='border rounded'>
            <p>MessageList</p>
            {DUMMY_DATA.map((message, index) => {
                return (
                  <div ><p className='d-flex justify-content-center text-dark'> {previousDate!= message.date? previousDate = message.date : ''}</p> 
                  
                    <div className={`d-flex p-1 bd-highlight justify-content${message.autorId === 1? '-end':'-start'}`}>
                      <div className='d-flex flex-column bd-highlight'>
                        <div className='d-flex bd-highlight'>
                          <div className = 'mr-auto  bd-highlight text-dark' >{message.UserName}</div>
                          <div className = 'bd-highlight text-dark' >{message.time}</div>
                        </div>
                        <Alert style={{display : 'inline-block'}}
                          color = {message.autorId === 1? 'info':'light'}>{message.text} 
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

export default MessageList