import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getDigimons, getDigimonById } from '~/services/api/digimonApi';


// 緩存時間
const staleTime = 1000 * 60 * 5;
// 錯誤重試
const retry = false;


/**
 * 使用 digimon 的詳細資料 query 函式
 * @function useDigimonDetailQuery
 * @param {string} digimonId 角色 id
 */
export function useDigimonDetailQuery(digimonId: string) {
  return useQuery({
    queryKey: ['digimon-detail', digimonId],
    queryFn: () => getDigimonById(digimonId),
    staleTime,
    retry,
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
    getNextPageParam: ({ pageable }) => {
      return pageable.currentPage <= pageable.totalPages
        ? pageable.currentPage + 1
        : undefined;
    },
    staleTime,
    retry,
  });
}