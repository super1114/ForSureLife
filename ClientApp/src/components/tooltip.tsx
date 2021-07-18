import { Tooltip, Typography } from 'antd';
import React from 'react';

const { Link } = Typography;
interface Props {
    tooltipText: string;
    text: string;
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
}
export class CustomTooltip extends React.PureComponent<Props, any> {
    render() {
        const { text, tooltipText, placement } = this.props;
        return (
            <Tooltip title={tooltipText} placement={placement ? placement : "bottom"}>
                <Link>{text}</Link>
            </Tooltip>
        )

    }
}