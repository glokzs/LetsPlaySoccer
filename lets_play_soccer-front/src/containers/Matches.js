import React, {Component} from 'react';
import {connect} from "react-redux";


class Matches extends Component {

    render() {
        return (
            <div>
                Here will be Matches (Main Page)
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);