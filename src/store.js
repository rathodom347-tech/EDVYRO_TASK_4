import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve(process.cwd(),process.env.DATA_DIR||'./data');
const internshipsPath=path.join(dir,'internships.json');
const applicationsPath=path.join(dir,'applications.json');
const seed=[
{id:'OM-101',title:'Frontend Developer Intern',company:'Bright Labs',location:'Remote',mode:'Remote',domain:'Web Development',stipend:8000,skills:['HTML','CSS','JavaScript','React'],description:'Build accessible, responsive interfaces with the product team.',featured:true},
{id:'OM-102',title:'Backend Developer Intern',company:'CloudNest',location:'Pune, Maharashtra',mode:'Hybrid',domain:'Backend Development',stipend:10000,skills:['Node.js','Express','REST API'],description:'Develop and test reliable backend services.',featured:true},
{id:'OM-103',title:'Full Stack Intern',company:'PixelWorks',location:'India',mode:'Remote',domain:'Full Stack Development',stipend:12000,skills:['React','Node.js','SQL'],description:'Work across the frontend and backend of a growing product.',featured:false},
{id:'OM-104',title:'UI/UX Design Intern',company:'Yellow Studio',location:'Mumbai, Maharashtra',mode:'On-site',domain:'Design',stipend:7000,skills:['Figma','Accessibility','Prototyping'],description:'Design clear user journeys and accessible product screens.',featured:false}
];
export function initializeStore(){
 fs.mkdirSync(dir,{recursive:true});
 if(!fs.existsSync(internshipsPath))fs.writeFileSync(internshipsPath,JSON.stringify(seed,null,2));
 if(!fs.existsSync(applicationsPath))fs.writeFileSync(applicationsPath,'[]');
}
function read(file){initializeStore();return JSON.parse(fs.readFileSync(file,'utf8'));}
function write(file,data){fs.writeFileSync(file,JSON.stringify(data,null,2));}
export const getInternships=()=>read(internshipsPath);
export const getApplications=()=>read(applicationsPath);
export const saveApplications=data=>write(applicationsPath,data);
