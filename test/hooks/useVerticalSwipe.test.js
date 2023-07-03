import useVerticalSwipe from '../../hooks/useVerticalSwipe';

const createEventOprions = (pointVal) => (
  {
    nativeEvent: {
      pageY: pointVal
    }
  }
)

function simulateSwipeGesture(eventsHandlers, start, end) {
  const [onTouchStart, onTouchMove, onTouchEnd] = eventsHandlers;
  onTouchStart(createEventOprions(start));
  onTouchMove(createEventOprions(end));
  onTouchEnd()
}

describe('useVerticalSwipe', () => {
  let onCancel, eventsHandlers;

  beforeEach(() => {
    onCancel = jest.fn();
    eventsHandlers = useVerticalSwipe(onCancel);
  });


  it('should call onCancel when swiping above minSwipeDistance', async () => {
    simulateSwipeGesture(eventsHandlers, 100, 200);

    expect(onCancel).toHaveBeenCalledWith(false);
  });

  it('should not call onCancel when swiping below minSwipeDistance', () => {
    simulateSwipeGesture(eventsHandlers, 100, 120);

    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should not call onCancel when swiping is in the opposite direction', () => {
    simulateSwipeGesture(eventsHandlers, 200, 100);

    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should not call onCancel when swiping doesn\'t have touchstart point', () => {
    simulateSwipeGesture(eventsHandlers, undefined, 200);

    expect(onCancel).not.toHaveBeenCalled();
  });
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