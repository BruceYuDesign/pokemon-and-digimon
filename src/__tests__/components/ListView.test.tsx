import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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


  // 未有資料，讀取時，應顯示骨架
  test(`should display skeleton when first loading`, () => {
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
    const listViewSpinner = screen.queryByTestId('list-view-spinner');
    expect(listViewSpinner).toBeFalsy();
  });


  // 已有資料，讀取時，應顯示轉圈
  test(`should display spinner when not first loading`, () => {
    render(
      <ListView
        children={createChildren(ITEMS_PER_PAGE)}
        nextPageHandler={mockNextPageHandler}
        isFetching={true}
        isError={false}
        isPaused={false}
        hasNextPage={true}
      />
    );
    const listViewItems = screen.queryAllByTestId('character-cards-skeleton-item');
    expect(listViewItems.length).toBe(0);
    const listViewSpinner = screen.getByTestId('list-view-spinner');
    expect(listViewSpinner).toBeTruthy();
  });


  // 有錯誤，且並非網路斷線，應顯示錯誤訊息
  test(`should display error message when error and not offline`, () => {
    render(
      <ListView
        children={createChildren(ITEMS_PER_PAGE)}
        nextPageHandler={mockNextPageHandler}
        isFetching={true}
        isError={true}
        isPaused={false}
        hasNextPage={true}
      />
    );
    const errorRetryButton = screen.queryByTestId('error-retry-button');
    expect(errorRetryButton).toBeTruthy();
    const offlineMessage = screen.queryByTestId('offline-message');
    expect(offlineMessage).toBeFalsy();
  });


  // 暫停時，應顯示網路斷線提示
  test(`should display offline message when paused`, () => {
    render(
      <ListView
        children={createChildren(ITEMS_PER_PAGE)}
        nextPageHandler={mockNextPageHandler}
        isFetching={true}
        isError={true}
        isPaused={true}
        hasNextPage={true}
      />
    );
    const errorRetryButton = screen.queryByTestId('error-retry-button');
    expect(errorRetryButton).toBeFalsy();
    const offlineMessage = screen.queryByTestId('offline-message');
    expect(offlineMessage).toBeTruthy();
  });


  // 當下一頁元素進入視窗，且有下一頁資料時，應呼叫下一頁處理函式
  test(`should call next page handler when next page element enter viewport`, () => {
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
    expect(mockNextPageHandler).toHaveBeenCalledTimes(1);
  });


  // 當下一頁元素進入視窗，但未有下一頁資料時，不應呼叫下一頁處理函式
  test(`should not call next page handler when does not have next page`, () => {
    mockNextPageHandler.mockClear();
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
    expect(mockNextPageHandler).toHaveBeenCalledTimes(0);
  });
});