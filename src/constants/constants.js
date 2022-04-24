export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const formatTime = (unix_timestamp) => {
  let date = new Date(unix_timestamp);
  let hours = date.getHours();
  let minutes = '0' + date.getMinutes();
  let seconds = '0' + date.getSeconds();

  let formattedTime =
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
};

export const formatCurrency = (amount) => {
  if (!isNaN(amount))
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  else return amount;
};
