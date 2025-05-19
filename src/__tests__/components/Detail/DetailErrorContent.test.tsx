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
    // TODO 補 test id
    const element = screen.getByText('Retry');
    expect(element).toBeTruthy();
  });


  // 應顯示錯誤重定向按鈕
  test('should display redirect button', () => {
    render(
      <DetailErrorContent
        errorButtonType='redirect'
        errorHandler={mockErrorHandler}
      />
    );
    // TODO 補 test id
    const element = screen.getByText('Redirect');
    expect(element).toBeTruthy();
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
    // TODO 補 test id
    const retryButton = screen.getByRole('button');
    fireEvent.click(retryButton);
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
    // TODO 補 test id
    const redirectButton = screen.getByRole('button');
    fireEvent.click(redirectButton);
    expect(mockErrorHandler).toHaveBeenCalledTimes(1);
  });
});