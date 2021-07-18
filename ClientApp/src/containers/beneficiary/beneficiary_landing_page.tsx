import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavigationButtons } from '../../components/Nav_Buttons/nav_buttons';
import { QuestionDisplay } from '../../components/question_display';
import { CardWrapper } from '../../components/Card-wrapper/card_wrapper';
import { navRoutes } from '../../nav/routes';
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { navigate } from '../../utilities/navigation_util';
import { QuestionList } from '../../utilities/questions';

interface Props extends RouteComponentProps {

}

class BeneficiaryLandingClass extends React.Component<Props, any> {

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>

                    <QuestionDisplay
                        questionTitle={QuestionList.BeneficiaryQuestions.BeneficiaryLanding.Title}
                        questionText={QuestionList.BeneficiaryQuestions.BeneficiaryLanding.Text}
                    />

                    <NavigationButtons
                        progressPercent={0}
                        navigate={() => navigate(history, navRoutes.Beneficiary.BeneficiaryForm.path)}
                        centerNext
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

export const BeneficiaryLandingPage = connect(mapStateToProps, mapDispatchToProps)(BeneficiaryLandingClass);
