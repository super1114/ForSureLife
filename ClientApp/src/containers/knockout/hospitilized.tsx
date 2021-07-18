import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  UpdateKnockoutQuestionAnswer,
  UpdateKnockoutQuestionAnswerPayload,
} from "../../actions/application_actions";
import { LeadFlow } from "../../actions/nav_actions";
import { httpWithTokenInHeader } from "../../clients/api.clients.base";
import {
  ApplicationClient,
  ApplicationDto,
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
  app: ApplicationDto;
  flow: LeadFlow;
}

class HospitilizedPageClass extends React.Component<Props, any> {
  yes = () => {
    const { history, updateKnockoutQuestion } = this.props;
    updateKnockoutQuestion({
      leadHealthQuestion: 11,
      healthAnswer: true,
    });
    navigate(history, navRoutes.Knockout.NotEligible.path);
  };

  no = () => {
    const { history, updateKnockoutQuestion, app } = this.props;

    const saveApplicationClient = new ApplicationClient(
      process.env.REACT_APP_API_URL,
      httpWithTokenInHeader
    );
    saveApplicationClient.update(app).catch((ex) => {
      console.log({ ex });
    });

    updateKnockoutQuestion({
      leadHealthQuestion: 11,
      healthAnswer: false,
    });
    navigate(history, navRoutes.Knockout.HospiceCare.path);
  };

  render() {
    const { flow } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={QuestionList.KnockoutQuestions.Hospitilized.Title}
              questionText={QuestionList.KnockoutQuestions.Hospitilized.Text}
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
                QueCounter={true}
                hideProgress
                progressPercent={4}
                hideNext
                activeCounter={QuestionList.KnockoutQuestions.Hospitilized.QuestionNumber}
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

export const HospitilizedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HospitilizedPageClass);
