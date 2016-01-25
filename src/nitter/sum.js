import { addMethods } from './nitter';

addMethods({
  sum() {
    const arr = this.arr();
    if (arr !== null) {
      let sum = 0;

      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }

      return sum;
    }

    const iterator = this.iter();
    let sum = 0;
    while (true) {
      const next = iterator.next();
      if (next.done) break;

      sum += next.value;
    }

    return sum;
  }
});
