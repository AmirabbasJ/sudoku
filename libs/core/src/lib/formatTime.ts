// type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// type Seconds = `${0 | 1 | 2 | 3 | 5}${Digit}`;
// type Minutes = `${0 | 1 | 2 | 3 | 5}${Digit}`;
// type Hour = `${number}`;

// type Time = `${Hour}:${Minutes}:${Seconds}`;

const pad2 = (x: number) => x.toString().padStart(2, '0');

export const formatTime = (second: number) => {
  const leftSeconds = second;
  const leftMinutes = Math.floor(leftSeconds / 60);

  const hours = Math.floor(leftMinutes / 60);
  const seconds = leftSeconds % 60;
  const minutes = leftMinutes % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
};
