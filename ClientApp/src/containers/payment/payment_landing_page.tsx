import { Col, Form, FormInstance, Input, Modal, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
    ApplicationDto,
    BankClient,
    BankInfo,
    IBankClient,
    PaymentInfoDto,
} from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { Colors } from "../../styles/colors";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";
import norton from "../../assets/norton_seal.png";
import lock from "../../assets/lock.png";
import { LoadingOutlined } from "@ant-design/icons";
import { httpWithTokenInHeader } from "../../clients/api.clients.base";
import { MaskedInput } from "antd-mask-input";
import { customBindActionCreators } from "../../utilities/helper";
import { UpdatePaymentInfo } from "../../actions/application_actions";
import { LeadFlow } from "../../actions/nav_actions";
import './payment_landing_page.css'
import SafetyBadge from "../../assets/SafetyBadge.svg";

interface Props extends RouteComponentProps {
    app: ApplicationDto;
    paymentInfo: PaymentInfoDto;
    updatePaymentInfo: (paymentinfo: PaymentInfoDto) => void;
    flow: LeadFlow;
}

interface FormState {
    accountNumber: string;
    routingNumber: string;
    bankingInsitution: string;
    bankAddress: string;
}

interface State {
    isInvalidRouting: boolean;
    bankClient: IBankClient;
    loading: boolean;
    isModalVisible: boolean;
}

class PaymentLandingPageClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {
            isInvalidRouting: false,
            isModalVisible: false,
            bankClient: new BankClient(
                process.env.REACT_APP_API_URL,
                httpWithTokenInHeader
            ),
            loading: false
        };
    }

    componentDidMount() {
        const { paymentInfo } = this.props;
        this.formRef.current.setFieldsValue({
            accountNumber: paymentInfo.accountNumber
                ? paymentInfo.accountNumber.toString()
                : "",
            routingNumber: paymentInfo.routingNumber
                ? paymentInfo.routingNumber.toString()
                : "",
            bankingInsitution: paymentInfo.bankingInsitution,
            bankAddress: paymentInfo.bankAddress,
        });
    }

    onRoutingLookup = (cv: Partial<FormState>) => {
        const { bankClient } = this.state;
        if (cv.routingNumber) {
            bankClient
                .getRoutingInfo(cv.routingNumber)
                .then((val: BankInfo) => {

                    if (val) {
                        this.setState({ loading: true });
                        setTimeout(() => {
                            this.formRef.current.setFieldsValue({
                                bankAddress: val.address1,
                                bankingInsitution: val.bankName,
                            });
                            this.setState({ loading: false });
                        }, 2000);
                    }
                    else if (cv.routingNumber.indexOf("_") === -1 && !val) {
                        this.setState({ isInvalidRouting: true, isModalVisible: true });
                    }
                })
                .catch((ex) => { });
        }
    };

    onSuccessSubmit = (values: FormState) => {
        const { history, paymentInfo, updatePaymentInfo } = this.props;
        const updatedPaymentInfo: PaymentInfoDto = {
            ...paymentInfo,
            bankingInsitution: values.bankingInsitution,
            bankAddress: values.bankAddress,
            accountNumber: values.accountNumber.toString(),
            routingNumber: values.routingNumber.toString(),
        };

        updatePaymentInfo(updatedPaymentInfo);
        navigate(history, navRoutes.Payment.PaymentCheckingOrSavings.path);
    };



    render() {
        const { history, flow } = this.props;
        const { loading, isInvalidRouting, isModalVisible } = this.state;
        return (
            <div>
                <CardWrapper>
                    <div className="d-flex justify-between flex-column h-100">
                        <QuestionDisplay
                            questionTitle={QuestionList.PaymentQuestions.PaymentLanding.Title}
                            questionText={QuestionList.PaymentQuestions.PaymentLanding.SubText}
                        />
                        <Form
                            layout="vertical"
                            ref={this.formRef}
                            onFinish={this.onSuccessSubmit}
                            scrollToFirstError
                            onValuesChange={(cv, v) => {
                                this.onRoutingLookup(cv);
                            }}
                        >
                            <div className="payment-landing-page">
                                <img
                                    src={SafetyBadge}
                                    alt="saftey badge"
                                    className="safety-shield-img"
                                />
                                <Row gutter={16} justify="center" align="bottom">
                                    <Col className="ant-col-flex-center" md={12} xs={24}>
                                        <Form.Item
                                            className="text-white"
                                            name="routingNumber"
                                            label={
                                                <div style={{ margin: "2px 0px", color: "white", fontWeight: "normal" }}>
                                                    <div>Routing Number</div>
                                                </div>
                                            }
                                            required
                                            rules={[{ required: true }]}
                                        >
                                            <MaskedInput
                                                mask="111111111"
                                                size="large"
                                                placeholder="Routing Number"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className="text-white"
                                            name="accountNumber"
                                            label={
                                                <div style={{ color: "white", fontWeight: "normal" }}>
                                                    Account Number
                                                </div>
                                            }
                                            required
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                type="number"
                                                maxLength={17}
                                                size="large"
                                                placeholder="Account Number"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col className="ant-col-flex-center">
                                        <Form.Item
                                            hidden={!isInvalidRouting}
                                            name="bankingInsitution"
                                            label={
                                                <div style={{ color: "white", fontWeight: "normal" }}>
                                                    Bank Name
                                                </div>
                                            }
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                disabled={!isInvalidRouting}
                                                size="large"
                                                placeholder="Bank Name"
                                                suffix={loading ? <LoadingOutlined /> : <div />}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            hidden={!isInvalidRouting}
                                            name="bankAddress"
                                            label={
                                                <div style={{ color: "white", fontWeight: "normal" }}>
                                                    Address
                                                </div>
                                            }
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                disabled={!isInvalidRouting}
                                                size="large"
                                                placeholder="Address"
                                                suffix={loading ? <LoadingOutlined /> : <div />}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 16 }} justify="end">
                                    <div
                                        style={{
                                            fontSize: 14,
                                            color: "#1C1C1C",
                                            fontWeight: 100,
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: 5,
                                        }}
                                    >
                                        <img style={{ margin: -5 }} src={lock} width={30} />
                                        <div className="text-center text-white"
                                            style={{
                                                marginLeft: 5,

                                                fontWeight: 400,
                                            }}
                                        >
                                            {`This is a secure form protected by Norton Security.`}
                                        </div>
                                    </div>
                                    <Col className="ant-col-flex-center" md={4} xs={24}>
                                        <img src={norton} width={100} />
                                    </Col>
                                </Row>
                            </div>
                            <NavigationButtons
                                progressPercent={flow == LeadFlow.E ? 80 : 45}
                                centerNext
                            />
                        </Form>
                    </div>
                </CardWrapper>
            </div>
        );
    }
}

function mapStateToProps(state: GlobalState) {
    return {
        flow: state.navigation.leadFlow,
        app: state.app,
        paymentInfo: state.app.paymentInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...customBindActionCreators(
            {
                updatePaymentInfo: (paymentInfo) => UpdatePaymentInfo(paymentInfo),
            },
            dispatch
        ),
    };
}

export const PaymentLandingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentLandingPageClass);
