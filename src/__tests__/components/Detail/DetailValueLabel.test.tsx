import { render, screen } from '@testing-library/react';
import DetailValueLabel from '~/components/Detail/DetailValueLabel';


describe('<DetailValueLabel/>', () => {
  const label = 'Height';
  const unit = 'm';
  const value = 1.7;


  // 標籤、單位和數值須正確
  test(`label, unit and value should be correct`, () => {
    render(
      <DetailValueLabel
        label={label}
        unit={unit}
        value={value}
        isLoading={false}
      />
    );
    const detailValueLabelDescription = screen.getByTestId('detail-value-label-description');
    const detailValueLabelText = screen.getByTestId('detail-value-label-text');
    expect(detailValueLabelDescription.textContent).toBe(label);
    expect(detailValueLabelText.textContent).toBe(`${value} ${unit}`);
  });


  // 無數值應顯示 0
  test(`should display 0 when no value`, () => {
    render(
      <DetailValueLabel
        label={label}
        unit={unit}
        isLoading={false}
      />
    );
    const detailValueLabelText = screen.getByTestId('detail-value-label-text');
    expect(detailValueLabelText.textContent).toBe(`0 ${unit}`);
  });


  // 讀取中，應顯示讀取骨架，不顯示數值
  test(`should display skeleton and not display value when loading`, () => {
    render(
      <DetailValueLabel
        label={label}
        unit={unit}
        isLoading={true}
      />
    );
    const detailValueLabelSkeleton = screen.getByTestId('detail-value-label-skeleton');
    const detailValueLabelText = screen.queryByTestId('detail-value-label-text');
    expect(detailValueLabelSkeleton).toBeTruthy();
    expect(detailValueLabelText).toBeFalsy();
  });
});