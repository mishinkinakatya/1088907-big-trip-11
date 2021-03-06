import AbstractController from "./abstract-controller";
import TripDaysComponent from "../components/trip-days";

export default class PointsController extends AbstractController {
  constructor(container, model) {
    super(container, model);

    this._tripDaysComponent = new TripDaysComponent();

    this._rerender = this._rerender.bind(this);
    this.getModel().setActualPointsControllersChangeObserver(this._rerender);
  }

  render() {
    const points = this.getModel().getActualPoints();
    const sortType = this.getModel().getActiveSortType();
    this._tripDaysComponent.render(this._container, points, sortType);

  }

  _rerender() {
    this._tripDaysComponent.clear();
    this.render();
  }
}
