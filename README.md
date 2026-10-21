# Shop and WebSocket Chat Demo

A small educational online-store demo combining a product API, customer/admin interfaces, WebSocket chat, and an Nginx reverse proxy.

## Services

| Service | Role | Host port |
|---|---|---|
| `client` | Customer interface | 3000 |
| `admin` | Administration interface | 4000 |
| `ws` | WebSocket server | 4050 |
| `backend` | Express product API | Internal |
| `lb` | Nginx API entry point | 8080 |

Products are stored in `backend/products.json`, mounted into the API container.

## Run

Requires Docker and Docker Compose:

```sh
docker compose up --build --scale backend=3
```

Open `http://localhost:3000` for the customer interface and `http://localhost:4000` for the admin interface. Inspect `nginx.conf` for proxy routing and `backend/swagger.json` for the API description.

## Layout

Each of `client/`, `admin/`, `backend/` and `ws/` has its own Node.js manifest and Dockerfile. `docker-compose.yml` connects the services on one network.

## Learning scope

This demonstrates service separation and a replicated backend, not a complete commerce platform. Multiple API replicas share a JSON file without a transactional database; concurrent writes need redesign before real use. Authentication, payment processing and production deployment are outside the demonstrated setup. The repository also contains committed `node_modules` directories.
