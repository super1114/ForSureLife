import { Button, Col, Row } from "antd";
import React from "react";
import { FormattedNumber } from "react-intl";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateLeadInfo } from "../../../actions/lead_actions";
import { LeadFlow } from "../../../actions/nav_actions";
import { LeadDTO } from "../../../clients/api.generated.clients";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../../components/question_display";
import { navRoutes } from "../../../nav/routes";
import { GlobalState } from "../../../reducers/root_reducer";
import { customBindActionCreators } from "../../../utilities/helper";
import { navigate } from "../../../utilities/navigation_util";
import { QuestionList } from "../../../utilities/questions";
import _ from "lodash";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import "./coverage_amount_page.css";
import { isMobileDevice } from "../../../utilities/responsive";

interface Props extends RouteComponentProps {
  flow: LeadFlow;
  leadInfo: LeadDTO;
  updateLeadInfo: (leadInfo) => void;
}

interface State {
  coverageAmount: number;
}

class CoverageAmountClass extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      coverageAmount: 10000,
    };
  }

  componentDidMount() {
    const { leadInfo } = this.props;
    this.setState({
      coverageAmount:
        leadInfo.desiredCoverageAmount > 0
          ? leadInfo.desiredCoverageAmount
          : 10000,
    });
  }

  navigate = () => {
    const { flow, history, leadInfo, updateLeadInfo } = this.props;
    if (flow == LeadFlow.A) {
      navigate(history, navRoutes.Quote.BeneficiaryRelationship.path);
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Quote.Height.path);
    } else if (flow == LeadFlow.C) {
      navigate(history, navRoutes.Quote.Height.path);
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Quote.Height.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Quote.BeneficiaryRelationship.path);
    } else {
      navigate(history, navRoutes.Quote.Height.path);
    }

    const updatedLead = _.cloneDeep(leadInfo);
    updatedLead.desiredCoverageAmount = this.state.coverageAmount;
    updatedLead.originalDesiredCoverageAmount = this.state.coverageAmount;
    updateLeadInfo(updatedLead);
  };

  render() {
    const { leadInfo } = this.props;
    return (
      <CardWrapper>
        <QuestionDisplay
          questionTitle={QuestionList.LeadQuestions.CoverageAmount.Title}
          questionText={QuestionList.LeadQuestions.CoverageAmount.Text}
          questionSubtext={QuestionList.LeadQuestions.CoverageAmount.SubText}
        />
        <Row className="coverage-amount-page" justify="center" align="top">
          <Col className="ant-col-flex-center" xxl={6} md={6} xs={4}>
            <Button
              type="ghost"
              onClick={() => {
                if (this.state.coverageAmount != 5000) {
                  this.setState({
                    coverageAmount: this.state.coverageAmount - 1000,
                  });
                }
              }}
              shape="circle"
              size="large"
              icon={<MinusOutlined />}
            />
            <div style={{ marginTop: 5 }}>
              Subtract
              <br /> $1000
            </div>
          </Col>
          <Col className="ant-col-flex-center" xxl={12} md={12} xs={16}>
            <span className="formatted-number">
              <FormattedNumber
                minimumFractionDigits={0}
                maximumFractionDigits={0}
                value={this.state.coverageAmount}
                style="currency"
                currency="USD"
              />
            </span>
            <p
              className="mb-0"
              style={{ fontSize: isMobileDevice() ? 18 : 20 }}
            >
              for permanent
              <br /> whole life coverage
            </p>
          </Col>
          <Col className="ant-col-flex-center" xxl={6} md={6} xs={4}>
            <Button
              onClick={() => {
                const dob = new Date(leadInfo.dob);
                const month_diff = Date.now() - dob.getTime();
                const age_dt = new Date(month_diff);
                const year = age_dt.getUTCFullYear();

                const age = Math.abs(year - 1970);

                if (this.state.coverageAmount != 30000 && age < 70) {
                  this.setState({
                    coverageAmount: this.state.coverageAmount + 1000,
                  });
                } else if (
                  this.state.coverageAmount != 15000 &&
                  age > 69 &&
                  age < 76
                ) {
                  this.setState({
                    coverageAmount: this.state.coverageAmount + 1000,
                  });
                } else if (this.state.coverageAmount != 12000 && age > 75) {
                  this.setState({
                    coverageAmount: this.state.coverageAmount + 1000,
                  });
                }
              }}
              shape="circle"
              type="default"
              size="large"
              icon={<PlusOutlined />}
            />
            <div style={{ marginTop: 5 }}>
              Add
              <br /> $1000
            </div>
          </Col>
        </Row>
        <NavigationButtons
          progressPercent={37.5}
          navigate={() => this.navigate()}
        />
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

export const CoverageAmountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoverageAmountClass);
