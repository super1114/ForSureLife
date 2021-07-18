import { Select, Radio, FormInstance, Form, Button, Space } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import React from 'react';
import { Gender } from '../clients/api.generated.clients';
import { validateAge } from '../utilities/validator';
import { CustomButton } from './custom_buttom';
import './get_free_quote.css';
const { Option } = Select;
interface State {

}

interface FormState {
    coverageAmount?: string;
    smokingStatus?: boolean;
    sex?: Gender;
    dob?: string;
}
export class GetFreeQuote extends React.Component<any, State> {
    formRef = React.createRef<FormInstance>();
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getQuote = (values: FormState) => {
        alert('submitted');
    }

    render() {
        return (
            <div className="free-quote-wrapper" >

                <div className="free-quote-form">
                    <Form
                        layout="vertical"
                        ref={this.formRef}
                        onFinish={this.getQuote}
                        scrollToFirstError
                    >

                        <Space direction="vertical" size="middle">
                            <div style={{ color: "#F92500", fontSize: 19 }}>{`GET YOUR QUOTE IN JUST 60 SECONDS`}</div>
                            <Form.Item rules={[{ required: true }]} name="coverageAmount">
                                <Select placeholder="Select an Amount">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item rules={[{ required: true }]} label="Smoking" name="smokingStatus">
                                <Radio.Group>
                                    <Radio value={true}>Smoker</Radio>
                                    <Radio value={false}>Nonsmoker</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item rules={[{ required: true }]} label="Sex at Birth" name="sex">
                                <Radio.Group>
                                    <Radio value={Gender.Male}>Male</Radio>
                                    <Radio value={Gender.Female}>Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item rules={[{ required: true, validator: validateAge, validateTrigger: "onBlur" }]} name="dob" label="Date of Birth" required>
                                <MaskedInput type="tel" size="large" mask="11/11/1111" />
                            </Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                <CustomButton icon text="Get Free Quote" />
                            </div>

                        </Space>

                    </Form>
                </div>
                {/* smoking status */}
                {/* sex */}
                {/* dob */}

            </div >
        )
    }
}