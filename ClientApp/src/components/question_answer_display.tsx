import React from 'react';

export class QuestionAnswerWrapper extends React.PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                {this.props.children}
            </div>
        )
    }
}