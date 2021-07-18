import { Row, Col, Button, Input, Select, Tooltip, Form, FormInstance } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';
import { CloseOutlined, PlusCircleFilled } from '@ant-design/icons';
import { ApplicationDto, BeneficiaryDto, Relationship } from '../../clients/api.generated.clients';
import { EmptyObjects } from '../../utilities/empty_objects';
import _ from 'lodash';
import { Colors } from '../../styles/colors';
import { UpdateContingentBeneficiaries } from '../../actions/beneficiary_actions';
import { FormListFieldData } from 'antd/lib/form/FormList';
import { SavePayload, StartSaveApplication } from '../../actions/application_actions';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

interface Props extends RouteComponentProps {
    updateContingentBeneficiaries: (beneficiaries: BeneficiaryDto[]) => void;
    startSaveApplication: (savePayload: SavePayload) => void;
    initialContingentBeneficiaries: BeneficiaryDto[];
    saveApp?: boolean;
    app: ApplicationDto;
    loading?: boolean;
}

interface State {
}

interface FormState { beneficiaries: FormStateBeneficiary[] };
interface FormStateBeneficiary {
    name: "",
    relationship: "",
    percentage: ""
}

class ContingentBeneficiaryFormPageClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const { initialContingentBeneficiaries } = this.props;
        this.formRef.current.setFieldsValue({
            beneficiaries: initialContingentBeneficiaries.length === 0
                ? []
                : initialContingentBeneficiaries.map(b => {
                    return {
                        name: b.personalInfo.firstName,
                        relationship: b.relationship,
                        percentage: b.percentage.toString()
                    } as FormStateBeneficiary
                }
                )
        });
    }

    renderBeneficiary = (field: FormListFieldData, index: number, remove: (index: number | number[]) => void, length: number) => {
        return (
            <Row key={field.fieldKey} style={{ marginTop: 24 }} gutter={[16, 16]} justify="center" align="stretch">
                <Col md={7} xs={24}>
                    <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        validateTrigger={['onChange', 'onBlur']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                whitespace: true
                            }
                        ]}>
                        <Input placeholder="Name" type="text" size="large" />
                    </Form.Item>

                </Col>
                <Col md={7} xs={24}>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                            prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                        }
                    >
                        {() => (
                            <Form.Item
                                {...field}
                                label="Relationship"
                                name={[field.name, 'relationship']}
                                fieldKey={[field.fieldKey, 'relationship']}
                                rules={[{ required: true }]}
                            >
                                <Select virtual={false} placeholder="Relationship" size="large" style={{ width: '100%' }}>
                                    <Option key={Relationship.Child} value={"Child"}>{`Child`}</Option>
                                    <Option key={Relationship.Spouse} value={"Spouse"}>{`Spouse`}</Option>
                                    <Option key={Relationship.Mother} value={"Mother"}>{`Mother`}</Option>
                                    <Option key={Relationship.Father} value={"Father"}>{`Father`}</Option>
                                    <Option key={Relationship.Relative} value={"Relative"}>{`Relative`}</Option>
                                    <Option key={Relationship.Other} value={"Other"}>{`Other`}</Option>
                                </Select>
                            </Form.Item>
                        )}
                    </Form.Item>
                </Col>
                <Col md={7} xs={24}>
                    <Form.Item
                        {...field}
                        name={[field.name, 'percentage']}
                        fieldKey={[field.fieldKey, 'percentage']}
                        validateTrigger={['onChange', 'onBlur']}
                        label="Percentage"
                        rules={[
                            {
                                required: true
                            }
                        ]}>
                        <Input type="tel" size="large" placeholder="Percentage" suffix="%" />
                    </Form.Item>

                </Col>
                {
                    <Col style={{ display: 'flex', justifyContent: "center" }} md={3} xs={24}>
                        <Tooltip placement="topLeft" title="Remove Beneficiary">
                            <Button onClick={() => {
                                this.removeBeneficiary(index);
                            }} size="small" style={{ minWidth: "initial", marginTop: 30 }} type="primary" shape="circle" icon={<CloseOutlined />} />
                        </Tooltip>
                    </Col>
                }
            </Row>
        )
    }

    removeBeneficiary = (index: number) => {
        const currentBeneficiaryForm: FormState = this.formRef.current.getFieldsValue(["beneficiaries"]);
        currentBeneficiaryForm.beneficiaries.splice(index, 1);
        const equalPercent = Number((100.0 / currentBeneficiaryForm.beneficiaries.length));
        const arr = [];
        for (var i = 0; i < currentBeneficiaryForm.beneficiaries.length; i++) {
            arr.push(equalPercent);
        }
        this.formRef.current.setFieldsValue({
            beneficiaries: currentBeneficiaryForm.beneficiaries.map((b, i) => { return { ...b, percentage: this.wholeRound(arr, 100)[i] } })
        });
    }

    addBeneficiary = () => {
        const currentBeneficiaryForm: FormState = this.formRef.current.getFieldsValue(["beneficiaries"]);
        const addBeneficiaryForm = [...currentBeneficiaryForm.beneficiaries, { name: "", relationship: "", percentage: 0 }];
        const equalPercent = Number((100.0 / addBeneficiaryForm.length));
        const arr = [];
        for (var i = 0; i < addBeneficiaryForm.length; i++) {
            arr.push(equalPercent);
        }
        this.formRef.current.setFieldsValue({
            beneficiaries: addBeneficiaryForm.map((b, i) => { return { ...b, percentage: this.wholeRound(arr, 100)[i] } })
        });
    }

    wholeRound = (l, target) => {
        var off = target - _.reduce(l, function (acc, x) { return acc + Math.round(x) }, 0);
        return _.chain(l).
            sortBy(function (x) { return Math.round(x) - x }).
            map(function (x, i) { return Math.round(x) + Number(off > i) - Number(i >= (l.length + off)) }).
            value();
    }

    navigate = (values: FormState) => {
        const { history, updateContingentBeneficiaries, app, startSaveApplication, saveApp } = this.props;
        const arrBeneficiaries: BeneficiaryDto[] = values.beneficiaries.map(b => {
            const beneficiaryId = uuidv4();
            const familyMemberId = uuidv4();

            let newBeneficiary: BeneficiaryDto = { ..._.cloneDeep(EmptyObjects.EmptyBeneficiaryDto) };
            newBeneficiary.beneficiaryId = beneficiaryId;
            newBeneficiary.personalInfo.familyMemberId = familyMemberId;
            return {
                ...newBeneficiary, relationship: b.relationship, percentage: Number(b.percentage), personalInfo: {
                    ...newBeneficiary.personalInfo,
                    firstName: b.name

                }
            };
        });

        const updatedApp = _.cloneDeep(app);
        if (saveApp) {
            startSaveApplication({ app: { ...updatedApp, contingentBeneficiaries: arrBeneficiaries }, history, path: navRoutes.Review.ReviewMenuOther.path })
        } else {
            updateContingentBeneficiaries([...arrBeneficiaries]);
            navigate(history, navRoutes.Beneficiary.BeneficiaryReview.path);
        }
    }

    render() {
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.BeneficiaryQuestions.ContingentBeneficiaryForm.Title}
                        questionText={QuestionList.BeneficiaryQuestions.ContingentBeneficiaryForm.Text}
                    />
                    <Form ref={this.formRef}
                        onFinish={this.navigate}
                        layout="vertical"
                        scrollToFirstError name="beneficiaries_form"
                    >
                        <Form.List rules={[
                            {
                                validator: async (_, values) => {
                                    const percentage = (values as Array<FormStateBeneficiary>).reduce((r, a) => {
                                        return r + Number(a["percentage"]);
                                    }, 0);
                                    if (percentage !== 100 && values.length > 0) {
                                        return Promise.reject(new Error('The total percentage for your contingent beneficiaries must equal 100%'));
                                    }
                                },
                            },
                        ]} name="beneficiaries">
                            {(fields, { add, remove }, { errors }) => {

                                return (
                                    <>
                                        {fields.map((field, index) => {
                                            {

                                                return <div key={field.fieldKey}>{this.renderBeneficiary(field, index, remove, fields.length)}</div>
                                            }
                                        })}
                                        {
                                            fields.length < 8 ? <Row style={{ marginTop: 30 }} justify="center">
                                                <Col>
                                                    <Button style={{ display: "flex", alignItems: 'center', padding: 25 }} size="large" onClick={() => { this.addBeneficiary() }} icon={<PlusCircleFilled style={{ fontSize: 30, color: Colors.primary }} />} type="text">Add Contingent Beneficiary</Button>
                                                </Col>
                                            </Row> : undefined
                                        }
                                        <Row justify="center">
                                            <Col>
                                                <Form.ErrorList errors={errors} />
                                            </Col>
                                        </Row>

                                    </>
                                )
                            }
                            }

                        </Form.List>

                        <NavigationButtons
                            progressPercent={50}
                            nextText="Submit"
                            loading={this.props.loading}
                        />
                    </Form>
                </CardWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        app: state.app,
        initialContingentBeneficiaries: state.app.contingentBeneficiaries,
        loading: state.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateContingentBeneficiaries: (beneficiaries: BeneficiaryDto[]) => UpdateContingentBeneficiaries(beneficiaries),
            startSaveApplication: (savePayload: SavePayload) => StartSaveApplication(savePayload)
        }, dispatch)

    }
}

export const ContingentBeneficiaryFormPage = connect(mapStateToProps, mapDispatchToProps)(ContingentBeneficiaryFormPageClass);
