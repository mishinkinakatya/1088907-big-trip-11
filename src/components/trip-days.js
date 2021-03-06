import AbstractComponent from "./abstract-component.js";
import DayOfTripComponent from "./day-of-trip.js";
import TripWithoutDaysComponent from "./trip-without-days.js";
import {PointMode, SortType} from "../const.js";
import {render, renderElementToElement, remove, replaceElement, RenderPosition} from "../utils/render.js";
import moment from "moment";

const createTripDaysTemplate = () => `<ul class="trip-days"></ul>`;

export default class TripDays extends AbstractComponent {
  constructor() {
    super();
    this._daysOfTrip = [];

    this._tripWithoutDays = new TripWithoutDaysComponent();

    this._viewChangeObserverHandler = this._viewChangeObserverHandler.bind(this);
  }

  getTemplate() {
    return createTripDaysTemplate();
  }

  render(container, points, sortType) {

    render(container, this, RenderPosition.BEFOREEND);

    if (sortType === SortType.EVENT) {
      this._renderDaysOfTrip(points);
    } else {
      render(this.getElement(), this._tripWithoutDays, RenderPosition.BEFOREEND);
      points.forEach((point) => {
        const pointView = point.getView();
        renderElementToElement(this._tripWithoutDays.getElement().querySelector(`.trip-events__list`), pointView, RenderPosition.BEFOREEND);
        point.setViewChangeObserver(this._viewChangeObserverHandler);
      });
    }
  }

  clear() {
    remove(this._tripWithoutDays);
    this._daysOfTrip.forEach((day) => remove(day));
  }

  _renderDaysOfTrip(pointsControllers) {
    if (pointsControllers.length === 0) {
      return;
    }
    const existedPoints = pointsControllers.filter((point) => point.getModel().getMode() !== PointMode.ADDING);
    const daysOfPoints = this._getPointsDays(existedPoints);
    const uniqueSortDays = Array.from(new Set(daysOfPoints)).sort();
    const addingPoint = pointsControllers.filter((model) => model.getModel().getMode() === PointMode.ADDING)[0];

    if (addingPoint !== undefined) {
      const dayOfTrip = new DayOfTripComponent();
      render(this.getElement(), dayOfTrip, RenderPosition.BEFOREEND);
      const pointView = addingPoint.getView();
      renderElementToElement(dayOfTrip.getElement().querySelector(`.trip-events__list`), pointView, RenderPosition.BEFOREEND);
      addingPoint.setViewChangeObserver(this._viewChangeObserverHandler);
      this._daysOfTrip.push(dayOfTrip);
    }

    uniqueSortDays.map((it, i) => {
      const dayOfTrip = new DayOfTripComponent(i + 1, it);
      render(this.getElement(), dayOfTrip, RenderPosition.BEFOREEND);

      const tripDay = dayOfTrip.getElement().querySelector(`.day__date`).getAttribute(`dateTime`);
      const tripDate = moment(tripDay).date();
      const tripMonth = moment(tripDay).month();

      existedPoints.filter((point) => {
        const pointDate = moment(point.getModel().getActualPoint().startDate).date();
        const pointMonth = moment(point.getModel().getActualPoint().startDate).month();

        return tripMonth === pointMonth && tripDate === pointDate;
      }).map((point) => {
        const pointView = point.getView();
        renderElementToElement(dayOfTrip.getElement().querySelector(`.trip-events__list`), pointView, RenderPosition.BEFOREEND);
        point.setViewChangeObserver(this._viewChangeObserverHandler);
      });

      this._daysOfTrip.push(dayOfTrip);
    });
  }

  _getPointsDays(pointsControllers) {
    const points = pointsControllers.map((it) => it.getModel().getActualPoint());
    return points.map((it) => moment(it.startDate).format(`YYYY-MM-DD`));
  }

  _viewChangeObserverHandler(newElement, oldElement) {
    replaceElement(newElement, oldElement);
  }
}
