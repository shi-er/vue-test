#!/usr/bin/env bash
npm i
npm run build
zip -r dist.zip dist
scp -r dist.zip vue_admin@47.98.189.110:/home/vue_admin/builds/
