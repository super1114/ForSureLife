import { Col, Input, InputNumber, Row } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdatePaymentInfo } from '../../actions/application_actions';
import { LeadFlow } from '../../actions/nav_actions';
import { PaymentInfo, PaymentInfoDto } from '../../clients/api.generated.clients';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';

interface Props extends RouteComponentProps {
    updatePaymentInfo: (paymentinfo: PaymentInfoDto) => void;
    paymentInfo: PaymentInfo;
    flow: LeadFlow;
}

interface State {
    accountNumber: string;
    routingNumber: string;
}

class PaymentAccountInfoPageClass extends React.Component<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
            accountNumber: "",
            routingNumber: ""
        }
    }

    updateAndNavigate = () => {
        alert("GOt to here");
        const { history, paymentInfo, updatePaymentInfo, flow } = this.props;
        const updatedPaymentInfo = {
            ...paymentInfo, accountNumber: this.state.accountNumber,
            routingNumber: this.state.routingNumber
        };
        alert(updatedPaymentInfo.routingNumber);
        updatePaymentInfo(updatedPaymentInfo);

        if (flow == LeadFlow.A) {
            /* navigate(history, navRoutes.Quote.PhoneNumber.path);*/
        } else if (flow == LeadFlow.B) {
            navigate(history, navRoutes.Payment.PaymentCheckingOrSavings.path);
        } else if (flow == LeadFlow.C) {
            navigate(history, navRoutes.Payment.PaymentCheckingOrSavings.path);
        } else if (flow == LeadFlow.D) {
            navigate(history, navRoutes.Payment.PaymentCheckingOrSavings.path);
        } else {
            navigate(history, navRoutes.Payment.PaymentCheckingOrSavings.path);
        }
    }

    componentDidMount() {
        const { paymentInfo } = this.props;
        this.setState({ accountNumber: paymentInfo.accountNumber });
        this.setState({ routingNumber: paymentInfo.routingNumber });
    }


    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PaymentQuestions.PaymentAccountInfo.Title}
                        questionText={QuestionList.PaymentQuestions.PaymentAccountInfo.Text}
                    />

                    <Row gutter={[16, 16]} justify="center">
                        <Col md={6} xs={24}>
                            <InputNumber
                                size="large"
                                onChange={(val) => { this.setState({ accountNumber: val }) }}
                                placeholder="Account Number"
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={[16, 16]} justify="center">
                        <Col md={6} xs={24}>
                            <Input
                                size="large"
                                onChange={(e) => { this.setState({ routingNumber: e.target.value }) }}
                                placeholder="Routing Number" />
                        </Col>
                    </Row>
                    <NavigationButtons
                        progressPercent={10}
                        navigate={() => this.updateAndNavigate()}
                        centerNext
                    />


                </CardWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        paymentInfo: state.app.paymentInfo,
        flow: state.navigation.leadFlow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updatePaymentInfo: (paymentInfo) => UpdatePaymentInfo(paymentInfo)
        }, dispatch)

    }
}

export const PaymentAccountInfoPage = connect(mapStateToProps, mapDispatchToProps)(PaymentAccountInfoPageClass);
