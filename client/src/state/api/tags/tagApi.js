import { Toast } from "components/common/alerts";
import apiSlice from "state/api";
import { SetLoadingWithResults } from "helpers";

const tagApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTagDetails: builder.query({
            query: (TagId = 0) => `tags/getTagDetails/${TagId}`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.tag : [],
            providesTags: ["Tags"],
        }),
        createUpadateTags: builder.mutation({
            query: data => ({
                url: "tags/createUpdateTag",
                method: "POST",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data?.success && Toast.success(result.data?.message);
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["Tags"],
        }),
        deleteTag: builder.mutation({
            query: data => ({
                url: "tags/deleteTag",
                method: "DELETE",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data?.success && Toast.success(result.data?.message);
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["Tags"],
        }),
    }),
    overrideExisting: true
});

export const { useGetTagDetailsQuery, useCreateUpadateTagsMutation, useDeleteTagMutation } = tagApiSlice;