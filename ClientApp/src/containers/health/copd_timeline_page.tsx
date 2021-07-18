import { Row, Col, Button } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateHealthQuestionOccurence, UpdateHealthQuestionOccurencePayload } from '../../actions/application_actions';
import { LeadFlow } from '../../actions/nav_actions';
import { ApplicationHealthQuestions, Occurence } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';

interface Props extends RouteComponentProps {
    updateHealthQuestionOccurence: (healthQuestionOccurence: UpdateHealthQuestionOccurencePayload) => void;
    flow: LeadFlow;
}

class COPDTimelinePageClass extends React.Component<Props, any> {

    updateOccurenceAndNavigate = (occurence: Occurence) => {
        const { history, updateHealthQuestionOccurence } = this.props;
        navigate(history, navRoutes.Health.HeartOrBrainProcedure.path);
        updateHealthQuestionOccurence({
            applicationQuestion: ApplicationHealthQuestions.COPD,
            occurence
        })
    }

    updateAndNext = (answer: string) => {
        const { history } = this.props;
        navigate(history, navRoutes.Health.HeartOrBrainProcedure.path);
    }

    render() {
        const { history, flow } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.HealthQuestions.COPDTimeline.Title}
                        questionText={QuestionList.HealthQuestions.COPDTimeline.Text}
                    />
                    <Row style={{ marginBottom: 16 }} align="middle" justify="center">
                        <Col className="ant-col-flex-center" md={12} xs={24}>
                            <Button className="ant-btn-wide" type="primary" shape="round" size="large" onClick={() => { this.updateOccurenceAndNavigate(Occurence.TwoYears) }}>Within the last 2 years.</Button>
                        </Col>

                    </Row>
                    <Row style={{ marginBottom: 16 }} align="middle" justify="center">
                        <Col className="ant-col-flex-center" md={12} xs={24}>
                            <Button className="ant-btn-wide" type="primary" shape="round" size="large" onClick={() => { this.updateOccurenceAndNavigate(Occurence.TwoToThreeYears) }}>Within the last 2-3 years.</Button>
                        </Col>

                    </Row>
                    <Row style={{ marginBottom: 16 }} align="middle" justify="center">
                        <Col className="ant-col-flex-center" md={12} xs={24}>
                            <Button className="ant-btn-wide" type="primary" shape="round" size="large" onClick={() => { this.updateOccurenceAndNavigate(Occurence.MoreThanThreeYears) }}>More than 3 years ago.</Button>
                        </Col>

                    </Row>
                    <NavigationButtons
                        progressPercent={flow == LeadFlow.E ? 58 : 36}
                        hideNext
                        navigate={() => navigate(history, navRoutes.Health.HeartOrBrainProcedure.path)}
                    />
                </CardWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        flow: state.navigation.leadFlow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateHealthQuestionOccurence: (healthQuestionOccurence: UpdateHealthQuestionOccurencePayload) => UpdateHealthQuestionOccurence(healthQuestionOccurence)
        }, dispatch)

    }
}

export const COPDTimelinePage = connect(mapStateToProps, mapDispatchToProps)(COPDTimelinePageClass);
