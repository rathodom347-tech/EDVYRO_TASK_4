import {Router} from 'express';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {getInternships,getApplications,saveApplications} from '../store.js';
const router=Router();
const applicationSchema=z.object({
 internshipId:z.string().min(1),
 fullName:z.string().trim().min(2).max(80),
 email:z.string().trim().email().max(120),
 phone:z.string().trim().regex(/^[0-9+() -]{7,20}$/),
 resumeUrl:z.string().url().optional().or(z.literal('')),
 coverLetter:z.string().trim().max(1200).optional().default('')
});
router.get('/internships',(req,res)=>{
 let rows=getInternships();const q=String(req.query.q||'').toLowerCase();const mode=String(req.query.mode||'').toLowerCase();
 if(q)rows=rows.filter(x=>[x.title,x.company,x.domain,...x.skills].join(' ').toLowerCase().includes(q));
 if(mode)rows=rows.filter(x=>x.mode.toLowerCase()===mode);
 res.json({success:true,count:rows.length,data:rows});
});
router.get('/internships/:id',(req,res)=>{const item=getInternships().find(x=>x.id===req.params.id);if(!item)return res.status(404).json({success:false,error:{code:'INTERNSHIP_NOT_FOUND',message:'Internship not found'}});res.json({success:true,data:item});});
router.post('/applications',(req,res)=>{
 const parsed=applicationSchema.safeParse(req.body);
 if(!parsed.success)return res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',details:parsed.error.flatten()}});
 const internship=getInternships().find(x=>x.id===parsed.data.internshipId);
 if(!internship)return res.status(404).json({success:false,error:{code:'INTERNSHIP_NOT_FOUND',message:'Selected internship no longer exists'}});
 const rows=getApplications();
 if(rows.some(x=>x.internshipId===parsed.data.internshipId&&x.email.toLowerCase()===parsed.data.email.toLowerCase()))return res.status(409).json({success:false,error:{code:'DUPLICATE_APPLICATION',message:'An application already exists for this email and internship'}});
 const record={id:randomUUID(),...parsed.data,status:'Submitted',createdAt:new Date().toISOString()};
 rows.push(record);saveApplications(rows);
 res.status(201).json({success:true,message:'Application submitted successfully',data:{id:record.id,status:record.status}});
});
export default router;
