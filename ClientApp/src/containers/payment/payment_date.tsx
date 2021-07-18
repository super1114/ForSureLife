import { Button, Col, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { PaymentInfoDto, SSDDate } from "../../clients/api.generated.clients";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";
import { isMobileDevice } from "../../utilities/responsive";

interface Props extends RouteComponentProps {
  updatePayment: (paymentinfo: PaymentInfoDto) => void;
}

class PaymentDatePageClass extends React.Component<Props, any> {
  social = () => {
    const { history, updatePayment } = this.props;
    navigate(history, navRoutes.Payment.PaymentSocialSecurityDate.path);
    //updateKnockoutQuestion({
    //    leadHealthQuestion: LeadHealthQuestions.Cancer,
    //    healthAnswer: true
    //});
  };

  pick = () => {
    const { history, updatePayment } = this.props;
    navigate(history, navRoutes.Payment.PaymentSelectDate.path);
    //updateKnockoutQuestion({
    //    leadHealthQuestion: LeadHealthQuestions.Cancer,
    //    healthAnswer: false
    //});
  };

  updateInfoAndNavigate = (paymentDate: SSDDate) => {
    const { history, updatePayment } = this.props;
    navigate(history, navRoutes.Payment.PaymentSelectDate.path);
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={QuestionList.PaymentQuestions.PaymentDate.Title}
              questionText={QuestionList.PaymentQuestions.PaymentDate.Text}
            />
            <Row gutter={[16, 16]} justify="center">
              <Col className="ant-col-flex-center" md={24} xs={24}>
                <Button
                  type="primary"
                  className=""
                  shape="round"
                  style={{
                    height: isMobileDevice() ? "auto" : "40px",
                    whiteSpace: isMobileDevice() ? "inherit" : "nowrap",
                    width: isMobileDevice() ? "100%" : "auto",
                  }}
                  size="large"
                  onClick={() => {
                    this.social();
                  }}
                >
                  Line it up up with my Social Security Deposit.
                </Button>
              </Col>
              <Col className="ant-col-flex-center" md={24} xs={24}>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  style={{ width: isMobileDevice() ? "100%" : "auto" }}
                  onClick={() => {
                    this.pick();
                  }}
                >
                  Let me choose my own date.
                </Button>
              </Col>
            </Row>
            <NavigationButtons
              progressPercent={60}
              hideNext
              navigate={() =>
                navigate(history, navRoutes.Knockout.MultipleCancer.path)
              }
            />
          </div>
        </CardWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators({}, dispatch),
  };
};

export const PaymentDatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDatePageClass);
