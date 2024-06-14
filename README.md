# Welcome to Official Prove Pre-Fill Starter Kit
Welcome to the Prove Pre-Fill Starter Kit! This project will showcase how the Prove Pre-Fill standard is expected to be implemented. This project combines both the Frontend and Backend with Prove Server & Client Side SDK's to give you a solid starting point for implementation. Get rolling now!

## Tech Stack
**Client:** React, MaterialUI

**Server:** Node, Express

## Prerequisites
1. Be sure to have [Node](https://nodejs.org/en/download/package-manager) installed on your machine
2. Install an IDE of your chose. We recommend [Visual Studio Code](https://code.visualstudio.com/) 😊
3. Good vibes ✨
 
## Quick Start - Demo Mode
1. Download or Clone this project
2. Open 2 terminals at the root of your project (Your IDE should do this for you)
3. Change directory to Frontend in terminal 1
```bash
cd frontend
```
4. Install Client Side Dependencies and SDK's
```bash
npm install
```
5. Start the Frontend
```bash
npm run dev
```
6. Change directory to Backend in terminal 2
```bash
cd backend
```
7. Install Server Side Dependencies and SDK's
```bash
npm install
```
8. Start the Backend
```bash
npm run dev
```
9. Open your browser and search http://localhost:3000/
![image](https://github.com/prove-identity/prove-prefill-react-starter-kit-v3/assets/113944604/526d72cb-7d23-4e87-977b-37e9bc25a7e1)

## Plug And Play - Sandbox Mode
1. Download or Clone this project
2. Open 2 terminals at the root of your project (Your IDE should do this for you)
3. Change directory to Frontend in terminal 1
```bash
cd frontend
```
4. Install Client Side Dependencies and SDK's
```bash
npm install
```
5. Create your own local environment variables
6. At the frontend directory level create a new file called **.env**
7. take a look at the .env.example file under the frontend directory
```bash
NODE_ENV="sandbox" #| "sandbox" | "production"
REACT_APP_ENV=sandbox #| "sandbox" | "production"
REACT_APP_BASE_API_URL=<URL_FOR_BACKEND> # "http://localhost:8080/api"
```
8. Copy this into your .env file
9. Update <URL_FOR_BACKEND> to "http://localhost:8080/api" or wherever your backend might be running (By default we've set it to 8080)
10. Your .env should look something like this:
```bash
NODE_ENV=sandbox
REACT_APP_ENV=sandbox
REACT_APP_BASE_API_URL=http://localhost:8080/api
```
11. Start the Frontend
```bash
npm run dev
```
12. Change directory to Backend in terminal 2
```bash
cd backend
```
13. Install Server Side Dependencies and SDK's
```bash
npm install
```
14. Create your own local environment variables
15. At the backend directory level create a new file called **.env**
16. take a look at the .env.example file under the backend directory
```bash
NODE_ENV=sandbox #| "sandbox" | "production"
PROVE_CLIENT_ID=xxxxx
PROVE_CLIENT_SECRET=xxxxx
APPLICATION_DOMAIN=xxxx
```
17. Update PROVE_CLIENT_ID to be the client id provided by the Prove Portal
18. Update PROVE_CLIENT_SECRET to be the client secret provided by the Prove Portal
19. Update APPLICATION_DOMAIN to be http://127.0.0.1:3000
20.  Start the Backend
```bash
npm run dev
```
![image](https://github.com/prove-identity/prove-prefill-react-starter-kit-v3/assets/113944604/526d72cb-7d23-4e87-977b-37e9bc25a7e1)


