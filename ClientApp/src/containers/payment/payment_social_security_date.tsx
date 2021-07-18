import { Button, Col, Row } from "antd";
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
  SSDDate,
} from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { QuestionList } from "../../utilities/questions";
import { isMobileDevice } from "../../utilities/responsive";
import _ from "lodash";
import { LeadFlow } from "../../actions/nav_actions";

interface Props extends RouteComponentProps {
  updatePaymentInfo: (paymentinfo: PaymentInfoDto) => void;
  startSaveApplication: (payload: SavePayload) => void;
  flow: LeadFlow;
  app: ApplicationDto;
  loading: boolean;
}

class PaymentSocialSecurityDatePageClass extends React.Component<Props, any> {
  componentDidMount() {
    const { updatePaymentInfo, app } = this.props;
    const updatedPaymentInfo = {
      ...app.paymentInfo,
      socialSecurityWithdrawDate: SSDDate.FirststDOM,
    };
    updatePaymentInfo(updatedPaymentInfo);
  }

  updateInfoAndNavigate = (date: SSDDate) => {
    const { history, flow, updatePaymentInfo, startSaveApplication, app } =
      this.props;
    const updatedApp = _.cloneDeep(app);
    const updatedPaymentInfo = {
      ...updatedApp.paymentInfo,
      socialSecurityWithdrawDate: date,
    };
    updatedApp.paymentInfo = updatedPaymentInfo;
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
    const { history } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={
                QuestionList.PaymentQuestions.PaymentSocialSecurityDate.Title
              }
              questionText={
                QuestionList.PaymentQuestions.PaymentSocialSecurityDate.Text
              }
              height={isMobileDevice() ? 100 : 200}
            />
            <Row justify="end" gutter={[10, 10]}>
              <Col md={12} xs={24} className="ant-col-flex-center">
                <Button
                  className="ant-btn-wide"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateInfoAndNavigate(SSDDate.FirststDOM);
                  }}
                >
                  1st day of the Month
                </Button>
              </Col>
              <Col md={12} xs={24} className="ant-col-flex-center">
                <Button
                  className="ant-btn-wide"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateInfoAndNavigate(SSDDate.ThirdDOM);
                  }}
                >
                  3rd day of the Month
                </Button>
              </Col>
              <Col md={12} xs={24} className="ant-col-flex-center">
                <Button
                  className="ant-btn-wide"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateInfoAndNavigate(SSDDate.SecondW);
                  }}
                >
                  2nd Wednesday
                </Button>
              </Col>
              <Col md={12} xs={24} className="ant-col-flex-center">
                <Button
                  className="ant-btn-wide"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateInfoAndNavigate(SSDDate.ThirdDOM);
                  }}
                >
                  3rd Wednesday
                </Button>
              </Col>
              <Col md={12} xs={24} className="ant-col-flex-center">
                <Button
                  className="ant-btn-wide"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    this.updateInfoAndNavigate(SSDDate.ForthW);
                  }}
                >
                  4th Wednesday
                </Button>
              </Col>
            </Row>
            <NavigationButtons
              progressPercent={60}
              hideNext
              loading={this.props.loading}
              navigate={() => {}}
            />
          </div>
        </CardWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
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

export const PaymentSocialSecurityDatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSocialSecurityDatePageClass);
