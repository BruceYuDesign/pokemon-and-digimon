import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailErrorContent from '~/components/Detail/DetailErrorContent';


describe('<DetailErrorContent/>', () => {
  const mockErrorHandler = vi.fn();


  // 應顯示錯誤重試按鈕
  test('should display retry button', () => {
    render(
      <DetailErrorContent
        errorButtonType='retry'
        errorHandler={mockErrorHandler}
      />
    );
    const errorRetryButton = screen.getByTestId('error-retry-button');
    expect(errorRetryButton).toBeTruthy();
  });


  // 應顯示錯誤重定向按鈕
  test('should display redirect button', () => {
    render(
      <DetailErrorContent
        errorButtonType='redirect'
        errorHandler={mockErrorHandler}
      />
    );
    const errorRedirectButton = screen.getByTestId('error-redirect-button');
    expect(errorRedirectButton).toBeTruthy();
  });


  // 點選重試，應執行錯誤處理函式
  test('should call errorHandler when click retry button', () => {
    mockErrorHandler.mockClear();
    render(
      <DetailErrorContent
        errorButtonType='retry'
        errorHandler={mockErrorHandler}
      />
    );
    const errorRetryButton = screen.getByTestId('error-retry-button');
    fireEvent.click(errorRetryButton);
    expect(mockErrorHandler).toHaveBeenCalledTimes(1);
  });


  // 點選重定向，應執行錯誤處理函式
  test('should call errorHandler when click redirect button', () => {
    mockErrorHandler.mockClear();
    render(
      <DetailErrorContent
        errorButtonType='redirect'
        errorHandler={mockErrorHandler}
      />
    );
    const errorRedirectButton = screen.getByTestId('error-redirect-button');
    fireEvent.click(errorRedirectButton);
    expect(mockErrorHandler).toHaveBeenCalledTimes(1);
  });
});