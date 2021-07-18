import React from 'react';
import { GlobalState } from '../../reducers/root_reducer';
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router';
import { navRoutes } from '../../nav/routes';
import { navigate } from '../../utilities/navigation_util';
import { Button, Col, Row, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { LeadFlow } from '../../actions/nav_actions';
import { FlowFlags } from 'typescript';
import { QuestionList } from '../../utilities/questions';
import { QuestionDisplay } from '../../components/question_display';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { PageWrapper } from '../../components/page_wrapper';

const { Text, Title } = Typography;

interface Props extends RouteComponentProps {
    flow: LeadFlow;
    name: string;
}

interface State {
}

export class TransitionPage1Class extends React.Component<Props, State>{


    navigate = () => {
        const { flow, history } = this.props;
        if (flow == LeadFlow.A) {
     /*       navigate(history, navRoutes.Knockout.Hospitilized.path);*/
        } else if (flow == LeadFlow.B) {
            navigate(history, navRoutes.Health.HeartHealth.path);
        } else if (flow == LeadFlow.C) {
            navigate(history, navRoutes.Quote.QuoteLoading.path);
        } else if (flow == LeadFlow.D) {
            navigate(history, navRoutes.Quote.QuoteLoading.path);
        } else {
            navigate(history, navRoutes.Quote.QuoteLoading.path);
        }
    }

    render() {
        const { name } = this.props;
        return (
            <PageWrapper>
                <QuestionDisplay
                    questionTitle={QuestionList.LeadQuestions.Transition1.FunctionTitle(name)}
                    questionText={QuestionList.LeadQuestions.Transition1.Text} />

                <NavigationButtons
                    progressPercent={50}
                    navigate={() => { this.navigate() }}
                />
            </PageWrapper>
        )
    }
}

const mapStateToProps = (props: GlobalState) => {
    return {
        flow: props.navigation.leadFlow,
        name: props.app.leadInfo.firstName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export const TransitionPage1 = connect(mapStateToProps, mapDispatchToProps)(TransitionPage1Class);
