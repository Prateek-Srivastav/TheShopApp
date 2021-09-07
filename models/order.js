import "intl";
import "intl/locale-data/jsonp/en";

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    const month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const date = this.date;

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AMPM = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + AMPM;

    let datePrefix;
    if (date.getDate() === 1 || date.getDate() === 21) datePrefix = "st ";
    else if (date.getDate() === 2 || date.getDate() === 22) datePrefix = "nd ";
    else if (date.getDate() === 3 || date.getDate() === 23) datePrefix = "rd ";
    else datePrefix = "th ";

    return (
      month[date.getMonth()] +
      " " +
      date.getDate() +
      datePrefix +
      date.getFullYear() +
      ", " +
      strTime
    );
  }
}

export default Order;
