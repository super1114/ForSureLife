import React from "react";
import { GlobalState } from "../../../reducers/root_reducer";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { navRoutes } from "../../../nav/routes";
import { QuestionList } from "../../../utilities/questions";
import { QuestionDisplay } from "../../../components/question_display";
import { NavigationButtons } from "../../../components/Nav_Buttons/nav_buttons";
import { navigate } from "../../../utilities/navigation_util";
import { Row, Col, Input, FormInstance, Form, Modal } from "antd";
import { LeadFlow } from "../../../actions/nav_actions";
import { LeadDTO } from "../../../clients/api.generated.clients";
import { validateAddress, validateState, validateZip } from "../../../utilities/validator";
import _ from "lodash";
import { customBindActionCreators } from "../../../utilities/helper";
import { UpdateLeadInfo } from "../../../actions/lead_actions";
import Autocomplete from "react-google-autocomplete";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {
    getAddressObject,
    GoogleParsedAddress,
} from "../../../utilities/address";
import { isMobileDevice } from "../../../utilities/responsive";
import { CardWrapper } from "../../../components/Card-wrapper/card_wrapper";

import "./home_address_page.css";
import TextArea from "antd/lib/input/TextArea";

interface Props extends RouteComponentProps {
    leadInfo: LeadDTO;
    flow: LeadFlow;
    updateLeadInfo: (leadInfo) => void;
}

interface State {
    isApartment: boolean;
    isVisible: boolean;
    isModalVisible: boolean;
}

interface FormState {
    address: string;
    apartment: string;
    home: "";
    postal_code: "";
    street: "";
    region: "";
    city: "";
    country: "";
}

export class HomeAddressClass extends React.Component<Props, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {
            isApartment: false,
            isVisible: false,
            isModalVisible: false
        };
        const { leadInfo } = this.props;
        if (leadInfo.city != "" && leadInfo.city != null) {
            this.setState({ isVisible: false });
        } else {
            this.setState({ isVisible: true });
        }
    }

    componentDidMount() {
        const { leadInfo } = this.props;
        // isVisible = false;

        // var isVisible2 = false;
        this.formRef.current.setFieldsValue({
            address: "",
            apartment: "",
            home: leadInfo.address1,
            postal_code: leadInfo.zipCode,
            street: leadInfo.address1,
            region: leadInfo.state,
            city: leadInfo.city,
            country: "",
        });
    }

    onFocus = (event) => {
        event.target.setAttribute("autoComplete", "off");
        //event.target.setAttribute("list", "autoCompleteOff");
        console.log(event.target.autocomplete);
    };

    validateGoogletwo = (_: any, value: string) => {
        if (this.state.isVisible) {
            return Promise.resolve();
        } else {
            return Promise.reject(
                new Error("Required Address Selection from Google")
            );
        }
    };

    navigate = (values: FormState) => {
        const { flow, history, leadInfo, updateLeadInfo } = this.props;
        const { isModalVisible } = this.state;
        const updatedLead = _.cloneDeep(leadInfo);

        if (!values.postal_code) {
            this.setState({ isModalVisible: true });
        } else {
            updatedLead.address1 = values.home;
            if (this.state.isApartment && values.apartment) {
                updatedLead.address1 =
                    updatedLead.address1 + " APT # " + values.apartment;
            }
            updatedLead.city = values.city;
            updatedLead.zipCode = values.postal_code;
            updatedLead.state = values.region;
            updateLeadInfo(updatedLead);
            if (flow == LeadFlow.A) {
                navigate(history, navRoutes.Quote.PhoneNumber.path);
            } else if (flow == LeadFlow.B) {
                navigate(history, navRoutes.Quote.PhoneNumber.path);
            } else if (flow == LeadFlow.C) {
                navigate(history, navRoutes.Policy.PolicyPhone.path);
            } else if (flow == LeadFlow.D) {
                navigate(history, navRoutes.Quote.PhoneNumber.path);
            } else if (flow == LeadFlow.E) {
                navigate(history, navRoutes.Quote.PhoneNumber.path);
            } else {
                navigate(history, navRoutes.Quote.PhoneNumber.path);
            }
        }

    };
    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    render() {
        const { leadInfo } = this.props;
        const { isModalVisible } = this.state;
        return (
            <CardWrapper>
                <div className="d-flex flex-column justify-between h-100">
                    <QuestionDisplay
                        questionTitle={QuestionList.LeadQuestions.HomeAddress.FunctionTitle(
                            leadInfo.firstName
                        )}
                        questionText={QuestionList.LeadQuestions.HomeAddress.Text}
                    />
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.navigate}
                        scrollToFirstError
                        autoComplete="nope"
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Modal destroyOnClose title="Please provide zip code" visible={isModalVisible} onOk={() => { this.formRef.current.submit() }} onCancel={() => { this.setState({ isModalVisible: false }) }}>
                            <Form.Item
                                name="postal_code"
                                rules={[{ required: true, validator: validateZip }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Zip Code"
                                />
                            </Form.Item>
                        </Modal>

                        <Row justify="center">
                            <Col style={{fontFamily:"Arial"}} md={12} xs={24}>
                                <Form.Item
                                    className="address-field"
                                    name="address1234"
                                    label="Search and Select Address"
                                    rules={[{ required: true, validator: this.validateGoogletwo }]}
                                >
                                    <Autocomplete

                                        className="ant-input custom-input-field"
                                        style={{
                                            width: "100%",
                                            height: 40,
                                        }}
                                        onClick={(e) =>
                                            isMobileDevice() ? window.scrollTo(0, 240) : undefined
                                        }
                                        placeholder={"Search address here..."}
                                        onFocus={this.onFocus}
                                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                        onPlaceSelected={(place) => {
                                            this.setState({ isVisible: true });
                                            const ao: GoogleParsedAddress = getAddressObject(
                                                place.address_components
                                            );
                                            this.formRef.current.setFieldsValue({
                                                address1234: place.formatted_address,
                                                home: ao.home + " " + ao.street,
                                                postal_code: ao.postal_code,
                                                street: ao.street,
                                                region: ao.region,
                                                city: ao.city,
                                                country: ao.country,
                                            });
                                        }}
                                        options={
                                            { types: ['address'] }
                                        }

                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center" align="top">
                            <Col className="ant-col-flex-center" md={8} xs={24}>
                                <Checkbox
                                    className="custom-checkbox mt-10"
                                    onChange={(checked) => {
                                        this.setState({ isApartment: checked.target.checked });
                                    }}
                                >
                                    Is this an apartment?
                                </Checkbox>
                            </Col>
                        </Row>
                        {this.state.isApartment ? (
                            <Row className="my-10" justify="center" align="top">
                                <Col className="ant-col-flex-center" md={6} xs={12}>
                                    <Form.Item
                                        className="apartment-number"
                                        name="apartment"
                                        label="Apartment#"
                                    >
                                        <Input
                                            size="large"
                                            className="custom-input-field"
                                            placeholder="Apartment Number"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                        <Row style={{ marginTop: 20 }} justify="center">
                            {this.state.isVisible ? (
                                <Col className="ant-col-flex-center" md={12} xs={24}>
                                    <Row>
                                        <Col className="ant-col-flex-center" md={12} xs={12}>
                                            <Form.Item
                                                label="Street Address"
                                                name="home"
                                                hidden={true}
                                                rules={[{ validator: validateAddress }]}
                                            >
                                                <TextArea
                                                    autoComplete="off"
                                                    style={{ paddingLeft: 0 }}
                                                    bordered={false}
                                                    size="large"
                                                    onFocus={this.onFocus}
                                                    placeholder="Address"
                                                    disabled={true}
                                                    hidden={true}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="ant-col-flex-center" md={12} xs={12}>
                                            <Form.Item
                                                label="City"
                                                name="city"
                                                hidden={true}
                                                rules={[{ required: true }]}
                                            >
                                                <TextArea
                                                    autoComplete="off"
                                                    style={{ paddingLeft: 0 }}
                                                    bordered={false}
                                                    size="large"
                                                    onFocus={this.onFocus}
                                                    placeholder="City"
                                                    disabled={true}
                                                    hidden={true}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="ant-col-flex-center" md={12} xs={12}>
                                            <Form.Item
                                                label="Zip Code"
                                                name="postal_code"
                                                hidden={true}
                                            >
                                                <TextArea
                                                    autoComplete="off"
                                                    style={{ paddingLeft: 0 }}
                                                    bordered={false}
                                                    size="large"
                                                    onFocus={this.onFocus}
                                                    placeholder="Zip Code"
                                                    disabled={true}
                                                    hidden={true}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="ant-col-flex-center" md={12} xs={12}>
                                            <Form.Item
                                                label="State"
                                                name="region"
                                                hidden={true}
                                                rules={[{ required: true, validator: validateState }]}
                                            >
                                                <TextArea
                                                    style={{ paddingLeft: 0 }}
                                                    autoComplete="off"
                                                    size="large"
                                                    onFocus={this.onFocus}
                                                    bordered={false}
                                                    placeholder="State"
                                                    disabled={true}
                                                    hidden={true}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            ) : undefined}
                        </Row>
                        <NavigationButtons progressPercent={80} />
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

export const HomeAddressPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeAddressClass);
