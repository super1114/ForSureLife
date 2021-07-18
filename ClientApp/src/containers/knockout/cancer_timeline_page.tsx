import { Row, Col, Button } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateKnockoutQuestionOccurence, UpdateKnockoutQuestionOccurencePayload } from '../../actions/application_actions';
import { LeadFlow } from '../../actions/nav_actions';
import { LeadHealthQuestions, Occurence } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { PageWrapper } from '../../components/page_wrapper';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';

interface Props extends RouteComponentProps {
    updateKnockoutQuestionOccurence: (healthQuestionOccurence: UpdateKnockoutQuestionOccurencePayload) => void;
    flow: LeadFlow;
}

class CancerimelinePageClass extends React.Component<Props, any> {

    updateOccurenceAndNavigate = (occurence: Occurence) => {
        const { history, updateKnockoutQuestionOccurence } = this.props;

        updateKnockoutQuestionOccurence({
            leadHealthQuestion: LeadHealthQuestions.Cancer,
            occurence
        });
        if (occurence === Occurence.Current) {
            navigate(history, navRoutes.Knockout.NotEligible.path);

        } else {
            navigate(history, navRoutes.Knockout.Oxygen.path);
        }
    }

    render() {
        const { history, flow } = this.props;
        return (
            <div>
               
                    <CardWrapper>

                        <QuestionDisplay
                            questionTitle={QuestionList.KnockoutQuestions.CancerTimeline.Title}
                            questionText={QuestionList.KnockoutQuestions.CancerTimeline.Text}
                        />
                        <Row style={{ marginBottom: 16 }} align="middle" justify="center">
                            <Col className="ant-col-flex-center" md={12} xs={24}>
                                <Button className="ant-btn-wide" type="primary" shape="round" size="large" onClick={() => { this.updateOccurenceAndNavigate(Occurence.Current) }}>I currently have cancer.</Button>
                            </Col>

                        </Row>
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
                            progressPercent={68}
                            hideNext
                            navigate={() => navigate(history, navRoutes.Health.CirrhosisDiagnosis.path)}
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
            updateKnockoutQuestionOccurence: (healthQuestionOccurence: UpdateKnockoutQuestionOccurencePayload) => UpdateKnockoutQuestionOccurence(healthQuestionOccurence)
        }, dispatch)

    }
}

export const CancerTimelinePage = connect(mapStateToProps, mapDispatchToProps)(CancerimelinePageClass);
