import React, {Component, Fragment} from 'react';
import {CSSTransition} from "react-transition-group";
import Spinner from "./Spinner";

export  default class LoadingWrapper extends Component{
    render() {
        // console.log(this.props);
        return (
            <Fragment>
                <CSSTransition
                    in={true}
                    timeout={300}
                    classNames='my-node'
                    unmountOnExit
                >
                    {this.props.children?this.props.children:<div/>}
                </CSSTransition>
                {this.props.loading?
                    <Spinner />
                    :null
                }
            </Fragment>
        );
    }
};

