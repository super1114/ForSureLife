import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  UpdateKnockoutQuestionAnswer,
  UpdateKnockoutQuestionAnswerPayload,
} from "../../actions/application_actions";
import { LeadFlow } from "../../actions/nav_actions";
import { LeadHealthQuestions } from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { PageWrapper } from "../../components/page_wrapper";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { YesNoAnswer } from "../../components/yes_no_answer";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";

interface Props extends RouteComponentProps {
  updateKnockoutQuestion: (
    healthQuestionAnswer: UpdateKnockoutQuestionAnswerPayload
  ) => void;
  flow: LeadFlow;
}

class SelfReliantPageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateKnockoutQuestion } = this.props;
    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.SelfReliant,
      healthAnswer: true,
    });
    navigate(history, navRoutes.Knockout.NotEligible.path);
  };

  no = () => {
    const { history, updateKnockoutQuestion } = this.props;
    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.SelfReliant,
      healthAnswer: false,
    });
    navigate(history, navRoutes.Knockout.ChronicIllness.path);
  };

  render() {
    const { history, flow } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={QuestionList.KnockoutQuestions.SelfReliant.Title}
              questionText={QuestionList.KnockoutQuestions.SelfReliant.Text}
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
                progressPercent={12}
                hideProgress
                QueCounter={true}
                hideNext
                activeCounter={QuestionList.KnockoutQuestions.SelfReliant.QuestionNumber}
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
        updateKnockoutQuestion: (
          healthQuestionAnswer: UpdateKnockoutQuestionAnswerPayload
        ) => UpdateKnockoutQuestionAnswer(healthQuestionAnswer),
      },
      dispatch
    ),
  };
};

export const SelfReliantPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfReliantPageClass);
