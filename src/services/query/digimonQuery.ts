import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getDigimons, getDigimonById } from '~/services/api/digimonApi';
import { commonQueryConfig } from '~/services/query/common';


const {
  STALE_TIME,
  RETRY,
} = commonQueryConfig;


/**
 * 使用 digimon 的詳細資料 query 函式
 * @function useDigimonDetailQuery
 * @param {string} digimonId 角色 id
 */
export function useDigimonDetailQuery(digimonId: string) {
  return useQuery({
    queryKey: ['digimon-detail', digimonId],
    queryFn: () => getDigimonById(digimonId),
    staleTime: STALE_TIME,
    retry: RETRY,
  });
}


/**
 * 使用 digimon 的清單資料 query 函式
 * @function useDigimonListQuery
 */
export function useDigimonListQuery() {
  return useInfiniteQuery({
    queryKey: ['digimon-list'],
    queryFn: ({ pageParam }) => getDigimons(pageParam),
    initialPageParam: 0,
    getNextPageParam: ({ pagenation }) => pagenation.nextPage,
    staleTime: STALE_TIME,
    retry: RETRY,
  });
}