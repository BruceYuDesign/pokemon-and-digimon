import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorRedirectButton from '~/components/ErrorButton/ErrorRedirectButton';


describe('<ErrorRedirectButton/>', () => {
  const mockRedirectHandler = vi.fn();


  // 點選重定向，應執行錯誤處理函式
  test(`'should call errorHandler when click redirect button`, () => {
    render(
      <ErrorRedirectButton
        redirectHandler={mockRedirectHandler}
      />
    );
    const errorRedirectButton = screen.getByTestId('error-redirect-button');
    fireEvent.click(errorRedirectButton);
    expect(mockRedirectHandler).toHaveBeenCalledTimes(1);
  });
});