import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from "../components/UI/Spinner";
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";


class Matches extends Component {
    state = {
        loading: false
    };

    render() {
        let form;
        if(this.state.loading){
            form = <Spinner />
        } else {
            form = (
                <div>
                    Here will be Matches (Main Page)
                </div>
            );
        }
        return (
            <div>
                {form}
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
