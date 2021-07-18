import React from "react";
import { GlobalState } from "../../reducers/root_reducer";
import { connect } from "react-redux";
import { QuestionDisplay } from "../../components/question_display";
import { QuestionList } from "../../utilities/questions";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../nav/routes";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { navigate } from "../../utilities/navigation_util";
import { Row, Col, Input, Form, FormInstance } from "antd";
import { ApplicationInfoDto } from "../../clients/api.generated.clients";
import { LeadFlow } from "../../actions/nav_actions";
import { UpdateApplicationInfo } from "../../actions/application_actions";
import { customBindActionCreators } from "../../utilities/helper";
import _ from "lodash";
import {
  validateHeight,
  validateHeightInches,
} from "../../utilities/validator";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";

interface Props extends RouteComponentProps {
  flow: LeadFlow;
  applicationInfo: ApplicationInfoDto;
  updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
}

interface State {}

interface FormState {
  heightFt: string;
  heightIn: string;
}

export class HeightPageClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();

  navigate = (values: FormState) => {
    const { flow, history, applicationInfo, updateApplicationInfo } =
      this.props;

    const updatedAppInfo: ApplicationInfoDto = _.cloneDeep(applicationInfo);
    updatedAppInfo.heightFt = Number(values.heightFt);
    updatedAppInfo.heightIn = Number(values.heightIn);
    updateApplicationInfo(updatedAppInfo);
    if (flow == LeadFlow.A) {
      /* navigate(history, navRoutes.Quote.Weight.path);*/
    } else if (flow == LeadFlow.B) {
      navigate(history, navRoutes.Quote.Weight.path);
    } else if (flow == LeadFlow.C) {
      navigate(history, navRoutes.Quote.Weight.path);
    } else if (flow == LeadFlow.D) {
      navigate(history, navRoutes.Quote.Weight.path);
    } else if (flow == LeadFlow.E) {
      navigate(history, navRoutes.Quote.Weight.path);
    } else {
      navigate(history, navRoutes.Quote.Weight.path);
    }
  };

  componentDidMount() {
    const { applicationInfo } = this.props;
    this.formRef.current.setFieldsValue({
      heightFt:
        applicationInfo.heightFt === null
          ? ""
          : applicationInfo.heightFt.toString(),
      heightIn:
        applicationInfo.heightIn === null
          ? ""
          : applicationInfo.heightIn.toString(),
    });
  }

  render() {
    return (
      <CardWrapper>
        <div className="d-flex justify-between flex-column h-100">
          <QuestionDisplay
            questionTitle={QuestionList.LeadQuestions.Height.Title}
            questionText={QuestionList.LeadQuestions.Height.Text}
          />
          <Form
            layout="vertical"
            ref={this.formRef}
            onFinish={this.navigate}
            scrollToFirstError
          >
            <Row gutter={[16, 16]} justify="center" className="mb-70">
              <Col md={4} xs={24}>
                <Form.Item
                                className="label"
                                rules={[{ required: true, validator: validateHeight }]}
                                required
                                label="Height Ft."
                                name="heightFt"
                                style={{lineHeight: "2.5"}}
                >
                  <Input
                    className="custom-input-field"
                    type="tel"
                    size="large"
                    placeholder="Feet"
                    suffix="ft."
                  />
                </Form.Item>
              </Col>
              <Col  md={4} xs={24}>
                <Form.Item
                  className="label"
                  rules={[{ required: true, validator: validateHeightInches }]}
                  required
                                label="Height In."
                                style={{ lineHeight: "2.5" }}
                  name="heightIn"
                >
                  <Input
                    className="custom-input-field"
                    type="tel"
                    size="large"
                    placeholder="Inches"
                    suffix="in."
                  />
                </Form.Item>
              </Col>
            </Row>
            <NavigationButtons progressPercent={90} />
          </Form>
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    flow: state.navigation.leadFlow,
    applicationInfo: state.app.applicationInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...customBindActionCreators(
      {
        updateApplicationInfo: (appInfoDto: ApplicationInfoDto) =>
          UpdateApplicationInfo(appInfoDto),
      },
      dispatch
    ),
  };
};
export const HeightPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeightPageClass);
