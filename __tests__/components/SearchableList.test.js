
import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Platform, Modal } from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import SearchableList from "../../components/SearchableList";

function WrapperComponent() {
  const [modalVisible, setModalVisible] = useState(true);

  const onSelect = () => setModalVisible(false);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle='pageSheet'
      onRequestClose={() => setModalVisible(false)}
    >
      <SearchableList
        visible={modalVisible}
        list={[]}
        onCancel={() => setModalVisible(false)}
        onSelect={onSelect}
      />
    </Modal>
  );

  /* return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle='pageSheet'
      onRequestClose={() => setModalVisible(false)}
    >
      <Text testID="test-touch-events" />
      <SearchableList
        visible={modalVisible}
        list={[]}
        onCancel={() => setModalVisible(false)}
        onSelect={onSelect}
      />
    </Modal>
  ); */
}

const createEventOprions = (pointVal) => {
  return {
    nativeEvent: {
      pageY: pointVal
    }
  }
}

function simulateSwipeGesture(container, start, end) {
  fireEvent(container, 'touchStart', createEventOprions(start));
  fireEvent(container, 'touchMove', createEventOprions(end));
  fireEvent(container, 'touchEnd');
}

describe('test SearchableList', () => {
  let onCancel, container;

  beforeEach(() => {
    onCancel = jest.fn();

    container = render(<WrapperComponent />).queryByTestId("test-touch-events");
  });


  it('should hide the component when swiping above minSwipeDistance', async () => {
    simulateSwipeGesture(container, 100, 200);
    //container.queryByTestId("test-touch-events");

    console.log(container)
    //expect(container).toBeInTheDocument()

    //console.log(container._fiber.stateNode)
    //expect(onCancel).toHaveBeenCalledWith(false);
  });

/*   it('should hide the component when swiping above minSwipeDistance', async () => {
    simulateSwipeGesture(container, 100, 200);
    expect(onCancel).toHaveBeenCalledWith(false);
  }); */
});


/* function TouchableComponent({ onCancel }) {
  const [onTouchStart, onTouchMove, onTouchEnd] = useVerticalSwipe(onCancel);

  return (
    <View
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        testID="test-touch-events"
    />
  )
}

const createEventOprions = (pointVal) => {
  return {
    nativeEvent: {
      pageY: pointVal
    }
  }
}

function simulateSwipeGesture(container, start, end) {
  fireEvent(container, 'touchStart', createEventOprions(start));
  fireEvent(container, 'touchMove', createEventOprions(end));
  fireEvent(container, 'touchEnd');
}

describe('useSwipeGesture', () => {
  let onCancel = null;
  let container = null;

  beforeEach(() => {
    onCancel = jest.fn();

    container = render(<TouchableComponent onCancel={onCancel} />)
      .getByTestId("test-touch-events")
  });


  it('should call onCancel when swiping above minSwipeDistance', async () => {
    simulateSwipeGesture(container, 100, 200);
    expect(onCancel).toHaveBeenCalledWith(false);
  });
}); */