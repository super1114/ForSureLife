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

interface Props extends RouteComponentProps {
  updateHealthQuestion: (
    healthQuestionAnswer: UpdateHealthQuestionAnswerPayload
  ) => void;
  flow: LeadFlow;
}

class HeartBrainPageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Health.HeartOrBrainProcedureTimeline.path);
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.Circulation,
      healthAnswer: true,
    });
  };

  no = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Health.OutstandingTesting.path);
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.Circulation,
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
                QuestionList.HealthQuestions.HeartOrBrainProcedure.Title
              }
              questionText={
                QuestionList.HealthQuestions.HeartOrBrainProcedure.Text
              }
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
                progressPercent={flow == LeadFlow.E ? 60 : 42}
                hideProgress
                QueCounter={true}
                hideNext
                activeCounter={QuestionList.HealthQuestions.HeartOrBrainProcedure.QuestionNumber}
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

export const HeartBrainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeartBrainPageClass);
