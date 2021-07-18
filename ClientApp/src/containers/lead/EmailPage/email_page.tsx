import React from "react";
import { GlobalState } from "../../../reducers/root_reducer";
import { connect } from "react-redux";
import { QuestionDisplay } from "../../../components/question_display";
import { QuestionList } from "../../../utilities/questions";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../../nav/routes";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { Row, Col, Input, Form, FormInstance } from "antd";
import {
  ApplicationDto,
  LeadDTO,
} from "../../../clients/api.generated.clients";
import { LeadFlow } from "../../../actions/nav_actions";
import { MailOutlined } from "@ant-design/icons";
import { customBindActionCreators } from "../../../utilities/helper";
import { UpdateLeadInfo } from "../../../actions/lead_actions";
import _ from "lodash";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import {
  SavePayload,
  StartSaveApplication,
} from "../../../actions/application_actions";
import "./email_page.css";
interface Props extends RouteComponentProps {
  flow: LeadFlow;
  leadInfo: LeadDTO;
  updateLeadInfo: (leadInfo) => void;
  app: ApplicationDto;
  startSaveApplication: (payload: SavePayload) => void;
}

interface State {
  email: string;
}

interface FormState {
  email: string;
}

export class EmailPageClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //initialize from app
    this.formRef.current.setFieldsValue({
      email: this.props.leadInfo.email,
    });
  }

  onSuccessSubmit = (values: FormState) => {
    // success call back when all required fields are present
    const { flow, history, app, updateLeadInfo, startSaveApplication } =
      this.props;
    const updatedLead = _.cloneDeep(app);
    updatedLead.leadInfo.email = values.email;

    let nextRoute = navRoutes.Payment.PaymentDate.path;
    console.log(this.props);
    if (flow == LeadFlow.A) {
      /* navigate(history, navRoutes.Quote.PhoneNumber.path);*/
    } else if (flow == LeadFlow.B) {
      nextRoute = navRoutes.Policy.PolicyDoctor.path;
    } else if (flow == LeadFlow.C) {
      nextRoute = navRoutes.Policy.PolicyHomeAddress.path;
    } else if (flow == LeadFlow.D) {
      nextRoute = navRoutes.Policy.PolicyDoctor.path;
    } else if (flow == LeadFlow.E) {
      updatedLead.leadInfo.leadCompleted = true;
      nextRoute = navRoutes.Quote.Height.path;
    } else {
      nextRoute = navRoutes.Policy.PolicyDoctor.path;
    }
    updateLeadInfo(updatedLead.leadInfo);
    // startSaveApplication({
    //   app: updatedLead,
    //   history,
    //   path: nextRoute,
    // } as SavePayload);
  };

  render() {
    return (
      <div>
        <CardWrapper>
          <div className="d-flex flex-column justify-between h-100">
            <Form
              className="email-page-form"
              layout="vertical"
              ref={this.formRef}
              onFinish={this.onSuccessSubmit}
              scrollToFirstError
            >
              <QuestionDisplay
                questionTitle={QuestionList.LeadQuestions.Email.Title}
                questionText={QuestionList.LeadQuestions.Email.Text}
              />
              <Row justify="center" className="mb-70">
                <Col md={12} xs={20}>
                  <Form.Item name="email" label="Email Address" required>
                    <Input
                      type="email"
                      size="large"
                      placeholder="Email"
                      prefix={<MailOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <NavigationButtons progressPercent={50} />
            </Form>
          </div>
        </CardWrapper>
      </div>
    );
  }
}

const mapStateToProps = (props: GlobalState) => {
  return {
    flow: props.navigation.leadFlow,
    leadInfo: props.app.leadInfo,
    app: props.app,
    loading: props.layout.loading,
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

export const EmailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailPageClass);
