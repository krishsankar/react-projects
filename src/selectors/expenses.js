import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) =>  {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatach = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        console.log(startDate);
        console.log(endDate);
        const textMatch = expense.description.includes(text);

        return startDateMatach && endDateMatch && textMatch;
    }).sort ((a,b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}