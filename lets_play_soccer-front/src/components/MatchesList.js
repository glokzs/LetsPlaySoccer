import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {
    getConfirmedUsersNumber,
    getDate,
    getDayOfTheWeek, getHours,
    getPlayerWord,
    getPricePerPerson
} from "../helpers/helperMatch";
import config from "../config";


class MatchesList extends Component {

    getUsersAvatars = users => {
        const confirmedUsers = users.filter(user => user.user_match.confirmed);
        return (
            <div className='position-relative'>
                {confirmedUsers[0]? <img src={config.publicUserFolder+confirmedUsers[0].avatar} alt="avatar" className='matches__users'/> : null}
                {confirmedUsers[1]? <img src={config.publicUserFolder+confirmedUsers[1].avatar} alt="avatar" className='matches__users'/> : null}
                {confirmedUsers[2]? <img src={config.publicUserFolder+confirmedUsers[2].avatar} alt="avatar" className='matches__users'/> : null}
            </div>
        );
    };

    render() {
        return (
            <div className='matches'>
                <Fragment>
                    {
                        this.props.matches.length > 0 ?
                            (<Fragment>
                                <h6 className='matches__heading'>{this.props.header}</h6>
                                {this.props.matches.map(match => {
                                    return (
                                        <Link
                                            className='matches__card'
                                            key={match.id}
                                            to={`/my/matches/${match.id}`}
                                        >
                                            <div className='matches__card__head'>
                                                <img className='matches__avatar' src={config.publicUserFolder+match.organizer.avatar} alt="avatar"/>
                                                <div>
                                                    <div className='matches__text--main'>{match.organizer.displayName}</div>
                                                    <span className='matches__text--primary'>
                                                        {this.props.userId === match.organizerId? 'Мой матч' : null}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='matches__card__body'>
                                                <div className='row'>
                                                    <div className='col-8'>
                                                        <div className='icon--map-b'>
                                                            &nbsp;&nbsp;<span className='matches__text--main'>{match.field.name}</span>
                                                        </div>
                                                        <div className='icon--clock'>
                                                            &nbsp;&nbsp;<span className='matches__text--main'>{getHours(match.start)}</span>
                                                            &nbsp;- {getHours(match.end)}
                                                        </div>
                                                        <div className='icon--calendar-b'>
                                                            &nbsp;&nbsp;<span className='matches__text--main'>{getDate(match.start)}</span>,
                                                            &nbsp;<span className='day-of-the-week'>{getDayOfTheWeek(match.start)}</span>
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
                                                        {this.getUsersAvatars(match.users)}
                                                        <div className='matches__text--number'>
                                                            <b>{getConfirmedUsersNumber(match.users)}&nbsp;</b>
                                                            {getPlayerWord(getConfirmedUsersNumber(match.users))}&nbsp;из&nbsp;
                                                            {match.playersInTeam * match.numOfTeams}
                                                        </div>
                                                    </div>
                                                    <div className="col-4 text-right font-weight-bold">{getPricePerPerson(
                                                        match.price, match.playersInTeam, match.numOfTeams
                                                    )}&nbsp;₸</div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </Fragment>) : null
                    }
                </Fragment>
            </div>
        )
    }
}

export default MatchesList;
