# SBA 14: Secure Web Portal

[Karl Johnson](https://github.com/hirekarl)  
2025-RTT-30  
<time datetime="2025-08-31">2025-08-31</time>

## Overview
### Viewer Instructions
1. In the terminal, run:

```bash
cd secure-web-portal && npm i && npm run dev
```

2. Run API queries against http://localhost:3001/api/users and http://localhost:3001/api/bookmarks.

### Submission Source
Top-level application behavior can be found in [`./secure-web-portal/server.js`](./secure-web-portal/server.js).

### Reflection
The OAuth flow doesn't work, and I'm struggling to understand how to begin to fix it. I don't understand how the `passport.js` config file fits into the rest of the app, and in general, I'm finding it really challenging to wrap my head around how it fits in to the authentication flow in general.

NB: In my app, the JWT is accepted as a query param, as suggested by the spec, which indicates the redirect after third-party auth should return a redirect URL with the token as a query param.

## Assignment
“Innovate Inc.” is ready for the final phase of its new user portal. They need a complete, secure backend service that combines all the features you’ve been working on. This service will be the single point of entry for all users, managing their identities and their private data.

Your task is to build a secure Express application that allows users to register, log in (using both their email/password and a third-party provider like GitHub), and manage a private collection of personal “bookmarks” (or notes, tasks, etc.). This project will be the culmination of all the skills you’ve acquired in this module, from hashing passwords to implementing complex OAuth 2.0 flows.

A key principle for this project is Don’t Repeat Yourself (DRY). You are encouraged to reuse and adapt the code you’ve already written in previous labs and lessons. This is a common practice in software development and a critical skill to demonstrate.
