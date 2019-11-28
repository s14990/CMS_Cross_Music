import React, { Component } from 'react';
import { connect } from 'react-redux';
import "video-react/dist/video-react.css";
import Show_Video from './Show_Video';
import { Table } from 'reactstrap';
import ReactPlayer from 'react-player';

class MediaFiles extends Component {


    constructor(props) {
        super(props);
        this.state = { files: [] }
        fetch('api/MediaFiles')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    files: data
                });
            });
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}



export default connect()(MediaFiles);