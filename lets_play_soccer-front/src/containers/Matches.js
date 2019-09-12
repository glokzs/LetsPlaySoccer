import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from "../components/UI/Spinner";
import photo from '../assets/content_images/Mask.png';
import {getMatches, getMyMatches} from "../store/actions/matchAction";
import moment from "moment";


class Matches extends Component {
    state = {
        loading: true,
    };

    componentDidMount() {
        this.props.getMatches(
            () => this.setState({loading: false})
        );
    }

    getConfirmedUsersNumber = users => {
        return users.reduce((acc, count) => {
            return acc + !!count.user_match.confirmed;
        }, 0);
    };

    getHours = hours => moment(hours).format('HH:mm');
    getDate = datetime => moment(datetime).format('DD MMMM');
    getDayOfTheWeek = datetime => moment(datetime).format('dddd');
    getTimeDiff = (startTime, endTime) => {
        const hours = moment(endTime).diff(startTime, 'hours');
        const minutes = moment.utc(moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm"))).format("mm");
        return (hours < 10 ? '0'+ hours : hours) + ':' + minutes;
    };
    getPlayerWord = number => {
      switch (number) {
          case 1:
              return 'игрок';
          case 2:
          case 3:
          case 4:
              return 'игрока';
          default:
              return 'игроков';

      }
    };

    getPricePerPerson = (priceTotal, format, team) => {
        const price = Math.round(priceTotal / (format * team));
        if (price === Infinity) return 0;
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || 0;
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
                            this.props.matches.length > 0 ?
                                (<Fragment>
                                    <h6 className='matches__heading'>Мои матчи</h6>
                                    {this.props.matches.map(match => {
                                        return (
                                            <div className='matches__card' key={match.id}>
                                                <div className='matches__card__head'>
                                                    <img className='matches__avatar' src={photo} alt="avatar"/>
                                                    <div>
                                                        <div className='matches__text--main'>match.organizer}</div>
                                                        <span className='matches__text--primary'>Мой матч</span>
                                                    </div>
                                                </div>
                                                <div className='matches__card__body'>
                                                    <div className='row'>
                                                        <div className='col-8'>
                                                            <div className='icon--map-b'>
                                                                &nbsp;&nbsp;<span className='matches__text--main'>{match.field.name}</span>
                                                            </div>
                                                            <div className='icon--clock'>
                                                                &nbsp;&nbsp;<span className='matches__text--main'>{this.getHours(match.start)}</span>
                                                                - {this.getTimeDiff(match.start, match.end)}
                                                            </div>
                                                            <div className='icon--calendar-b'>
                                                                &nbsp;&nbsp;<span className='matches__text--main'>{this.getDate(match.start)}</span>,
                                                                &nbsp;<span className='day-of-the-week'>{this.getDayOfTheWeek(match.start)}</span>
                                                            </div>
                                                        </div>
                                                        <div className='col-4 text-right'>
                                                            <span className='matches__format--t-shirt'>
                                                                {match.playersInTeam}x{match.playersInTeam}&nbsp;<span className='icon--t-shirt'/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex mt-3'>
                                                        <div className="col-8 d-flex align-items-center">
                                                            <div className='position-relative'>
                                                                {match.users[0]? <img src={photo} alt="avatar" className='matches__users'/> : null}
                                                                {match.users[1]? <img src={photo} alt="avatar" className='matches__users'/> : null}
                                                                {match.users[2]? <img src={photo} alt="avatar" className='matches__users'/> : null}
                                                            </div>
                                                            <div className='matches__text--number'>
                                                                <b>{this.getConfirmedUsersNumber(match.users)}&nbsp;</b>
                                                                {this.getPlayerWord(this.getConfirmedUsersNumber(match.users))}&nbsp;из&nbsp;
                                                                {match.playersInTeam * match.numOfTeams}
                                                            </div>
                                                        </div>
                                                        <div className="col-4 text-right font-weight-bold">{this.getPricePerPerson(
                                                            match.price, match.playersInTeam, match.numOfTeams
                                                        )}&nbsp;₸</div>
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
        getMatches: (cb) => dispatch(getMatches(cb)),
        getMyMatches: () => dispatch(getMyMatches())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
