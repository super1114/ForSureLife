import React from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { GlobalState } from '../../reducers/root_reducer';
import { customBindActionCreators } from '../../utilities/helper';
import { BeneficiaryDto } from '../../clients/api.generated.clients';
import _ from 'lodash';
import { UpdateBeneficiaries, UpdateContingentBeneficiaries } from '../../actions/beneficiary_actions';
import { BeneficiaryFormPage } from '../beneficiary/BeneficiaryFormPage/beneficiary_form_page';

interface Props extends RouteComponentProps {
    updateBeneficiaries: (beneficiaries: BeneficiaryDto[]) => void;
    initialBeneficiaries: BeneficiaryDto[];
    initialContingentBeneficiaries: BeneficiaryDto[];
    updateContingentBeneficiaries: (beneficiaries: BeneficiaryDto[]) => void;
    loading: boolean;
}

interface State {
}

class ReviewBeneficiariesPageClass extends React.Component<Props, State> {

    render() {
        return (
            <BeneficiaryFormPage saveApp {...this.props} />
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        initialBeneficiaries: state.app.beneficiaries,
        loading: state.layout.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...customBindActionCreators({
            updateBeneficiaries: (beneficiaries: BeneficiaryDto[]) => UpdateBeneficiaries(beneficiaries),
            updateContingentBeneficiaries: (beneficiaries: BeneficiaryDto[]) => UpdateContingentBeneficiaries(beneficiaries),
        }, dispatch)

    }
}

export const ReviewBeneficiaryPage = connect(mapStateToProps, mapDispatchToProps)(ReviewBeneficiariesPageClass);
