/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable arrow-parens */
export default (callback) => {
  let touchStart = null;
  let touchEnd = null;
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd = null;
    touchStart = e.nativeEvent.pageY;
  };

  const onTouchMove = e => touchEnd = e.nativeEvent.pageY;

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return null;

    const distance = touchEnd - touchStart;
    if (distance >= minSwipeDistance) {
      callback();
    }
  };

  return [onTouchStart, onTouchMove, onTouchEnd];
};
