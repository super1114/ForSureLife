import { Row, Col, Button, Input, Select, Tooltip, Typography } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { QuestionList } from '../../utilities/questions';
import { BeneficiaryDto, LeadDTO, QuoteClient } from '../../clients/api.generated.clients';
import _ from 'lodash';
import { UpdateBeneficiaries } from '../../actions/beneficiary_actions';
import ReactPixel from 'react-facebook-pixel';
import { Colors } from '../../styles/colors';
import { CaretRightOutlined } from '@ant-design/icons';
import { httpWithTokenInHeader } from '../../clients/api.clients.base';
const { Option } = Select;
const { Text, } = Typography;

interface Props extends RouteComponentProps {
    leadInfo: LeadDTO
}

interface State {
}

class SubmitPageClass extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        ReactPixel.init('518791495779783');
        ReactPixel.track('Purchase');
    }

    downloadPdf() {


        const { history } = this.props;

        const client = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
        client.getAmAmApplicationPDF().then(response => {

            const file = new Blob([response.data], { type: "application/pdf" });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            //Open the URL on new Window
            const pdfWindow = window.open();
            pdfWindow.location.href = fileURL;

        }).catch(ex => {
            return ex;
        });
    }

    render() {
        const { leadInfo } = this.props;
        return (
            <div>
                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.SubmitQuestions.Submit.Title}
                        questionText={QuestionList.SubmitQuestions.Submit.FunctionText(leadInfo.email)}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Button type="primary" shape="round" size="large" onClick={() => this.downloadPdf()}> Download</Button>
                    </div>
                </CardWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        initialBeneficiaries: state.app.beneficiaries,
        leadInfo: state.app.leadInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateBeneficiaries: (beneficiaries: BeneficiaryDto[]) => UpdateBeneficiaries(beneficiaries)
        }, dispatch)

    }
}

export const SubmitPage = connect(mapStateToProps, mapDispatchToProps)(SubmitPageClass);
