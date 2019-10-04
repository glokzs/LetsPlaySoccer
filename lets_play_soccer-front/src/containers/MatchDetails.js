import React, { Component, Fragment } from 'react';
import LoadingWrapper from "../components/UI/LoadingWrapper";
import {
    getConfirmedUsersNumber,
    getDate,
    getDayOfTheWeek,
    getHours,
    getMatchStatusImg, getPlayerWord,
    getPricePerPerson,
    getTimeDiff
} from "../helpers/helperMatch";
import config from "../config";
import {Carousel, Empty, Modal, Popover} from "antd";
import photo from "../assets/content_images/Mask.png";
import {connect} from "react-redux";
import {
    becomeMatchMember,
    confirmUserToMatch,
    getMatchById,
    patchMatch,
    removeUserFromMatch
} from "../store/actions/matchAction";
import Fields from "./Fields";

class MatchDetails extends Component {
    state = {
        loading: false,
        isDescriptionOpen: true,
        isTimetableOpen: false,
        isContactsOpen: false,
        deleteConfirmModal: false,
        userToDelete: '',
        matchCancelled: false
    };

    getMatch = () => {
        this.setState({loading: true}, () => {
            this.props.getMatchById(
                this.props.match.params.id,
                () => this.setState({loading: false})
            );
        })
    };

    componentDidMount() {
        this.getMatch();
    }

    checkThisUser = (users, thisUser) => {
        return users.filter(user => user.phoneNumber === thisUser.phoneNumber);
    };

    render() {
        const match = this.props.oneMatch;
        const isThisUserOrganizer = (Object.keys(match).length? match.organizerId === this.props.user.id : null);
        const thisUserInThisMatch = (Object.keys(match).length? this.checkThisUser(match.users, this.props.user) : []);
        const matchPlayers = (Object.keys(match).length? (isThisUserOrganizer? match.users : match.users.filter(user => user.user_match.confirmed)) : []);

        return (
            <Fragment>
                <LoadingWrapper loading={this.state.loading}>
                    {Object.keys(match).length?
                        <Fragment>
                            <header className='toolbar__header'>
                                <div className='col-3'>
                                    <div
                                        className='icon--arrow-right toolbar__btn--arrow'
                                        onClick={() => this.props.history.push('/my/matches')}
                                    />
                                </div>
                                <div className='col-6 toolbar__header__title'>Детали матча</div>
                                <div className='col-3 text-right'>
                                    <Popover placement='leftBottom' title='Пока не доступно. В разработке'>
                                        <button
                                            className='icon--share toolbar__header__btn'
                                            // onClick={here will be share function}
                                        />
                                    </Popover>
                                </div>
                            </header>
                            {match?
                                <div className='container mt-3'>
                                    <div className='matches__header'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            {isThisUserOrganizer && this.state.matchCancelled?
                                                <span className={'matches__status--finished'}>вы отменили матч</span>
                                                :
                                                <span className='d-flex align-items-center'>
                                                    <img src={require('../assets/design_images/'+getMatchStatusImg(match.status)+'.svg')} alt='icon'/>
                                                    <span className={'matches__status--'+getMatchStatusImg(match.status)}>&nbsp;{match.status}</span>
                                                </span>
                                            }
                                            {isThisUserOrganizer?
                                                (this.state.matchCancelled?
                                                    null
                                                        :
                                                    <span>
                                                        <button
                                                            className={'btn btn-secondary'}
                                                            onClick={() => {
                                                                this.setState({matchCancelled: true});
                                                                patchMatch(match.id);
                                                            }}
                                                        >
                                                            Отменить матч
                                                        </button>
                                                    </span>
                                                )
                                                :
                                                (thisUserInThisMatch.length?
                                                        (thisUserInThisMatch[0].user_match.confirmed?
                                                                <span className='matches__text--blue'>Вы участвуете в игре</span>
                                                                :
                                                                <span className='matches__text--grey'>Ваш запрос в обработке</span>
                                                        )
                                                        :
                                                        <span><button
                                                            className='btn--primary'
                                                            onClick={() => this.props.becomeMatchMember({
                                                                userId: this.props.user.id,
                                                                matchId: match.id
                                                            })}
                                                        >
                                                    Участвовать
                                                </button></span>
                                                )
                                            }
                                        </div>
                                        <div className='row pt-4'>
                                            <div className='col-8'>
                                                <div className='icon--clock'>
                                                    &nbsp;&nbsp;<span className='matches__text--main'>{getHours(match.start)}</span>
                                                    &nbsp;- {getTimeDiff(match.start, match.end)}
                                                </div>
                                                <div className='icon--calendar-b'>
                                                    &nbsp;&nbsp;<span className='matches__text--main'>{getDate(match.start)}</span>,
                                                    &nbsp;<span className='day-of-the-week'>{getDayOfTheWeek(match.start)}</span>
                                                </div>
                                            </div>
                                            <div className="col-4 text-right d-flex flex-column justify-content-end">
                                                <div>
                                                    <span className='matches__text--muted'>Взнос за игру</span>
                                                    <span className='font-weight-bold'>
                                                {getPricePerPerson(match.price, match.playersInTeam, match.numOfTeams)}&nbsp;₸
                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {thisUserInThisMatch.length && thisUserInThisMatch[0].user_match.confirmed && !isThisUserOrganizer?
                                        <button
                                            className='btn--exit'
                                            onClick={() => this.setState({
                                                deleteConfirmModal: true,
                                                userToDelete: {
                                                    userId: this.props.user.id,
                                                    matchId: match.id
                                                }
                                            })}
                                        >
                                            Выйти из матча
                                        </button>
                                        : null
                                    }
                                    {isThisUserOrganizer && this.state.matchCancelled ?
                                        <div className='text-center pb-3'><span className='btn--exit'>Матч автоматический удалится через 5 часов</span></div>
                                        : null

                                    }
                                    <div className='matches__field'>
                                        <div className='row p-3'>
                                            <div className='col-8'>
                                                <div className='icon--map-b'>
                                                    &nbsp;&nbsp;<span className='matches__text--main'>{match.field.name}</span>
                                                </div>
                                            </div>
                                            <div className='col-4 text-right'>
                                        <span className='matches__format--t-shirt'>
                                            {match.playersInTeam}x{match.playersInTeam}&nbsp;<span className='icon--t-shirt'/>
                                        </span>
                                            </div>
                                        </div>
                                        <div className='field__card'>
                                            <Carousel className='field__carousel'>
                                                {
                                                    match.field.images.map((image, inx) => {
                                                        return (
                                                            <div key={inx} className='w-100'>
                                                                <img
                                                                    src={config.publicFieldFolder + image}
                                                                    alt="field"
                                                                    className='w-100 d-block'
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Carousel>
                                            <div className='field__images icon--camera'>
                                                {match.field.images.length}
                                            </div>
                                            <button className='btn--map'>Показать на карте</button>
                                        </div>
                                    </div>

                                    <div className='matches__players'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span className='matches__text--main'>Участники</span>
                                            <div className='matches__text--number'>
                                                <b>{getConfirmedUsersNumber(match.users)}&nbsp;</b>
                                                {getPlayerWord(getConfirmedUsersNumber(match.users))}&nbsp;из&nbsp;
                                                {match.playersInTeam * match.numOfTeams}
                                            </div>
                                        </div>
                                        <ul>
                                            {matchPlayers.map(user => {
                                                return (
                                                    <li className='matches__card__head' key={user.phoneNumber}>
                                                        <div className='d-flex'>
                                                            <img className='matches__avatar' src={photo} alt="avatar"/>
                                                            <div>
                                                                <div className='matches__text--player'>{user.displayName}</div>
                                                                {user.user_match.organizer ?
                                                                    <span className='matches__text--green'>Организатор!</span>
                                                                    : null
                                                                }
                                                                {user.user_match.confirmed && !user.user_match.organizer ?
                                                                    <span className='matches__text--muted'>Подтвержден!</span>
                                                                    : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {(!isThisUserOrganizer || this.props.user.id !== user.user_match.userId)  && (user.user_match.organizer || user.user_match.confirmed)?
                                                                <a href={'tel:'+user.phoneNumber} className={'icon--phone matches__btn--call'}/>
                                                                : null
                                                            }
                                                            {(isThisUserOrganizer && !user.user_match.organizer)?
                                                                <button
                                                                    className={'icon--x matches__btn--remove'}
                                                                    onClick={() => this.setState({
                                                                        deleteConfirmModal: true,
                                                                        userToDelete: {
                                                                            matchId: user.user_match.matchId,
                                                                            userId: user.user_match.userId,
                                                                        }
                                                                    })}
                                                                />
                                                                : null
                                                            }
                                                            {(isThisUserOrganizer && !user.user_match.organizer && !user.user_match.confirmed)?
                                                                <button
                                                                    className={'icon--check matches__btn--check'}
                                                                    onClick={() => {
                                                                        this.props.confirmUserToMatch({
                                                                            matchId: user.user_match.matchId,
                                                                            userId: user.user_match.userId,
                                                                        });
                                                                    }}
                                                                />
                                                                : null
                                                            }
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                </div>
                                : null
                            }
                        </Fragment>
                        :
                        <div className='mt-5'>
                            <Empty description={'Нет такого матча'}/>
                        </div>
                    }
                </LoadingWrapper>

                {this.state.deleteConfirmModal?
                    <div className='fixed-page'>
                        <Fields
                            sendFieldId={this.toggleFields}
                        />
                    </div> : null
                }

                <Modal
                    title="Необратимый процесс"
                    visible={this.state.deleteConfirmModal}
                    onOk={() => {
                        if (this.state.userToDelete) {
                            this.props.removeUserFromMatch(this.state.userToDelete);
                            this.setState({userToDelete: ''});
                        }
                        this.setState({deleteConfirmModal: false});
                    }}
                    onCancel={() => this.setState({deleteConfirmModal: false, userToDelete: ''})}
                >
                    <p>Вы уверены?</p>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        oneMatch: state.matches.oneMatch,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        becomeMatchMember: data => dispatch(becomeMatchMember(data)),
        removeUserFromMatch: data => dispatch(removeUserFromMatch(data)),
        confirmUserToMatch: data => dispatch(confirmUserToMatch(data)),
        getMatchById: (id, cb) => dispatch(getMatchById(id, cb))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetails);