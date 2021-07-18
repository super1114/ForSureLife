import moment from 'moment';
export const WITHDRAW_DATES = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    5: "5th",
    6: "6th",
    7: "7th",
    8: "8th",
    9: "9th",
    10: "10th",
    11: "11th",
    12: "12th",
    13: "13th",
    14: "14th",
    15: "15th",
    16: "16th",
    17: "17th",
    18: "18th",
    19: "19th",
    20: "20th",
    21: "21th",
    22: "22th",
    23: "23th",
    24: "24th",
    25: "25th",
    26: "26th",
    27: "27th",
    28: "28th"
}

export enum STATE_HASH {
    "Alabama" = 1,
    "Alaska" = 2,
    "Arizona" = 3,
    "Arkansas" = 4,
    "California" = 5,
    "Colorado" = 6,
    "Connecticut" = 7,
    "Delaware" = 8,
    "Florida" = 9,
    "Georgia" = 10,
    "Hawaii" = 11,
    "Idaho" = 12,
    "Illinois" = 13,
    "Indiana" = 14,
    "Iowa" = 15,
    "Kansas" = 16,
    "Kentucky" = 17,
    "Louisiana" = 18,
    "Maine" = 19,
    "Maryland" = 20,
    "Massachusetts" = 21,
    "Michigan" = 22,
    "Minnesota" = 23,
    "Mississippi" = 24,
    "Missouri" = 25,
    "Montana" = 26,
    "Nebraska" = 27,
    "Nevada" = 28,
    "New Hampshire" = 29,
    "New Jersey" = 30,
    "New Mexico" = 31,
    "New York" = 32,
    "North Carolina" = 33,
    "North Dakota" = 34,
    "Ohio" = 35,
    "Oklahoma" = 36,
    "Oregon" = 37,
    "Pennsylvania" = 38,
    "Rhode Island" = 39,
    "South Carolina" = 40,
    "South Dakota" = 41,
    "Tennessee" = 42,
    "Texas" = 43,
    "Utah" = 44,
    "Vermont" = 45,
    "Virginia" = 46,
    "Washington" = 47,
    "West Virginia" = 48,
    "Wisconsin" = 49,
    "Wyoming" = 50,
}
export const VALID_AGES = () => {
    var ages = [];
    for (var i = 50; i <= 85; i++) {
        ages.push(i);
    };
    return ages;
}

export const STATE_OF_BIRTH =
    ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "American Samoa", "District of Columbia", "Federated States of Micronesia", "Guam", "Marshall Islands", "Northern Mariana Islands", "Palau", "Puerto Rico", "Virgin Islands", "Armed Forces Africa", "Armed Forces Americas", "Armed Forces Canada", "Armed Forces Europe", "Armed Forces Middle East", "Armed Forces Pacific", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. ", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];


export const INITIAL_COVERAGE_AMOUNTS = () => {
    const amounts = [];
    for (var i = 2; i <= 35; i++) {
        amounts.push(i * 1000);
    }
    return amounts;
}

export const INITIAL_BIRTH_YEARS = () => {
    const years = [];
    for (var i = Number(moment().format("YYYY")) - 85; i < Number(moment().format("YYYY")) - 35; i++) {
        years.push(i.toString())
    }
    return years;
}