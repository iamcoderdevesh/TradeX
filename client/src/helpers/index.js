import { setLoading } from 'state';

export const SetLoadingWithResults = async (queryFulfilled, dispatch) => {
    try {
        dispatch(setLoading(30));
        const result = await queryFulfilled;
        dispatch(setLoading(50));
        dispatch(setLoading(100));
        return result;
    } catch (err) {
        dispatch(setLoading(100));
        return;
    }
};

