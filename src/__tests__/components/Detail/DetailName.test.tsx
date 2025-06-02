import { render, screen } from '@testing-library/react';
import DetailName from '~/components/Detail/DetailName';


describe('<DetailName/>', () => {
  const name = 'Character Name';


  // 應顯示文字
  test('should display name', () => {
    render(
      <DetailName
        name={name}
        isLoading={false}
      />
    );
    const detailNameText = screen.getByTestId('detail-name-text');
    expect(detailNameText).toBeTruthy();
  });


  // 讀取中，應顯示讀取骨架，不顯示名字
  test('should display skeleton and not display name when loading', () => {
    render(
      <DetailName
        name={name}
        isLoading={true}
      />
    );
    const detailNameSkeleton = screen.getByTestId('detail-name-skeleton');
    const detailNameText = screen.queryByTestId('detail-name-text');
    expect(detailNameSkeleton).toBeTruthy();
    expect(detailNameText).toBeFalsy();
  });
});