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
import { LeadDTO, Relationship } from "../../clients/api.generated.clients";
import { LeadFlow } from "../../actions/nav_actions";
import _ from "lodash";
import { customBindActionCreators } from "../../utilities/helper";
import { UpdateLeadInfo } from "../../actions/lead_actions";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";

interface Props extends RouteComponentProps {
  flow: LeadFlow;
  leadInfo: LeadDTO;
  updateLeadInfo: (leadInfo) => void;
}

interface State {}

export class BeneficiaryRelationshipClass extends React.Component<
  Props,
  State
> {
  updateAndNavigate = (relationship: Relationship) => {
    const { leadInfo, updateLeadInfo } = this.props;

    const updatedLeadInfo = _.cloneDeep(leadInfo);
    updatedLeadInfo.desiredBeneficiary = relationship;
    updateLeadInfo(updatedLeadInfo);
    this.navigate();
  };

  navigate = () => {
    const { flow, history } = this.props;
    if (flow == LeadFlow.A) {
      navigate(history, navRoutes.Quote.Hobby.path);
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Quote.FirstName.path);
    } else if (flow == LeadFlow.C) {
      /*  navigate(history, navRoutes.Quote.FirstName.path);*/
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Quote.FirstName.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Quote.Hobby.path);
    } else {
      navigate(history, navRoutes.Quote.FirstName.path);
    }
  };

  render() {
    return (
      <CardWrapper>
        <div className="d-flex flex-column justify-between h-100">
          <QuestionDisplay
            questionTitle={
              QuestionList.LeadQuestions.BeneficiaryRelationship.Title
            }
            questionText={
              QuestionList.LeadQuestions.BeneficiaryRelationship.Text
            }
          />
          <div>
            <Row
              gutter={[16, 16]}
              style={{ marginBottom: 16 }}
              align="middle"
              justify="center"
            >
              <Col className="ant-col-flex-center" md={6} xs={12}>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateAndNavigate(Relationship.Spouse);
                  }}
                >
                  Spouse
                </Button>
              </Col>
              <Col className="ant-col-flex-center" md={6} xs={12}>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateAndNavigate(Relationship.Relative);
                  }}
                >
                  Relative
                </Button>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col className="ant-col-flex-center" md={6} xs={12}>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateAndNavigate(Relationship.Child);
                  }}
                >
                  Child
                </Button>
              </Col>
              <Col className="ant-col-flex-center" md={6} xs={12}>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateAndNavigate(Relationship.Other);
                  }}
                >
                  Other
                </Button>
              </Col>
            </Row>
          </div>
          <NavigationButtons
            progressPercent={50}
            hideNext
            navigate={() => this.navigate()}
          />
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

export const BeneficiaryRelationshipPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BeneficiaryRelationshipClass);
