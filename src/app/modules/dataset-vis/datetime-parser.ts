export enum DateStringType {
  year,
  yearWithFloat,
  yearStartWithMarketingYear,
  month,
  season,
  seasonWithMarketingYear,
}

export const dateStringPattern = {
  // pattern 2001.0
  [DateStringType.yearWithFloat]: /^[0-9]{4}\.0$/g,

  // pattern 2001/02, refer to 2001 ~ 2002
  [DateStringType.yearStartWithMarketingYear]: /[0-9]{4}\/[0-9]{2}$/g,

  // pattern 2001/12, refer to 2001. Dec
  [DateStringType.month]: /[0-9]{4}-[0-9]{2}$/g,

  // pattern 2018/19@Q4@03-05, refer to 2018 ~ 2019, Q4, month 3~5
  [DateStringType.season]: /\/[0-9]{2}@Q([1-4])@[0-9]{2}-[0-9]{2}$/g,
  [DateStringType.seasonWithMarketingYear]: /\/[0-9]{2}@MY@[0-9]{2}-[0-9]{2}$/g,
};

export const datetimeParser = (data: any[]) => {
  if (data.length === 0) {
    return data;
  }

  const dateStringType = Object.keys(dateStringPattern).find((patternKey) => {
    return data[0].time.match(dateStringPattern[patternKey]);
  });

  if (!dateStringType) {
    return parsers[DateStringType.year](data);
  }

  return parsers[dateStringType](data);
};

const mean = (data) => {
  if (data.length) {
    const sum = data.reduce((a, b) => a + b);
    return sum / data.length;
  }
  return 0;
};

const parsers = {
  [DateStringType.yearWithFloat]: (data) => {
    data.forEach((d) => {
      const newDateString = d.time.replace(/\.0$/g, '');
      d.time = new Date(newDateString).getFullYear();
    });
    return data;
  },
  [DateStringType.yearStartWithMarketingYear]: (data) => {
    data.forEach((d) => {
      const newDateString = d.time.replace(/\/[0-9]{2}$/g, '');
      d.time = new Date(newDateString).getFullYear();
    });
    return data;
  },
  [DateStringType.month]: (data) => {
    const monthPattern = /([0-9]{4})-[0-9]{2}/;
    const yearIndexMap = new Map();
    const yearValue = [];
    data.forEach((d) => {
      const match = monthPattern.exec(d.time);
      const year = match[1];
      if (yearIndexMap.get(year)) {
        yearValue[yearIndexMap.get(year).index].push(d.value);
      } else {
        yearIndexMap.set(year, { detail: d, index: yearValue.length });
        yearValue.push([d.value]);
      }
    });

    const newData = []
    yearIndexMap.forEach((yearData, year) => {
      const { index, detail } = yearData;
      detail.value = mean(yearValue[index]);
      detail.time = new Date(year).getFullYear();
      newData.push(detail);
    });
    return newData;
  },
  [DateStringType.season]: (data) => {
    const MYPattern = /([0-9]{4})\/([0-9]{2})@MY@([0-9]{2})-[0-9]{2}$/;
    const newData = data.filter((d) => {
      return d.time.match(MYPattern);
    }).map((d) => {
      const match = MYPattern.exec(d.time);
      d.time = new Date(match[1]).getFullYear();
      return d;
    });
    return newData;
  },
  [DateStringType.year]: (data) => {
    data.forEach((d) => {
      d.time = new Date(d.time).getFullYear();
    });
    return data;
  }
};
