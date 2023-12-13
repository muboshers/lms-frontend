import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
    return numeral(number).format();
}

export function fCurrency(number, cFormat) {
    if (number === 0) return number;

    const format = number ? numeral(number).format(cFormat ?? '$0,0.00') : '';

    return result(format, '.00');
}

export function fPercent(number) {
    const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

    return result(format, '.0');
}

export function fShortenNumber(number) {
    const format = number ? numeral(number).format('0.00a') : '';

    return result(format, '.00');
}

export function fData(number) {
    const format = number ? numeral(number).format('0.0 b') : '';

    return result(format, '.0');
}

function result(format, key = '.00') {
    const isInteger = format.includes(key);

    return isInteger ? format.replace(key, '') : format;
}

export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return null;
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    if (numericPhoneNumber.length !== 12) {
        console.error('Invalid phone number');
        return phoneNumber;
    }

    const formattedPhoneNumber = `+${numericPhoneNumber.substring(0, 3)} ${numericPhoneNumber.substring(3, 6)} ${numericPhoneNumber.substring(6, 8)} ${numericPhoneNumber.substring(8, 10)} ${numericPhoneNumber.substring(10, 12)}`;

    return formattedPhoneNumber;
}



