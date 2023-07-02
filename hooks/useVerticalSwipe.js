export default (onCancel) => {
  let touchStart = null;
  let touchEnd = null;
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd = null;
    touchStart = e.nativeEvent.pageY;
  }

  const onTouchMove = e => touchEnd = e.nativeEvent.pageY;

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return null;

    const distance = touchEnd - touchStart;
    if (distance >= minSwipeDistance) {
      onCancel(false)
    }
  }

  return [onTouchStart, onTouchMove, onTouchEnd];
}