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
  updateHealthQuestion: (
    healthQuestionAnswer: UpdateHealthQuestionAnswerPayload
  ) => void;
  flow: LeadFlow;
}

class CovidPageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Health.CovidTimeline.path);
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.CovidQuestionMain,
      healthAnswer: true,
    });
    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.Covid2,
      healthAnswer: true,
    });
  };

  no = () => {
    const { history, updateHealthQuestion } = this.props;
    navigate(history, navRoutes.Knockout.LivePast12Months.path);

    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.CovidQuestionMain,
      healthAnswer: false,
    });

    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.Covid2,
      healthAnswer: false,
    });

    updateHealthQuestion({
      applicationQuestion: ApplicationHealthQuestions.CovidQuestionThree,
      healthAnswer: false,
    });
  };

  render() {
    const { history, flow } = this.props;
    return (
      <div>
        {flow == LeadFlow.E ? (
          <CardWrapper>
            <div className="d-flex justify-between flex-column h-100">
              <QuestionDisplay
                questionTitle={QuestionList.HealthQuestions.Covid.Title}
                questionText={QuestionList.HealthQuestions.Covid.Text}
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
                  hideProgress
                  QueCounter={true}
                  progressPercent={32}
                  hideNext
                  activeCounter={QuestionList.HealthQuestions.Covid.QuestionNumber}
                  navigate={() =>
                    navigate(history, navRoutes.Health.Paralysis.path)
                  }
                />
              </div>
            </div>
          </CardWrapper>
        ) : (
          <PageWrapper>
            <QuestionDisplay
              questionTitle={QuestionList.HealthQuestions.Covid.Title}
              questionText={QuestionList.HealthQuestions.Covid.Text}
            />
            <YesNoAnswer
              yes={() => {
                this.yes();
              }}
              no={() => {
                this.no();
              }}
            />
            <NavigationButtons
              progressPercent={88}
              hideNext
              activeCounter={QuestionList.HealthQuestions.Covid.QuestionNumber}
              navigate={() =>
                navigate(history, navRoutes.Health.Paralysis.path)
              }
            />
          </PageWrapper>
        )}
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

export const CovidPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CovidPageClass);
