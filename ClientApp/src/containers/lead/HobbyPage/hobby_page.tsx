import React from "react";
import { GlobalState } from "../../../reducers/root_reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../../nav/routes";
import { QuestionList } from "../../../utilities/questions";
import { QuestionDisplay } from "../../../components/question_display";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { navigate } from "../../../utilities/navigation_util";
import { Col, Form, FormInstance, Input, Row } from "antd";
import { LeadFlow } from "../../../actions/nav_actions";
import _ from "lodash";
import { LeadDTO } from "../../../clients/api.generated.clients";
import { customBindActionCreators } from "../../../utilities/helper";
import { UpdateLeadInfo } from "../../../actions/lead_actions";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import "./hobby_page.css";

interface Props extends RouteComponentProps {
  flow: LeadFlow;
  leadInfo: LeadDTO;
  updateLeadInfo: (leadInfo) => void;
}

interface State {}

interface FormState {
  hobby: string;
}

export class HobbyClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();
  navigate = (values: FormState) => {
    const { flow, history, updateLeadInfo, leadInfo } = this.props;

    const updatedLead = _.cloneDeep(leadInfo);
    updatedLead.hobby = values.hobby;
    updateLeadInfo(updatedLead);

    if (flow == LeadFlow.A) {
      navigate(history, navRoutes.Quote.FirstName.path);
    } else if (flow == LeadFlow.B) {
      /* navigate(history, navRoutes.Quote.FirstName.path);*/
    } else if (flow == LeadFlow.C) {
      /*  navigate(history, navRoutes.Quote.FirstName.path);*/
    } else if (flow == LeadFlow.D) {
      /*  navigate(history, navRoutes.Quote.FirstName.path);*/
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Quote.FirstName.path);
    } else {
      navigate(history, navRoutes.Quote.FirstName.path);
    }
  };

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      hobby: this.props.leadInfo.hobby,
    });
  }

  render() {
    return (
      <CardWrapper>
        <div className="d-flex flex-column justify-between h-100">
          <QuestionDisplay
            questionTitle={QuestionList.LeadQuestions.Hobby.Title}
            questionText={QuestionList.LeadQuestions.Hobby.Text}
          />
          <Form
            className="hobby-page"
            layout="vertical"
            ref={this.formRef}
            onFinish={this.navigate}
            scrollToFirstError
          >
            <Row justify="center" className="mb-70">
                        <Col style={{ fontFamily: "Arial" }} md={8} xs={20}>
                <Form.Item
                  label="Favorite Hobby"
                  name="hobby"
                  rules={[{ required: true }]}
                  required
                >
                  <Input size="large" placeholder="Hobby" />
                </Form.Item>
              </Col>
            </Row>
            <NavigationButtons progressPercent={62.5} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateLeadInfo: (leadInfo) => UpdateLeadInfo(leadInfo),
      },
      dispatch
    ),
  };
};

export const HobbyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HobbyClass);
