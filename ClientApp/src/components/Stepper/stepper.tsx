import React from "react";
import { Col, Menu, Row, Steps } from "antd";
import { connect } from "react-redux";
import { UpdateStepper } from "../../actions/nav_actions";
import { FormattedNumber } from "react-intl";
import { isMobileDevice } from "../../utilities/responsive";
import { GlobalState } from "../../reducers/root_reducer";
import { RouteComponentProps, withRouter } from "react-router";
import "./stepper.css";
import PathCheck from "../../assets/Path-Check.svg";
import immediateBenefit from "../../assets/Immediate benefit.png";
const { Step } = Steps;

interface Props extends RouteComponentProps {
  selectedMonthlyRate: number;
  selectedBenefitAmount: number;
}

interface State {}

interface ISteps {
  quoteStepStatus: StepStatus;
  healthStepStatus: StepStatus;
  viewPlanStepStatus: StepStatus;
  policyStepStatus: StepStatus;
  submitStepStatus: StepStatus;
}

export enum StepStatus {
  wait = "wait",
  process = "process",
  finish = "finish",
  error = "error",
}

class StepperClass extends React.Component<Props, State> {
  getActiveStepStatus = (): ISteps | undefined => {
    const route = this.props.location.pathname.slice(
      1,
      this.props.location.pathname.indexOf("/", 1)
    );

    switch (route) {
      case "quote":
        return {
          quoteStepStatus: StepStatus.process,
          healthStepStatus: StepStatus.wait,
          viewPlanStepStatus: StepStatus.wait,
          policyStepStatus: StepStatus.wait,
          submitStepStatus: StepStatus.wait,
        };
      case "health":
      case "knockout":
        return {
          quoteStepStatus: StepStatus.finish,
          healthStepStatus: StepStatus.process,
          viewPlanStepStatus: StepStatus.wait,
          policyStepStatus: StepStatus.wait,
          submitStepStatus: StepStatus.wait,
        };

      case "policy":
      case "payment":
        return {
          quoteStepStatus: StepStatus.finish,
          healthStepStatus: StepStatus.finish,
          viewPlanStepStatus: StepStatus.finish,
          policyStepStatus: StepStatus.process,
          submitStepStatus: StepStatus.wait,
        };
      case "review":
        return {
          quoteStepStatus: StepStatus.finish,
          healthStepStatus: StepStatus.finish,
          viewPlanStepStatus: StepStatus.finish,
          policyStepStatus: StepStatus.finish,
          submitStepStatus: StepStatus.process,
        };
      case "submit":
        return {
          quoteStepStatus: StepStatus.finish,
          healthStepStatus: StepStatus.finish,
          viewPlanStepStatus: StepStatus.finish,
          policyStepStatus: StepStatus.finish,
          submitStepStatus: StepStatus.finish,
        };
      default:
        return {
          quoteStepStatus: StepStatus.wait,
          healthStepStatus: StepStatus.wait,
          viewPlanStepStatus: StepStatus.wait,
          policyStepStatus: StepStatus.wait,
          submitStepStatus: StepStatus.wait,
        };
    }
  };

  render() {
    const { selectedMonthlyRate, selectedBenefitAmount } = this.props;
    const {
      quoteStepStatus,
      healthStepStatus,
      viewPlanStepStatus,
      policyStepStatus,
      submitStepStatus,
    } = this.getActiveStepStatus();
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="https://www.antgroup.com">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="https://www.aliyun.com">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
    return (
      <div className="stepper">
        {!(this.props.location.pathname === "/policy/email") && (
          <div className="premium-wrapper">
            <Row align="middle" justify="center">
                <Col className="premium-shield-img" span={1} md={2} xxl={1}>
                  <img src={immediateBenefit} alt="immediateBenefit" />
                </Col>
              <Col md={8} xxl={4} xs={24}>
                <span className="premium-wrapper-text">Requested Amount:</span>
                <p className="premium-wrapper-price">
                  {selectedMonthlyRate == 0 ? (
                    <strong>$--,---</strong>
                  ) : (
                    <strong>
                      <FormattedNumber
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                        value={selectedBenefitAmount}
                        style="currency"
                        currency="USD"
                      />
                    </strong>
                  )}
                  <span className="formatted-for"> for </span>
                  {selectedMonthlyRate == 0 ? (
                    <strong>$--.--</strong>
                  ) : (
                    <strong className="currency">
                      <FormattedNumber
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                        value={selectedMonthlyRate}
                        style="currency"
                        currency="USD"
                      />
                    </strong>
                  )}
                  <span>/mo.</span>
                </p>
              </Col>
            </Row>
          </div>
        )}

        <Row className="progress">Progress</Row>
        <Row className="progress-steps-row" justify="center">
          <Col span={24} md={16} lg={12} xs={24} xxl={8}>
            <Steps
              className="progress-steps"
              labelPlacement={"vertical"}
              size={"small"}
            >
              <Step
                status={quoteStepStatus}
                title="Get Quote"
                icon={
                  quoteStepStatus != StepStatus.finish ? (
                    <div className="check-circle" />
                  ) : (
                    <div className="check-circle">
                      <img src={PathCheck} alt="" />
                    </div>
                  )
                }
              />
              <Step
                status={healthStepStatus}
                title="Health Info"
                icon={
                  healthStepStatus != StepStatus.finish ? (
                    <div className="check-circle" />
                  ) : (
                    <div className="check-circle">
                      <img src={PathCheck} alt="" />
                    </div>
                  )
                }
              />
              <Step
                status={viewPlanStepStatus}
                title="View Plan"
                icon={
                  viewPlanStepStatus != StepStatus.finish ? (
                    <div className="check-circle" />
                  ) : (
                    <div className="check-circle">
                      <img src={PathCheck} alt="" />
                    </div>
                  )
                }
              />
              <Step
                status={policyStepStatus}
                title="Policy Info"
                icon={
                  policyStepStatus != StepStatus.finish ? (
                    <div className="check-circle" />
                  ) : (
                    <div className="check-circle">
                      <img src={PathCheck} alt="" />
                    </div>
                  )
                }
              />
              <Step
                status={submitStepStatus}
                title="Submit"
                icon={
                  submitStepStatus != StepStatus.finish ? (
                    <div className="check-circle" />
                  ) : (
                    <div className="check-circle">
                      <img src={PathCheck} alt="" />
                    </div>
                  )
                }
              />
            </Steps>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateFromProps = (state: GlobalState) => {
  return {
    navigation: state.navigation,
    desiredCoverageAmount: state.app.leadInfo.desiredCoverageAmount,
    selectedMonthlyRate: state.quote.selectedMonthlyRate,
    selectedBenefitAmount: state.quote.selectedBenefitAmount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStepper: (key, val) => UpdateStepper({ key, val }),
  };
};

const WithRouterComponent = withRouter(StepperClass);
export const Stepper = connect(
  mapStateFromProps,
  mapDispatchToProps
)(WithRouterComponent);
