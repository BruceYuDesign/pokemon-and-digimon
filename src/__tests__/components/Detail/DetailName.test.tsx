import { render, screen } from '@testing-library/react';
import DetailName from '~/components/Detail/DetailName';


describe('<DetailName/>', () => {
  const text = 'Character Name';


  // 非讀取中，應顯示文字
  test('should display text when not loading', () => {
    render(
      <DetailName
        name={text}
        isLoading={false}
      />
    );
    const element = screen.getByText(text);
    expect(element).toBeTruthy();
  });


  // 讀取中，不應顯示文字
  test('should not display text when loading', () => {
    render(
      <DetailName
        name={text}
        isLoading={true}
      />
    );
    const element = screen.queryByText(text);
    expect(element).toBeNull();
  });
});