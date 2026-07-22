import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "@/constants/config";

export const useCategoryProducts = (
  categoryId: number,
  placeId: number,
  limit: number = 10
) => {
  return useInfiniteQuery({
    queryKey: ["category-products", categoryId, placeId],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get(
        `${config.URL}/products/category/${categoryId}`,
        {
          params: {
            place_id: placeId,
            page: pageParam,
            limit,
          },
        }
      );

      return data;
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1;
      }

      return undefined;
    },

    enabled: !!categoryId && !!placeId,
  });
};