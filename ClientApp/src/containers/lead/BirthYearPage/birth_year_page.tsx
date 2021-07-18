import { Col, Form, FormInstance, Row, Select } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { UpdateLeadInfo } from '../../../actions/lead_actions';
import { LeadFlow } from '../../../actions/nav_actions';
import { ApplicationInfoDto, LeadDTO } from '../../../clients/api.generated.clients';
import { NavigationButtons } from '../../../components/Nav_Buttons/nav_buttons';
import { QuestionAnswerWrapper } from '../../../components/question_answer_display';
import { QuestionDisplay } from '../../../components/question_display';
import { navRoutes } from '../../../nav/routes';
import { GlobalState } from '../../../reducers/root_reducer';
import { customBindActionCreators } from '../../../utilities/helper';
import { navigate, previous } from '../../../utilities/navigation_util';
import { QuestionList } from '../../../utilities/questions';
import _ from "lodash";
import { UpdateApplicationInfo } from '../../../actions/application_actions';
import moment from 'moment';
import { VALID_AGES } from '../../../utilities/data';
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";
import "./birth_year_page.css";
const { Option } = Select;
interface Props extends RouteComponentProps {
  leadInfo: LeadDTO;
  flow: LeadFlow;
  appInfo: ApplicationInfoDto;
  updateLeadInfo: (leadInfo) => void;
  updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
}

interface FormState {
  birthYear: string;
}

class BirthPageClass extends React.Component<Props, any> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const birthYearFromApp =
      moment(this.props.leadInfo.dob).format("YYYY") !== moment().format("YYYY")
        ? moment().diff(this.props.leadInfo.dob, "years")
        : "";
    this.formRef.current.setFieldsValue({
      birthYear: birthYearFromApp,
    });
  }

    navigate = (values: FormState) => {
        const { flow, history, leadInfo, updateLeadInfo, appInfo, updateApplicationInfo } = this.props;

        const updatedLead = _.cloneDeep(leadInfo);
        const updatedAppInfo = _.cloneDeep(appInfo);
        const dob = new Date(moment.utc().subtract(values.birthYear, 'years').startOf('year').toString()).toJSON();
        // need to update app info so that age is calculated properly on rate calculation

        updatedLead.dob = dob;
        updatedAppInfo.dob = dob;
        updatedLead.leadSource = flow.toString();
        updatedLead.externalLeadId = document.getElementById("leadid_token").getAttribute("Value");
     //   alert("updatedLead " + updatedLead.externalLeadId);
        updateLeadInfo(updatedLead);
        updateApplicationInfo(updatedAppInfo);
        if (flow == LeadFlow.A) {
            navigate(history, navRoutes.Quote.CurrentCoverage.path);
        } else if (flow == LeadFlow.B) {
            navigate(history, navRoutes.Quote.CurrentCoverage.path);
        } else if (flow == LeadFlow.C) {
            navigate(history, navRoutes.Quote.CurrentCoverage.path);
        } else if (flow == LeadFlow.D) {
            navigate(history, navRoutes.Quote.CurrentCoverage.path);
        } else if (flow == LeadFlow.E) {
            navigate(history, navRoutes.Quote.CurrentCoverage.path);
        } else{
            navigate(history, navRoutes.Quote.CurrentCoverage.path);
        }

    }

  render() {
    return (
      <CardWrapper>
        <div className="d-flex justify-between flex-column h-100">
          <QuestionDisplay
            questionTitle={QuestionList.LeadQuestions.BirthYear.Title}
            questionText={QuestionList.LeadQuestions.BirthYear.Text}
          />
          <Form
            className="birth-year-page"
            layout="vertical"
            ref={this.formRef}
            onFinish={this.navigate}
            scrollToFirstError
          >
            <Row justify="center" className="mb-70">
                        <Col style={{ fontFamily: "Arial" }} md={8} xs={20}>
                <Form.Item
                  rules={[{ required: true }]}
                  name="birthYear"
                  label="Age"
                  required
                >
                  <Select virtual={false} placeholder="Age">
                    {VALID_AGES().map((age) => {
                      return (
                        <Option key={age} value={age}>
                          {age}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <NavigationButtons progressPercent={12.5} />
          </Form>
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    leadInfo: state.app.leadInfo,
    appInfo: state.app.applicationInfo,
    flow: state.navigation.leadFlow,
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

export const BirthPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BirthPageClass);
