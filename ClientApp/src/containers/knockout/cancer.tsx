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

class CancerPageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateKnockoutQuestion } = this.props;
    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.Cancer,
      healthAnswer: true,
    });
    navigate(history, navRoutes.Knockout.MultipleCancer.path);
  };

  no = () => {
    const { history, updateKnockoutQuestion } = this.props;
    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.Cancer,
      healthAnswer: false,
    });
    navigate(history, navRoutes.Knockout.Oxygen.path);
  };

  render() {
    const { history, flow } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={QuestionList.KnockoutQuestions.Cancer.Title}
              questionText={QuestionList.KnockoutQuestions.Cancer.Text}
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
                progressPercent={20}
                hideNext
                hideProgress
                QueCounter={true}
                activeCounter={QuestionList.KnockoutQuestions.Cancer.QuestionNumber}
                navigate={() =>
                  navigate(history, navRoutes.Knockout.MultipleCancer.path)
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

export const CancerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancerPageClass);
