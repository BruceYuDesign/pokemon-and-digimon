import { render, screen } from '@testing-library/react';
import CharacterCardsSkeleton from '~/components/CharacterCardsSkeleton';


describe('<CharacterCardsSkeleton/>', () => {


  // 預設角色卡片骨架數量須為 12
  test(`character skeleton cards default length should be 12`, () => {
    render(
      <CharacterCardsSkeleton/>
    );
    const CharacterCardsSkeletonItem = screen.getAllByTestId('character-cards-skeleton-item');
    expect(CharacterCardsSkeletonItem.length).toBe(12);
  });


  // 角色卡片骨架數量須正確
  test(`character skeleton cards length should be correct`, () => {
    render(
      <CharacterCardsSkeleton
        length={4}
      />
    );
    const CharacterCardsSkeletonItem = screen.getAllByTestId('character-cards-skeleton-item');
    expect(CharacterCardsSkeletonItem.length).toBe(4);
  });
});