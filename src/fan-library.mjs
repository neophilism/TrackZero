const id=/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/** Renders only trusted, viewer-scoped entitlements. No client-side grant or raw media URL. */
export function renderFanLibrary(viewerId,grants){
  if(typeof viewerId!=='string'||!id.test(viewerId)||!Array.isArray(grants)||grants.length>500)
    throw Error('invalid library');
  const seen=new Set();
  const cards=grants.map(grant=>{
    if(!grant||grant.userId!==viewerId||typeof grant.id!=='string'||!id.test(grant.id)||
      typeof grant.title!=='string'||!grant.title.trim()||grant.title.length>200||
      !['PURCHASE','POINT_REDEMPTION','UNLOCKED_GROOVE'].includes(grant.kind)||
      !['ACTIVE','REVOKED'].includes(grant.state)||typeof grant.downloadAllowed!=='boolean'||
      (grant.state!=='ACTIVE'&&grant.downloadAllowed)||seen.has(grant.id))
      throw Error('invalid or cross-user entitlement');
    seen.add(grant.id);
    return `<li><article><h3>${esc(grant.title)}</h3><p>${esc(grant.kind.replaceAll('_',' ').toLowerCase())}</p>`+
      `<p>${grant.state==='ACTIVE'?'Available in your library':'Access revoked'}</p>`+
      `<p>${grant.downloadAllowed?'Creator-authorized download available':'Download unavailable'}</p></article></li>`;
  }).join('');
  return `<main><h1>Your library</h1><p>Radio listening remains a live linear station.</p>`+
    `<ul>${cards}</ul></main>`;
}
