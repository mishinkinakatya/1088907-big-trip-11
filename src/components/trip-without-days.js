import AbstractComponent from "./abstract-component.js";

/** @return {*} Функция, которая возвращает разметку компонента "Маршрут без разделения по дням" */
const createTripWithoutDaysTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info"></div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

/** Компонент: "Маршрут без разделения по дням" */
export default class TripWithoutDays extends AbstractComponent {
  constructor() {
    super();
    this._points = [];
  }

  /** @return {*} Метод, который возвращает разметку компонента "Маршрут без разделения по дням" */
  getTemplate() {
    return createTripWithoutDaysTemplate(this._points);
  }

  render(points) {
    this._points = points;
    return this.getTemplate();
  }
}
