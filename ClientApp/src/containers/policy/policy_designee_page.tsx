import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateHealthQuestionAnswer, UpdateHealthQuestionAnswerPayload } from '../../actions/application_actions';
import { LeadFlow } from '../../actions/nav_actions';
import { ApplicationHealthQuestions } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
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

class DesigneePageClass extends React.Component<Props, any> {

    yes = () => {
        const { history, updateHealthQuestion } = this.props;
        navigate(history, navRoutes.Policy.PolicyDesigneeForm.path);
        updateHealthQuestion({
            applicationQuestion: ApplicationHealthQuestions.Circulation,
            healthAnswer: true
        });
    }

    no = () => {
        const { history, updateHealthQuestion } = this.props;
        navigate(history, navRoutes.Policy.PolicyDesigneeForm.path);
        updateHealthQuestion({
            applicationQuestion: ApplicationHealthQuestions.Circulation,
            healthAnswer: false
        });
    }

    render() {
        const { history, flow } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicyDesignee.Title}
                        questionText={QuestionList.PolicyQuestions.PolicyDesignee.Text}
                    />
                    <YesNoAnswer yes={() => { this.yes() }} no={() => { this.no() }} />
                    <NavigationButtons
                        progressPercent={flow == LeadFlow.E ? 60 : 42}
                        hideNext
                        navigate={() => navigate(history, navRoutes.Policy.PolicyDesigneeForm.path)}
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
            updateHealthQuestion: (healthQuestionAnswer: UpdateHealthQuestionAnswerPayload) => UpdateHealthQuestionAnswer(healthQuestionAnswer)
        }, dispatch)

    }
}

export const DesigneePage = connect(mapStateToProps, mapDispatchToProps)(DesigneePageClass);
