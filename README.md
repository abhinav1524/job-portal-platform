# job-portal-platform


## 👥 User Roles

### Job Seeker
- Register / Login
- Search jobs
- Apply to jobs
- Track applications

### Recruiter
- Register / Login
- Post jobs
- Manage job listings
- Review applicants

---

## 🗂️ Database Models

### User Model
```js
{
  name,
  email,
  password,
  role: ["seeker", "recruiter"],
  profilePic,
  createdAt
}

{
  title,
  description,
  company,
  location,
  salaryRange,
  skills: [String],
  jobType,
  postedBy,
  applicants,
  createdAt
}
{
  job,
  applicant,
  resumeUrl,
  status: ["applied", "shortlisted", "rejected"],
  appliedAt
}

server/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
└── server.js

Auth Routes

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/auth/me

Job Routes

POST    /api/jobs
GET     /api/jobs
GET     /api/jobs/:id
PUT     /api/jobs/:id
DELETE  /api/jobs/:id

Application Routes

POST   /api/applications/:jobId
GET    /api/applications/me
GET    /api/applications/job/:id
PUT    /api/applications/:id
