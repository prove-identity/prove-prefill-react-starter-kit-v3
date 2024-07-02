# Define variables for the Docker images and containers
FRONTEND_IMAGE=prefill-starterkit-frontend
BACKEND_IMAGE=prefill-starterkit-backend
FRONTEND_CONTAINER=prefill-starterkit-frontend-container
BACKEND_CONTAINER=prefill-starterkit-backend-container

# Load environment variables from the .env file
ifneq (,$(wildcard frontend/.env))
    include frontend/.env
    export
endif

# Ensure the variables are set
REACT_APP_BASE_API_URL := $(REACT_APP_BASE_API_URL)
REACT_APP_ENV := $(REACT_APP_ENV)

# Create a temporary .env file with the necessary variables
.PHONY: create-frontend-env
create-frontend-env:
	echo "REACT_APP_BASE_API_URL=$(REACT_APP_BASE_API_URL)" > frontend/.env
	echo "REACT_APP_ENV=$(REACT_APP_ENV)" >> frontend/.env

# Debug target to check created .env file
.PHONY: debug-env
debug-env: create-frontend-env
	@cat frontend/.env

# Build the frontend Docker image
.PHONY: build-frontend
build-frontend: create-frontend-env
	cd frontend && docker build \
		--build-arg REACT_APP_BASE_API_URL=$(REACT_APP_BASE_API_URL) \
		--build-arg REACT_APP_ENV=$(REACT_APP_ENV) \
		-t $(FRONTEND_IMAGE) -f Dockerfile.frontend .

# Build the backend Docker image
.PHONY: build-backend
build-backend:
	cd backend && docker build -t $(BACKEND_IMAGE) -f Dockerfile.backend .

# Run the frontend container
.PHONY: run-frontend 
run-frontend:
	docker run -d --name $(FRONTEND_CONTAINER) -p 80:80 \
		--env-file frontend/.env \
		-v $(shell pwd)/.env:/etc/${APP_NAME}/secrets.yaml:ro $(FRONTEND_IMAGE)

# Run the backend container
.PHONY: run-backend
run-backend:
	docker run -d --name $(BACKEND_CONTAINER) -p 8080:8080 \
		--env-file backend/.env \
		-v $(shell pwd)/.env:/etc/${APP_NAME}/secrets.yaml:ro $(BACKEND_IMAGE)

# Stop and remove the frontend container
.PHONY: stop-frontend
stop-frontend:
	docker stop $(FRONTEND_CONTAINER) || true
	docker rm $(FRONTEND_CONTAINER) || true

# Stop and remove the backend container
.PHONY: stop-backend
stop-backend:
	docker stop $(BACKEND_CONTAINER) || true
	docker rm $(BACKEND_CONTAINER) || true

# Rebuild and restart the frontend container
.PHONY: restart-frontend
restart-frontend: stop-frontend build-frontend run-frontend

# Rebuild and restart the backend container
.PHONY: restart-backend
restart-backend: stop-backend build-backend run-backend

# Build and run both frontend and backend containers
.PHONY: all 
all: build-frontend build-backend run-frontend run-backend

# Stop and remove both frontend and backend containers
.PHONY: clean 
clean: stop-frontend stop-backend

# Default target to build and run both frontend and backend
.PHONY: default
default: all

# Declare phony targets
.PHONY: build-frontend build-backend run-frontend run-backend create-frontend-env debug-env stop-frontend stop-backend restart-frontend restart-backend all clean default
