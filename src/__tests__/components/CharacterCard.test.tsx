import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import CharacterCard from '~/components/CharacterCard';
import CharacterImage from '~/__tests__/assets/images/character.png';


describe('<CharacterCard/>', () => {
  const name = 'Character Name';
  const textColor = 'rgb(255, 255, 255)';
  const backgroundColor = 'rgb(255, 0, 0)';
  const mockOnClick = vi.fn();


  // 在視窗內應渲染角色卡片
  test(`should display character card when in view`, () => {
    render(
      <CharacterCard
        name={name}
        thumbnail={CharacterImage}
        textColor={textColor}
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
      />
    );
    mockAllIsIntersecting(true);
    const characterCardContent = screen.getByTestId('character-card-content');
    expect(characterCardContent).toBeTruthy();
  });


  // 在視窗外不應渲染角色卡片
  test(`should not display character card when out of view`, () => {
    render(
      <CharacterCard
        name={name}
        thumbnail={CharacterImage}
        textColor={textColor}
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
      />
    );
    mockAllIsIntersecting(false);
    const characterCardContent = screen.queryByTestId('character-card-content');
    expect(characterCardContent).toBeFalsy();
  });


  // 應顯示角色名
  test(`should display character name`, () => {
    render(
      <CharacterCard
        name={name}
        thumbnail={CharacterImage}
        textColor={textColor}
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
      />
    );
    mockAllIsIntersecting(true);
    const characterCardName = screen.getByTestId('character-card-name');
    expect(characterCardName.textContent).toBe(name);
  });


    // 應顯示角色名
    test(`should display Unknown when character name is empty`, () => {
      render(
        <CharacterCard
          thumbnail={CharacterImage}
          textColor={textColor}
          backgroundColor={backgroundColor}
          onClick={mockOnClick}
        />
      );
      mockAllIsIntersecting(true);
      const characterCardName = screen.getByTestId('character-card-name');
      expect(characterCardName.textContent).toBe('Unknown');
    });
  


  // 應顯示正確的文字顏色
  test(`should display correct text color`, () => {
    render(
      <CharacterCard
        name={name}
        thumbnail={CharacterImage}
        textColor={textColor}
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
      />
    );
    mockAllIsIntersecting(true);
    const characterCardName = screen.getByTestId('character-card-name');
    expect(characterCardName.style.color).toBe(textColor);
  });


  // 應顯示正確的背景顏色
  test(`should display correct background color`, () => {
    render(
      <CharacterCard
        name={name}
        thumbnail={CharacterImage}
        textColor={textColor}
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
      />
    );
    mockAllIsIntersecting(true);
    const characterCardContent = screen.getByTestId('character-card-content');
    expect(characterCardContent.style.backgroundColor).toBe(backgroundColor);
  });
});