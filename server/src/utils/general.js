export const excludeFields = () => {
    return '-_id -TradeId -AccountId -UserId -CreatedBy -UpdatedBy -createdAt -updatedAt -__v';
};

export const DateRangeFilter = (req, FieldName) => {
    const { accountId } = req.params;
    const { UserId, fromDate, toDate } = req.body;
    const Filter = { UserId, AccountId: parseInt(accountId) };

    if (fromDate) {
        const ToDate = !toDate ? new Date(fromDate) : new Date(toDate);
        ToDate.setDate(ToDate.getDate() + 1);

        Filter[FieldName] = { $gte: new Date(fromDate), $lte: ToDate };
    }

    return Filter;
}