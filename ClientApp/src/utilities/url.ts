import { parse, stringify } from 'qs';
import qs from 'qs';
import { LeadFlow } from '../actions/nav_actions';

export interface QueryParams {
    flow?: LeadFlow;
    ChallengeCode?: string;
    email?: string;
    phone?: string;
}

export type Dictionary<T> = {
    [key: string]: T;
};


export const EmptyUrlParameters: QueryParams = {
    flow: LeadFlow.A
}

export function getQueryParams<T>(
    queryParamsFromUrl: string
): QueryParams {
    const params = queryParamsFromUrl.split('?');
    if (params.length > 1) {
        const query: Dictionary<T> = qs.parse(params[1], {
            ignoreQueryPrefix: true
        })

        return query as QueryParams
    }

    return {}
}

