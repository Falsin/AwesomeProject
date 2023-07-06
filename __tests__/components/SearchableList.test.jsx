/* eslint-disable one-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, cleanup } from '@testing-library/react-native/pure';
import SearchableList from '../../components/SearchableList';
import {within} from '@testing-library/dom'
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

  afterAll(cleanup);


  describe('Component should render all elements', () => {
    const { getByText, getAllByTestId } = render(<SearchableList list={list} onSelect={onSelect} onCancel={onCancel} />);
    const nodeArr = getAllByTestId('list-item');
    const sortedList = _.sortBy(list, (obj) => obj.name).map;

    //const formatedArr = nodeArr.map(elem => elem._fiber.child.pendingProps);
    const formatedArr = nodeArr.map(elem => {
      console.log(elem._fiber.return.return.return)
    });
    //console.log(formatedArr)
    //expect(nodeArr).toEqual(sortedList)

    /* nodeArr.each(sortedList)(`%#. $name rendered`, (obj) => {
      console.log(obj)
      expect(nodeArr[id]).toHaveTextContent(obj.name)
    }) */
/*     test.each(getAllByTestId('list'))(`name rendered`, obj => (
      expect(obj).toBeTruthy()
    )) */
  })

  /* describe('Component should render all elements', () => {
    const { getByText } = render(<SearchableList list={list} onSelect={onSelect} onCancel={onCancel} />);

    test.each(list)(`$name rendered`, obj => (
      expect(getByText(`${obj.name}`)).toBeTruthy()
    ))
  }) */
})
