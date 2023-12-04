export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const formatDate = (date, type) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    if(type === 'dd/mm/yyyy') return [day, month, year].join('/')
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