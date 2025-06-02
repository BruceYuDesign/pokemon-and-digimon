import { render, screen } from '@testing-library/react';
import DetailDescription from '~/components/Detail/DetailDescription';


describe('<DetailDescription/>', () => {
  const description = 'This is testing description.';


  // 應顯示描述文字
  test('should display description', () => {
    render(
      <DetailDescription
        description={description}
        isLoading={false}
      />
    );
    const DetailDescriptionText = screen.getByTestId('detail-description-text');
    expect(DetailDescriptionText).toBeTruthy();
  });


  // 讀取中，應顯示讀取骨架，不顯示描述文字
  test('should display skeleton and not display description when loading', () => {
    render(
      <DetailDescription
        description={description}
        isLoading={true}
      />
    );
    const detailDescriptionSkeleton = screen.getByTestId('detail-description-skeleton');
    const detailDescriptionText = screen.queryByTestId('detail-description-text');
    expect(detailDescriptionSkeleton).toBeTruthy();
    expect(detailDescriptionText).toBeFalsy();
  });
});