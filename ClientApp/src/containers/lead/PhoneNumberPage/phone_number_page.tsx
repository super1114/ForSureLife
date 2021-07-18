import React from "react";
import { GlobalState } from "../../../reducers/root_reducer";
import { connect } from "react-redux";
import { QuestionList } from "../../../utilities/questions";
import { QuestionDisplay } from "../../../components/question_display";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../../nav/routes";
import { navigate } from "../../../utilities/navigation_util";
import MaskedInput from "antd-mask-input";
import { Row, Col, FormInstance, Form } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { LeadFlow } from "../../../actions/nav_actions";
import {
  ApplicationDto,
  LeadDTO,
} from "../../../clients/api.generated.clients";
import _ from "lodash";
import { customBindActionCreators } from "../../../utilities/helper";
import { UpdateLeadInfo } from "../../../actions/lead_actions";
import {
  SavePayload,
  StartSaveApplication,
} from "../../../actions/application_actions";
import { validatePhone } from "../../../utilities/validator";
import ReactPixel from "react-facebook-pixel";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import "./phone_number_page.css";

interface Props extends RouteComponentProps {
  leadInfo: LeadDTO;
  flow: LeadFlow;
  app: ApplicationDto;
  startSaveApplication: (payload: SavePayload) => void;
  updateLeadInfo: (leadInfo) => void;
  loading: boolean;
}

interface State {}

interface FormState {
  phone: string;
}

export class PhoneNumberClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      phone: this.props.leadInfo.phone,
    });
  }

  navigate = (values: FormState) => {
    const {
      flow,
      history,
      app,
      leadInfo,
      startSaveApplication,
      updateLeadInfo,
    } = this.props;
    const updatedApp = _.cloneDeep(app);
    const updatedLeadInfo = _.cloneDeep(leadInfo);
    updatedApp.leadInfo.phone = values.phone;
    updatedLeadInfo.phone = values.phone;
    let nextRoute = navRoutes.Health.HealthLanding.path;

    if (flow == LeadFlow.A) {
      nextRoute = navRoutes.Quote.AgentContact.path;
    } else if (flow == LeadFlow.B) {
      nextRoute = navRoutes.Knockout.Hospitilized.path;
    } else if (flow == LeadFlow.C) {
      nextRoute = navRoutes.Policy.PolicyDoctor.path;
    } else if (flow == LeadFlow.D) {
      nextRoute = navRoutes.Knockout.Hospitilized.path;
    } else if (flow == LeadFlow.E) {
      nextRoute = navRoutes.Policy.PolicyEmail.path;
    } else {
      nextRoute = navRoutes.Knockout.Hospitilized.path;
    }
    startSaveApplication({ app: updatedApp, history, path: nextRoute });

    ReactPixel.init("518791495779783");
    ReactPixel.track("Lead");

    ReactPixel.init("518791495779783");
    ReactPixel.track("Lead");

    updateLeadInfo(updatedLeadInfo);
    navigate(history, nextRoute);
  };

  render() {
    return (
      <CardWrapper>
        <div className="d-flex justify-between flex-column h-100">
          <QuestionDisplay
            questionTitle={QuestionList.LeadQuestions.PhoneNumber.Title}
            questionText={QuestionList.LeadQuestions.PhoneNumber.Text}
          />
          <Form
            className="phone-number-page"
            layout="vertical"
            ref={this.formRef}
            onFinish={this.navigate}
            scrollToFirstError
          >
            <Row justify="center" className="mb-70">
                        <Col style={{ fontFamily: "Arial" }} md={8} xs={20}>
                <Form.Item
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      validator: validatePhone,
                      validateTrigger: "onBlur",
                    },
                  ]}
                  name="phone"
                  label="Phone Number"
                  required
                >
                  <MaskedInput
                    type="tel"
                    size="large"
                    prefix={<PhoneOutlined />}
                    mask="111-111-1111"
                    placeholder="123-456-7891"
                  />
                </Form.Item>
              </Col>
            </Row>
            <NavigationButtons
              progressPercent={85}
              loading={this.props.loading}
            />
          </Form>
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
    app: state.app,
    leadInfo: state.app.leadInfo,
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
        updateLeadInfo: (leadInfo) => UpdateLeadInfo(leadInfo),
      },
      dispatch
    ),
  };
};

export const PhoneNumberPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumberClass);
