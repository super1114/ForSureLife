import { Col, DatePicker, Form, FormInstance, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from "../../components/Nav_Buttons/nav_buttons";
import { QuestionDisplay } from "../../components/question_display";
import { navRoutes } from "../../nav/routes";
import { GlobalState } from "../../reducers/root_reducer";
import { customBindActionCreators } from "../../utilities/helper";
import { navigate } from "../../utilities/navigation_util";
import { QuestionList } from "../../utilities/questions";
import { CardWrapper } from "../../components/Card-wrapper/card_wrapper";
import {
  ApplicationInfoDto,
  LeadDTO,
  QuoteDto,
} from "../../clients/api.generated.clients";
import { UpdateApplicationInfo } from "../../actions/application_actions";
import _ from "lodash";
import { validateAge } from "../../utilities/validator";
import { isMobileDevice } from "../../utilities/responsive";
import moment from "moment";

interface Props extends RouteComponentProps {
  updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
  applicationInfo: ApplicationInfoDto;
  leadInfo: LeadDTO;
  quote: QuoteDto;
}

interface State {}

interface FormState {
  dateOfBirth: string;
}

class PolicyBirthdayClass extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateAndNavigate = (values: FormState) => {
    console.log(values);
    const { history, updateApplicationInfo, applicationInfo } = this.props;
    const updatedAppInfo: ApplicationInfoDto = _.cloneDeep(applicationInfo);
    updatedAppInfo.dob = new Date(values.dateOfBirth).toJSON();
    updateApplicationInfo(updatedAppInfo);
    navigate(history, navRoutes.Policy.PolicyState.path);
  };

  render() {
    const { quote } = this.props;
    return (
      <div>
        <CardWrapper>
          <div className="d-flex justify-between flex-column h-100">
            <div style={{ textAlign: isMobileDevice() ? "center" : "left" }}>
              <QuestionDisplay
                questionTitle={
                  QuestionList.PolicyQuestions.PolicyBirthday.Title
                }
                questionSubtext={
                  QuestionList.PolicyQuestions.PolicyBirthday.Text
                }
                height={isMobileDevice() ? 180 : 150}
              />
            </div>
            <Form
              layout="vertical"
              ref={this.formRef}
              onFinish={this.updateAndNavigate}
              scrollToFirstError
            >
              <Row
                justify="center"
                style={{ marginBottom: isMobileDevice() ? "80px" : "100px" }}
              >
                <Col md={8} xs={20}>
                  <Form.Item
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        validator: validateAge,
                        validateTrigger: "onBlur",
                      },
                    ]}
                    label="Birth date"
                    required
                  >
                    <DatePicker
                      style={{ borderRadius: 7, width: 250 }}
                      size="large"
                      format="MM/DD/YYYY"
                      defaultPickerValue={moment(
                        `01/01/${+moment().format("YYYY") - quote.age}`,
                        "MM/DD/YYYY"
                      )}
                      suffixIcon={null}
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
    leadInfo: state.app.leadInfo,
    quote: state.quote,
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

export const PolicyBirthPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyBirthdayClass);
