# Welcome to the Official Prove Pre-Fill Starter Kit
Welcome to the Prove Pre-Fill Starter Kit! This project will showcase how the Prove Pre-Fill standard is expected to be implemented. This project combines both the Frontend and Backend with Prove Server & Client Side SDK's to give you a solid starting point for implementation. Get rolling now!

## Table of Contents
- [Welcome to the Official Prove Pre-Fill Starter Kit](#welcome-to-the-official-prove-pre-fill-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Quick Start - Demo Mode](#quick-start---demo-mode)
  - [Plug And Play - Sandbox Mode](#plug-and-play---sandbox-mode)
  - [AWS Deployment Instructions](#aws-deployment-instructions)
    - [Prerequisites](#prerequisites-1)
    - [Step-by-Step Deployment](#step-by-step-deployment)
    - [Updating the Application](#updating-the-application)

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
21. 9. Open your browser and search http://localhost:3000/

![image](https://github.com/prove-identity/prove-prefill-react-starter-kit-v3/assets/113944604/526d72cb-7d23-4e87-977b-37e9bc25a7e1)

## AWS Deployment Instructions

### Prerequisites
1. Install the [Elastic Beanstalk CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html).
2. Ensure you have AWS credentials configured.

### Step-by-Step Deployment

1. **Initialize Elastic Beanstalk:**
    ```sh
    eb init -p docker -r <AWS_REGION> <EB_APP_NAME>
    ```
    Replace `<AWS_REGION>` with your desired AWS region and `<EB_APP_NAME>` with your Elastic Beanstalk application name.

2. **Create a Docker Archive:**
    Create a `Dockerrun.aws.json` file at the root of your project to define your multi-container setup:
    ```json
    {
      "AWSEBDockerrunVersion": 2,
      "containerDefinitions": [
        {
          "name": "frontend",
          "image": "prefill-starterkit-frontend",
          "essential": true,
          "memory": 128,
          "portMappings": [
            {
              "hostPort": 80,
              "containerPort": 80
            }
          ]
        },
        {
          "name": "backend",
          "image": "prefill-starterkit-backend",
          "essential": true,
          "memory": 128,
          "portMappings": [
            {
              "hostPort": 8080,
              "containerPort": 8080
            }
          ]
        }
      ]
    }
    ```

3. **Create and Deploy the Docker Archive:**
    Add the following to your Makefile:
    ```makefile
    # AWS Elastic Beanstalk application and environment names
    EB_APP_NAME=my-app
    EB_ENV_NAME=my-env

    # Path to the Docker archive
    DOCKER_ARCHIVE=docker-archive.zip

    # Target to create a Docker archive for deployment
    .PHONY: create-docker-archive
    create-docker-archive: build-frontend build-backend
        zip -r $(DOCKER_ARCHIVE) Dockerrun.aws.json .ebextensions frontend backend

    # Target to deploy the Docker archive to Elastic Beanstalk
    .PHONY: deploy
    deploy: create-docker-archive
        eb init -p docker -r $(AWS_REGION) $(EB_APP_NAME)
        eb create $(EB_ENV_NAME)
        eb deploy
    ```

4. **Update Environment Variables:**
    Before deploying, ensure you update the environment variables for both the frontend and backend in the Elastic Beanstalk environment. This can be done through the Elastic Beanstalk Management Console:
    
    - Go to the Elastic Beanstalk environment for your application.
    - Navigate to **Configuration**.
    - Under **Software**, click on **Modify**.
    - Add or update the necessary environment variables.

    For the frontend:
    ```plaintext
    REACT_APP_BASE_API_URL=http://your-backend-url/api
    REACT_APP_ENV=your-environment
    ```

    For the backend:
    ```plaintext
    NODE_ENV=your-environment
    PROVE_CLIENT_ID=your-client-id
    PROVE_CLIENT_SECRET=your-client-secret
    APPLICATION_DOMAIN=http://your-frontend-url
    ```

5. **Deploy the Application:**
    Run the following commands:
    ```sh
    make deploy
    ```

### Updating the Application

Whenever you make changes to your application and want to redeploy, simply run:

```sh
make deploy