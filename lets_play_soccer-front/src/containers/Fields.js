import React, { Component, Fragment } from 'react';
// import 'moment/locale/ru';
import {connect} from "react-redux";
import {getFields, getLoadedFields} from "../store/actions/fieldsAction";
import LoadingWrapper from "../components/UI/LoadingWrapper";
import {Carousel} from "antd";
import config from "../config";
import {Link} from "react-router-dom";

class Fields extends Component {
    state = {
        loading: true,
        offset: 0
    };
    loadWithOffset = () => {
      let state = {...this.state};
      let offset = state.offset;
      offset += 10;
      this.setState({offset}, () => {this.props.getLoadedFields(this.state.offset)});

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
                    <div className='col-3'>
                        <button className='icon--arrow-right toolbar__header__btn--close'/>
                    </div>
                    <div className='col-6 toolbar__header__title'>Площадки</div>
                    <div className='col-3 d-flex align-items-center justify-content-end'>
                        <button className='icon--search toolbar__header__btn--close'/>
                        <button className='icon--map-o toolbar__header__btn--close'/>
                    </div>
                </header>
                <LoadingWrapper loading={this.state.loading}>
                    <Fragment>
                        {this.props.fields.length?
                            this.props.fields.map((field, inx) => {
                                return (
                                    <Link
                                        key={inx}
                                        className='field__card'
                                        to={{
                                            pathname: `/fields/${field.id}`,
                                            state: field
                                        }}
                                    >
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
                                        <div className='field__images icon--camera'>
                                            {field.images.length}
                                        </div>
                                        <div className='p-3'>
                                            <div className='d-flex justify-content-between p-1'>
                                                <b>{field.name}</b>
                                                <span>от <b>{field.minPrice}</b> ₸/час</span>
                                            </div>
                                            <div className='field__address'>{field.address}</div>
                                        </div>
                                    </Link>
                                );
                            })
                            :
                            <div className='text-center'>Список полей пока пуст</div>
                        }
                       { !this.props.isEmpty ? <button onClick={this.loadWithOffset} type="button" className="btn btn-primary">See more</button> : null}
                    </Fragment>
                </LoadingWrapper>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        fields: state.fields.fields,
        fieldsError: state.fields.fieldsError,
        isEmpty: state.fields.isEmpty
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getFields: (cb) => dispatch(getFields(cb)),
        getLoadedFields: (offset) => dispatch(getLoadedFields(offset))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fields);