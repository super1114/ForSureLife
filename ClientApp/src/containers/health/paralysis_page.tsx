import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  StartSaveApplication,
  UpdateHealthQuestionAnswer,
  UpdateHealthQuestionAnswerPayload,
} from "../../actions/application_actions";
import {
  ApplicationClient,
  ApplicationDto,
  ApplicationHealthQuestions,
  LeadDTO,
  QuoteClient,
  QuoteDto,
  SeniorChoicePremiumType,
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
import * as H from "history";
import _ from "lodash";
import { httpWithTokenInHeader } from "../../clients/api.clients.base";
import { StoreQuote } from "../../actions/quote_actions";
import { UpdateLeadInfo } from "../../actions/lead_actions";
interface Props extends RouteComponentProps {
  updateHealthQuestion: (
    healthQuestionAnswer: UpdateHealthQuestionAnswerPayload
  ) => void;
  startSaveApplication: (
    app: ApplicationDto,
    path: string,
    history: H.History
  ) => void;
  storeQuote: (quote: QuoteDto) => void;
  leadInfo: LeadDTO;
  app: ApplicationDto;
  loading: boolean;
  updateLeadInfo: (leadInfo) => void;
}

class ParalysisPageClass extends React.Component<Props, any> {
  yes = () => {
    const { app } = this.props;
    const updatedApp = _.cloneDeep(app);
    updatedApp.healthQuestions = [...updatedApp.healthQuestions].map((hq) => {
      if (hq.applicationQuestion === ApplicationHealthQuestions.Paralysis) {
        hq.healthAnswer = true;
      }
      return hq;
    });

    this.updateNavigate(updatedApp);
  };

  no = () => {
    const { app } = this.props;
    const updatedApp = _.cloneDeep(app);
    updatedApp.healthQuestions = [...updatedApp.healthQuestions].map((hq) => {
      if (hq.applicationQuestion === ApplicationHealthQuestions.Paralysis) {
        hq.healthAnswer = false;
      }
      return hq;
    });
    this.updateNavigate(updatedApp);
  };

  updateNavigate = (updateApp) => {
    const { history, storeQuote, updateLeadInfo } = this.props;
    const saveApplicationClient = new ApplicationClient(
      process.env.REACT_APP_API_URL,
      httpWithTokenInHeader
    );
    updateApp.leadInfo.healthQuestionsAnswered = true;
    updateLeadInfo(updateApp.leadInfo);
    /*        startSaveApplication(updateApp, "", history);*/

    const client = new QuoteClient(
      process.env.REACT_APP_API_URL,
      httpWithTokenInHeader
    );
    saveApplicationClient.update(updateApp).then((response) => {
      client
        .getQuote(updateApp.applicationId)
        .then((quoteResponse) => {
          storeQuote(quoteResponse);
          navigate(history, navRoutes.Quote.QuoteLoading2.path);
          //if (quoteResponse.premiumType == SeniorChoicePremiumType.Immediate) {
          //    navigate(history, navRoutes.Quote.QuoteImmediate.path);
          //} else if (quoteResponse.premiumType == SeniorChoicePremiumType.Graded) {
          //    navigate(history, navRoutes.Quote.QuoteGraded.path);

          //} else if (quoteResponse.premiumType == SeniorChoicePremiumType.Premium) {
          //    navigate(history, navRoutes.Quote.QuoteModified.path);
          //}
        })
        .catch((ex) => {
          console.log({ ex });
        });
    });
  };

  //componentDidMount() {
  //    const { history, updateHealthQuestion, storeQuote, startSaveApplication, app } = this.props;
  //    const updatedApp = _.cloneDeep(app);
  //    startSaveApplication(updatedApp, "", history);
  //}
  render() {
    const { history, loading, storeQuote } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={QuestionList.HealthQuestions.Paralysis.Title}
              questionText={QuestionList.HealthQuestions.Paralysis.Text}
            />
            <div>
              <YesNoAnswer
                yes={() => {
                  this.yes();
                }}
                no={() => {
                  this.no();
                }}
                disabled={loading}
              />
              <NavigationButtons
                progressPercent={99}
                hideProgress
                QueCounter={true}
                hideNext
                activeCounter={QuestionList.HealthQuestions.Paralysis.QuestionNumber}
                loading={loading}
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
    app: state.app,
    loading: state.layout.loading,
    storeQuote: (quote: QuoteDto) => StoreQuote(quote),
    leadInfo: state.app.leadInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateHealthQuestion: (
          healthQuestionAnswer: UpdateHealthQuestionAnswerPayload
        ) => UpdateHealthQuestionAnswer(healthQuestionAnswer),
        startSaveApplication: (
          app: ApplicationDto,
          path: string,
          history: H.History
        ) => StartSaveApplication({ app, path, history }),
        updateLeadInfo: (leadInfo) => UpdateLeadInfo(leadInfo),
      },
      dispatch
    ),
  };
};

export const ParalysisPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParalysisPageClass);
