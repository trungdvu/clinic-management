import moment from "moment";
export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

const isLeapYear = (year): boolean =>
  year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);

export const getNumberDayOfMonth = (month: number, year: number): number => {
  console.log("month", month);
  console.log("Month", Month);

  switch (month) {
    case Month.January:
    case Month.March:
    case Month.May:
    case Month.July:
    case Month.August:
    case Month.October:
    case Month.December:
      return 31;

    case Month.February:
      if (isLeapYear(year)) return 29;
      return 28;

    default:
      return 30;
  }
};

export const formatDate = (date: any) => {
  const parsedDate: string = moment.utc(date).format("DD/MM/YYYY");
  const pieces: string[] = parsedDate.split("/");

  const day: number = parseInt(pieces[0]);
  const month: number = parseInt(pieces[1]);
  const year: number = parseInt(pieces[2]);

  return [day, month, year];
};
