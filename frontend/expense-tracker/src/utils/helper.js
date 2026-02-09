import moment from 'moment'
export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(2, words.length); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThoushandSeparator = (number) => {
  if (number == null || isNaN(number)) return "";

  const [integerPart, decimalPart] = number.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const result = [];

  data.forEach((item) => {
    const rawDate =
      item.createdAt || item.date || item.expenseDate;

    if (!rawDate) return; // skip bad record

    const month = new Date(rawDate).toLocaleString("en-US", {
      month: "short",
    });

    const found = result.find((r) => r.month === month);

    if (found) {
      found.amount += Number(item.amount || 0);
    } else {
      result.push({
        month,
        amount: Number(item.amount || 0),
      });
    }
  });

  return result;
};

export const prepareIncomeBarChartData = (data = [] ) => {
   const sortedData = [...data].sort((a,b)=> new Date(a.date) - new Date (b.date))

   const chartData = sortedData.map((item) =>({
          month: moment(item?.date).format('Do MMM'),
          amount: item?.amount,
          source: item?.source,

   }));
   return chartData

};
