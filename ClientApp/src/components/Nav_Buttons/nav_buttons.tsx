import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { Button, Col, Progress, Row, Spin, Typography } from "antd";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { previous } from "../../utilities/navigation_util";
import { isMobileDevice } from "../../utilities/responsive";
import bbbLogo from "../../assets/BBB_Accredited_Business_A_Rating.svg";
import nortonSeal from "../../assets/Norton-Logo-no-bg.svg";
import "./nav_buttons.css";
const { Text } = Typography;

interface Props extends RouteComponentProps {
  navigate?: () => void;

  hideNext?: boolean;
  nextText?: string;
  centerNext?: boolean;

  showBack?: boolean;
  backText?: string;
  nextRoute?: string;
  backRoute?: () => void;

  progressPercent?: number;
  hideProgress?: boolean;

  disable?: boolean;

  loading?: boolean;
  QueCounter?: boolean;
  activeCounter?: number;
}

class NavigationButtonsClass extends React.Component<Props, any> {
  previous = () => {
    const { showBack, history, backRoute } = this.props;
    if (showBack) {
      if (backRoute) {
        backRoute();
      } else {
        previous(history);
      }
    }
  };

  next = () => {
    const { navigate, hideNext } = this.props;
    if (!hideNext && navigate) {
      navigate();
    }
  };

  submit = (e) => {
    const { loading } = this.props;
    if (e.keyCode === 13 && !loading) {
      this.next();
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.submit, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.submit, false);
  }

  render() {
    const {
      progressPercent,
      hideNext,
      loading,
      showBack,
      hideProgress,
      backText,
      disable,
      nextText,
      QueCounter,
      activeCounter
    } = this.props;
    return (
      <div style={{ marginTop: isMobileDevice() ? 25 : 25 }}>
        <Row justify="center">
          <Col
            style={{
              display: "flex",
              justifyContent: showBack ? "space-between" : "center",
            }}
            md={16}
            xs={24}
          >
            {showBack ? (
              <div className="continue-button-wrapper">
                <Button
                  disabled={disable}
                  className="continue-button"
                  size="large"
                  onClick={(e) => this.previous()}
                >
                  <strong>
                    {backText ? backText : "I need to correct something"}
                  </strong>
                  <CaretLeftOutlined />
                </Button>
                <Text className="backText" strong>
                  {backText ? backText : "I need to correct something"}
                </Text>
              </div>
            ) : (
              <div />
            )}
            {hideNext ? undefined : (
              <div className="continue-button-wrapper">
                <Button
                  disabled={disable}
                  className="continue-button"
                  size="middle"
                  htmlType="submit"
                  onClick={(e) => this.next()}
                >
                  <div>
                    {nextText ? nextText : "Next"} <CaretRightOutlined />
                  </div>
                </Button>
              </div>
            )}
          </Col>
        </Row>
        {QueCounter ? (
          <Row>
            <Col span={24}>
              <p className="que-counter">
                Question <br />
                {activeCounter || 1}/ 21
              </p>
            </Col>
          </Row>
        ) : undefined}
        <Row justify="center">
          <Col md={16} xs={24}>
            {hideProgress ? undefined : (
              <div className="progress-main">
                {loading ? (
                  <Spin tip="Loading..." />
                ) : (
                  <Progress
                    format={(p, _sp) => {
                      return <div>{p}% completed</div>;
                    }}
                    className="progress-bar"
                    percent={progressPercent ? Math.round(progressPercent) : 0}
                  />
                )}
              </div>
            )}
            {loading && hideProgress && (
              <div className="progress-loading">
                <Spin tip="Loading..." />
              </div>
            )}
          </Col>
        </Row>
        <Row className="logos mb-0" justify="center">
          <Col>
            <div className="quote-ready-logos">
              <img src={bbbLogo} />
              <img src={nortonSeal} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export const NavigationButtons = withRouter(NavigationButtonsClass);
