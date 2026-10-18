/** Public metadata only. No rights, entitlement or live playback assertions. */
export function validateStationStorefront(record){
 if(!record||typeof record!=='object'||Array.isArray(record))throw new Error('Invalid station');
 const {id,name,description,artworkUrl,offers}=record;
 if(typeof id!=='string'||! /^[a-z0-9-]{3,80}$/.test(id)||typeof name!=='string'||name.trim().length<2||name.length>100||typeof description!=='string'||description.length>1000)throw new Error('Invalid station metadata');
 if(artworkUrl!==undefined && (typeof artworkUrl!=='string'||!artworkUrl.startsWith('https://')))throw new Error('Invalid artwork URL');
 if(!Array.isArray(offers)||offers.length>20)throw new Error('Invalid offers');
 return Object.freeze({id,name:name.trim(),description,artworkUrl:artworkUrl??null,offers:offers.map(offer=>{
  if(!offer||typeof offer!=='object'||typeof offer.id!=='string'||! /^[a-z0-9-]{3,80}$/.test(offer.id)||typeof offer.title!=='string'||offer.title.length<2||offer.title.length>120||offer.type!=='complete_product'||offer.available!==true)throw new Error('Invalid complete-product offer');
  return Object.freeze({id:offer.id,title:offer.title,type:'complete_product',available:true});
 })});
}
