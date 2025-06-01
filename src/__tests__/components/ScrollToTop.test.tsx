import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop, { ignorePathnames } from '~/components/ScrollToTop';


describe('<ScrollToTop/>', () => {


  beforeEach(() => {
    window.scrollTo = vi.fn();
  });


  afterEach(() => {
    vi.restoreAllMocks();
  });


  // 頁面應置頂
  test('should display offline message', () => {
    render(
      <MemoryRouter>
        <ScrollToTop/>
      </MemoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });


  // 若在忽略清單中不應置頂
  test('should not scroll to top when it is in ignorePathnames', () => {
    render(
      <MemoryRouter
        initialEntries={[ignorePathnames[0]]}
      >
        <ScrollToTop/>
      </MemoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledTimes(0);
  });
});