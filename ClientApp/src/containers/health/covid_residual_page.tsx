import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateHealthQuestionAnswer, UpdateHealthQuestionAnswerPayload } from '../../actions/application_actions';
import { LeadFlow } from '../../actions/nav_actions';
import { ApplicationHealthQuestions } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { PageWrapper } from '../../components/page_wrapper';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { YesNoAnswer } from '../../components/yes_no_answer';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';

interface Props extends RouteComponentProps {
    updateHealthQuestion: (healthQuestionAnswer: UpdateHealthQuestionAnswerPayload) => void;
    flow: LeadFlow;
}

class CovidResidualClass extends React.Component<Props, any> {

    yes = () => {
        const { history, updateHealthQuestion } = this.props;
        navigate(history, navRoutes.Knockout.LivePast12Months.path);
        updateHealthQuestion({
            applicationQuestion: ApplicationHealthQuestions.CovidEffectsMain,
            healthAnswer: true
        });
        updateHealthQuestion({
            applicationQuestion: ApplicationHealthQuestions.Covid2Effects,
            healthAnswer: true
        });
    }

    no = () => {
        const { history, updateHealthQuestion } = this.props;
        navigate(history, navRoutes.Knockout.LivePast12Months.path);
        updateHealthQuestion({
            applicationQuestion: ApplicationHealthQuestions.CovidEffectsMain,
            healthAnswer: false
        });
        updateHealthQuestion({
            applicationQuestion: ApplicationHealthQuestions.Covid2Effects,
            healthAnswer: false
        });
    }

    render() {
        const { history, flow } = this.props;
        return (
            <div>
                { flow == LeadFlow.E ?
                    <CardWrapper>
                        <QuestionDisplay
                            questionTitle={QuestionList.HealthQuestions.CovidResidual.Title}
                            questionText={QuestionList.HealthQuestions.CovidResidual.Text}
                        />
                        <YesNoAnswer yes={() => { this.yes() }} no={() => { this.no() }} />
                        <NavigationButtons
                            progressPercent={34}
                            hideNext
                            navigate={() => navigate(history, navRoutes.Health.Paralysis.path)}
                        />
                    </CardWrapper>
                    :
                    <PageWrapper>
                        <QuestionDisplay
                            questionTitle={QuestionList.HealthQuestions.CovidResidual.Title}
                            questionText={QuestionList.HealthQuestions.CovidResidual.Text}
                        />
                        <YesNoAnswer yes={() => { this.yes() }} no={() => { this.no() }} />
                        <NavigationButtons
                            progressPercent={73}
                            hideNext
                            navigate={() => navigate(history, navRoutes.Health.Paralysis.path)}
                        />
                    </PageWrapper>
                    }
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
            updateHealthQuestion: (healthQuestionAnswer: UpdateHealthQuestionAnswerPayload) => UpdateHealthQuestionAnswer(healthQuestionAnswer)
        }, dispatch)

    }
}

export const CovidResidualPage = connect(mapStateToProps, mapDispatchToProps)(CovidResidualClass);
