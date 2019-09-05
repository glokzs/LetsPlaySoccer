import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from "../components/UI/Spinner";
import {myMatches} from '../mockup';
import photo from '../assets/content_images/Mask.png';
import {getMatches, getMyMatches} from "../store/actions/matchAction";


class Matches extends Component {
    state = {
        loading: false,
    };

    componentDidMount() {
        this.props.getMatches();
    }

    calculateEndTime = (startTime, hours) => {
        // const startTimeHours = startTime.toString().split(':')[0];
        // const startTimeMinutes = startTime.toString().split(':')[1];
        // const endTimeHours = parseInt(hours);
        // const endTimeMinutes = hours % 10;
        //
        // const newTime = new Date();

        // console.log(startTime, hours, startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes, newTime);
        return 'dsdsd';
    };

    render() {
        console.log(this.props.matches);
        return (
            <div className='matches'>

                {this.state.loading?
                    <Spinner />
                :(
                    <Fragment>
                        {
                            myMatches.length > 0 ?
                                (<Fragment>
                                    <h6 className='matches__heading'>Мои матчи</h6>
                                    {myMatches.map(match => {
                                        return (
                                            <div className='matches__card' key={match.id}>
                                                <div className='matches__card__head'>
                                                    <img className='matches__avatar' src={photo} alt="avatar"/>
                                                    <div>
                                                        <div className='matches__text--main'>{match.organizer}</div>
                                                        <span className='matches__text--primary'>Мой матч</span>
                                                    </div>
                                                </div>
                                                <div className='matches__card__body'>
                                                    <div className='row'>
                                                        <div className='col-8'>
                                                            <div className='matches__text--main icon--map-b'>
                                                                {match.field.name}
                                                            </div>
                                                            <div>
                                                                {match.startTime} - {this.calculateEndTime(match.startTime, match.duration)}
                                                            </div>
                                                        </div>
                                                        <div className='col-4'>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Fragment>) : null
                        }
                    </Fragment>
                )}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        matches: state.matches.matches,
        myMatches: state.matches.myMatches
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getMatches: () => dispatch(getMatches()),
        getMyMatches: () => dispatch(getMyMatches())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
