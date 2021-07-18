import { AutoComplete, Col, Form, FormInstance, Input, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../../components/question_display";
import { navRoutes } from "../../../nav/routes";
import { GlobalState } from "../../../reducers/root_reducer";
import { customBindActionCreators } from "../../../utilities/helper";
import { navigate, previous } from "../../../utilities/navigation_util";
import { QuestionList } from "../../../utilities/questions";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import { ApplicationInfoDto } from "../../../clients/api.generated.clients";
import { UpdateApplicationInfo } from "../../../actions/application_actions";
import _ from "lodash";
import { STATE_OF_BIRTH } from "../../../utilities/data";
import "./policy_state.css";
import { isMobileDevice } from "../../../utilities/responsive";

interface Props extends RouteComponentProps {
  updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
  applicationInfo: ApplicationInfoDto;
}

interface State {}

interface FormState {
  state: string;
}

class PolicyStatedayClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateAndNavigate = (values: FormState) => {
    const { history, updateApplicationInfo, applicationInfo } = this.props;
    const updatedAppInfo: ApplicationInfoDto = _.cloneDeep(applicationInfo);
    updatedAppInfo.stateOfBirth = values.state;
    updateApplicationInfo(updatedAppInfo);
    navigate(history, navRoutes.Policy.PolicyFullname.path);
  };

  componentDidMount() {
    const { applicationInfo } = this.props;
    const state = applicationInfo.stateOfBirth;
    this.formRef.current.setFieldsValue({
      state,
    });
  }

  render() {
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <div style={{ textAlign: isMobileDevice() ? "center" : "left" }}>
              <QuestionDisplay
                questionTitle={QuestionList.PolicyQuestions.PolicyState.Title}
                questionText={QuestionList.PolicyQuestions.PolicyState.Text}
              />
            </div>
            <Form
              className="policy-state-form"
              layout="vertical"
              ref={this.formRef}
              onFinish={this.updateAndNavigate}
              scrollToFirstError
            >
              <Row
                justify="center"
                style={{ marginBottom: isMobileDevice() ? "80px" : "100px" }}
              >
                <Col md={12} xs={20} xxl={8}>
                  <Form.Item
                    rules={[{ required: true }]}
                    name="state"
                    label="Place of Birth"
                    help='ex. "California"'
                    required
                  >
                    <AutoComplete
                      size="large"
                      options={STATE_OF_BIRTH.map((sob) => {
                        return { value: sob };
                      })}
                      placeholder="Place of Birth"
                      filterOption={(inputValue, option) =>
                        option!.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <NavigationButtons nextText="Continue" progressPercent={16} />
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

export const PolicyStatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyStatedayClass);
