import React, {Component, Fragment} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {connect} from "react-redux";
import {getFields} from "../store/actions/fieldsAction";
// import {saveIdOfSelectedField} from "../store/actions/matchAction";

class LeafletMap extends Component {
    state = {
        markers: []
    };

    componentDidMount() {
        this.props.getFields();
    }

    // onClick = e => {
    //     const {markers} = this.state;
    //     markers.push(e.latlng);
    //     this.setState({markers});
    // };

    render() {
        const position = [43.23610467522214, 76.94566860795022];
        return (
            <Fragment>
                {this.props.fields && this.props.fields.length > 0 ?
                    <Map
                        center={position}
                        zoom={12}
                        // onClick={this.onClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {this.props.fields.map((field, idx) =>
                            <Marker key={`marker-${idx}`} position={[field.lat, field.lng]}>
                                <Popup>
                                    <span><b>{field.name}</b> <br/> {field.address}</span>
                                    <br/>
                                    <hr/>
                                    <div className={'popup__btn'}>
                                        <button
                                            className='btn--primary'
                                            onClick={() => {
                                                console.log(this.props);
                                                this.props.sendFieldId(field.id, field.name)
                                            }}
                                        >
                                            Выбрать
                                        </button>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                    </Map>
                : null}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        fields: state.fields.fields
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getFields: () => dispatch(getFields())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMap);
