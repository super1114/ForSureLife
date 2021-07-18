import { Row, Col } from 'antd';
import React from 'react';

interface Props {
    children: any;
    md?: number;
    xl?: number;
    xs?: number;
}

export class PageWrapper extends React.Component<Props, any> {
    render() {
        const { children, md, xl, xs } = this.props;
        return (
            <Row justify="center">
                <Col xl={xl ? xl : 12} md={md ? md : 16} xs={xs ? xs : 24}>
                    {this.props.children}
                </Col>
            </Row>
        )
    }
}

