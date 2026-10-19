import test from 'node:test';import assert from 'node:assert/strict';
import {renderStationPage,renderAlbumPage,GuestPlayer,createGuestHandler} from '../src/guest-radio.mjs';
const station={id:'s1',name:'Radio <One>',description:'A live & linear station'};
const album={id:'a1',title:'First <Album>',artist:'A & B',artworkUrl:'https://art.example/a.jpg'};
test('public pages escape metadata, link complete albums, and expose no picker or media secrets',()=>{
  const page=renderStationPage(station,[album]);
  assert.match(page,/Radio &lt;One&gt;/);assert.match(page,/First &lt;Album&gt;/);
  assert.match(page,/\/albums\/a1/);assert.match(page,/joins the current broadcast/);
  assert.doesNotMatch(page,/<audio|track-picker|playback-token|manifest/);
  assert.match(renderAlbumPage(album),/Complete-album information/);
});
test('rejects hostile artwork, malformed ids and duplicate offers',()=>{
  assert.throws(()=>renderStationPage(station,[{...album,artworkUrl:'javascript:alert(1)'}]));
  assert.throws(()=>renderStationPage(station,[album,album]));
  assert.throws(()=>renderStationPage({...station,id:'../other'},[]));
});
test('guest handler serves only exact public metadata and fails closed on provider outage',async()=>{
  const handler=createGuestHandler({getStation:async id=>id==='s1'?station:null,
    getAlbums:async()=>[album],getAlbum:async id=>id==='a1'?album:null});
  const response=await handler(new Request('https://example.test/stations/s1'));
  assert.equal(response.status,200);assert.match(response.headers.get('content-security-policy'),/default-src 'none'/);
  assert.equal((await handler(new Request('https://example.test/stations/s2'))).status,404);
  assert.equal((await handler(new Request('https://example.test/albums/a1',{method:'POST'}))).status,405);
  const down=createGuestHandler({getStation:async()=>{throw Error('offline')},getAlbums:async()=>[],getAlbum:async()=>null});
  assert.equal((await down(new Request('https://example.test/stations/s1'))).status,503);
});
test('explicit play joins live once and stop closes endpoint session',async()=>{
  const states=[],calls=[];let closed=0;
  const player=new GuestPlayer({joinLive:async(id,{signal})=>{
    calls.push([id,signal]);return {start:async()=>{},close:()=>{++closed}};
  }},state=>states.push(state));
  await player.play('s1');assert.equal(player.state,'PLAYING');assert.equal(calls.length,1);
  player.stop();assert.equal(player.state,'STOPPED');assert.equal(closed,1);
  assert.deepEqual(states,['STOPPED','CONNECTING','PLAYING','STOPPED']);
});
test('stop during join prevents late playback and closes late session',async()=>{
  let resolve,starts=0,closed=0;
  const player=new GuestPlayer({joinLive:()=>new Promise(r=>resolve=r)},()=>{});
  const pending=player.play('s1');player.stop();
  resolve({start:async()=>{++starts},close:()=>{++closed}});await pending;
  assert.equal(starts,0);assert.equal(closed,1);assert.equal(player.state,'STOPPED');
});
test('adapter failure reports interruption without leaving a live session',async()=>{
  let closed=0;
  const player=new GuestPlayer({joinLive:async()=>({start:async()=>{throw Error('network')},close:()=>{++closed}})},()=>{});
  await assert.rejects(player.play('s1'));
  assert.equal(player.state,'INTERRUPTED');assert.equal(closed,1);
});
