#!/bin/bash

API="http://localhost:4741"
URL_PATH="/lineup"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "lineup": {
      "name": "'"${NAME}"'"
    }
  }'

echo
