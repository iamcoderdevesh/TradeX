export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const formatDate = (date, type) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());

    if (type === 'dd/mm/yyyy') return [day, month, year].join('/');
    else if (type === 'yyyy/mm/dd') return [year, month, day].join('-');
    else if (type === 'date-time') return d.toISOString().slice(0, 16);
    else if (type === 'local-date') return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    else return [year, month, day].join('-');
}

export const capitalizeWords = (str) => {
    if (str.includes("settings")) {
        str = str.replace(str, "settings");
    }
    str = str.replace(/\//i, "");
    str = str.replace(/-/i, " ");
    return str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};