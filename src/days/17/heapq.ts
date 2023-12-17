const cmplt = function (x: number[], y: number[]) {
  return x < y;
};

const heapq = {
  push: (
    heap: number[][],
    item: number[],
    cmp: (a: number[], b: number[]) => boolean
  ) => {
    heap.push(item);
    siftdown(heap, 0, heap.length - 1, cmp || cmplt);
  },

  // pop the smallest item from heap, O(log n)
  pop: (heap: number[][], cmp: (a: number[], b: number[]) => boolean) => {
    if (heap.length > 0) {
      const last = heap.pop();

      if (heap.length > 0) {
        const head = heap[0];
        heap[0] = last;
        siftup(heap, 0, cmp || cmplt);
        return head;
      } else {
        return last;
      }
    }
  },
  // get the top item, O(1)
  top: (heap: number[][]) => {
    if (heap.length !== 0) {
      return heap[0];
    }
  },

  // push an item on the heap and pop out the top item,
  // this runs more efficiently than `heapq.push()` followed
  // by a separate call to `heapq.pop()`, O(log n)
  pushpop: (
    heap: number[][],
    item: number[],
    cmp_: (a: number[], b: number[]) => boolean
  ) => {
    const cmp = cmp_ || cmplt;

    if (heap.length > 0 && cmp(heap[0], item)) {
      const temp = heap[0];
      heap[0] = item;
      item = temp;
      siftup(heap, 0, cmp);
    }
    return item;
  },

  // transform array `heap` into a heap in-place, O(nlog n)
  heapq: (arr: number[][], cmp: (a: number[], b: number[]) => boolean) => {
    cmp = cmp || cmplt;

    for (let idx = Math.floor(arr.length / 2) - 1; idx >= 0; --idx) {
      siftup(arr, idx, cmp);
    }
    return arr;
  },

  // heap sort, O(nlog n)
  heapsort: (arr: number[][], cmp: (a: number[], b: number[]) => boolean) => {
    const heap: number[][] = [];

    for (let i = 0; i < arr.length; ++i) {
      heapq.push(heap, arr[i], cmp);
    }

    const arr_ = [];

    while (heap.length > 0) {
      arr_.push(heapq.pop(heap, cmp));
    }
    return arr_;
  },
};

const siftdown = (
  heap: number[][],
  startIdx: number,
  idx: number,
  cmp: (a: number[], b: number[]) => boolean
) => {
  const item = heap[idx];

  while (idx > startIdx) {
    const parentIdx = (idx - 1) >> 1;
    const parentItem = heap[parentIdx];
    if (cmp(item, parentItem)) {
      heap[idx] = parentItem;
      idx = parentIdx;
      continue;
    }
    break;
  }

  heap[idx] = item;
};

const siftup = (
  heap: number[][],
  idx: number,
  cmp: (a: number[], b: number[]) => boolean
) => {
  const endIdx = heap.length;
  const startIdx = idx;
  const item = heap[idx];

  let childIdx = idx * 2 + 1;

  while (childIdx < endIdx) {
    const rightIdx = childIdx + 1;

    if (rightIdx < endIdx && !cmp(heap[childIdx], heap[rightIdx])) {
      childIdx = rightIdx;
    }
    heap[idx] = heap[childIdx];
    idx = childIdx;
    childIdx = idx * 2 + 1;
  }

  heap[idx] = item;
  siftdown(heap, startIdx, idx, cmp);
};

export default heapq;
