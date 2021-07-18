import { Row, Col, Button } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate, previous } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';
import { isMobileDevice } from '../../utilities/responsive';

interface Props extends RouteComponentProps {

}

class ReviewUpdateMenuClass extends React.Component<Props, any> {

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.ReviewQuestions.ReviewUpdateMenu.Title}
                        questionText={QuestionList.ReviewQuestions.ReviewUpdateMenu.Text}
                    />
                    <Row gutter={[16, 8]} justify="center">
                        <Col className="ant-col-flex-center" md={24}>
                            <Button onClick={() => { navigate(history, navRoutes.Review.ReviewBeneficiaries.path) }} style={isMobileDevice() ? { width: 275, fontSize: 14 } : { width: 325 }} shape="round" type="primary" size="large">I need to update my beneficiaries.</Button>
                        </Col>
                        <Col className="ant-col-flex-center" md={24}>
                            <Button onClick={() => { navigate(history, navRoutes.Review.ReviewContact.path) }} style={isMobileDevice() ? { width: 275, fontSize: 14 } : { width: 325 }} shape="round" type="primary" size="large">I need to update my contact info.</Button>
                        </Col>
                        {/*<Col className="ant-col-flex-center" md={24}>*/}
                        {/*    <Button onClick={() => { navigate(history, navRoutes.Review.ReviewDoctor.path) }} style={isMobileDevice() ? { width: 275, fontSize: 14 } : { width: 325 }} shape="round" type="primary" size="large">I need to update my doctor info.</Button>*/}
                        {/*</Col>*/}
                        {/*<Col className="ant-col-flex-center" md={24}>*/}
                        {/*    <Button onClick={() => { navigate(history, navRoutes.Review.ReviewInsurance.path) }} style={isMobileDevice() ? { width: 275, fontSize: 14 } : { width: 325 }} shape="round" type="primary" size="large">I need to update my insurance info.</Button>*/}
                        {/*</Col>*/}
                        <Col className="ant-col-flex-center" md={24}>
                            <Button onClick={() => { navigate(history, navRoutes.Review.ReviewHealth.path) }} style={isMobileDevice() ? { width: 275, fontSize: 14 } : { width: 325 }} shape="round" type="primary" size="large">I need to update my health responses.</Button>
                        </Col>
                    </Row>

                    <NavigationButtons
                        navigate={() => navigate(history, navRoutes.Review.ReviewApp.path)}
                        hideProgress
                        nextText="Nevermind, everything is correct"
                    />
                </CardWrapper>
            </div>

        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({

        }, dispatch)

    }
}

export const ReviewUpdateMenuPage = connect(mapStateToProps, mapDispatchToProps)(ReviewUpdateMenuClass);
