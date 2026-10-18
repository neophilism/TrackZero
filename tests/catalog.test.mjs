import test from 'node:test';import assert from 'node:assert/strict';import {projectCompleteAlbums} from '../src/catalog.mjs';
const album={id:'album_123',title:'A complete album',kind:'album',trackCount:12,available:true,rightsVerified:true};
test('projects only verified complete-album metadata',()=>assert.deepEqual(projectCompleteAlbums([album]),[{id:'album_123',title:'A complete album',trackCount:12,kind:'complete_album'}]));
test('refuses unlicensed, unavailable, individual track and duplicate entries',()=>{for(const x of [{...album,rightsVerified:false},{...album,available:false},{...album,kind:'track'}])assert.throws(()=>projectCompleteAlbums([x]));assert.throws(()=>projectCompleteAlbums([album,album]));});
