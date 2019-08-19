import React, { Component } from 'react';

class Video extends Component {
    constructor(props){
        super(props);
        this.player = null;
    }

    state = {
        playersLoaded: false
    }

    componentDidMount() {
        if (!window.YT) {
            let tag = document.createElement("script");
            tag.src = 'https://www.youtube.com/iframe_api';

            //window.onYouTubeIframeAPIReady = this.loadPlayer

            let firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            console.log('else didMount window.YT', window.YT)
            this.loadPlayer();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.playersLoaded) {
            this.loadPlayer();
            this.setState({
                playersLoaded: true
            });
        }
    }

    loadPlayer = () => {
        const {videoId} = this.props;
        console.log('load Player', videoId)

        this.player = new window.YT.Player(`youtube-player-${videoId}`, {
            height: "390",
            videoId,
            playerVars: { rel: 0 },
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange
            }
        });
    }

    onPlayerReady = event => {
        // event.target.playVideo();
    }

    onPlayerStateChange = event => {
        if(event.data == window.YT.PlayerState.UNSTARTED) {
            const videoDuration = this.player.getDuration();
            console.log('videoId', this.props.videoId, 'videoDuration', videoDuration)
            this.props.extendSlideInterval(videoDuration)
        }
        if (event.data == window.YT.PlayerState.ENDED) {
            event.target.pauseVideo();
        }
    }

    render() {
        const {videoId} = this.props;

        return (
            <div className="video-container">
                <div id={`youtube-player-${videoId}`}></div>
            </div>
        );
    }
}

export default Video;
