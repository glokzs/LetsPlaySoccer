import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from "../components/UI/Spinner";
import {getMatches, getMyMatches} from "../store/actions/matchAction";
import MatchesList from "../components/MatchesList";
import Toolbar from "../components/UI/Toolbar";
import {logoutUser} from "../store/actions/userAction";
import {Empty} from "antd";


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
        return (
            <Fragment>
                <header>
                    <Toolbar {...this.props} />
                </header>
                <div className='container'>
                    <div className='matches'>

                        {this.state.loading?
                            <Spinner />
                            :(
                                <Fragment>
                                    {!this.props.matches.length && !this.props.myMatches.length ?
                                        <div className='mt-5'>
                                            <Empty description={'Список матчей пока пустой. Создайте свой матч'}/>
                                        </div>
                                        :
                                        <Fragment>
                                            <MatchesList
                                                header={'Мои матчи'}
                                                matches={this.props.myMatches}
                                                userId={this.props.user.id}
                                            />
                                            <br/>
                                            <MatchesList
                                                header={'другие матчи'}
                                                matches={this.props.matches}
                                                userId={this.props.user.id}
                                            />
                                        </Fragment>
                                    }
                                </Fragment>
                            )}
                    </div>
                </div>
            </Fragment>
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
        getMyMatches: (id) => dispatch(getMyMatches(id)),
        logout: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
