import { useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getPokemons, getPokemonById } from '~/services/api/pokemonApi';
import { commonQueryConfig } from '~/services/query/common';


const {
  STALE_TIME,
  RETRY,
} = commonQueryConfig;


/**
 * 使用 pokemon 的詳細資料 query 函式
 * @function usePokemonDetailQuery
 * @param {string} pokemonId 角色 id
 */
export function usePokemonDetailQuery(pokemonId: string) {
  return useQuery({
    queryKey: ['pokemon-detail', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: STALE_TIME,
    retry: RETRY,
  });
}


/**
 * 使用 pokemon 的清單資料 query 函式
 * @function usePokemonListQuery
 */
export function usePokemonListQuery() {
  const queryClient = useQueryClient();

  const queryFn = async (page?: number) => {
    const { results, pagenation } = await getPokemons(page);
    const pokemonDetails = await Promise.all(
      results.map(async({ url }) => {
        const pokemonId = url.split('/').at(-2);
        if (pokemonId) {
          const pokemonDetail = await getPokemonById(pokemonId);
          queryClient.setQueryData(['pokemon-detail', pokemonId], pokemonDetail);
          return pokemonDetail;
        }
        throw new Error(`Pokemon ${pokemonId} not Found`);
      })
    );
    return {
      content: pokemonDetails,
      pagenation,
    }
  }

  return useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: 0,
    getNextPageParam: ({ pagenation }) => pagenation.nextPage,
    staleTime: STALE_TIME,
    retry: RETRY,
  });
}