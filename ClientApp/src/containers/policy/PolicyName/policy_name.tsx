import { Col, Form, FormInstance, Input, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../../components/question_display";
import { navRoutes } from "../../../nav/routes";
import { GlobalState } from "../../../reducers/root_reducer";
import { customBindActionCreators } from "../../../utilities/helper";
import { QuestionList } from "../../../utilities/questions";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import {
  ApplicationDto,
  ApplicationInfoDto,
} from "../../../clients/api.generated.clients";
import {
  SavePayload,
  StartSaveApplication,
  UpdateApplicationInfo,
} from "../../../actions/application_actions";
import { isMobileDevice } from "../../../utilities/responsive";
import { LeadFlow } from "../../../actions/nav_actions";
import "./policy_name.css";

interface Props extends RouteComponentProps {
  updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
  applicationInfo: ApplicationInfoDto;
  app: ApplicationDto;
  flow: LeadFlow;
  startSaveApplication: (savePayload: SavePayload) => void;
}

interface State {}

interface FormState {
  firstName: string;
  lastName: string;
  middleInitial: string;
}

class PolicyNameClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { applicationInfo } = this.props;
    this.formRef.current.setFieldsValue({
      firstName: applicationInfo.firstName,
      lastName: applicationInfo.lastName,
      middleInitial: applicationInfo.middleName,
    });
  }

  updateAndNavigate = (values: FormState) => {
    const {
      history,
      applicationInfo,
      updateApplicationInfo,
      flow,
      startSaveApplication,
      app,
    } = this.props;
    /*const updatedAppInfo: ApplicationInfoDto = _.cloneDeep(applicationInfo);*/
    app.applicationInfo.firstName = values.firstName;
    app.leadInfo.firstName = values.firstName;
    app.applicationInfo.lastName = values.lastName;
    app.applicationInfo.middleName = values.middleInitial;

    if (flow == LeadFlow.A) {
      startSaveApplication({
        app,
        history,
        path: navRoutes.Policy.PolicyEmail.path,
      });
    } else if (flow == LeadFlow.B) {
      startSaveApplication({
        app,
        history,
        path: navRoutes.Policy.PolicyEmail.path,
      });
    } else if (flow == LeadFlow.C) {
      startSaveApplication({
        app,
        history,
        path: navRoutes.Policy.PolicyEmail.path,
      });
    } else if (flow == LeadFlow.D) {
      startSaveApplication({
        app,
        history,
        path: navRoutes.Policy.PolicyEmail.path,
      });
    } else if (flow == LeadFlow.E) {
      startSaveApplication({
        app,
        history,
        path: navRoutes.Payment.PaymentDate.path,
      });
    }
  };

  render() {
    const { history, app } = this.props;

    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <div style={{ textAlign: isMobileDevice() ? "center" : "left" }}>
              <QuestionDisplay
                questionTitle={QuestionList.PolicyQuestions.PolicyFullname.FunctionTitle(
                  app.leadInfo.firstName
                )}
                questionText={QuestionList.PolicyQuestions.PolicyFullname.Text}
                height={isMobileDevice() ? 150 : 200}
              />
            </div>
            <Form
              className="policy-name-form"
              layout="vertical"
              ref={this.formRef}
              onFinish={this.updateAndNavigate}
              scrollToFirstError
            >
              <Row
                gutter={[30, 0]}
                style={{ marginBottom: isMobileDevice() ? 0 : "100px" }}
                className="fullname-field"
              >
                <Col md={8} xs={20} xxl={6}>
                  <Form.Item
                    rules={[{ required: true }]}
                    name="firstName"
                    label="First Name"
                    required
                  >
                    <Input size="large" placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col md={8} xs={20} xxl={6}>
                  <Form.Item      
                    name="middleInitial"
                                    label="Middle Initial"
                                    required
                  >
                    <Input size="large" placeholder="Middle Initial" />
                  </Form.Item>
                </Col>
                <Col md={8} xs={20} xxl={6}>
                  <Form.Item
                    rules={[{ required: true }]}
                    name="lastName"
                    label="Last Name"
                    required
                  >
                    <Input size="large" placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <NavigationButtons nextText="Continue" progressPercent={24} />
            </Form>
          </div>
        </CardWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    applicationInfo: state.app.applicationInfo,
    flow: state.navigation.leadFlow,
    app: state.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateApplicationInfo: (appInfoDto: ApplicationInfoDto) =>
          UpdateApplicationInfo(appInfoDto),
        startSaveApplication: (savePayload: SavePayload) =>
          StartSaveApplication(savePayload),
      },
      dispatch
    ),
  };
};

export const PolicyNamePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyNameClass);
