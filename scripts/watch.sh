#!/usr/bin/env bash
./node_modules/.bin/mocha         \
          --timeout 10000         \
          --watch $1
