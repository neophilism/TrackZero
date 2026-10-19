import { projectCompleteAlbums } from './catalog.mjs';

/** Validate only the offer selection used here. TZ-03's full storefront lives
 * on its own unmerged branch and must be reconciled during integration. */
function validateStationOfferSelection(station) {
  if (!station || typeof station !== 'object' || Array.isArray(station) ||
      typeof station.id !== 'string' || !/^[a-z0-9-]{3,80}$/.test(station.id) ||
      !Array.isArray(station.offers) || station.offers.length > 20)
    throw new Error('Invalid station offer selection');
  const seen = new Set();
  for (const offer of station.offers)
    if (!offer || typeof offer !== 'object' || Array.isArray(offer) ||
        typeof offer.id !== 'string' || !/^[a-z0-9-]{3,80}$/.test(offer.id) ||
        seen.has(offer.id) || offer.type !== 'complete_product' || offer.available !== true)
      throw new Error('Invalid station offer selection');
    else seen.add(offer.id);
  return station;
}

/** Inert offer projection from independently supplied complete-album metadata. */
export async function matchStationOffers(station, catalogRecords, verifyPublishableAlbum) {
  const storefront = validateStationOfferSelection(station);
  const albums = await projectCompleteAlbums(catalogRecords, verifyPublishableAlbum);
  const byId = new Map(albums.map(album => [album.id, album]));
  return Object.freeze(storefront.offers.map(offer => {
    const album = byId.get(offer.id);
    if (!album) throw new Error('Station offer is not present in the permitted complete-album catalog');
    return Object.freeze({ id: album.id, title: album.title, trackCount: album.trackCount,
      type: 'complete_product', stationId: storefront.id });
  }));
}
