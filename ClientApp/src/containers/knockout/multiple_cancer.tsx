import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateKnockoutQuestionAnswer, UpdateKnockoutQuestionAnswerPayload } from '../../actions/application_actions';
import { LeadFlow } from '../../actions/nav_actions';
import { LeadHealthQuestions } from '../../clients/api.generated.clients';
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
    updateKnockoutQuestion: (healthQuestionAnswer: UpdateKnockoutQuestionAnswerPayload) => void;
    flow: LeadFlow;
}

class MultipleCancerPageClass extends React.Component<Props, any> {

    yes = () => {
        const { history, updateKnockoutQuestion } = this.props;
        updateKnockoutQuestion({
            leadHealthQuestion: LeadHealthQuestions.MultipleCancer,
            healthAnswer: true
        });
        navigate(history, navRoutes.Knockout.CancerTimeline.path);
    }

    no = () => {
        const { history, updateKnockoutQuestion } = this.props;

        updateKnockoutQuestion({
            leadHealthQuestion: LeadHealthQuestions.MultipleCancer,
            healthAnswer: false
        });
        navigate(history, navRoutes.Knockout.CancerTimeline.path);
    }

    render() {
        const { history, flow } = this.props;
        return (
            <div>
                    <CardWrapper>
                        <QuestionDisplay
                            questionTitle={QuestionList.KnockoutQuestions.MultipleCancer.Title}
                            questionText={QuestionList.KnockoutQuestions.MultipleCancer.Text}
                        />
                        <YesNoAnswer yes={() => { this.yes() }} no={() => { this.no() }} />
                        <NavigationButtons
                            progressPercent={64}
                            hideNext
                            navigate={() => navigate(history, navRoutes.Knockout.CancerTimeline.path)}
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
            updateKnockoutQuestion: (healthQuestionAnswer: UpdateKnockoutQuestionAnswerPayload) => UpdateKnockoutQuestionAnswer(healthQuestionAnswer)
        }, dispatch)

    }
}

export const MultipleCancerPage = connect(mapStateToProps, mapDispatchToProps)(MultipleCancerPageClass);
