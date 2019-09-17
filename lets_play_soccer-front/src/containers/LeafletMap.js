import React, { Component } from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {postMatch} from "../store/actions/matchAction";
import {connect} from "react-redux";

class LeafletMap extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 12,
        markers: [[43.24812998918575, 76.90917719621213]]
    };

    onClick = e => {
        const {markers} = this.state;
        markers.push(e.latlng);
        this.setState({markers});
    };

    render() {
        const position = [43.23610467522214, 76.94566860795022];
        return (
            <Map
                center={position}
                zoom={this.state.zoom}
                onClick={this.onClick}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.markers.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                        </Popup>
                    </Marker>
                )}
            </Map>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        postMatch: data => dispatch(postMatch(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMap);
