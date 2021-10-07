export function getDate(time) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    var currentDate = new Date();
    var nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var dateToCheck = new Date(time);
    return dateToCheck.getDate() === currentDate.getDate() ? "Today" :
        dateToCheck.getDate() === nextDate.getDate() ? "Tomorrow" :
            dateToCheck.toLocaleDateString(undefined, options)

}