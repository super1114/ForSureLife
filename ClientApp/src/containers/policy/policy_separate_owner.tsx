import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { YesNoAnswer } from '../../components/yes_no_answer';
import { ApplicationInfoDto } from '../../clients/api.generated.clients';
import { UpdateApplicationInfo } from '../../actions/application_actions';
import _ from "lodash";

interface Props extends RouteComponentProps {
    updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => void;
    applicationInfo: ApplicationInfoDto;
}


class PolicySeparateOwnerClass extends React.Component<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    yes = () => {
        const { history, updateApplicationInfo, applicationInfo } = this.props;
        const updatedAppInfo: ApplicationInfoDto = _.cloneDeep(applicationInfo);
        updatedAppInfo.separateOwner = true;
        updateApplicationInfo(updatedAppInfo);
        navigate(history, navRoutes.Policy.PolicySocialPage.path);
    }

    no = () => {
        const { history, updateApplicationInfo, applicationInfo } = this.props;
        const updatedAppInfo: ApplicationInfoDto = _.cloneDeep(applicationInfo);
        updatedAppInfo.separateOwner = false;
        updateApplicationInfo(updatedAppInfo);
        //not needed if already answered no in intitial questions
        navigate(history, navRoutes.Policy.PolicyOwnerName.path);
    }

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicySeparateOwner.Title}
                        questionText={QuestionList.PolicyQuestions.PolicySeparateOwner.Text}
                    />
                    <YesNoAnswer yesText="Myself" noText="Someone Else" yes={() => { this.yes() }} no={() => { this.no() }} />
                    <NavigationButtons
                        progressPercent={40}
                        navigate={() => { this.yes() }}
                        hideNext
                    />
                </CardWrapper>
            </div>

        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        applicationInfo: state.app.applicationInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateApplicationInfo: (appInfoDto: ApplicationInfoDto) => UpdateApplicationInfo(appInfoDto)
        }, dispatch)

    }
}

export const PolicySeparateOwnerPage = connect(mapStateToProps, mapDispatchToProps)(PolicySeparateOwnerClass);
