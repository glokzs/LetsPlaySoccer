import React, { Component, Fragment } from 'react';
import LoadingWrapper from "../components/UI/LoadingWrapper";

class MatchDetails extends Component {
    state = {
        loading: false,
        isDescriptionOpen: true,
        isTimetableOpen: false,
        isContactsOpen: false
    };

    render() {
        const match = this.props.location.state;
        return (
            <Fragment>
                <LoadingWrapper loading={this.state.loading}>
                    {match?
                        <div>
                            here will be matches details
                        </div>
                        : null
                    }
                </LoadingWrapper>
            </Fragment>
        );
    }
}


export default MatchDetails;