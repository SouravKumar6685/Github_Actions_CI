# XO Game – React + Docker + CI/CD + Kubernetes (Minikube)

This project demonstrates a **full end-to-end workflow** — from building a React frontend to deploying it on **Kubernetes** locally using **Minikube**, with a complete **Docker + GitHub Actions CI/CD pipeline**.

---

## 🏗️ 1. Project Setup (React + Vite)

**Environment:**

* Node: `v22.14.0`
* npm: `v11.2.0`

**Folder Structure**

![](https://i.postimg.cc/7hd9PvKr/0-Folder-Structure.png)

---

## 🐳 2. Dockerfile Setup (Multi-stage Build)

We use a **multi-stage Dockerfile** to build and serve the React app with Nginx.

**Build & Run locally:**

```bash
docker build -t xo-game-app .
docker run -d -p 8080:80 xo-game-app
```

Access it at:
👉 [http://localhost:8080](http://localhost:8080)

---

## ⚙️ 3. GitHub Actions CI/CD Pipeline

We created a **CI/CD workflow** (`.github/workflows/ci-pipeline.yml`) that:

1. Runs **unit tests**
2. Runs **ESLint static analysis**
3. Builds the React project
4. Builds and pushes the Docker image to **Docker Hub**
5. Runs a **Trivy security scan**

**Main stages:**

```yaml
jobs:
  test:       # Run unit tests
  lint:       # Run ESLint
  build:      # Build React app
  docker:     # Build, scan, and push Docker image
```

Docker Hub credentials are stored securely in repository secrets:

* `DOCKER_USERNAME`
* `DOCKER_TOKEN`

![](https://i.postimg.cc/cH8MDkxg/01-Build-Pipeline.png)

After pipeline success, your image appears on Docker Hub:

```
docker.io/<your-username>/xo-game:latest
```

![](https://i.postimg.cc/nLXvzSQK/02-Docker-Check.png )

---

## 🔍 4. Verify Docker Image

Check if the image was pushed successfully:

```bash
docker pull <your-username>/xo-game:latest
docker images | grep xo-game
```

Run locally to verify:

```bash
docker run -d -p 8080:80 <your-username>/xo-game:latest
```

![](https://i.postimg.cc/pV3Gf8B9/03-Docker-pull.png)

---

## ☸️ 5. Kubernetes Setup (Minikube)

We use Minikube to deploy and test the app locally.

### Start cluster:

```bash
minikube start
```

### Enable Ingress:

```bash
minikube addons enable ingress
```

### Folder structure:

```
k8s/
├── namespace.yaml
├── deployment.yaml
├── service.yaml
└── ingress.yaml
```

### Apply manifests:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## 🌐 6. Accessing the App (Ingress Setup)

Add this entry to your `/etc/hosts` (or Windows hosts file):

```
127.0.0.1 xo-game.local
```

Then visit:
👉 [http://xo-game.local](http://xo-game.local)

![](https://i.postimg.cc/1RVM3XZZ/06-Local-Host.png)

If you’re using Minikube:

```bash
echo "$(minikube ip) xo-game.local" | sudo tee -a /etc/hosts
```

---

## 🧩 7. Verify Everything

Check running components:

```bash
kubectl get all -n stagging
```

![](https://i.postimg.cc/vBB9jqGT/04-Describe.png)

Expected output:

```
NAME                                      READY   STATUS    RESTARTS   AGE
pod/xo-game-deployment-xxxxxxx            1/1     Running   0          1m
service/xo-game-service                   ClusterIP  10.x.x.x  <none>  80/TCP  1m
ingress/xo-game-ingress                   nginx   xo-game.local   <none>  80   1m
```

---

## ✅ Summary

| Stage            | Tool / Stack          | Description                   |
| ---------------- | --------------------- | ----------------------------- |
| Frontend         | React + Vite          | Built a modern SPA            |
| Containerization | Docker + Nginx        | Multi-stage build             |
| CI/CD            | GitHub Actions        | Lint, test, scan, build, push |
| Registry         | Docker Hub            | Image hosting                 |
| Orchestration    | Kubernetes (Minikube) | Local deployment              |
| Routing          | Ingress (NGINX)       | Domain mapping to service     |
