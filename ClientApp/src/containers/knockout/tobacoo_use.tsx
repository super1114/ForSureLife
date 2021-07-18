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
  LeadHealthQuestions,
} from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { YesNoAnswer } from "../../components/yes_no_answer";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";

interface Props extends RouteComponentProps {
  updateKnockoutQuestion: (
    healthQuestionAnswer: UpdateKnockoutQuestionAnswerPayload
  ) => void;
  flow: LeadFlow;
  app: ApplicationDto;
}

class TobacooUsePageClass extends React.Component<Props, any> {
  navigate = () => {
    const { flow, history, app } = this.props;

    const saveApplicationClient = new ApplicationClient(
      process.env.REACT_APP_API_URL,
      httpWithTokenInHeader
    );
    saveApplicationClient
      .update(app)
      .then((response) => {
        return response;
      })
      .catch((ex) => {
        console.log({ ex });
      });

    if (flow == LeadFlow.A) {
      /* navigate(history, navRoutes.Knockout.Hospitilized.path);*/
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Quote.BeneficiaryRelationship.path);
    } else if (flow == LeadFlow.C) {
      navigate(history, navRoutes.Knockout.Hospitilized.path);
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Quote.BeneficiaryRelationship.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Quote.QuoteLoading.path);
    } else {
      navigate(history, navRoutes.Quote.BeneficiaryRelationship.path);
    }
  };

  yes = () => {
    const { updateKnockoutQuestion } = this.props;

    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.TobaccoUse,
      healthAnswer: true,
    });
    this.navigate();
  };

  no = () => {
    const { updateKnockoutQuestion } = this.props;
    updateKnockoutQuestion({
      leadHealthQuestion: LeadHealthQuestions.TobaccoUse,
      healthAnswer: false,
    });
    this.navigate();
  };

  render() {
    return (
      <CardWrapper>
        <div className="d-flex justify-between flex-column h-100">
          <QuestionDisplay
            questionTitle={QuestionList.KnockoutQuestions.TobacooUse.Title}
            questionText={QuestionList.KnockoutQuestions.TobacooUse.Text}
          />
          <YesNoAnswer
            yes={() => {
              this.yes();
            }}
            no={() => {
              this.no();
            }}
          />
          <NavigationButtons progressPercent={99} hideNext />
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (props: GlobalState) => {
  return {
    flow: props.navigation.leadFlow,
    app: props.app,
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

export const TobacooUsePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TobacooUsePageClass);
