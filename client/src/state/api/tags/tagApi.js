import { Toast } from "components/common/alerts/index";
import apiSlice from "state/api";

const tagApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTagDetails: builder.query({
            query: (TagId = 0) => `tags/getTagDetails/${TagId}`,
            transformResponse: (response) => response.success ? response.tag : [],
            providesTags: ["Tags"],
        }),
        createUpadateTags: builder.mutation({
            query: data => ({
                url: "tags/createUpdateTag",
                method: "POST",
                body: { ...data }
            }),
            invalidatesTags: ["Tags"],
        }),
        deleteTag: builder.mutation({
            query: data => ({
                url: "tags/deleteTag",
                method: "DELETE",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
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