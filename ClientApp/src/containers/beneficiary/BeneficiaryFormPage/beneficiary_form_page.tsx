import { Row, Col, Button, Input, Select, Tooltip, Form, FormInstance, Typography } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../../components/question_display';
import { CardWrapper } from '../../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../../nav/routes';
import { GlobalState } from '../../../reducers/root_reducer';
import { customBindActionCreators } from '../../../utilities/helper';
import { navigate } from '../../../utilities/navigation_util';
import { QuestionList } from '../../../utilities/questions';
import {CaretDownOutlined, CloseOutlined, PlusCircleFilled} from '@ant-design/icons';
import { ApplicationDto, BeneficiaryDto, Relationship } from '../../../clients/api.generated.clients';
import { EmptyObjects } from '../../../utilities/empty_objects';
import _ from 'lodash';
import { Colors } from '../../../styles/colors';
import { UpdateBeneficiaries, UpdateContingentBeneficiaries } from '../../../actions/beneficiary_actions';
import { FormListFieldData } from 'antd/lib/form/FormList';
import { SavePayload, StartSaveApplication } from '../../../actions/application_actions';
import { v4 as uuidv4 } from 'uuid';
import "./beneficiary_form_page.css"
import {isMobileDevice} from "../../../utilities/responsive";
const { Text } = Typography;
const { Option } = Select;

interface Props extends RouteComponentProps {
    updateBeneficiaries: (beneficiaries: BeneficiaryDto[]) => void;
    startSaveApplication: (savePayload: SavePayload) => void;
    updateContingentBeneficiaries: (beneficiaries: BeneficiaryDto[]) => void;
    initialContingentBeneficiaries: BeneficiaryDto[];
    initialBeneficiaries: BeneficiaryDto[];
    saveApp?: boolean;
    app: ApplicationDto;
    loading?: boolean;
}

interface State {
}

interface FormState { beneficiaries: FormStateBeneficiary[], contingentBeneficiaries: FormStateBeneficiary[] };
interface FormStateBeneficiary {
    name: "",
    relationship: "",
    percentage: ""
}

class BeneficiaryFormPageClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const { initialBeneficiaries, initialContingentBeneficiaries } = this.props;
        this.formRef.current.setFieldsValue({
            beneficiaries: initialBeneficiaries.length === 0
                ? [{ name: "", relationship: "", percentage: 100 }]
                : initialBeneficiaries.map(b => {
                    return {
                        name: b.personalInfo.firstName,
                        relationship: b.relationship,
                        percentage: b.percentage.toString()
                    } as FormStateBeneficiary
                }
                ),
            contingentBeneficiaries: initialContingentBeneficiaries.length === 0
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
            <Row key={field.fieldKey} style={{ marginTop: 10 }} gutter={[8, 8]} justify="center" align="stretch">
                <Col md={7} xs={7}>
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
                <Col md={7} xs={9}>
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
                                <Select virtual={false} placeholder="Relationship" size="large" style={{ width: '100%' }} suffixIcon={<CaretDownOutlined />}>
                                    <Option key={Relationship.Spouse} value={"Spouse"}>{`Spouse`}</Option>
                                    <Option key={Relationship.Mother} value={"Mother"}>{`Mother`}</Option>
                                    <Option key={Relationship.Father} value={"Father"}>{`Father`}</Option>
                                    <Option key={Relationship.ChildDaughter} value={"ChildDaughter"}>{`Child (Daughter)`}</Option>
                                    <Option key={Relationship.ChildSon} value={"ChildSon"}>{`Child (Son)`}</Option>
                                    <Option key={Relationship.Brother} value={"Brother"}>{`Brother`}</Option>
                                    <Option key={Relationship.Sister} value={"Sister"}>{`Sister`}</Option>
                                    <Option key={Relationship.Cousin} value={"Cousin"}>{`Cousin`}</Option>
                                    <Option key={Relationship.Aunt} value={"Aunt"}>{`Aunt`}</Option>
                                    <Option key={Relationship.Uncle} value={"Uncle"}>{`Uncle`}</Option>
                                    <Option key={Relationship.GrandFather} value={"GrandFather"}>{`Grandfather`}</Option>
                                    <Option key={Relationship.GrandMother} value={"GrandMother"}>{`Grandmother`}</Option>
                                    <Option key={Relationship.GrandChild} value={"GrandChild"}>{`Grandchild`}</Option>
                                    <Option key={Relationship.Niece} value={"Niece"}>{`Niece`}</Option>
                                    <Option key={Relationship.Nephew} value={"Nephew"}>{`Nephew`}</Option>
                                </Select>
                            </Form.Item>
                        )}
                    </Form.Item>
                </Col>
                <Col md={7} xs={8}>
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

                <Col style={{display: 'flex', justifyContent: "center"}} md={2} xs={24}>
                    {index !== 0 ? <Tooltip placement="topLeft" title="Remove Beneficiary">
                        <Button onClick={() => {
                            this.removeBeneficiary(index);
                        }} size="small" style={{minWidth: "initial", marginTop: isMobileDevice() ? 0 : 35}} type="primary" shape="circle"
                                icon={<CloseOutlined/>}/>
                    </Tooltip> : (length === 1 ? undefined : <Col md={3} xs={24}/>)}
                </Col>

            </Row>
        )
    }

    renderContingentBeneficiary = (field: FormListFieldData, index: number, remove: (index: number | number[]) => void, length: number) => {
        return (
            <Row key={field.fieldKey} style={{ marginTop: 0 }} gutter={[16, 16]} justify="center" align="stretch">
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
                                    <Option key={Relationship.Spouse} value={"Spouse"}>{`Spouse`}</Option>
                                    <Option key={Relationship.Mother} value={"Mother"}>{`Mother`}</Option>
                                    <Option key={Relationship.Father} value={"Father"}>{`Father`}</Option>
                                    <Option key={Relationship.ChildDaughter} value={"ChildDaughter"}>{`Child (Daughter)`}</Option>
                                    <Option key={Relationship.ChildSon} value={"ChildSon"}>{`Child (Son)`}</Option>
                                    <Option key={Relationship.Brother} value={"Brother"}>{`Brother`}</Option>
                                    <Option key={Relationship.Sister} value={"Sister"}>{`Sister`}</Option>
                                    <Option key={Relationship.Cousin} value={"Cousin"}>{`Cousin`}</Option>
                                    <Option key={Relationship.Aunt} value={"Aunt"}>{`Aunt`}</Option>
                                    <Option key={Relationship.Uncle} value={"Uncle"}>{`Uncle`}</Option>
                                    <Option key={Relationship.GrandFather} value={"GrandFather"}>{`Grandfather`}</Option>
                                    <Option key={Relationship.GrandMother} value={"GrandMother"}>{`Grandmother`}</Option>
                                    <Option key={Relationship.GrandChild} value={"GrandChild"}>{`Grandchild`}</Option>
                                    <Option key={Relationship.Niece} value={"Niece"}>{`Niece`}</Option>
                                    <Option key={Relationship.Nephew} value={"Nephew"}>{`Nephew`}</Option>
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
                    <Col style={{ display: 'flex', justifyContent: "center" }} md={2} xs={24}>
                        <Tooltip placement="topLeft" title="Remove Beneficiary">
                            <Button onClick={() => {
                                this.removeContingentBeneficiary(index);
                            }} size="small" style={{ minWidth: "initial", marginTop: 0 }} type="primary" shape="circle" icon={<CloseOutlined />} />
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

    removeContingentBeneficiary = (index: number) => {
        const currentBeneficiaryForm: FormState = this.formRef.current.getFieldsValue(["contingentBeneficiaries"]);
        currentBeneficiaryForm.contingentBeneficiaries.splice(index, 1);
        const equalPercent = Number((100.0 / currentBeneficiaryForm.contingentBeneficiaries.length));
        const arr = [];
        for (var i = 0; i < currentBeneficiaryForm.contingentBeneficiaries.length; i++) {
            arr.push(equalPercent);
        }
        this.formRef.current.setFieldsValue({
            contingentBeneficiaries: currentBeneficiaryForm.contingentBeneficiaries.map((b, i) => { return { ...b, percentage: this.wholeRound(arr, 100)[i] } })
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

    addContingentBeneficiary = () => {
        const currentBeneficiaryForm: FormState = this.formRef.current.getFieldsValue(["contingentBeneficiaries"]);
        const addBeneficiaryForm = [...currentBeneficiaryForm.contingentBeneficiaries, { name: "", relationship: "", percentage: 0 }];
        const equalPercent = Number((100.0 / addBeneficiaryForm.length));
        const arr = [];
        for (var i = 0; i < addBeneficiaryForm.length; i++) {
            arr.push(equalPercent);
        }
        this.formRef.current.setFieldsValue({
            contingentBeneficiaries: addBeneficiaryForm.map((b, i) => { return { ...b, percentage: this.wholeRound(arr, 100)[i] } })
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
        const { history, updateBeneficiaries, app, startSaveApplication, saveApp, updateContingentBeneficiaries } = this.props;
        const arrBeneficiaries: BeneficiaryDto[] = values.beneficiaries.map(b => {
            const beneficiaryId = uuidv4();
            const familyMemberId = uuidv4();

            let newBeneficiary: BeneficiaryDto = { ..._.cloneDeep(EmptyObjects.EmptyBeneficiaryDto) };
            newBeneficiary.beneficiaryId = beneficiaryId;
            newBeneficiary.personalInfo.familyMemberId = familyMemberId;
            app.leadInfo.beneficiarySet = true;
            return {
                ...newBeneficiary, relationship: b.relationship, percentage: Number(b.percentage), personalInfo: {
                    ...newBeneficiary.personalInfo,
                    firstName: b.name

                }
            };
        });

        const arrContingentBeneficiaries: BeneficiaryDto[] = values.contingentBeneficiaries.map(b => {
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
        app.leadInfo.beneficiarySet = true;
        startSaveApplication({ app: { ...updatedApp, beneficiaries: arrBeneficiaries, contingentBeneficiaries: arrContingentBeneficiaries },
            history, path: navRoutes.Policy.PolicyBirthday.path })
    }

    render() {
        return (
            <div>

                <CardWrapper>
                    <div style={{textAlign:isMobileDevice()? "center" :"left"}}>
                    <QuestionDisplay
                        height={215}
                        questionTitle={QuestionList.BeneficiaryQuestions.BeneficiaryForm.Title}
                        questionText={QuestionList.BeneficiaryQuestions.BeneficiaryForm.Text}
                    />
                    </div>
                    <Form
                        className="beneficiary-form-page"
                        ref={this.formRef}
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
                                    if (percentage !== 100) {
                                        return Promise.reject(new Error('The total percentage for your beneficiaries must equal 100%'));
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
                                            fields.length < 8 ? <Row style={{ marginTop: 15 }} justify="center">
                                                <Col>
                                                    <Button style={{ display: "flex", alignItems: 'center', padding: 25 }} size="large" onClick={() => { this.addBeneficiary() }} icon={<PlusCircleFilled style={{ fontSize: 30, color: Colors.primary }} />} type="text">Add Another</Button>
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
                        <div style={{ borderBottom: '3px solid rgb(245, 245, 245)', margin: "0px 0px", visibility: "hidden" }} />

                        <Form.List rules={[
                            {
                                validator: async (_, values) => {
                                    const percentage = (values as Array<FormStateBeneficiary>).reduce((r, a) => {
                                        return r + Number(a["percentage"]);
                                    }, 0);
                                    if (percentage !== 100 && values.length !== 0) {
                                        return Promise.reject(new Error('The total percentage for your contingent beneficiaries must equal 100%'));
                                    }
                                },
                            },
                        ]} name="contingentBeneficiaries">
                            {(fields, { add, remove }, { errors }) => {

                                return (
                                    <>
                                        {fields.map((field, index) => {
                                            {

                                               // return <div key={field.fieldKey}>{this.renderContingentBeneficiary(field, index, remove, fields.length)}</div>
                                            }
                                        })}
                                        {
                                            fields.length < 8 ? undefined : undefined
                                        }


                                    </>
                                )
                            }
                            }

                        </Form.List>


                        <NavigationButtons
                            progressPercent={50}
                            nextText="Continue"
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
        initialBeneficiaries: state.app.beneficiaries,
        initialContingentBeneficiaries: state.app.contingentBeneficiaries,
        loading: state.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateBeneficiaries: (beneficiaries: BeneficiaryDto[]) => UpdateBeneficiaries(beneficiaries),
            updateContingentBeneficiaries: (beneficiaries: BeneficiaryDto[]) => UpdateContingentBeneficiaries(beneficiaries),
            startSaveApplication: (savePayload: SavePayload) => StartSaveApplication(savePayload)
        }, dispatch)

    }
}

export const BeneficiaryFormPage = connect(mapStateToProps, mapDispatchToProps)(BeneficiaryFormPageClass);
