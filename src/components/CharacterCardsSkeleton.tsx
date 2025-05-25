/**
 * 預設骨架數量
 */
const DEFAULT_SKELETON_LENGTH = 12;


interface CharacterCardsSkeletonProps {
  /**
   * 骨架數量
   */
  length?: number;
}


/**
 * 角色卡片骨架
 * @function CharacterCardSkeleton
 */
export default function CharacterCardsSkeleton(props: CharacterCardsSkeletonProps) {
  return (
    new Array(props.length || DEFAULT_SKELETON_LENGTH).fill(null).map((_, index) => (
      <div
        className='util-skeleton
        w-full aspect-square rounded-2xl'
        key={index}
        data-testid='character-cards-skeleton-item'
      ></div>
    ))
  );
}