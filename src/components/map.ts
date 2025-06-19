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

  private map: L.Map | undefined;

  constructor() {
    super(undefined, document.createElement('div'));
    this.element.style.width = '100%';
    this.element.style.height = '100%';
  }

  override mounted(): void {
    this.map = L.map(this.element);
    this.map.invalidateSize();

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.map);

    // Set initial view to Rome, Italy
    this.set_view([41.9028, 12.4964], 13);
  }

  set_view(center: L.LatLngExpression, zoom?: number, options?: L.ZoomPanOptions): this {
    this.map!.setView(center, zoom, options);
    return this;
  }

  add_layer(layer: Layer): void { layer.add_to(this.map!); }
  remove_layer(layer: Layer): void { layer.remove_from(this.map!); }
}

export interface HeatTile {
  bounds: L.LatLngBoundsExpression;
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