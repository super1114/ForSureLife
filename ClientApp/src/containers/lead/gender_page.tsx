import React from "react";
import { GlobalState } from "../../reducers/root_reducer";
import { connect } from "react-redux";
import { QuestionDisplay } from "../../components/question_display";
import { QuestionList } from "../../utilities/questions";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../nav/routes";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { navigate } from "../../utilities/navigation_util";
import { Row, Col, Button } from "antd";
import {
  Gender,
  LeadDTO,
  Relationship,
} from "../../clients/api.generated.clients";
import { LeadFlow } from "../../actions/nav_actions";
import { customBindActionCreators } from "../../utilities/helper";
import { UpdateLeadInfo } from "../../actions/lead_actions";
import _ from "lodash";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";

interface Props extends RouteComponentProps {
  flow: LeadFlow;
  leadInfo: LeadDTO;
  updateLeadInfo: (leadInfo) => void;
}

interface State {}

export class GenderPageClass extends React.Component<Props, State> {
  updateAndNavigate = (relationship: Relationship) => {
    const { history } = this.props;
    navigate(history, navRoutes.Quote.Hobby.path);
  };

  navigate = (gender: Gender) => {
    const { flow, history, leadInfo, updateLeadInfo } = this.props;

    const updatedLeadInfo = _.cloneDeep(leadInfo);
    updatedLeadInfo.gender = gender;
    updateLeadInfo(updatedLeadInfo);

    if (flow == LeadFlow.A) {
      /*       navigate(history, navRoutes.Knockout.TobacooUse.path);*/
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Knockout.TobacooUse.path);
    } else if (flow == LeadFlow.C) {
      navigate(history, navRoutes.Knockout.TobacooUse.path);
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Knockout.TobacooUse.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Knockout.TobacooUse.path);
    } else {
      navigate(history, navRoutes.Knockout.TobacooUse.path);
    }
  };

  render() {
    return (
      <CardWrapper>
        <div className="d-flex justify-between flex-column h-100">
          <QuestionDisplay
            questionTitle={QuestionList.LeadQuestions.Gender.Title}
            questionText={QuestionList.LeadQuestions.Gender.Text}
          />
          <Row gutter={[16, 16]} align="middle" justify="center">
            <Col className="ant-col-flex-center" md={6} xs={12}>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={() => {
                  this.navigate(Gender.Male);
                }}
              >
                Male
              </Button>
            </Col>
            <Col className="ant-col-flex-center" md={6} xs={12}>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={() => {
                  this.navigate(Gender.Female);
                }}
              >
                Female
              </Button>
            </Col>
          </Row>
          <NavigationButtons progressPercent={95} hideNext />
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
    leadInfo: state.app.leadInfo,
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

export const GenderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenderPageClass);
