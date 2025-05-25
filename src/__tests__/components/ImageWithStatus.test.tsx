import { render, screen, fireEvent } from '@testing-library/react';
import ImageWithStatus, { ERROR_RETRY_LIMIT } from '~/components/ImageWithStatus';
import CharacterImage from '~/__tests__/assets/images/character.png';


describe('<ImageWithStatus/>', () => {
  const className = 'w-[100px]';
  const alt = 'Character Name';
  const width = 60;
  const height = 60;


  // 尚未讀取完，應顯示讀取 icon 並隱藏圖片
  test(`should not display image when unloaded`, () => {
    render(
      <ImageWithStatus
        src={CharacterImage}
        className={className}
        alt={alt}
        width={width}
        height={height}
      />
    );
    const imageWithStatusLoad = screen.getByTestId('image-with-status-load');
    const imageWithStatusImg = screen.getByTestId('image-with-status-img');
    expect(imageWithStatusLoad).toBeTruthy();
    expect(imageWithStatusImg.style.opacity).toBe('0');
  });


  // 已讀取完，應顯示圖片，移除讀取 icon
  test(`should display image when loaded`, () => {
    render(
      <ImageWithStatus
        src={CharacterImage}
        className={className}
        alt={alt}
        width={width}
        height={height}
      />
    );
    const imageWithStatusImg = screen.getByTestId('image-with-status-img');
    fireEvent.load(imageWithStatusImg);
    const imageWithStatusLoad = screen.queryByTestId('image-with-status-load');
    expect(imageWithStatusLoad).toBeFalsy();
    expect(imageWithStatusImg.style.opacity).toBe('1');
  });


  // 讀取失敗，應顯示錯誤 icon 並隱藏圖片，並支援點選重試
  test(`should display error icon when error, and support retry when click`, () => {
    render(
      <ImageWithStatus
        src={CharacterImage}
        className={className}
        alt={alt}
        width={width}
        height={height}
      />
    );
    // 錯誤重試
    const imageWithStatusImg = screen.getByTestId('image-with-status-img');
    for (let i = 0; i < ERROR_RETRY_LIMIT + 1; i++) {
      fireEvent.error(imageWithStatusImg);
    }
    // 讀取失敗
    const imageWithStatusError = screen.getByTestId('image-with-status-error');
    expect(imageWithStatusError).toBeTruthy();
    expect(imageWithStatusImg.style.opacity).toBe('0');
    // 點選重試
    fireEvent.click(imageWithStatusError);
    const imageWithStatusLoad = screen.queryByTestId('image-with-status-load');
    expect(imageWithStatusLoad).toBeTruthy();
  });
});