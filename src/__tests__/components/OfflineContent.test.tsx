import { render, screen } from '@testing-library/react';
import OfflineMessage from '~/components/OfflineMessage';


describe('<DetailOfflineContent/>', () => {


  // 應顯示網路離線訊息
  test('should display offline message', () => {
    render(
      <OfflineMessage/>
    );
    const offlineMessage = screen.getByTestId('offline-message');
    expect(offlineMessage).toBeTruthy();
  });
});