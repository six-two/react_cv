#!/bin/bash

# Change directories to the directory that contains this file
cd "$( dirname "${BASH_SOURCE[0]}" )"

# Create / update the language translation files
python3 data/yaml2json.py

# Start the app / do something else
if [ "$1" == "deploy" ]
then
  SKIP_PREFLIGHT_CHECK=true npm run deploy
else
  SKIP_PREFLIGHT_CHECK=true npm start
fi
