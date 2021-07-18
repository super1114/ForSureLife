import React from 'react';
import { connect } from "react-redux";
import { Col, Row, Spin, Typography } from 'antd';
import { RouteComponentProps } from "react-router";
import { StoreQuote } from '../../actions/quote_actions';
import { httpWithTokenInHeader } from '../../clients/api.clients.base';
import { ApplicationDto, ApplicationInfo, ApplicationInfoDto, QuoteClient, QuoteDto, SeniorChoicePremiumType } from '../../clients/api.generated.clients';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { isMobileDevice } from '../../utilities/responsive';
import CheckboxImg from '../../assets/Checkbox.png';
import { Colors } from '../../styles/colors';
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { SavePayload, StartSaveApplication } from '../../actions/application_actions';
const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
    storeQuote: (quote: QuoteDto) => void;
    app: ApplicationDto;
    startSaveApplication: (savePayload: SavePayload) => void;
}



class QuoteLoading2Class extends React.Component<Props, any> {

    componentDidMount() {
        const { storeQuote, history, app, startSaveApplication } = this.props;

        const client = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
        var quoteReponseObject;
        client.getQuote(app.applicationId).then(quoteResponse => {
            storeQuote(quoteResponse);
            app.leadInfo.secondQuoteReceived = true;
            app.leadInfo.selectedBenefitAmount = quoteResponse.selectedBenefitAmount;
            app.leadInfo.selectedMonthlyRate = quoteResponse.selectedMonthlyRate;
            app.leadInfo.premiumType = quoteResponse.premiumType;
            quoteReponseObject = quoteResponse;
        }).catch(ex => {
            console.log({ ex });
        })
        setTimeout(() => {
            try {

                const path = window.location.hash.toLowerCase();
                var navRoute = path;
              


                if (app.leadInfo.clickedApplied) {

                    if (quoteReponseObject.premiumType == SeniorChoicePremiumType.Immediate) {
                        if (path == "#/quote/loading2") {
                            navRoute = navRoutes.Quote.QuoteImmediate.path;
                        }
                        startSaveApplication({ app, history, path: navRoute});

                    } else if (quoteReponseObject.premiumType == SeniorChoicePremiumType.Graded) {
                        if (path == "#/quote/loading2") {
                            navRoute = navRoutes.Quote.QuoteGraded.path;
                        }
                        startSaveApplication({ app, history, path: navRoute });

                    } else if (quoteReponseObject.premiumType == SeniorChoicePremiumType.Premium) {
                        if (path == "#/quote/loading2") {
                            navRoute = navRoutes.Quote.QuoteModified.path;
                        }
                        startSaveApplication({ app, history, path: navRoute });
                    }

                } else {
                    if (path == "#/quote/loading2") {
                        navRoute = navRoutes.Quote.QuoteImmediate.path;
                    }
                    navigate(history, navRoute);
                }


            } catch (exception) {
                navigate(history, navRoutes.Quote.QuoteImmediate.path);
            }


        }, (3600));
    }

    navigate = () => {
        const { history, app } = this.props;
        navigate(history, navRoutes.Quote.QuoteModified.path);
    }

    render() {

        const checkboxText = {
            fontSize: 20,
            fontWeight: 600,
            color: Colors.textPurple
        } as React.CSSProperties;


        return (

            <div>

                <div style={{ padding: 3, textAlign: 'center', marginBottom: 35 }}>
                    <Title style={{ fontSize: isMobileDevice() ? 24 : 36, color: "#4676E1" }}>{`We're checking your qualifications!`}</Title>
                    <div style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: isMobileDevice() ? 14 : 16, color: "#828282" }} strong>{`Peace of mind is just a few minutes away!`}</Text>
                    </div>
                    <div style={{ margin: 30 }}>
                        <Spin />
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 20, color: "#514A6F" }} strong>{`By the way! You can apply for coverage yourself on the next page`}</Text>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            storeQuote: (quote: QuoteDto) => StoreQuote(quote),
            startSaveApplication: (savePayload: SavePayload) => StartSaveApplication(savePayload)
        }, dispatch)

    }
}

export const QuoteLoading2Page = connect(mapStateToProps, mapDispatchToProps)(QuoteLoading2Class);
