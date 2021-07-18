import React from 'react';
import { GlobalState } from '../../reducers/root_reducer';
import { connect } from "react-redux";
import { QuestionDisplay } from '../../components/question_display';
import { QuestionList } from '../../utilities/questions';
import { RouteComponentProps } from 'react-router';
import { navRoutes } from '../../nav/routes';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { navigate, previous } from '../../utilities/navigation_util';
import { Row, Col, Button } from 'antd';
import { ApplicationDto, Relationship } from '../../clients/api.generated.clients';
import { LeadFlow } from '../../actions/nav_actions';
import { SavePayload, StartSaveApplication } from '../../actions/application_actions';
import _ from "lodash";
import { customBindActionCreators } from '../../utilities/helper';

interface Props extends RouteComponentProps {
    flow: LeadFlow;
    updateLeadInfo: (leadInfo) => void;
    startSaveApplication: (savePayload: SavePayload) => void;
    app: ApplicationDto;
    loading: boolean;
}

interface State {
}

export class QuotePageClass extends React.Component<Props, State>{

    updateAndNavigate = (relationship: Relationship) => {
        const { history } = this.props;
        navigate(history, navRoutes.Quote.Hobby.path);
    }

    navigate = () => {
        const { flow, history, startSaveApplication, app } = this.props;
        let nextRoute = navRoutes.Health.HealthLanding.path;
        const updatedApp = _.cloneDeep(app);
        app.leadInfo.clickedApplied = true;


        if (flow == LeadFlow.A) {
            /*navigate(history, navRoutes.Quote.Weight.path);*/
        } else if (flow == LeadFlow.B) {
            nextRoute = navRoutes.Health.HealthLanding.path;
        } else if (flow == LeadFlow.C) {
            nextRoute = navRoutes.Health.HealthLanding.path;
        } else if (flow == LeadFlow.D) {
            nextRoute = navRoutes.Health.HealthLanding.path;
        } else if (flow == LeadFlow.E) {
            nextRoute = navRoutes.Knockout.Hospitilized.path;
        }else {
            nextRoute =  navRoutes.Health.HealthLanding.path;
        }

        startSaveApplication({ app, history, path: nextRoute });
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <QuestionDisplay
                    questionTitle={QuestionList.LeadQuestions.BeneficiaryRelationship.Title}
                    questionText={QuestionList.LeadQuestions.BeneficiaryRelationship.Text} />
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle" justify="center">
                    <Col className="ant-col-flex-center" md={4} xs={24}>
                        <Button type="primary" shape="round" size="large" onClick={() => { this.updateAndNavigate(Relationship.Spouse) }}>Spouse</Button>
                    </Col>
                    <Col className="ant-col-flex-center" md={4} xs={24}>
                        <Button type="primary" shape="round" size="large" onClick={() => { this.updateAndNavigate(Relationship.Relative) }}>Relative</Button>
                    </Col>

                </Row>
                <NavigationButtons progressPercent={50}
                    hideNext
                    navigate={() => navigate(history, navRoutes.Quote.Hobby.path)} />
            </div>
        )
    }
}

const mapStateToProps = (props: GlobalState) => {
    return {
        flow: props.navigation.leadFlow,
        app: props.app,
        loading: props.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
           startSaveApplication: (savePayload: SavePayload) => StartSaveApplication(savePayload)
        }, dispatch)
    }
}

export const QuotePage = connect(mapStateToProps, mapDispatchToProps)(QuotePageClass);
