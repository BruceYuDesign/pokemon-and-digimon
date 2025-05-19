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
    const descriptionElement = screen.getByTestId('description');
    expect(descriptionElement).toBeTruthy();
  });


  // 讀取中，應顯示讀取骨架，不顯示描述文字
  test('should display skeleton and not display description when loading', () => {
    render(
      <DetailDescription
        description={description}
        isLoading={true}
      />
    );
    const skeletonElement = screen.getByTestId('skeleton');
    const descriptionElement = screen.queryByTestId('description');
    expect(skeletonElement).toBeTruthy();
    expect(descriptionElement).toBeFalsy();
  });
});