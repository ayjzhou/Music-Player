import React, { Component } from 'react';

class Tracks extends Component {
    state ={ playing: false, audio: null, playingPreviewURL: null };

    playAudio = previewUrl => () => {
        const audio = new Audio(previewUrl);

        if (!this.state.playing) {
            audio.play();
            this.setState({ playing: true, audio, playingPreviewURL: previewUrl });
        } else {
            this.state.audio.pause();

            if (this.state.playingPreviewURL === previewUrl) {
                this.setState({ playing: false });
            } else {
                audio.play();
                console.log("Pickel is my hubby!");
                console.log("new feature");
                this.setState({ audio, playingPreviewURL: previewUrl });
            }
        }
    }

    trackIcon = track => {
        if (!track.preview_url) {
            return <span>N/A</span>
        }
        if (
            this.state.playing &&
            this.state.playingPreviewURL === track.preview_url
        ) {
            return <span>| |</span>;
        }

        return <span>&#9654;</span>;
    }


    render () {
        const { tracks } =this.props;

        return (
            <div>
                {
                    tracks.map(track => {
                        const { id, name, album, preview_url } = track;

                        return (
                            <div 
                                key={id} 
                                onClick={this.playAudio(preview_url)}
                                className='track'
                            >
                                <img 
                                    src={album.images[0].url} 
                                    alt='track-image' 
                                    className='track-image'
                                />
                                <p className='track-text'>{name}</p>
                                <p className='track-icon'>{this.trackIcon(track)}</p>
                            </div>
                        )
                    })
                    }
            </div>
        )
    }
}

export default Tracks;