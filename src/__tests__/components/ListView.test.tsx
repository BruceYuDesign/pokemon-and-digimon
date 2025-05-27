import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListView from '~/components/ListView';
import { DEFAULT_SKELETON_LENGTH } from '~/components/CharacterCardsSkeleton';
import { commonApiConfig } from '~/services/api/common';


describe('<ListView/>', () => {
  // 每一頁的資料量
  const { ITEMS_PER_PAGE } = commonApiConfig;

  // 模擬 IntersectionObserver
  let intersectionCallback: IntersectionObserverCallback;

  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  });

  // 下一頁處理函式
  const mockNextPageHandler = vi.fn();


  // 建立子元件
  const createChildren = (length: number) => {
    return new Array(length).fill(null).map((_, index) =>
      <div
        className='w-full aspect-square'
        key={index}
        data-testid='list-view-item'
      ></div>
    );
  }


  // 應顯示子元件
  test(`should display items`, () => {
    render(
      <ListView
        children={createChildren(ITEMS_PER_PAGE)}
        nextPageHandler={mockNextPageHandler}
        isFetching={false}
        isError={false}
        isPaused={false}
        hasNextPage={false}
      />
    );
    const listViewItems = screen.getAllByTestId('list-view-item');
    expect(listViewItems.length).toBe(ITEMS_PER_PAGE);
  });


  // 應顯示骨架在第一次載入
  test(`should display skeleton when first load`, () => {
    render(
      <ListView
        nextPageHandler={mockNextPageHandler}
        isFetching={true}
        isError={false}
        isPaused={false}
        hasNextPage={false}
      />
    );
    const listViewItems = screen.getAllByTestId('character-cards-skeleton-item');
    expect(listViewItems.length).toBe(DEFAULT_SKELETON_LENGTH);
    fireEvent(listViewItems[0], new Event('intersection'));
  });


  // 應呼叫下一頁處理函式，當下一頁元素進入視窗
  test(`should call nextPageHandler when next page element enter viewport`, () => {
    render(
      <ListView
        children={createChildren(ITEMS_PER_PAGE)}
        nextPageHandler={mockNextPageHandler}
        isFetching={false}
        isError={false}
        isPaused={false}
        hasNextPage={true}
      />
    );
    // 模擬 element 進入 viewport
    intersectionCallback([
      {
        isIntersecting: true,
        target: {} as Element,
        intersectionRatio: 1,
        time: 0,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
      }
    ], {} as IntersectionObserver);
    expect(mockNextPageHandler).toHaveBeenCalled();
  });
});