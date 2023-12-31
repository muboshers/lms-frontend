import {uz} from "date-fns/locale"
import {format, getTime, formatDistanceToNow} from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
    const fm = newFormat || 'dd MMM yyyy';

    return date ? format(new Date(date), fm, {
        locale: uz
    }) : '';
}

export function fDateTime(date, newFormat) {
    const fm = newFormat || 'dd MMM yyyy p';

    return date ? format(new Date(date), fm, {
        locale: uz
    }) : '';
}

export function fTimestamp(date) {
    return date ? getTime(new Date(date), {
        locale: uz
    }) : '';
}

export function fToNow(date) {
    return date
        ? formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: uz
        })
        : '';
}


export function emptyRows(page, rowsPerPage, arrayLength) {
    return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
