import React from "react";
import { Col, Row, Steps } from "antd";
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { UpdateStepper } from "../actions/nav_actions";
import { Breadcrumb } from 'antd';
import { Colors } from "../styles/colors";
import { FormattedNumber } from 'react-intl';
import { isMobileDevice } from "../utilities/responsive";
import { GlobalState } from "../reducers/root_reducer";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";

const { Step } = Steps;

interface Props extends RouteComponentProps {
    selectedMonthlyRate: number;
}

interface State {

}

interface ISteps {
    healthStepStatus: StepStatus;
    beneficiaryStepStatus: StepStatus;
    policyStepStatus: StepStatus;
    reviewStepStatus: StepStatus;
    submitStepStatus: StepStatus;
}

export enum StepStatus {
    wait = 'wait',
    process = 'process',
    finish = 'finish',
    error = 'error'
}


class StepperClass extends React.Component<Props, State> {

    getActiveStepStatus = (): ISteps | undefined => {
        const route = this.props.location.pathname.slice(1, this.props.location.pathname.indexOf('/', 1));

        switch (route) {
            case "health":
                return {
                    healthStepStatus: StepStatus.process,
                    beneficiaryStepStatus: StepStatus.wait,
                    policyStepStatus: StepStatus.wait,
                    reviewStepStatus: StepStatus.wait,
                    submitStepStatus: StepStatus.wait,
                }
            case "beneficiary":
                return {
                    healthStepStatus: StepStatus.finish,
                    beneficiaryStepStatus: StepStatus.process,
                    policyStepStatus: StepStatus.wait,
                    reviewStepStatus: StepStatus.wait,
                    submitStepStatus: StepStatus.wait,
                }

            case "policy":
            case "payment":
                return {
                    healthStepStatus: StepStatus.finish,
                    beneficiaryStepStatus: StepStatus.finish,
                    policyStepStatus: StepStatus.process,
                    reviewStepStatus: StepStatus.wait,
                    submitStepStatus: StepStatus.wait,
                }
            case "review":
                return {
                    healthStepStatus: StepStatus.finish,
                    beneficiaryStepStatus: StepStatus.finish,
                    policyStepStatus: StepStatus.finish,
                    reviewStepStatus: StepStatus.process,
                    submitStepStatus: StepStatus.wait,
                }
            case "submit":
                return {
                    healthStepStatus: StepStatus.finish,
                    beneficiaryStepStatus: StepStatus.finish,
                    policyStepStatus: StepStatus.finish,
                    reviewStepStatus: StepStatus.finish,
                    submitStepStatus: StepStatus.process,
                }
            default:
                return {
                    healthStepStatus: StepStatus.wait,
                    beneficiaryStepStatus: StepStatus.wait,
                    policyStepStatus: StepStatus.wait,
                    reviewStepStatus: StepStatus.wait,
                    submitStepStatus: StepStatus.wait,
                }
        }
    }

    render() {
        const { selectedMonthlyRate } = this.props;
        const { healthStepStatus, beneficiaryStepStatus, policyStepStatus, reviewStepStatus, submitStepStatus } = this.getActiveStepStatus();
        return (
            healthStepStatus === StepStatus.wait ? (isMobileDevice() ? <span /> : <div style={{ position: 'sticky', top: 64, zIndex: 5, backgroundColor: '#ffffff' }} />) :
                <div style={{ position: 'sticky', top: 64, zIndex: 5 }}>
                    <div style={{ margin: 0, padding: isMobileDevice() ? "8px 16px 16px 16px" : 24, backgroundColor: 'white', }}>
                        {isMobileDevice() ? <div style={{ textAlign: 'center', backgroundColor: "#F4A03E", color: "#fff", display: 'flex', flexDirection: "column", alignItems: "center", padding: 5, margin: "0px -16px 6px -16px" }}>
                            <span style={{ fontSize: 18, lineHeight: '18px' }} >Estimated Premium:</span>
                            <span style={{ fontSize: 20, lineHeight: '20px' }}><FormattedNumber minimumFractionDigits={2} maximumFractionDigits={2} value={selectedMonthlyRate} style="currency" currency="USD" />/mo.</span>
                        </div> : undefined}
                        <Row justify="center">
                            <Col md={16} xs={0}>
                                <Steps>
                                    <Step status={healthStepStatus} title="Health Info" icon={healthStepStatus != StepStatus.finish ? <CheckCircleOutlined /> : <CheckCircleFilled />} />
                                    <Step status={beneficiaryStepStatus} title="Beneficiaries" icon={beneficiaryStepStatus != StepStatus.finish ? <CheckCircleOutlined /> : <CheckCircleFilled />} />
                                    <Step status={policyStepStatus} title="Policy Info" icon={policyStepStatus != StepStatus.finish ? <CheckCircleOutlined /> : <CheckCircleFilled />} />
                                    <Step status={reviewStepStatus} title="Review" icon={reviewStepStatus != StepStatus.finish ? <CheckCircleOutlined /> : <CheckCircleFilled />} />
                                    <Step status={submitStepStatus} title="Submit" icon={submitStepStatus != StepStatus.finish ? <CheckCircleOutlined /> : <CheckCircleFilled />} />
                                </Steps>
                            </Col>
                            <Col md={0} xs={24}>
                                <Breadcrumb separator=">" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Breadcrumb.Item ><span style={{ color: healthStepStatus == StepStatus.process ? Colors.primary : 'initial' }}>Health Info</span></Breadcrumb.Item>
                                    <Breadcrumb.Item><span style={{ color: beneficiaryStepStatus == StepStatus.process ? Colors.primary : 'initial' }}>Beneficiaries</span></Breadcrumb.Item>
                                    <Breadcrumb.Item><span style={{ color: policyStepStatus == StepStatus.process ? Colors.primary : 'initial' }}>Policy Info</span></Breadcrumb.Item>
                                    <Breadcrumb.Item><span style={{ color: reviewStepStatus == StepStatus.process ? Colors.primary : 'initial' }}>Review</span></Breadcrumb.Item>
                                    <Breadcrumb.Item><span style={{ color: submitStepStatus == StepStatus.process ? Colors.primary : 'initial' }}>Submit</span></Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </div>
                </div >
        )
    }
}

const mapStateFromProps = (state: GlobalState) => {
    return {
        navigation: state.navigation,
        desiredCoverageAmount: state.app.leadInfo.desiredCoverageAmount,
        selectedMonthlyRate: state.quote.selectedMonthlyRate
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateStepper: (key, val) => UpdateStepper({ key, val })
    }
}

const WithRouterComponent = withRouter(StepperClass);
export const Stepper = connect(mapStateFromProps, mapDispatchToProps)(WithRouterComponent);