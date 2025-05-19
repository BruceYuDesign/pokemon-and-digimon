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
    const nameElement = screen.getByTestId('name');
    expect(nameElement).toBeTruthy();
  });


  // 讀取中，應顯示讀取骨架，不顯示名字
  test('should display skeleton and not display text when loading', () => {
    render(
      <DetailName
        name={name}
        isLoading={true}
      />
    );
    const skeletonElement = screen.getByTestId('skeleton');
    const nameElement = screen.queryByTestId('name');
    expect(skeletonElement).toBeTruthy();
    expect(nameElement).toBeFalsy();
  });
});