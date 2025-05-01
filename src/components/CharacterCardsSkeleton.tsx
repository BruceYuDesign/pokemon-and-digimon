/**
 * 角色卡片骨架
 * @function CharacterCardSkeleton
 */
export default function CharacterCardsSkeleton() {
  // 建立空陣列
  const emptyList = new Array(12).fill(null);


  return (
    emptyList.map((_, index) => (
      <div
        className='util-skeleton
        w-full aspect-square rounded-2xl'
        key={index}
      ></div>
    ))
  );
}