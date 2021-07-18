import React from "react";
import { GlobalState } from "../../reducers/root_reducer";
import { connect } from "react-redux";
import { QuestionList } from "../../utilities/questions";
import { QuestionDisplay } from "../../components/question_display";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../nav/routes";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { navigate } from "../../utilities/navigation_util";
import { YesNoAnswer } from "../../components/yes_no_answer";
import { LeadFlow } from "../../actions/nav_actions";
import { UpdateLeadInfo } from "../../actions/lead_actions";
import { LeadDTO } from "../../clients/api.generated.clients";
import _ from "lodash";
import { customBindActionCreators } from "../../utilities/helper";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";

interface Props extends RouteComponentProps {
  flow: LeadFlow;
  leadInfo: LeadDTO;
  updateLeadInfo: (leadInfo) => void;
}

interface State {}

class CurrentCoverageClass extends React.Component<Props, State> {
  navigate = () => {
    const { flow, history } = this.props;

    if (flow == LeadFlow.A) {
      navigate(history, navRoutes.Quote.CoverageAmount.path);
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Quote.CoverageAmount.path);
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Quote.CoverageAmount.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Quote.CoverageAmount.path);
    } else {
      navigate(history, navRoutes.Quote.CoverageAmount.path);
    }
  };

  yes = () => {
    const { leadInfo, updateLeadInfo } = this.props;

    const updatedLeadInfo = _.cloneDeep(leadInfo);
    updatedLeadInfo.currentCoverage = true;
    updateLeadInfo(updatedLeadInfo);
    this.navigate();
  };

  no = () => {
    const { leadInfo, updateLeadInfo } = this.props;
    const updatedLeadInfo = _.cloneDeep(leadInfo);
    updatedLeadInfo.currentCoverage = false;
    updateLeadInfo(updatedLeadInfo);
    this.navigate();
  };

  render() {
    const { history } = this.props;
    return (
      <CardWrapper>
        <div className="d-flex justify-between flex-column h-100">
          <QuestionDisplay
            questionTitle={QuestionList.LeadQuestions.CurrentCoverage.Title}
            questionText={QuestionList.LeadQuestions.CurrentCoverage.Text}
            height={100}
          />

          <div className="quote-coverage">
            <YesNoAnswer
              yes={() => {
                this.yes();
              }}
              no={() => {
                this.no();
              }}
            />
            <NavigationButtons
              progressPercent={25}
              hideNext
              navigate={() =>
                navigate(history, navRoutes.Quote.CoverageAmount.path)
              }
            />
          </div>
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (props: GlobalState) => {
  return {
    flow: props.navigation.leadFlow,
    leadInfo: props.app.leadInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateLeadInfo: (leadInfo) => UpdateLeadInfo(leadInfo),
      },
      dispatch
    ),
  };
};

export const CurrentCoveragePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentCoverageClass);
