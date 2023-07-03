import { renderHook } from "@testing-library/react";
import useCreateSectionList from "../../hooks/useCreateSectionList";

describe("useCityFilter in English", () => {
  const list = [
    { id: 1, name: 'London' },
    { id: 2, name: 'New York' },
    { id: 3, name: 'Paris' },
    { id: 4, name: 'Tokyo' }
  ];

  it('should return the sorted and filtered array when searchQuery is provided', () => {
    const searchQuery = 'y';
    const { result } = renderHook(() => useCreateSectionList(list, searchQuery));

    expect(result.current).toEqual([
      {
        title: 'n',
        data: [{ id: 2, name: 'New York' }],
        sectionId: 0
      },
      {
        title: 't',
        data: [{ id: 4, name: 'Tokyo' }],
        sectionId: 1
      }
    ]);
  });

  it('should return the sorted and unfiltered array when searchQuery is empty', () => {
    const searchQuery = '';
    const { result } = renderHook(() => useCreateSectionList(list, searchQuery));

    expect(result.current).toEqual([
      {
        title: 'l',
        data: [{ id: 1, name: 'London' }],
        sectionId: 0
      },
      {
        title: 'n',
        data: [{ id: 2, name: 'New York' }],
        sectionId: 1
      },
      {
        title: 'p',
        data: [{ id: 3, name: 'Paris' }],
        sectionId: 2
      },
      {
        title: 't',
        data: [{ id: 4, name: 'Tokyo' }],
        sectionId: 3
      }
    ]);
  });

  it('should return an empty array when searchQuery does not match any city names', () => {
    const searchQuery = 'X';
    const { result } = renderHook(() => useCreateSectionList(list, searchQuery));

    expect(result.current).toEqual([]);
  });

  it('should handle an empty list and return an empty array', () => {
    const searchQuery = 'L';
    const { result } = renderHook(() => useCreateSectionList([], searchQuery));

    expect(result.current).toEqual([]);
  });
})