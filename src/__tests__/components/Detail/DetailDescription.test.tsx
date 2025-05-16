import { render, screen } from '@testing-library/react';
import DetailDescription from '~/components/Detail/DetailDescription';


describe('<DetailDescription/>', () => {
  const text = 'This is testing description.';


  // 非讀取中，應顯示文字
  test('should display text when not loading', () => {
    render(
      <DetailDescription
        description={text}
        isLoading={false}
      />
    );
    const element = screen.getByText(text);
    expect(element).toBeTruthy();
  });


  // 讀取中，不應顯示文字
  test('should not display text when loading', () => {
    render(
      <DetailDescription
        description={text}
        isLoading={true}
      />
    );
    const element = screen.queryByText(text);
    expect(element).toBeNull();
  });
});