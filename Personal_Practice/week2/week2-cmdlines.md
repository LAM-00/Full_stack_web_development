
1. Create a new folder
mkdir week3
cd week3
2. Initialize a new Node project
npm init -y
3. Install dependencies (like Express)
npm install express
4. Create your JS files
server.js
test.js
hello.js
anything else you need

5. Create a Dockerfile
Same pattern:

Dockerfile
FROM node:3002
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]


6. Create docker-compose.yml
Same pattern:

services:
  web:
    build: .
    container_name: week3-node
    ports:
      - "3000:3000"

7. Build and run
docker compose up --build

8. Run JS files locally
node test.js
node hello.js








***> mkdir week2***

***> cd week2***

***> code .***



> node --version

v24.13.0

> pwd



Path

----

D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2





PS D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2> ls




   Directory: D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2





Mode                 LastWriteTime         Length Name

----                 -------------         ------ ----

-a----         1/19/2026   9:41 PM            232 docker-compose.yml

-a----         1/19/2026   9:31 PM            311 Dockerfile

-a----         1/19/2026   9:30 PM            183 package.json

-a----         1/19/2026   9:30 PM            584 server.js

-a----         1/19/2026   9:00 PM             23 test.js

-a----         1/19/2026   9:48 PM             58 week2-cmdlines.txt





> npm -v

11.6.2





***> npm init -y***

Wrote to D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2\\package.json:



{

&nbsp; "name": "week2-node",

&nbsp; "version": "1.0.0",

&nbsp; "main": "server.js",

&nbsp; "scripts": {

&nbsp;   "start": "node server.js"

&nbsp; },

&nbsp; "dependencies": {

&nbsp;   "express": "^4.18.2"

&nbsp; },

&nbsp; "description": "",

&nbsp; "keywords": \[],

&nbsp; "author": "",

&nbsp; "license": "ISC",

&nbsp; "type": "commonjs"

}







PS D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2> ls





&nbsp;   Directory: D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2





Mode                 LastWriteTime         Length Name

----                 -------------         ------ ----

-a----         1/19/2026   9:41 PM            232 docker-compose.yml

-a----         1/19/2026   9:31 PM            311 Dockerfile

-a----         1/19/2026  10:24 PM            285 package.json

-a----         1/19/2026   9:30 PM            584 server.js

-a----         1/19/2026   9:00 PM             23 test.js

-a----         1/19/2026   9:48 PM             58 week2-cmdlines.txt





***> npm install express***



added 68 packages, and audited 69 packages in 4s



15 packages are looking for funding

&nbsp; run 'npm fund' for details



found 0 vulnerabilities

> ls





&nbsp;   Directory: D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2





Mode                 LastWriteTime         Length Name

----                 -------------         ------ ----

d-----         1/19/2026  10:25 PM                node\_modules   <<< got created

-a----         1/19/2026   9:41 PM            232 docker-compose.yml

-a----         1/19/2026   9:31 PM            311 Dockerfile

-a----         1/19/2026  10:25 PM          30168 package-lock.json  << got created

-a----         1/19/2026  10:25 PM            285 package.json

-a----         1/19/2026   9:30 PM            584 server.js

-a----         1/19/2026   9:00 PM             23 test.js

-a----         1/19/2026   9:48 PM             58 week2-cmdlines.txt





***> node server.js***

Server running on http://localhost:3002

***> node test.js***

hello



> ls





&nbsp;   Directory: D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2





Mode                 LastWriteTime         Length Name

----                 -------------         ------ ----

d-----         1/19/2026  10:25 PM                node\_modules

-a----         1/19/2026   9:41 PM            232 docker-compose.yml

-a----         1/19/2026   9:31 PM            311 Dockerfile

-a----         1/19/2026  10:30 PM             45 hello.js

-a----         1/19/2026  10:25 PM          30168 package-lock.json

-a----         1/19/2026  10:25 PM            285 package.json

-a----         1/19/2026   9:30 PM            584 server.js

-a----         1/19/2026   9:00 PM             23 test.js

-a----         1/19/2026   9:48 PM             58 week2-cmdlines.txt





> node hello.js

hello there this is LiN AOUR!!

> node .\\test.js

hello





***> docker compose up --build***

time="2026-01-19T22:33:03-06:00" level=warning msg="D:\\\\My\_Drive\\\\LAM\\\\UofS\\\\3RD\_YEAR\\\\2WINTER-2026\\\\CMPT\_353\\\\Docker\\\\Personal\_Practice\\\\week2\\\\docker-compose.yml: the attribute 'version' is obsolete, it will be ignored, please remove it to avoid potential confusion"

\[+] Building 5.8s (12/12) FINISHED

&nbsp;=> \[internal] load local bake definitions                                                                                                           0.0s

&nbsp;=> => reading from stdin 620B                                                                                                                       0.0s

&nbsp;=> \[internal] load build definition from Dockerfile                                                                                                 0.0s

&nbsp;=> => transferring dockerfile: 350B                                                                                                                 0.0s

&nbsp;=> \[internal] load metadata for docker.io/library/node:latest                                                                                       0.1s

&nbsp;=> \[internal] load .dockerignore                                                                                                                    0.0s

&nbsp;=> => transferring context: 2B                                                                                                                      0.0s

&nbsp;=> \[1/5] FROM docker.io/library/node:latest@sha256:6d362f0df70431417ef79c30e47c0515ea9066d8be8011e859c6c3575514a027                                 0.1s

&nbsp;=> => resolve docker.io/library/node:latest@sha256:6d362f0df70431417ef79c30e47c0515ea9066d8be8011e859c6c3575514a027                                 0.0s

&nbsp;=> \[internal] load build context                                                                                                                    0.1s

&nbsp;=> => transferring context: 30.57kB                                                                                                                 0.0s

&nbsp;=> CACHED \[2/5] WORKDIR /app                                                                                                                        0.0s

&nbsp;=> \[3/5] COPY package\*.json ./                                                                                                                      0.1s

&nbsp;=> \[4/5] RUN npm install                                                                                                                            3.4s

&nbsp;=> \[5/5] COPY server.js .                                                                                                                           0.1s

&nbsp;=> exporting to image                                                                                                                               1.4s

&nbsp;=> => exporting layers                                                                                                                              0.5s

&nbsp;=> => exporting manifest sha256:3cd73c05708828fd0a223ae3445fdae31ced4a0330285ccd3f8de32eb52330c4                                                    0.0s

&nbsp;=> => exporting config sha256:31819bf0d0de09a55f91289bc20d44247acce488b59ae1d320e0e1f7f92eed4f                                                      0.0s

&nbsp;=> => exporting attestation manifest sha256:7af97927e56d903f4b567da1b863c32b77ab4ba4aaefd9a6fd3bebae216ea694                                        0.0s

&nbsp;=> => exporting manifest list sha256:44f5772b617fd36e7bc3281a4242d86fce000a4cc00c3bf82893304f97b4e7af                                               0.0s

&nbsp;=> => naming to docker.io/library/week2-web:latest                                                                                                  0.0s

&nbsp;=> => unpacking to docker.io/library/week2-web:latest                                                                                               0.7s

&nbsp;=> resolving provenance for metadata file                                                                                                           0.0s

\[+] Running 2/2

&nbsp;✔ week2-web             Built                                                                                                                       0.0s

&nbsp;✔ Container week2-node  Recreated                                                                                                                   0.6s

Attaching to week2-node

week2-node  | Server running on http://localhost:3002

Gracefully Stopping... press Ctrl+C again to force

&nbsp;Container week2-node  Stopping

&nbsp;Container week2-node  Stopped









> docker compose down

time="2026-01-19T22:35:09-06:00" level=warning msg="D:\\\\My\_Drive\\\\LAM\\\\UofS\\\\3RD\_YEAR\\\\2WINTER-2026\\\\CMPT\_353\\\\Docker\\\\Personal\_Practice\\\\week2\\\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"

\[+] Running 2/2

&nbsp;✔ Container week2-node   Removed                                                                                                                    0.0s

&nbsp;✔ Network week2\_default  Removed                                                                                                                    0.3s

PS D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2> docker ps -a

CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS                    PORTS      NAMES

c5226688e9e3   534ca054beaf   "docker-entrypoint.s…"   5 days ago    Exited (255) 5 days ago   3002/tcp   vigilant\_chandrasekhar

1bf39860a64d   lam/node       "docker-entrypoint.s…"   10 days ago   Exited (0) 10 days ago               jovial\_moser

90e9ee729f0e   lam/node       "docker-entrypoint.s…"   10 days ago   Exited (0) 10 days ago               nostalgic\_visvesvaraya

b155c76ce48e   lam/node       "docker-entrypoint.s…"   10 days ago   Exited (0) 10 days ago               hardcore\_curran

PS D:\\My\_Drive\\LAM\\UofS\\3RD\_YEAR\\2WINTER-2026\\CMPT\_353\\Docker\\Personal\_Practice\\week2>

