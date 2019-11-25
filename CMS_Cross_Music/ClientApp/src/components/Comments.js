import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comments extends Component{


    render() {

        return(
            <p className='comment'>Comment</p>
        );
    }
}



export default connect()(Comments);