

import { Button } from 'antd';
import React from 'react';
import logoWhite from '../assets/logo_only_white.png';
import logoDark from '../assets/Blue 2- SImple.png';
import './custom_button.css';

interface Props {
    onClick?: () => void;
    text: string;
    icon?: boolean;
    dark?: boolean;
    inverted?: boolean;
}

export class CustomButton extends React.Component<Props> {
    render() {
        const { dark, inverted } = this.props;
        return (
            <Button
                htmlType="submit"
                onClick={() => this.props.onClick ? this.props.onClick() : undefined}
                className={inverted ? "inverted" : (dark ? "custom-button-dark" : "custom-button-default")}
                style={{ height: 55 }}
                size="large"
                type="primary"
                shape="round" >
                <div className={inverted ? "inverted-content" : (dark ? "custom-button-dark-content" : "custom-button-default-content")}>
                    {this.props.text}
                    {this.props.icon ?
                        (inverted ? <img style={{ marginLeft: 10 }} width={32} src={logoDark} />
                            : <img style={{ marginLeft: 10 }} width={32} src={logoWhite} />)

                        : undefined}
                </div>
            </Button>
        )

    }
}