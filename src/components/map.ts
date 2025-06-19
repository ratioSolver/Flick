import { Component } from "../app";
import * as L from 'leaflet';

export interface Layer {

  add_to(map: L.Map): void;
  remove_from(map: L.Map): void;
}

export class MapLayer<P = any> implements Layer {

  protected layer = L.layerGroup<P>();

  add_to(map: L.Map): void { this.layer.addTo(map); }
  remove_from(map: L.Map): void { this.layer.removeFrom(map); }
}

export class MapComponent extends Component<void, HTMLDivElement> {

  readonly map: L.Map;

  constructor() {
    super(undefined, document.createElement('div'));
    this.map = L.map(this.element);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.map);
  }

  get_map(): L.Map { return this.map; }

  set_view(center: L.LatLngExpression, zoom?: number, options?: L.ZoomPanOptions): this {
    this.map.setView(center, zoom, options);
    return this;
  }
}

export interface HeatTile {
  bounds: [[number, number], [number, number]];
  value: number;
}

export class HeatMapLayer extends MapLayer<HeatTile> {

  add_tiles(tiles: HeatTile[]): void {
    const min = Math.min(...tiles.map(tile => tile.value));
    const max = Math.max(...tiles.map(tile => tile.value));

    const get_color = (value: number): string => {
      const hue = ((value - min) / (max - min)) * 360;
      return `hsl(${hue}, 100%, 50%)`;
    }

    tiles.forEach(tile => {
      const rect = L.rectangle(tile.bounds, { fillColor: get_color(tile.value), weight: 1, fillOpacity: 0.5 });
      this.layer.addLayer(rect);
    });
  }
}