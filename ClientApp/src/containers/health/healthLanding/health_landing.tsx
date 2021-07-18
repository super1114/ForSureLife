import React from "react";
import { GlobalState } from "../../../reducers/root_reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../../nav/routes";
import { navigate } from "../../../utilities/navigation_util";
import { Button, Card, Col, Row, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { LeadFlow } from "../../../actions/nav_actions";
import { FlowFlags } from "typescript";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { PageWrapper } from "../../../components/page_wrapper";
import { QuestionDisplay } from "../../../components/question_display";
import { QuestionList } from "../../../utilities/questions";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import NortlonLogo from "../../../assets/norton-logo.svg";
import "./health_landing.css";
import { isMobileDevice } from "../../../utilities/responsive";

const { Text, Title } = Typography;

interface Props extends RouteComponentProps {
  flow: LeadFlow;
}

interface State {}

export class HealthLandingPageClass extends React.Component<Props, State> {
  navigate = () => {
    const { flow, history } = this.props;

    if (flow == LeadFlow.A) {
      navigate(history, navRoutes.Health.HeartHealth.path);
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Health.HeartHealth.path);
    } else if (flow == LeadFlow.C) {
      navigate(history, navRoutes.Health.HeartHealth.path);
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Health.HeartHealth.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Knockout.Hospitilized.path);
    } else {
      navigate(history, navRoutes.Health.HeartHealth.path);
    }
  };

  render() {
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <QuestionDisplay
              questionTitle={QuestionList.HealthQuestions.HealthLanding.Title}
              questionText={QuestionList.HealthQuestions.HealthLanding.Text}
            />
            <Row justify="center">
              <Col span={24} xl={20}>
                <Card className="custom-card-ui">
                  <Row align="middle">
                    <Col xl={16}>
                      <p>
                        Tip: All of your information is certified protected by
                        <strong> Norton Security</strong>, so you can rest
                        assured it's safe from Internet predators.
                      </p>
                    </Col>
                    <Col span={24} xl={{ span: 5, offset: 1 }} xs={{}}>
                      <div className="text-sm-center">
                        <img src={NortlonLogo} />
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <NavigationButtons
              nextText="Continue"
              hideProgress
              progressPercent={0}
              navigate={() => this.navigate()}
            />
          </div>
        </CardWrapper>
      </div>

      //<PageWrapper>
      //    <div style={{ padding: 0, textAlign: 'center', marginBottom: 0, marginTop: 100 }}>
      //        <Title style={{ color: "#4676E1" }}> YES! I would like to know if I qualify</Title>
      //        <div style={{ marginTop: 100 }}>
      //            <Text style={{ fontSize: 20, color: "#828282" }} strong>
      //                Some basic information is required to accurately generate your request.
      //                However, your information is kept private and is NOT sold, or shared with any
      //                third parties, marketing lists or vendors.</Text>
      //        </div>
      //        <div style={{ marginTop: 20 }}>
      //            <Text style={{ fontSize: 20, color: "#514A6F" }} strong>Hit start to verify your information then click "Submit" to process your request.</Text>
      //        </div>
      //    </div>
      //    <NavigationButtons
      //        nextText="Start" hideProgress navigate={() => { this.navigate() }} />
      //</PageWrapper>
    );
  }
}

const mapStateToProps = (props: GlobalState) => {
  return {
    flow: props.navigation.leadFlow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export const HealthLandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthLandingPageClass);
