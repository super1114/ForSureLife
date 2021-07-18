import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  UpdateKnockoutQuestionAnswer,
  UpdateKnockoutQuestionAnswerPayload,
} from "../../actions/application_actions";
import { LeadFlow } from "../../actions/nav_actions";
import {
  ApplicationDto,
  LeadHealthQuestions,
} from "../../clients/api.generated.clients";
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
  app: ApplicationDto;
}

class OrganDialysisDiseasePageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateKnockoutQuestion } = this.props;

    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.OrganDialysisDisease,
      healthAnswer: true,
    });
    navigate(history, navRoutes.Knockout.NotEligible.path);
  };

  no = () => {
    const { history, updateKnockoutQuestion, app } = this.props;

    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.OrganDialysisDisease,
      healthAnswer: false,
    });

    if (
      app.leadInfo.state.toLowerCase() == "florida" ||
      app.leadInfo.state.toLowerCase() == "fl"
    ) {
      navigate(history, navRoutes.Knockout.LivePast12Months.path);
    } else {
      navigate(history, navRoutes.Health.Covid.path);
    }
  };

  render() {
    const { history, flow } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={
                QuestionList.KnockoutQuestions.OrganDialysisDisease.Title
              }
              questionText={
                QuestionList.KnockoutQuestions.OrganDialysisDisease.Text
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
                progressPercent={28}
                hideNext
                hideProgress
                QueCounter={true}
                activeCounter={QuestionList.KnockoutQuestions.OrganDialysisDisease.QuestionNumber}
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
    app: state.app,
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

export const OrganDialysisDiseasePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganDialysisDiseasePageClass);
