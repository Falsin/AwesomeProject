import { useMemo } from 'react';
import _ from 'lodash';

export default (list, searchQuery) => {
  const sortedArr = useMemo(() => (
    _.sortBy(list, (obj) => _.trim(obj.name))
  ), [list]);

  const filterArr = useMemo(() => (
    !searchQuery
      ? sortedArr
      : sortedArr.filter((obj) => _.toLower(obj.name).includes(_.toLower(searchQuery)))
  ), [sortedArr, searchQuery]);

  return useMemo(() => {
    const objCities = {};

    filterArr.forEach((item) => {
      const key = _.toLower(item.name.slice(0, 1));

      if (!objCities[key]) {
        objCities[key] = [item];
      } else {
        objCities[key].push(item);
      }
    });

    return _.toPairs(objCities).map(([key, arr], id) => ({
      title: key,
      data: arr,
      sectionId: id,
    }));
  }, [filterArr]);
};
