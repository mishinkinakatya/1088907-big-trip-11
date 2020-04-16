const EVENT_ACTIVITY = [
  `Check`,
  `Sightseeing`,
  `Restaurant`,
];

const EVENT_TRANSPORT = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];

const EVENT_POINT = EVENT_TRANSPORT.concat(EVENT_ACTIVITY);

const EVENT_DESTINATION = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Saint Petersburg`,
];

const priceToOffer = {
  'Order Uber': `20`,
  'Add luggage': `30`,
  'Switch to comfort class': `100`,
  'Add meal': `15`,
  'Choose seats': `5`,
  'Travel by train': `40`,
  'Rent a car': `200`,
  'Add breakfast': `50`,
  'Book tickets': `40`,
  'Lunch in city': `30`,
};

const EVENT_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const MONTH = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUNE`, `JULY`, `AUG`, `SEPT`, `OCT`, `NOV`, `DEC`];

export {EVENT_ACTIVITY, EVENT_TRANSPORT, EVENT_POINT, EVENT_DESTINATION, priceToOffer, EVENT_DESCRIPTION, MONTH};