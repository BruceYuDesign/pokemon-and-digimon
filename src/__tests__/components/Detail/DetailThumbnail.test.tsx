import { render, screen } from '@testing-library/react';
import DetailThumbnail from '~/components/Detail/DetailThumbnail';
import CharacterImage from '~/__tests__/assets/images/character.png';


describe('<DetailThumbnail/>', () => {
  const backgroundColor = 'rgb(255, 0, 0)';
  const alt = 'Character Name';


  // 背景色須正確
  test(`background color should be correct`, () => {
    render(
      <DetailThumbnail
        image={CharacterImage}
        backgroundColor={backgroundColor}
        alt={alt}
        isLoading={false}
      />
    );
    const detailThumbnailContainer = screen.getByTestId('detail-thumbnail-container');
    expect(detailThumbnailContainer.style.backgroundColor).toBe(backgroundColor);
  });


  // 讀取中應顯示骨架讀取，不顯示圖片
  test(`should display skeleton and hide thumbnail when loading`, () => {
    render(
      <DetailThumbnail
        image={CharacterImage}
        backgroundColor={backgroundColor}
        alt={alt}
        isLoading={true}
      />
    );
    const detailThumbnailSkeleton = screen.getByTestId('detail-thumbnail-skeleton');
    const detailThumbnailContainer = screen.queryByTestId('detail-thumbnail-container');
    expect(detailThumbnailSkeleton).toBeTruthy();
    expect(detailThumbnailContainer).toBeFalsy();
  });
});