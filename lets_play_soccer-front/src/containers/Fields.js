import React, { Component, Fragment } from 'react';
// import 'moment/locale/ru';
import {connect} from "react-redux";
import {getFields} from "../store/actions/fieldsAction";
import LoadingWrapper from "../components/UI/LoadingWrapper";
import {Carousel} from "antd";
import config from "../config";

class Fields extends Component {
    state = {
        loading: true
    };

    setLoadingFalse = () => {
        this.setState({loading: false});
    };
    componentDidMount() {
        this.props.getFields(this.setLoadingFalse);
    }


    render() {

        return (
            <Fragment>
                <header className='toolbar__header'>
                    <div className='col-4'>
                        <button className='icon--arrow-right toolbar__header__btn--close'/>
                    </div>
                    <div className='toolbar__header__title'>Площадки</div>
                    <div className='col-4 d-flex align-items-center justify-content-end'>
                        <button className='icon--search toolbar__header__btn--close'/>
                        <button className='icon--map-o toolbar__header__btn--close'/>
                    </div>
                </header>
                <LoadingWrapper loading={this.state.loading}>
                    <Fragment>
                        {this.props.fields.length?
                            this.props.fields.map((field, inx) => {
                                return (
                                    <div key={inx} className='field__card'>
                                        <Carousel className='field__carousel'>
                                            {
                                                field.images.map((image, inx) => {
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
                                        <div className='p-3'>
                                            <div className='d-flex justify-content-between p-1'>
                                                <b>{field.name}</b>
                                                <span>от <b>5 000</b> ₸/час</span>
                                            </div>
                                            <div className='field__address'>{field.address}</div>
                                        </div>
                                    </div>
                                );
                            })
                            :
                            <div className='text-center'>Список полей пока пуст</div>
                        }
                    </Fragment>
                </LoadingWrapper>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        fields: state.fields.fields,
        fieldsError: state.fields.fieldsError
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getFields: (cb) => dispatch(getFields(cb))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fields);