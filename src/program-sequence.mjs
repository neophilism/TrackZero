export function reorderProgram(items, from, to){
 if(!Array.isArray(items)||items.length>1000||!items.every(x=>x&&typeof x.id==='string'&&x.id.length>0&&['song','ad','intro','block'].includes(x.kind)))throw new Error('Invalid program');
 if(!Number.isInteger(from)||!Number.isInteger(to)||from<0||to<0||from>=items.length||to>=items.length)throw new Error('Invalid index');
 const ids=items.map(x=>x.id);if(new Set(ids).size!==ids.length)throw new Error('Duplicate item id');
 const result=[...items];const [moved]=result.splice(from,1);result.splice(to,0,moved);return result;
}
