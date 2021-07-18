import React from 'react';
import {connect} from "react-redux";
import {GlobalState} from '../../../reducers/root_reducer';
import {Col, Row} from "antd";

interface Props {

}

class ResumeCheckMailClass extends React.Component<Props, any> {


    render() {

        return (
            <>
                <div className="resume-wrapper">
                    <Row justify="center" align="bottom">
                        <Col md={8} span={24}>
                            <div>
                                <h1>
                                    <span className="resume-wrapper-title">Thank you!</span>
                                    <div className="resume-wrapper-bottom"/>
                                    <br/>
                                    <p>Please check your mail </p>
                                </h1>
                            </div>
                        </Col>

                    </Row>
                </div>
            </>

        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return{}
}

export const ResumeCheckMail = connect(mapStateToProps, mapDispatchToProps)(ResumeCheckMailClass);
