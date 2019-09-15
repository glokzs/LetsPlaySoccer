import React, { Component, Fragment } from 'react';
import LoadingWrapper from "../components/UI/LoadingWrapper";
import {getMatchStatusImg} from "../helpers/helperMatch";

class MatchDetails extends Component {
    state = {
        loading: false,
        isDescriptionOpen: true,
        isTimetableOpen: false,
        isContactsOpen: false
    };

    render() {
        console.log(this.props.location.state.isThisUserOrganizer);
        const match = this.props.location.state.match;
        const isThisUserOrganizer = this.props.location.state.isThisUserOrganizer;
        return (
            <Fragment>
                <LoadingWrapper loading={this.state.loading}>
                    {match?
                        <Fragment>
                            <div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <span>
                                        <img src={require('../assets/design_images/'+getMatchStatusImg(match.status))} alt='icon'/>
                                        &nbsp;{match.status}
                                    </span>
                                    {isThisUserOrganizer?
                                        <button>Отменить матч</button> :
                                        <button>Участвовать</button>
                                    }
                                </div>
                            </div>
                        </Fragment>
                        : null
                    }
                </LoadingWrapper>
            </Fragment>
        );
    }
}


export default MatchDetails;