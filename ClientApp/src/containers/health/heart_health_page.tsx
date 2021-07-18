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

class HeartHealthPageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Health.HeartTimeline.path);
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.HeartAttack,
      healthAnswer: true,
    });
  };

  no = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Health.CirrhosisDiagnosis.path);
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.HeartAttack,
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
              questionTitle={QuestionList.HealthQuestions.HeartHealth.Title}
              questionText={QuestionList.HealthQuestions.HeartHealth.Text}
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
                progressPercent={flow == LeadFlow.E ? 42 : 0}
                hideProgress
                QueCounter={true}
                hideNext={true}
                activeCounter={QuestionList.HealthQuestions.HeartHealth.QuestionNumber}
                navigate={() =>
                  navigate(history, navRoutes.Health.HeartTimeline.path)
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

export const HeartHealthPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeartHealthPageClass);
