/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable one-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, fireEvent } from '@testing-library/react-native';
import SearchableList from '../../components/SearchableList';
import _ from 'lodash';

describe('test SearchableList', () => {
  const onCancel = jest.fn(),
    onSelect = jest.fn(),
    list = [
      { name: 'Новокузнецк', id: 1 },
      { name: 'Кемерово', id: 2 },
      { name: 'Новосибирск', id: 3 },
      { name: 'Калтан', id: 4 },
      { name: 'Томск', id: 5 },
      { name: 'Барабинск', id: 6 },
      { name: 'Барнаул', id: 7 },
      { name: 'Хабаровск', id: 8 },
      { name: 'Архангельск', id: 9 },
    ];

  it('it should render all the elements from the array', () => {
    const { getAllByTestId } = render(
      <SearchableList
        list={list}
        onSelect={onSelect}
        onCancel={onCancel}
        countElements={100}
      />
    );

    const sortedList = _.sortBy(list, (obj) => obj.name).map(({ name }) => name);
    const renderedList = getAllByTestId('list-item').map(({ _fiber }) => _fiber.child.pendingProps);

    expect(renderedList).toEqual(sortedList);
  });

  it('it should render all the elements from the array if there are cities with the same names', () => {
    const list = [
      { name: 'Новокузнецк', id: 1 },
      { name: 'Кемерово', id: 2 },
      { name: 'Новосибирск', id: 3 },
      { name: 'Калтан', id: 4 },
      { name: 'Томск', id: 5 },
      { name: 'Барабинск', id: 6 },
      { name: 'Барнаул', id: 7 },
      { name: 'Кемерово', id: 11 },
      { name: 'Хабаровск', id: 8 },
      { name: 'Архангельск', id: 9 },
      { name: 'Новосибирск', id: 10 },
    ];

    const { getAllByTestId } = render(
      <SearchableList
        list={list}
        onSelect={onSelect}
        onCancel={onCancel}
        countElements={100}
      />
    );

    const sortedList = _.sortBy(list, (obj) => obj.name).map(({ name }) => name);
    const renderedList = getAllByTestId('list-item').map(({ _fiber }) => _fiber.child.pendingProps);

    expect(renderedList).toEqual(sortedList);
  });

  it('it should render nothing if the array is empty', () => {
    const list = [];

    const { queryAllByTestId } = render(
      <SearchableList
        list={list}
        onSelect={onSelect}
        onCancel={onCancel}
        countElements={100}
      />
    );

    const sortedList = _.sortBy(list, (obj) => obj.name).map(({ name }) => name);
    const renderedList = queryAllByTestId('list-item').map(({ _fiber }) => _fiber.child.pendingProps);

    expect(renderedList).toEqual(sortedList);
  });

  it('it should render city list depend on user input', () => {
    const { getByTestId } = render(
      <SearchableList
        list={list}
        onSelect={onSelect}
        onCancel={onCancel}
        countElements={100}
      />
    );
    fireEvent.changeText(getByTestId('searchBar'), 'Бар');
  })
})

