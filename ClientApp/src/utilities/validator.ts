import moment from 'moment';

export const validateZip = (_: any, value: string) => {
    if (value.toString().length !== 5) {
        return Promise.reject(new Error('Zip Code must be 5 digits'));
    }

    if (isNaN(Number(value))) {
        return Promise.reject(new Error('Zip Code must contain only digits'));
    }

    return Promise.resolve();
};

export const validatePhone = (_: any, value: string) => {
    if (value.toString().indexOf("_") !== -1) {
        return Promise.reject(new Error('Invalid phone'));
    } else if (!value) {
        return Promise.reject(new Error('Field is required'));
    }

    return Promise.resolve();
}

export const validateHeight = (_: any, value: string) => {
    let num = Number(value.replace(".", ''));

    if (value.toString() === "0") {
        return Promise.reject(new Error('Height cannot be 0 feet'));
    }
    else if (!value) {
        return Promise.reject(new Error('Field is required'));
    } else if (isNaN(num)) {
        return Promise.reject(new Error('Must be a valid number'));

    } else if (num >= 9) {
        return Promise.reject(new Error('Must be a valid height in feet'));

    } 
    return Promise.resolve();
}

export const validateHeightInches = (_: any, value: string) => {
    let num = Number(value.replace(".", ''));

 if (!value) {
        return Promise.reject(new Error('Field is required'));
    } else if (isNaN(num)) {
        return Promise.reject(new Error('Must be a valid number'));

    } else if (num >= 12) {
        return Promise.reject(new Error('Must be a valid height in inches'));

    }
    return Promise.resolve();
}

export const validateWeight = (_: any, value: string) => {
    let num = Number(value.replace(".", ''));

    if (Number(value) < 50) {
        return Promise.reject(new Error('Weight must be at least 50lbs'));
    }
    else if (!value) {
        return Promise.reject(new Error('Field is required'));
    } else if (isNaN(num)) {
        return Promise.reject(new Error('Must be a valid number'));

    }
    
    return Promise.resolve();
}

export const validateAge = (_: any, value: string) => {
    if (moment(value).isValid()) {
        const age = moment().diff(moment(value).format("MM/DD/YYYY"), 'years')
        if (age < 50 || age > 85) {
            return Promise.reject(new Error('Age must be between 50 and 85 years old'));
        }
        return Promise.resolve();
    }

    return Promise.reject(new Error('Invalid birthday'));

}

export const validateAddress = (_: any, value: string) => {

    var pattern = new RegExp('\\b[P|p]*(OST|ost)*\\.*\\s*[O|o|0]*(ffice|FFICE)*\\.*\\s*[B|b][O|o|0][X|x]\\b');
    if (value.match(pattern)) {
        return Promise.reject(new Error('Can not be PO Box'));
    } else if (value.toString().length <= 1) {
        return Promise.reject(new Error('Required Street Address'));
    }
    return Promise.resolve();
}

export const validateGoogle = (_: any, value: boolean) => {

    
    return Promise.resolve();
}


export const validateState = (_: any, value: string) => {

    var statesAbbreviations = "AL,AK,AS,AZ,AR,CA,CO,CT,DE,DC,FM,FL,GA,GU,HI,ID,IL,IN,IA,KS,KY,LA,ME,MH,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,MP,OH,OK,OR,PW,PA,PR,RI,SC,SD,TN,TX,UT,VT,VI,VA,WA,WV,WI,WY,";
    var states = "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming";

    var reject = false;
    if (statesAbbreviations.toLowerCase().split(",").indexOf(value.toLowerCase()) !== -1
        || states.toLowerCase().split(",").indexOf(value.toLowerCase()) !== -1) {
        reject = false;
    } else {
        reject = true;
    }

    if (reject) {
        return Promise.reject(new Error('Invalid State Name'));
    }
    return Promise.resolve();
}