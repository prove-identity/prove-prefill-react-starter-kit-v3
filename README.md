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
    - [Setting up Static IP in AWS (Elastic Beanstalk)](#setting-up-static-ip-in-aws-elastic-beanstalk)
      - [New VPC](#new-vpc)
      - [Existing VPC](#existing-vpc)
        - [1. Create a Public VPC Subnet](#1-create-a-public-vpc-subnet)
        - [2. Create and Attach an Internet Gateway to the VPC](#2-create-and-attach-an-internet-gateway-to-the-vpc)
        - [3. Set Up a NAT Gateway](#3-set-up-a-nat-gateway)
        - [4. Create a Routing Table](#4-create-a-routing-table)
        - [5. Create a High Availability Elastic Beanstalk Instance](#5-create-a-high-availability-elastic-beanstalk-instance)


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
```
***

### Setting up Static IP in AWS (Elastic Beanstalk)
Before gaining production access to Prove APIs, your backend APIs must have a static IP (Elastic IP) to provide to Prove during the production onboarding process.

#### New VPC

1. Navigate to your VPC console and select "Create VPC" in the top panel located next to "Actions".
2. Under the "Resources to Create" heading, select "VPC and More".
   - You will need both public and private subnets.
   - Public subnets will be used by the load balancer.
   - Private subnets will be used by the instances (EC2).
3. Select "2" for "Number of Public Subnets".
4. Select "2" for "Number of Private Subnets".
   - Adjust the count to select more or less depending on the individual needs of your application.
5. Select an option for "NAT Gateway ($)".
   - Choose "in 1 AZ" or "1 per AZ" depending on the individual needs of your application.
6. (Optional) Select VPC endpoints if your application will be accessing S3 privately (for more security).
7. Under "DNS Options", ensure both "Enable DNS hostnames" and "Enable DNS resolution" are enabled.
8. Review Selections and select "Create VPC"
9. VPC is now created
   1.  Load Balancer will need to use public subnets 
   2.  EC2 Instances will need to use private subnets to route through NAT gateway
   3.  Note: Cannot change VPC after an Elastic Beanstalk environment is already setup, so this step creating a new VPC will need to proceed creation of ElasticBeanstalk environment

#### Existing VPC

##### 1. Create a Public VPC Subnet

1. Navigate to your VPC console and select “Subnets” in the side panel.
2. Click on “Create subnet”.
3. Select an existing VPC and specify an IPv4 CIDR block that is within the CIDR address range of the selected VPC.
   - Example: If your VPC CIDR is `172.31.0.0/16`, you can specify a subnet CIDR block of `172.31.32.0/20`.

##### 2. Create and Attach an Internet Gateway to the VPC

1. In the VPC console, select “Internet Gateway” from the side panel.
2. Click on “Create Internet Gateway”.
3. After creating the internet gateway, click the “Attach to a VPC” button.
4. Select the VPC created in the previous step.
   - Note: A VPC can only be attached to one internet gateway.

##### 3. Set Up a NAT Gateway

1. Go to the AWS VPC service page and select “NAT Gateway” in the left navigation.
2. Click on “Create NAT Gateway”.
3. Provide a name, select the previously created subnet, choose “Public” connectivity type, and select an Elastic (static) IP.
   - If you haven't created an Elastic IP, click on the "Allocate Elastic IP" button to automatically assign and associate one with the Gateway.

##### 4. Create a Routing Table

1. In the VPC screen, select “Subnets” from the left navigation and choose the subnet specified in the previous step.
2. Click on the “Route table” tab and select the name of the route table.
3. In the route table, add a route and associate the destination `0.0.0.0/0` with the NAT gateway you just created as the target.
   - This ensures that any outbound traffic from within the subnet will go through the NAT gateway.

##### 5. Create a High Availability Elastic Beanstalk Instance

1. Go to the Elastic Beanstalk service page and click on “Create Environment”.
   - If you don't have an application, you will need to create one first.
2. Select “Web server environment”.
3. Provide a name for the environment and select a target platform.
4. Click on “Configure more options”.
5. Scroll to the top of the page and select a desired instance type. High availability is recommended for production instances.
6. Click
