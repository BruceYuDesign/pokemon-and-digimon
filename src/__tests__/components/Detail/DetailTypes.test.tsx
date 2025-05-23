import { render, screen } from '@testing-library/react';
import DetailTypes from '~/components/Detail/DetailTypes';


describe('<DetailTypes/>', () => {
  const typeColors: Record<string, string> = {
    typeA: 'rgb(255, 0, 0)',
    typeB: 'rgb(0, 255, 0)',
    typeC: 'rgb(0, 0, 255)',
  }
  const types = ['typeC', 'typeB', 'typeA'];


  // 屬性顏色須正確
  test(`types color and text should be correct`, () => {
    render(
      <DetailTypes
        typeColors={typeColors}
        types={types}
        isLoading={false}
      />
    );
    const detailTypesItems = screen.getAllByTestId('detail-types-item');
    detailTypesItems.forEach((detailTypesItem, index) => {
      expect(detailTypesItem.style.backgroundColor).toBe(typeColors[types[index]]);
      expect(detailTypesItem.textContent).toBe(types[index]);
    });
  });


  // 未知屬性顏色須為預設
  test(`should be default color when is unknown type`, () => {
    render(
      <DetailTypes
        typeColors={typeColors}
        types={['typeD']}
        isLoading={false}
      />
    );
    const detailTypesItem = screen.getByTestId('detail-types-item');
    expect(detailTypesItem.style.backgroundColor).toBe('var(--color-background-alt)');
  });


  // 空屬性須顯示 Unknown
  test(`should display Unknown when types is empty`, () => {
    render(
      <DetailTypes
        typeColors={typeColors}
        types={[]}
        isLoading={false}
      />
    );
    const detailTypesUnknown = screen.getByTestId('detail-types-unknown');
    expect(detailTypesUnknown).toBeTruthy();
  });


  // 讀取中，應顯示讀取骨架，不顯示屬性
  test(`should display skeleton and not display types when loading`, () => {
    render(
      <DetailTypes
        typeColors={typeColors}
        types={types}
        isLoading={true}
      />
    );
    const detailTypesSkeleton = screen.getByTestId('detail-types-skeleton');
    const detailTypesContainer = screen.queryByTestId('detail-types-container');
    expect(detailTypesSkeleton).toBeTruthy();
    expect(detailTypesContainer).toBeFalsy();
  });
});