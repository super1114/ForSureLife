import React from "react";
import { GlobalState } from "../../../reducers/root_reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../../nav/routes";
import { QuestionList } from "../../../utilities/questions";
import { QuestionDisplay } from "../../../components/question_display";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { navigate } from "../../../utilities/navigation_util";
import { UserOutlined } from "@ant-design/icons";
import { Row, Col, Input, FormInstance, Form } from "antd";
import { LeadFlow } from "../../../actions/nav_actions";
import _ from "lodash";
import {
  ApplicationInfoDto,
  LeadDTO,
} from "../../../clients/api.generated.clients";
import { customBindActionCreators } from "../../../utilities/helper";
import { UpdateLeadInfo } from "../../../actions/lead_actions";
import { UpdateApplicationInfo } from "../../../actions/application_actions";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import "./first_name_page.css";
interface Props extends RouteComponentProps {
  leadInfo: LeadDTO;
  flow: LeadFlow;
  applicationInfo: ApplicationInfoDto;
  updateLeadInfo: (leadInfo) => void;
  updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
}

interface State {}

interface FormState {
  firstName: string;
}

export class FirstNameClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      firstName: this.props.leadInfo.firstName,
    });
  }

  navigate = (values: FormState) => {
    const {
      flow,
      history,
      leadInfo,
      updateLeadInfo,
      updateApplicationInfo,
      applicationInfo,
    } = this.props;

    const updatedLead = _.cloneDeep(leadInfo);
    const updatedApplicationInfo = _.cloneDeep(applicationInfo);
    updatedLead.firstName = values.firstName;
    updatedApplicationInfo.firstName = values.firstName;
    updateLeadInfo(updatedLead);
    updateApplicationInfo(updatedApplicationInfo);
    if (flow == LeadFlow.A) {
      navigate(history, navRoutes.Quote.HomeAddress.path);
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Quote.HomeAddress.path);
    } else if (flow == LeadFlow.C) {
      /*    navigate(history, navRoutes.Quote.HomeAddress.path);*/
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Quote.HomeAddress.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Quote.HomeAddress.path);
    } else {
      navigate(history, navRoutes.Quote.HomeAddress.path);
    }
  };

  render() {
    return (
      <CardWrapper>
        <div className="d-flex justify-between flex-column h-100">
          <QuestionDisplay
            questionTitle={QuestionList.LeadQuestions.FirstName.Title}
            questionText={QuestionList.LeadQuestions.FirstName.Text}
          />
          <Form
            className="first-name-page"
            layout="vertical"
            ref={this.formRef}
            onFinish={this.navigate}
            scrollToFirstError
          >
            <Row justify="center" className="mb-70">
                        <Col style={{ fontFamily: "Arial" }} md={8} xs={20}>
                <Form.Item
                  rules={[{ required: true }]}
                  name="firstName"
                  label="First Name"
                  required
                >
                  <Input
                    size="large"
                    placeholder="First Name"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>
            <NavigationButtons progressPercent={75} />
          </Form>
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
    leadInfo: state.app.leadInfo,
    applicationInfo: state.app.applicationInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateLeadInfo: (leadInfo) => UpdateLeadInfo(leadInfo),
        updateApplicationInfo: (appInfoDto: ApplicationInfoDto) =>
          UpdateApplicationInfo(appInfoDto),
      },
      dispatch
    ),
  };
};

export const FirstNamePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstNameClass);
