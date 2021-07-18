import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  UpdateHealthQuestionAnswer,
  UpdateHealthQuestionAnswerPayload,
} from "../../actions/application_actions";
import { LeadFlow } from "../../actions/nav_actions";
import { ApplicationHealthQuestions } from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { YesNoAnswer } from "../../components/yes_no_answer";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";
import { isMobileDevice } from "../../utilities/responsive";

interface Props extends RouteComponentProps {
  updateHealthQuestion: (
    healthQuestionAnswer: UpdateHealthQuestionAnswerPayload
  ) => void;
  flow: LeadFlow;
}

class SeriousComplicationsPageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Health.DrugsOrAlcohol.path);
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.DiabetesComplications,
      healthAnswer: true,
    });
  };

  no = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Health.DrugsOrAlcohol.path);
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.DiabetesComplications,
      healthAnswer: false,
    });
  };

  render() {
    const { history, flow } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={
                QuestionList.HealthQuestions.SeriousComplications.Title
              }
              questionText={
                QuestionList.HealthQuestions.SeriousComplications.Text
              }
              height={isMobileDevice ? 250 : 200}
            />
            <div>
              <YesNoAnswer
                yes={() => {
                  this.yes();
                }}
                no={() => {
                  this.no();
                }}
              />
              <NavigationButtons
                progressPercent={flow == LeadFlow.E ? 70 : 60}
                hideProgress
                QueCounter={true}
                hideNext
                activeCounter={QuestionList.HealthQuestions.SeriousComplications.QuestionNumber}
                navigate={() =>
                  navigate(history, navRoutes.Health.COPDTimeline.path)
                }
              />
            </div>
          </div>
        </CardWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateHealthQuestion: (
          healthQuestionAnswer: UpdateHealthQuestionAnswerPayload
        ) => UpdateHealthQuestionAnswer(healthQuestionAnswer),
      },
      dispatch
    ),
  };
};

export const SeriousComplicationsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriousComplicationsPageClass);
