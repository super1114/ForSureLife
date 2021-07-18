import { Row, Col, Button } from 'antd';
import React from 'react';

interface Props {
    yes: () => void;
    no: () => void;
    yesText?: string;
    noText?: string;
    disabled?: boolean;
    mdSize?: number;
    xsSize?: number;
}

export class YesNoAnswer extends React.Component<Props, any> {
    render() {
        const { yes, no, disabled, yesText, noText, mdSize, xsSize } = this.props;
        return (
            <div>
                <Row gutter={[16, 16]} align="middle" justify="center">
                    <Col className="ant-col-flex-center" md={mdSize ? mdSize : 6} xs={xsSize ? xsSize : 12}>
                        <Button disabled={disabled} type="primary" shape="round" size="large" onClick={() => { yes() }}>{yesText ? yesText : "Yes"}</Button>
                    </Col>
                    <Col className="ant-col-flex-center" md={mdSize ? mdSize : 6} xs={xsSize ? xsSize : 12}>
                        <Button disabled={disabled} type="primary" shape="round" size="large" onClick={() => { no() }}>{noText ? noText : "No"}</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}