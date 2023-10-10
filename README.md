# My Movie DB

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A MEVN stack application to help anyone manage their own little virtual movie library online.

## Accessing the app online

A hosted production version is available at https://my-movie-db2-kb76qm2suq-ew.a.run.app/. Please have a little patience, as the app is hosted on a free tier of Google Cloud Run and may take a few seconds to start up.

## Setting up locally for development

> **Note:**
> The guide assumes you have Docker and Docker Compose installed locally. If not, refer to the [Docker documentation](https://docs.docker.com/compose/install/) for installation instructions.

You will need an API key for the following services:

- [OMDb API](https://www.omdbapi.com/) for searching for movies

Create `.env` files in the frontend and backend directories with contents similar to the `.env.example` files.

Then, run the app with the following:

```bash
docker compose up -d mongo
docker compose up api frontend
```

This will start up the necessary Docker containers - the backend Node.js app, the MongoDB database, and the frontend Vue.js app. The Mongo container will be started in the background, so you don't get the tons of output from it.

The backend API will be available at http://localhost:3000 and the frontend at http://localhost:5173.

> **Note**: in dev environment, the app uses live reload for changes inside the `src` directory in both the frontend and backend. Any changes to files outside of `src`, e.g. package installations, will require a rebuild of the respective containers.

### Customising the environment

If using your own MongoDB instance, there is no need to run the mongo service, so after modifying `backend/.env` accordingly you can just run the app with:

```bash
docker compose up api frontend
```

## MIT License

Project: Copyright (c) 2023 Johan Hedman

Node template: Copyright (c) 2023 Coyotiv

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
