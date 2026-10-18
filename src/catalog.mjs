/** Public complete-album projection; not a verified catalog service. */
export function projectCompleteAlbums(records){
 if(!Array.isArray(records)||records.length>1000)throw new Error('Invalid catalog');
 const seen=new Set();
 return records.map(record=>{
  if(!record||typeof record!=='object'||typeof record.id!=='string'||! /^[a-zA-Z0-9_-]{6,100}$/.test(record.id)||seen.has(record.id)||typeof record.title!=='string'||record.title.trim().length<2||record.title.length>200||record.rightsVerified!==true||record.available!==true||record.kind!=='album'||!Number.isSafeInteger(record.trackCount)||record.trackCount<1)throw new Error('Unverified album');
  seen.add(record.id);
  return Object.freeze({id:record.id,title:record.title.trim(),trackCount:record.trackCount,kind:'complete_album'});
 });
}
