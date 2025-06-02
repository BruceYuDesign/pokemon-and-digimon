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
    const detailProgressBarLabel = screen.getByTestId('detail-progress-bar-label');
    expect(detailProgressBarLabel.textContent).toBe(label);
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
    const detailProgressBarRatios = screen.getAllByTestId('detail-progress-bar-ratio');
    detailProgressBarRatios.forEach(detailProgressBarRatio => {
      expect(detailProgressBarRatio.textContent).toBe(ratio);
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
    const detailProgressBarColor = screen.getByTestId('detail-progress-bar-color');
    expect(detailProgressBarColor.style.backgroundColor).toBe(progressColor);
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
    const detailProgressBarColor = screen.getByTestId('detail-progress-bar-color');
    expect(detailProgressBarColor.style.width).toBe(percentage);
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
    const detailProgressBarSkeleton = screen.getByTestId('detail-progress-bar-skeleton');
    const detailProgressBarContainer = screen.queryByTestId('detail-progress-bar-container');
    expect(detailProgressBarSkeleton).toBeTruthy();
    expect(detailProgressBarContainer).toBeFalsy();
  });
});