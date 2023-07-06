/* eslint-disable one-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Modal, View, Text } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';
import SearchableList from '../../components/SearchableList';
import useVerticalSwipe from '../../hooks/useVerticalSwipe';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import { waitFor } from '@testing-library/dom';
import List from '../../components/List';
import useCreateSectionList from '../../hooks/useCreateSectionList';

/* function WrapperComponent() {
  const [modalVisible, setModalVisible] = useState(true);

  const onSelect = () => setModalVisible(false);
  const [onTouchStart, onTouchMove, onTouchEnd] = useVerticalSwipe(() => setModalVisible(false));

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
      testID="test-touch-events1"
    >
      <SearchableList
        list={[]}
        onCancel={() => setModalVisible(false)}
        onSelect={onSelect}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    </Modal>
  );
} */


function Hello({name = 'World'}) {
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  );
}

/* const list = [
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
] */

const citiesList = [
  { id: 1, name: 'London' },
  { id: 2, name: 'New York' },
  { id: 3, name: 'Paris' },
  { id: 4, name: 'Tokyo' }
]

describe('test SearchableList', () => {
  const list = [
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
  let onCancel = null, 
    onSelect = null,
    getByText;

  beforeAll(() => {})

  beforeEach(() => {
    onCancel = jest.fn();
    onSelect = jest.fn();
  });

  

/*   list.forEach(item => {
    it("it include the city name", () => {
      render(<Hello name={item.name} />);
      screen.debug();
      expect(screen.getByText(`Hello, ${item.name}!`)).toBeDefined();
    })
  }) */
  

  /* list.forEach(item => {
    it("it include the city name", () => {
      render(<SearchableList
        list={list} 
        onCancel={onCancel} 
        onSelect={onSelect}
      />);
      screen.debug();
      expect(screen.getByText(`${item.name}`)).toBeDefined();
    })
  }) */

  test.each(list)("it include all city names", (item => {
    const { getByText } = render(<SearchableList list={list} onSelect={onSelect} onCancel={onCancel} />);
    expect(getByText(`${item.name}`)).toBeDefined();
    /* render(<SearchableList list={list} onSelect={onSelect} onCancel={onCancel} />);
    expect(screen.getByText(`${item.name}`)).toBeDefined(); */
  }))

/*   it('should hide the component when swiping above minSwipeDistance', () => {
    render(<Hello name="Kalle" />);
    screen.debug();
    expect(screen.getByText('Hello, Kalle!')).toBeDefined();
  }) */
})
/*   it('should hide the component when swiping above minSwipeDistance', () => {
   const { getByTestId, queryByTestId, getAllByTestId, getAllByText, getByText, root } = render(
      <SearchableList
        list={list} 
        onCancel={onCancel} 
        onSelect={onSelect}
      />
    );

    console.log(root)

    render(<Hello name="Kalle" />);
    screen.debug();
    expect(screen.getByText('Hello, Kalle!')).toBeDefined();

    //console.log(getAllByTestId('list-item').map(item => item._fiber.return))

    //console.log(getByTestId('list')._fiber)\\

    const testRenderer = renderer.create(
      <SearchableList
        list={list} 
        onCancel={onCancel} 
        onSelect={onSelect}
      />
    ).toJSON().children[2].children[0].children.reduce((prev, curr) => {
      if (curr.children) {
        return [...prev, curr.children]
      } 
      return prev;
    }, [])

    //console.log(getAllByTestId('list-item').length);
  });
}); */

/* function WrapperComponent() {
  const [modalVisible, setModalVisible] = useState(true);

  const onSelect = () => setModalVisible(false);
  const [onTouchStart, onTouchMove, onTouchEnd] = useVerticalSwipe(() => setModalVisible(false));

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
      testID="test-touch-events1"
    >
      <SearchableList
        list={[]}
        onCancel={() => setModalVisible(false)}
        onSelect={onSelect}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    </Modal>
  );
}

const createEventOprions = (pointVal) => ({
  nativeEvent: {
    pageY: pointVal,
  },
});

function simulateSwipeGesture(container, start, end) {
  fireEvent(container, 'touchStart', createEventOprions(start));
  fireEvent(container, 'touchMove', createEventOprions(end));
  fireEvent(container, 'touchEnd');
}

describe('test SearchableList', () => {
  let onCancel = null, 
    container = null;

  beforeEach(() => {
    onCancel = jest.fn();

    container = render(<WrapperComponent />).queryByTestId('test-touch-events');
  });

  it('should hide the component when swiping above minSwipeDistance', async () => {
    const { getByTestId, queryByTestId } = render(<WrapperComponent />);
    simulateSwipeGesture(getByTestId("test-touch-events2"), 100, 200);
    await waitFor(() => {
      expect(queryByTestId("searchable-list")).not.toBeInTheDocument()
    })
  });
}); */
