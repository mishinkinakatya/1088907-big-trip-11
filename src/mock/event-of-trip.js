import {EVENT_POINT, EVENT_ACTIVITY, EVENT_TRANSPORT, EVENT_DESTINATION, EVENT_DESCRIPTION, priceToOffer} from "../const.js";
import {generateRandomArrayItem, getRandomIntegeNumber, calculateEventDuration, getRandomStartDate, getRandomEndDate, generateRandomArrayFromAnother} from "../utils/common.js";

const generateDayEvent = () => {

  const point = generateRandomArrayItem(EVENT_POINT);
  const startDate = getRandomStartDate();
  const endDate = getRandomEndDate(startDate);
  const durationInMs = Date.parse(endDate) - Date.parse(startDate);
  const DescriptionLength = {
    min: 0,
    max: 5,
  };

  return {
    type: (point === `Check`) ? `check-in` : point,
    title: generateTitle(point),
    price: getRandomIntegeNumber(0, 100),
    startDate,
    endDate,
    durationInMs,
    duration: calculateEventDuration(durationInMs),
    offers: generateOffers(priceToOffer),
    activity: EVENT_ACTIVITY,
    transport: EVENT_TRANSPORT,
    destination: EVENT_DESTINATION,
    description: generateRandomArrayFromAnother(EVENT_DESCRIPTION, DescriptionLength.min, DescriptionLength.max),
    photos: generatePhotoSrc(getRandomIntegeNumber(1, 5)),
  };
};

const generateDayEvents = (count) => {
  return new Array(count).fill(``).map(generateDayEvent);
};

const generateTitle = (point) => {
  let direction = ``;

  if (EVENT_ACTIVITY.includes(point)) {
    direction = `in`;
  }
  if (EVENT_TRANSPORT.includes(point)) {
    direction = `to`;
  }
  return `${point} ${direction} ${generateRandomArrayItem(EVENT_DESTINATION)}`;
};

const generateOffers = (offers) => {
  const allOffers = Object.entries(offers);
  const offersWithCheck = [];
  allOffers.forEach((offer) => {
    offersWithCheck.push(
        {
          type: offer[0],
          price: offer[1],
          isChecked: Math.random() > 0.5,
        });
  });
  return generateRandomArrayFromAnother(offersWithCheck, 0, offersWithCheck.length);
};

const generatePhotoSrc = (count) => {
  const allPhotos = [];
  for (let i = 0; i < count; i++) {
    allPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return allPhotos;
};

export {generateDayEvents};
