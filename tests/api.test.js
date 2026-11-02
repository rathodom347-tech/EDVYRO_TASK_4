import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import {initializeStore,getInternships,getApplications,saveApplications} from '../src/store.js';
let server,base;
test('health, internship listing, application validation and persistence flow',async t=>{
 initializeStore();saveApplications([]);
 server=app.listen(0);await new Promise(resolve=>server.once('listening',resolve));base=`http://127.0.0.1:${server.address().port}`;t.after(()=>server.close());
 const health=await fetch(`${base}/api/health`);assert.equal(health.status,200);assert.equal((await health.json()).data.status,'healthy');
 const jobs=await fetch(`${base}/api/internships`);const body=await jobs.json();assert.equal(jobs.status,200);assert.ok(body.count>0);
 const invalid=await fetch(`${base}/api/applications`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'bad'})});assert.equal(invalid.status,400);
 const internshipId=getInternships()[0].id;
 const payload={internshipId,fullName:'Om Candidate',email:'om.candidate@example.com',phone:'9876543210',coverLetter:'I would like to contribute and learn.'};
 const created=await fetch(`${base}/api/applications`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});assert.equal(created.status,201);assert.equal(getApplications().length,1);
 const duplicate=await fetch(`${base}/api/applications`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});assert.equal(duplicate.status,409);
});
