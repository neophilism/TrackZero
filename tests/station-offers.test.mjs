import assert from 'node:assert/strict';
import test from 'node:test';
import { matchStationOffers } from '../src/station-offers.mjs';
const station={id:'station-one',name:'Station One',description:'Radio',
  offers:[{id:'album-001',title:'Album One',type:'complete_product',available:true}]};
const catalog=[{id:'album-001',title:'Album One',kind:'album',
  trackCount:9,available:true,rightsVerified:true}];

test('station offers require a catalog-backed complete album', () => {
  assert.deepEqual(matchStationOffers(station,catalog),[
    {id:'album-001',title:'Album One',trackCount:9,type:'complete_product',stationId:'station-one'}
  ]);
});
test('offers fail closed when catalog rights, availability or matching is missing', () => {
  assert.throws(()=>matchStationOffers(station,[]));
  assert.throws(()=>matchStationOffers(station,[{...catalog[0],available:false}]));
  assert.throws(()=>matchStationOffers(station,[{...catalog[0],rightsVerified:false}]));
  assert.throws(()=>matchStationOffers(station,[{...catalog[0],kind:'track'}]));
});
