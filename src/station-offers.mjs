import { validateStationStorefront } from './storefront.mjs';
import { projectCompleteAlbums } from './catalog.mjs';

/** Inert offer projection from independently supplied complete-album metadata. */
export function matchStationOffers(station, catalogRecords) {
  const storefront = validateStationStorefront(station);
  const albums = projectCompleteAlbums(catalogRecords);
  const byId = new Map(albums.map(album => [album.id, album]));
  return Object.freeze(storefront.offers.map(offer => {
    const album = byId.get(offer.id);
    if (!album) throw new Error('Station offer is not present in the permitted complete-album catalog');
    return Object.freeze({ id: album.id, title: album.title, trackCount: album.trackCount,
      type: 'complete_product', stationId: storefront.id });
  }));
}
