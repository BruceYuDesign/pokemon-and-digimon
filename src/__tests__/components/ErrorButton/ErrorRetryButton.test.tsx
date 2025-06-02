import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorRetryButton from '~/components/ErrorButton/ErrorRetryButton';


describe('<ErrorRetryButton/>', () => {
  const mockRetryHandler = vi.fn();


  // 點選重試，應執行錯誤處理函式
  test(`'should call errorHandler when click retry button`, () => {
    render(
      <ErrorRetryButton
        retryHandler={mockRetryHandler}
      />
    );
    const errorRetryButton = screen.getByTestId('error-retry-button');
    fireEvent.click(errorRetryButton);
    expect(mockRetryHandler).toHaveBeenCalledTimes(1);
  });
});