import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';


describe('<PageHeader/>', () => {
  const textColor = 'rgb(255, 255, 255)';
  const backgroundColor = 'rgb(255, 0, 0)';
  const pageName = 'Page Name';
  const prevPageName = 'Home';
  const prevPageUrl = '/';


  beforeEach(() => {
    render(
      <MemoryRouter>
        <PageHeader
          textColor={textColor}
          backgroundColor={backgroundColor}
          pageName={pageName}
          prevPageName={prevPageName}
          prevPageUrl={prevPageUrl}
        />
      </MemoryRouter>
    );
  });


  // 應顯示網路離線訊息
  test('should display current colors', () => {
    const pageHeaderContainer = screen.getByTestId('page-header-container');
    expect(pageHeaderContainer.style.color).toBe(textColor);
    expect(pageHeaderContainer.style.backgroundColor).toBe(backgroundColor);
  });


  // 應顯示網路離線訊息
  test('should display current page name', () => {
    const pageHeaderCurrentName = screen.getByTestId('page-header-current-name');
    expect(pageHeaderCurrentName.textContent).toBe(pageName);
  });


  // 應顯示網路離線訊息
  test('should display current previous page name and current url', () => {
    const pageHeaderPrevLink = screen.getByTestId('page-header-prev-link');
    expect(pageHeaderPrevLink.textContent).toBe(prevPageName);
    expect(pageHeaderPrevLink.getAttribute('href')).toBe(prevPageUrl);
  });
});