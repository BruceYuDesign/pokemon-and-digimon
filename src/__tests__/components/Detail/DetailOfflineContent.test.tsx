import { render, screen } from '@testing-library/react';
import DetailOfflineContent from '~/components/Detail/DetailOfflineContent';


describe('<DetailOfflineContent/>', () => {


  // 應顯示網路離線訊息
  test('should display offline message', () => {
    render(
      <DetailOfflineContent/>
    );
    const offlineMessageContainer = screen.getByTestId('offline-message-container');
    expect(offlineMessageContainer).toBeTruthy();
  });
});