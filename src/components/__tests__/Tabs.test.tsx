import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Tabs from '../Tabs';

describe('Tabs component', () => {
  const tabs = [{ label: 'Tab1' }, { label: 'Tab2' }, { label: 'Tab3' }];

  it('renders tabs correctly and calls onChange', () => {
    const onChange = jest.fn();

    const { getByTestId, getAllByTestId } = render(
      <Tabs tabs={tabs} activeIndex={0} onChange={onChange} />,
    );

    const tabButtons = getAllByTestId('tab_btn'); // or unique IDs
    expect(tabButtons.length).toBe(tabs.length);

    // Click second tab
    fireEvent.press(tabButtons[1]);
    expect(onChange).toHaveBeenCalledWith(1);

    // Active overlay exists
    expect(getByTestId('active_tab_overlay')).toBeTruthy();
  });

  it('renders SearchBar if showSearchIcon is true', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <Tabs
        tabs={tabs}
        activeIndex={0}
        onChange={() => {}}
        showSearchIcon
        onSearch={onSearch}
      />,
    );

    // Should render SearchBar icon
    const searchBtn = getByTestId('search_toggle_btn');
    expect(searchBtn).toBeTruthy();
    fireEvent.press(searchBtn);

    const searchInput = getByTestId('search_input_field');
    expect(searchInput).not.toBeNull();
    fireEvent.changeText(searchInput, 'test');

    expect(onSearch).toHaveBeenCalledWith('test');
  });
});
