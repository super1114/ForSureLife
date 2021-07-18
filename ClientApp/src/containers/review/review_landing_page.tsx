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

class ReviewLandingClass extends React.Component<Props, any> {

    render() {
        const { history } = this.props;
        return (
            <div>

                <CardWrapper>
                    <QuestionDisplay
                        questionTitle={QuestionList.ReviewQuestions.ReviewLanding.Title}
                        questionText={QuestionList.ReviewQuestions.ReviewLanding.Text}
                    />
                    <NavigationButtons
                        navigate={() => navigate(history, navRoutes.Review.ReviewApp.path)}
                        centerNext
                        hideProgress
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

export const ReviewLandingPage = connect(mapStateToProps, mapDispatchToProps)(ReviewLandingClass);
