import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from "../components/UI/Spinner";
import photo from '../assets/content_images/Mask.png';
import {getMatches, getMyMatches} from "../store/actions/matchAction";
import moment from "moment";
import MatchesList from "../components/MatchesList";


class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userId: props.user.id
        };
    }

    componentDidMount() {
        this.props.getMatches(
            this.state.userId,
            () => this.setState({loading: false})
        );
        this.props.getMyMatches(
            this.state.userId
        );
    }

    render() {
        console.log(this.props.matches);
        return (
            <div className='matches'>

                {this.state.loading?
                    <Spinner />
                :(
                    <Fragment>
                        <MatchesList
                            header={'Мои матчи'}
                            matches={this.props.myMatches}
                        />
                        <br/>
                        <MatchesList
                            header={'другие матчи'}
                            matches={this.props.matches}
                        />
                    </Fragment>
                )}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.users.user,
        matches: state.matches.matches,
        myMatches: state.matches.myMatches
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getMatches: (id, cb) => dispatch(getMatches(id, cb)),
        getMyMatches: (id) => dispatch(getMyMatches(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
