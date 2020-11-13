export const maxRisk = (first: number, second: number, third: number, fourth: number) => {
  const firstRisk = first / ((first / second) + (first / third)) * fourth;
  const secondRisk = second / ((second / first) + (second / third)) * fourth;
  const thirdRisk = third / ((third / first) + (third / second)) * fourth;

  const maxValue = Math.max(firstRisk, secondRisk, thirdRisk);
  let maxName = '';

  if (firstRisk === maxValue) {
    maxName = 'first';
  }

  if (secondRisk === maxValue) {
    maxName = 'second';
  }

  if (thirdRisk === maxValue) {
    maxName = 'third';
  }

  return {
    name: maxName,
    value: maxValue
  };
};

export const sumValues = (first: number, second: number, third: number, fourth: number) => {
  return first + second + third + fourth;
};