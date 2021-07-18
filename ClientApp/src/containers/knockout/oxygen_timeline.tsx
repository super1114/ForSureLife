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

class OxygenTimelinePageClass extends React.Component<Props, any> {

    updateOccurenceAndNavigate = (occurence: Occurence) => {
        const { history, updateKnockoutQuestionOccurence } = this.props;

        updateKnockoutQuestionOccurence({
            leadHealthQuestion: LeadHealthQuestions.Oxygen,
            occurence
        });

        if (Occurence.Current == occurence) {
            navigate(history, navRoutes.Knockout.NotEligible.path);
        } else {
            navigate(history, navRoutes.Knockout.OrganDialysisDisease.path);
        }


    }

    render() {
        const { history, flow } = this.props;
        return (
            <div>
               
                    <CardWrapper>
                        <QuestionDisplay
                            questionTitle={QuestionList.KnockoutQuestions.OxygenTimeline.Title}
                            questionText={QuestionList.KnockoutQuestions.OxygenTimeline.Text}
                        />
                        <Row style={{ marginBottom: 16 }} align="middle" justify="center">
                            <Col className="ant-col-flex-center" md={12} xs={24}>
                                <Button className="ant-btn-wide" type="primary" shape="round" size="large" onClick={() => { this.updateOccurenceAndNavigate(Occurence.Current) }}>I currently need oxygen.</Button>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: 16 }} align="middle" justify="center">
                            <Col className="ant-col-flex-center" md={12} xs={24}>
                                <Button className="ant-btn-wide" type="primary" shape="round" size="large" onClick={() => { this.updateOccurenceAndNavigate(Occurence.TwoYears) }}>Not currently, but have within the past 2 years.</Button>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: 16 }} align="middle" justify="center">
                            <Col className="ant-col-flex-center" md={12} xs={24}>
                                <Button className="ant-btn-wide" type="primary" shape="round" size="large" onClick={() => { this.updateOccurenceAndNavigate(Occurence.Multiple) }}>I needed it more than two years ago.</Button>
                            </Col>

                        </Row>

                        <NavigationButtons
                            progressPercent={26}
                            hideNext
                            navigate={() => navigate(history, navRoutes.Knockout.OrganDialysisDisease.path)}
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

export const OxygenTimelinePage = connect(mapStateToProps, mapDispatchToProps)(OxygenTimelinePageClass);
