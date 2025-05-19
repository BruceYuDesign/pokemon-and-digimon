import { render, screen } from '@testing-library/react';
import DetailProgressBar from '~/components/Detail/DetailProgressBar';


describe('<DetailProgressBar/>', () => {
  const label = 'HP';
  const value = 30;
  const maxValue = 300;
  const progressColor = 'rgb(255, 0, 0)';
  const ratio = `${value || 0}/${maxValue}`;
  const percentage = `${(value || 0) / maxValue * 100}%`;


  // 應顯示標籤
  test(`should display label`, () => {
    render(
      <DetailProgressBar
        label={label}
        value={value}
        maxValue={maxValue}
        progressColor={progressColor}
        isLoading={false}
      />
    );
    const labelElement = screen.getByTestId('label');
    expect(labelElement.textContent).toBe(label);
  });


  // 應顯示數值
  test(`should display value`, () => {
    render(
      <DetailProgressBar
        label={label}
        value={value}
        maxValue={maxValue}
        progressColor={progressColor}
        isLoading={false}
      />
    );
    const valueElements = screen.getAllByTestId('value');
    valueElements.forEach(valueElement => {
      expect(valueElement.textContent).toBe(ratio);
    });
  });


  // 進度條顏色須正確
  test(`progress color should be correct`, () => {
    render(
      <DetailProgressBar
        label={label}
        value={value}
        maxValue={maxValue}
        progressColor={progressColor}
        isLoading={false}
      />
    );
    const progressColorElement = screen.getByTestId('progress-color');
    expect(progressColorElement.style.backgroundColor).toBe(progressColor);
  });


  // 進度條寬度須正確
  test(`progress width should be correct`, () => {
    render(
      <DetailProgressBar
        label={label}
        value={value}
        maxValue={maxValue}
        progressColor={progressColor}
        isLoading={false}
      />
    );
    const progressColorElement = screen.getByTestId('progress-color');
    expect(progressColorElement.style.width).toBe(percentage);
  });


  // 讀取中應顯示骨架讀取，不顯示進度條
  test(`should display skeleton and hide progress bar when loading`, () => {
    render(
      <DetailProgressBar
        label={label}
        value={value}
        maxValue={maxValue}
        progressColor={progressColor}
        isLoading={true}
      />
    );
    const skeletonElement = screen.getByTestId('skeleton');
    const progressBarElement = screen.queryByTestId('progress-bar');
    expect(skeletonElement).toBeTruthy();
    expect(progressBarElement).toBeFalsy();
  });
});