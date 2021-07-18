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
interface Props extends RouteComponentProps {

}


class PolicyExistingInsuranceClass extends React.Component<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    yes = () => {
        const { history } = this.props;
        navigate(history, navRoutes.Policy.PolicyReplacement.path);
    }

    no = () => {
        const { history } = this.props;
        //not needed if already answered no in intitial questions
        navigate(history, navRoutes.Policy.PolicyReplacement.path);
    }

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.PolicyQuestions.PolicyExistingInsurance.Title}
                        questionText={QuestionList.PolicyQuestions.PolicyExistingInsurance.Text}
                    />
                    <YesNoAnswer yes={() => { this.yes() }} no={() => { this.no() }} />
                    <NavigationButtons
                        progressPercent={80}
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

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({

        }, dispatch)

    }
}

export const PolicyExistingInsurancePage = connect(mapStateToProps, mapDispatchToProps)(PolicyExistingInsuranceClass);
