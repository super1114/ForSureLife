import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  SavePayload,
  StartSaveApplication,
  UpdateKnockoutQuestionAnswer,
  UpdateKnockoutQuestionAnswerPayload,
} from "../../actions/application_actions";
import { LeadFlow } from "../../actions/nav_actions";
import {
  ApplicationDto,
  LeadHealthQuestionDto,
  LeadHealthQuestions,
} from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { YesNoAnswer } from "../../components/yes_no_answer";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";
import _ from "lodash";
import { PageWrapper } from "../../components/page_wrapper";

interface Props extends RouteComponentProps {
  updateKnockoutQuestion: (
    healthQuestionAnswer: UpdateKnockoutQuestionAnswerPayload
  ) => void;
  flow: LeadFlow;
  updateLeadInfo: (leadInfo) => void;
  startSaveApplication: (savePayload: SavePayload) => void;
  app: ApplicationDto;
  loading: boolean;
}

class LivePast12MonthsPageClass extends React.Component<Props, any> {
  navigate = (healthAnswer: boolean) => {
    const { flow, history, startSaveApplication, app } = this.props;
    let nextRoute = navRoutes.Quote.QuoteLoading.path;
    const updatedApp = _.cloneDeep(app);

    const healthQuestions = [...updatedApp.leadInfo.healthQuestions].map(
      (hq) => {
        if (hq.leadHealthQuestion === LeadHealthQuestions.LivePast12Months) {
          hq.healthAnswer = healthAnswer;
        }
        return hq;
      }
    ) as LeadHealthQuestionDto[];
    app.leadInfo.healthQuestions = healthQuestions;
    app.leadInfo.isEligible = true;
    if (!healthAnswer) {
      if (flow == LeadFlow.A) {
        /* navigate(history, navRoutes.Quote.Weight.path);*/
      } else if (flow == LeadFlow.B) {
        navigate(history, navRoutes.Quote.QuoteLoading.path);
      } else if (flow == LeadFlow.C) {
        nextRoute = navRoutes.Quote.QuoteLoading.path;
      } else if (flow == LeadFlow.D) {
        nextRoute = navRoutes.Quote.QuoteLoading.path;
      } else if (flow == LeadFlow.E) {
        nextRoute = navRoutes.Health.HeartHealth.path;
      } else {
        nextRoute = navRoutes.Quote.Weight.path;
      }
      startSaveApplication({ app, history, path: nextRoute });
    } else {
      navigate(history, navRoutes.Knockout.NotEligible.path);
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
                QuestionList.KnockoutQuestions.LivePast12Months.Title
              }
              questionText={
                QuestionList.KnockoutQuestions.LivePast12Months.Text
              }
            />
            <div>
              <YesNoAnswer
                yes={() => {
                  this.navigate(true);
                }}
                no={() => {
                  this.navigate(false);
                }}
              />
              <NavigationButtons
                hideProgress
                QueCounter={true}
                progressPercent={36}
                loading={this.props.loading}
                hideNext
                activeCounter={QuestionList.KnockoutQuestions.LivePast12Months.QuestionNumber}
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
    loading: state.layout.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateKnockoutQuestion: (
          healthQuestionAnswer: UpdateKnockoutQuestionAnswerPayload
        ) => UpdateKnockoutQuestionAnswer(healthQuestionAnswer),
        startSaveApplication: (savePayload: SavePayload) =>
          StartSaveApplication(savePayload),
      },
      dispatch
    ),
  };
};

export const LivePast12MonthsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LivePast12MonthsPageClass);
