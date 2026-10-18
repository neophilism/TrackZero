export function mayPublishCatalogItem(x){
 if(!x||typeof x!=='object'||x.ownerVerified!==true||x.rightsReviewed!==true||x.rightsApproved!==true||x.regionApproved!==true||x.sourceVerified!==true||x.withdrawn===true)return false;
 if(typeof x.licenseVersion!=='string'||x.licenseVersion.length<1||!Number.isFinite(x.reviewedAtMs)||x.reviewedAtMs<=0)return false;
 return true;
}
