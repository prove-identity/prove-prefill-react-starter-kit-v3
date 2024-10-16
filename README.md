# Prove Pre-Fill® Demo

Welcome to the Prove Pre-Fill® Demo! This project demonstrates how integration with the Prove Pre-Fill® solution works. You'll see how it works from the user's perspective and how it communicates with the Prove APIs using both server-side and client-side SDKs. This guide will help you understand product functionality before you begin your own implementation.

- [Prove Pre-Fill® Demo](#prove-pre-fill-demo)
  - [Prove Pre-Fill® Product Overview](#prove-pre-fill-product-overview)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Run Demo Locally](#run-demo-locally)
    - [Front-End Terminal](#front-end-terminal)
    - [Backend Terminal](#backend-terminal)
    - [View Demo](#view-demo)

## Prove Pre-Fill® Product Overview

Our Prove Pre-Fill® solution streamlines online form completion by auto-filling verified user information like name and address, while also providing strong identity authentication to prevent fraud. It leads to faster onboarding and reduced friction for users while maintaining a high level of security. To learn more about this solution, visit our [Pre-Fill® solution page](https://www.prove.com/solutions/pre-fill). To learn more about the implementation process, visit our [Prove Pre-Fill® documentation](https://developer.prove.com/docs/prove-pre-fill-flow).

## Tech Stack

The project uses a combination of front-end and backend services. The languages used are listed below:
- **Front-End:** React, MaterialUI
- **Backend:** Node, Express

## Prerequisites

Before you attempt to run the demo locally, you must follow these steps:

- Ensure [Node](https://nodejs.org/en/download/package-manager) is installed on your local machine.
- Generate Sandbox project credentials be following these steps:
  - Navigate to: https://portal.prove.com/en/signup.
  - Fill in your information and complete the signup process.
  - Once logged in, click "Integrate Pre-Fill now".
  - Click "New Project".
  - Type in a project name  and click "Save".
  - On the newly created project, click the ellipsis (3 vertical dots) and then click "Access Credentials".
  - Click the "Credentials" tab.
  - Save these Sandbox credentials (Client ID and Client Secret) for later.

## Run Demo Locally

1. We'll need to download the code first. You can either clone using `git` or simply download the code using: `Code` -> `Download ZIP`.
1. Once the code is on your local machine, you may need to unzip the contents of the download to a folder.
1. Open two instances of Command Prompt or the native terminal on your local machine - we'll use one for starting up the front-end service and one for starting up the backend service.

### Front-End Terminal

1. In your front-end terminal, navigate to the folder containing the code you downloaded.
2. Type in this command to change to the frontend folder:
```bash
cd frontend
```
3. Once in the folder, you can install the libraries required using this command:
```bash
npm install
```
4. Type in this command to create a new file called `.env`:
```bash
# On Windows, type:
echo "" > .env

# On Linux/MacOS, type:
touch > .env
```
5. Open up the .env file in a text editor:
```bash
# On Windows, type:
notepad .env

# On Linux/MacOS, type:
open -e .env
```
6. Paste this into the .env file and then save the file:
```bash
NODE_ENV=sandbox
REACT_APP_ENV=sandbox
REACT_APP_BASE_API_URL=http://localhost:8080/api
```
7.  Start the front-end service with this command:
```bash
npm run dev
```

### Backend Terminal

1. In your backend terminal, navigate to the folder containing the code you downloaded.
2. Type in this command to change to the backend folder:
```bash
cd backend
```
3. Once in the folder, you can install the libraries required using this command:
```bash
npm install
```
4. Type in this command to create a new file called `.env`:
```bash
# On Windows, type:
echo "" > .env

# On Linux/MacOS, type:
touch > .env
```
5. Open up the .env file in a text editor:
```bash
# On Windows, type:
notepad .env

# On Linux/MacOS, type:
open -e .env
```
6. Paste this into the .env file, replace `PROVE_CLIENT_ID` and the `PROVE_CLIENT_SECRET` with your Sandbox credentials, and then save the file:
```bash
NODE_ENV=sandbox
PROVE_CLIENT_ID=REPLACE_WITH_YOUR_SANDBOX_CLIENT_ID
PROVE_CLIENT_SECRET=REPLACE_WITH_YOUR_SANDBOX_CLIENT_SECRET
APPLICATION_DOMAIN=http://127.0.0.1:3000
```
7.  Start the backend service with this command:
```bash
npm run dev
```

### View Demo

Once both services are running, open your browser and navigate to: http://localhost:3000/

After you are done with the demo, you can stop each of the services that are running by clicking into each terminal and pressing: `Ctrl + C`.