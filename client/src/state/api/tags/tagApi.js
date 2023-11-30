import apiSlice from "state/api";

const tagApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTags: builder.query({
            query: () => `tags/getTagDetails`,
            transformResponse: (response) => response.success ? response.tag : [],
        }),
        createUpadateTags: builder.mutation({
            query: data => ({
                url: "tags/createUpdateTag",
                method: "POST",
                body: { ...data }
            })
        }),
    }),
    overrideExisting: true
});

export const { useGetAllTagsQuery, useCreateUpadateTagsMutation } = tagApiSlice;