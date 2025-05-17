import { render, screen } from '@testing-library/react';
import DetailOfflineContent from '~/components/Detail/DetailOfflineContent';


describe('<DetailOfflineContent/>', () => {


  // 應顯示網路離線訊息
  test('should display offline message', () => {
    render(
      <DetailOfflineContent/>
    );

    const element = screen.getByText('Check your internet connection');
    expect(element).toBeTruthy();
  });
});