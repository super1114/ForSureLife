import { Col, Form, FormInstance, Row, Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import {
  SavePayload,
  StartSaveApplication,
  UpdatePaymentInfo,
} from "../../actions/application_actions";
import {
  ApplicationDto,
  PaymentInfoDto,
} from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { Colors } from "../../styles/colors";
import { WITHDRAW_DATES } from "../../utilities/data";
import { customBindActionCreators } from "../../utilities/helper";
import { QuestionList } from "../../utilities/questions";
import _ from "lodash";
import { LeadFlow } from "../../actions/nav_actions";
import "./payment_selected_date.css";
const { Option } = Select;

interface Props extends RouteComponentProps {
  updatePaymentInfo: (paymentinfo: PaymentInfoDto) => void;
  startSaveApplication: (payload: SavePayload) => void;
  flow: LeadFlow;
  paymentInfo: PaymentInfoDto;
  app: ApplicationDto;
  loading: boolean;
}

interface State {}

interface FormState {
  paymentWithdrawlDate: number;
}

class PaymentSelectDatePageClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { flow, paymentInfo, updatePaymentInfo } = this.props;
    this.formRef.current.setFieldsValue({
      paymentWithdrawlDate: paymentInfo.paymentWithdrawlDate
        ? paymentInfo.paymentWithdrawlDate.toString()
        : "",
    });
    const updatedPaymentInfo: PaymentInfoDto = {
      ...paymentInfo,
      paymentWithdrawlDate: 1,
    };
    updatePaymentInfo(updatedPaymentInfo);
  }

  updateInfoAndNavigate = (values: FormState) => {
    const {
      history,
      flow,
      updatePaymentInfo,
      paymentInfo,
      startSaveApplication,
      app,
    } = this.props;
    const updatedApp = _.cloneDeep(app);
    updatedApp.paymentInfo.paymentWithdrawlDate = Number(
      values.paymentWithdrawlDate
    );
    const updatedPaymentInfo: PaymentInfoDto = {
      ...paymentInfo,
      paymentWithdrawlDate: Number(values.paymentWithdrawlDate),
    };
    updatePaymentInfo(updatedPaymentInfo);

    let nextRoute = navRoutes.Review.ReviewApp.path;

    if (flow == LeadFlow.A) {
      nextRoute = navRoutes.Review.ReviewApp.path;
    } else if (flow == LeadFlow.B) {
      nextRoute = navRoutes.Review.ReviewApp.path;
    } else if (flow == LeadFlow.C) {
      nextRoute = navRoutes.Review.ReviewApp.path;
    } else if (flow == LeadFlow.D) {
      nextRoute = navRoutes.Review.ReviewApp.path;
    } else if (flow == LeadFlow.E) {
      nextRoute = navRoutes.Payment.PaymentLanding.path;
    } else {
      nextRoute = navRoutes.Review.ReviewApp.path;
    }

    updatedApp.leadInfo.paymentDateSet = true;
    startSaveApplication({
      app: updatedApp,
      history,
      path: nextRoute,
    } as SavePayload);
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={
                QuestionList.PaymentQuestions.PaymentSelectDate.Title
              }
              questionText={
                QuestionList.PaymentQuestions.PaymentSelectDate.Text
              }
            />
            <Form
              layout="vertical"
              ref={this.formRef}
              onFinish={this.updateInfoAndNavigate}
              scrollToFirstError
            >
              <Row justify="center" className="mb-100">
                <Col md={14}>
                  <p className="payment-label">Payment Date</p>
                  <div className="select-label">
                    <label>The</label>
                    <Form.Item
                      className="custom-date"
                      rules={[{ required: true }]}
                      name="paymentWithdrawlDate"
                    >
                      <Select virtual={false} placeholder="Date" size="large">
                        {Object.keys(WITHDRAW_DATES).map((key) => {
                          return (
                            <Option key={key + WITHDRAW_DATES[key]} value={key}>
                              {WITHDRAW_DATES[key]}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <label>of each month.</label>
                  </div>
                </Col>
              </Row>

              <NavigationButtons progressPercent={60} loading={loading} />
            </Form>
          </div>
        </CardWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
    paymentInfo: state.app.paymentInfo,
    app: state.app,
    loading: state.layout.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        startSaveApplication: (payload: SavePayload) =>
          StartSaveApplication({
            app: payload.app,
            path: payload.path,
            history: payload.history,
          }),
        updatePaymentInfo: (paymentInfo) => UpdatePaymentInfo(paymentInfo),
      },
      dispatch
    ),
  };
};

export const PaymentSelectDatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSelectDatePageClass);
