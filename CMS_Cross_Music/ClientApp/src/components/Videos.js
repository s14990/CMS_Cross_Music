import React, { Component } from 'react';
import { connect } from 'react-redux';
import "video-react/dist/video-react.css";
import Show_Video from './Show_Video';

class Videos extends Component {


    constructor(props) {
        super(props);
        this.state = { videos: []}
        fetch('api/MediaFiles')
            .then(response => response.json())
            .then(data => {
                this.setState({
                   videos: data
                });
            });
    }


    render() {
        return (
            <div>
                {this.state.videos.map(video =>
                    <div>
                    <h2>-----------------</h2>
                    <Show_Video video={video} />
                    </div>
                )}
            </div>
        );
    }
}



export default connect()(Videos);
