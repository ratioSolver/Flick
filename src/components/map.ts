import { Component } from "../app";
import 'leaflet/dist/leaflet.css';
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

  get_map(): L.Map { return this.map!; }

  override mounted(): void {
    this.map = L.map(this.element);

    // Set initial view to Rome, Italy
    this.set_view([41.9028, 12.4964], 13);
  }

  /**
   * Adds a tile layer to the map using the specified URL and options.
   *
   * @param url - The URL template for the tile layer. Defaults to OpenStreetMap's standard tile server.
   * @param options - Optional configuration options for the tile layer.
   */
  add_tile_layer(url: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options: L.TileLayerOptions = {}): void {
    L.tileLayer(url, options).addTo(this.map!);
  }

  /**
   * Sets the view of the map to the specified center and zoom level.
   *
   * @param center - The geographical center of the map view, specified as a latitude and longitude pair.
   * @param zoom - The zoom level for the map view. Optional; if not provided, defaults to the current zoom level.
   * @param options - Optional parameters for zooming and panning.
   */
  set_view(center: L.LatLngExpression, zoom?: number, options?: L.ZoomPanOptions): this {
    this.map!.setView(center, zoom, options);
    return this;
  }

  /**
   * Adds the specified layer to the map instance.
   *
   * @param layer - The layer to be added to the map.
   */
  add_layer(layer: Layer): void { layer.add_to(this.map!); }
  /**
   * Removes the specified layer from the map instance.
   *
   * @param layer - The layer to be removed from the map.
   */
  remove_layer(layer: Layer): void { layer.remove_from(this.map!); }
}

export interface HeatTile {
  bounds: L.LatLngBoundsExpression;
  value: number;
}

export class HeatMapLayer extends MapLayer<HeatTile> {

  constructor(tiles: HeatTile[] = []) {
    super();
    this.add_tiles(tiles);
  }

  add_tiles(tiles: HeatTile[]): void {
    const min = Math.min(...tiles.map(tile => tile.value));
    const max = Math.max(...tiles.map(tile => tile.value));

    const get_color = (value: number): string => {
      const hue = (value - min) / (max - min);
      return `hsl(${120 - hue * 120}, 100%, 50%)`;
    }

    tiles.forEach(tile => {
      const rect = L.rectangle(tile.bounds, { color: undefined, fillColor: get_color(tile.value), weight: 1, fillOpacity: 0.5 });
      this.layer.addLayer(rect);
    });
  }
}

export class GeoJSONLayer extends MapLayer {

  constructor(geojson: GeoJSON.FeatureCollection | GeoJSON.Feature) {
    super();
    this.add_geojson(geojson);
  }

  add_geojson(geojson: GeoJSON.FeatureCollection | GeoJSON.Feature): void {
    const layer = L.geoJSON(geojson);
    this.layer.addLayer(layer);
  }
}