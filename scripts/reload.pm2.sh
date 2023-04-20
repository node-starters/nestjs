#!/usr/bin/env bash

while getopts e: flag
do
  case "${flag}" in
    e) export NODE_ENV=${OPTARG};;
  esac
done
npm install
npm run build
pm2 restart ecosystem.config.js --env $NODE_ENV --no-daemon