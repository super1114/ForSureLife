import { Typography } from "antd";
import React from "react";
import { connect } from "react-redux";
import { isMobileDevice } from "../utilities/responsive";
const { Text, Title } = Typography;
interface Props {
  questionTitle: string | JSX.Element;
  questionText?: string | JSX.Element;
  questionSubtext?: string | JSX.Element;
  height?: number;
}

class QuestionDisplayClass extends React.Component<Props, any> {
  render() {
    const { questionTitle, questionText, questionSubtext } = this.props;
    return (
      <div
        style={{
          padding: isMobileDevice() ? 0 : "30px 40px",
          marginBottom: isMobileDevice() ? "10px" : 0,
        }}
      >
        <strong>
          <Title
            style={{
              fontSize: isMobileDevice() ? 24 : 29,
              color: "#606060",
              marginBottom: 5,
            }}
          >
            {questionTitle}
          </Title>
        </strong>
        {questionText ? (
          <div style={{ marginTop: 10 }}>
            <div
              style={{
                fontSize: "18px",
                color: "#3E3E3E",
                lineHeight: "25px",
              }}
            >
              {questionText}
            </div>
          </div>
        ) : undefined}
        {questionSubtext ? (
          <div style={{ marginTop: 10 }}>
            {questionSubtext ? (
              <Text
                style={{
                  fontSize: 18,
                  color: "#3E3E3E",
                  fontWeight: 100,
                  lineHeight: "25px",
                }}
              >
                {questionSubtext}
              </Text>
            ) : undefined}
          </div>
        ) : undefined}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const QuestionDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDisplayClass);
