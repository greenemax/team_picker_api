#!/bin/bash

API="http://localhost:4741"
URL_PATH="/players"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "player": {
      "name": "'"${NAME}"'",
      "cost": "'"${COST}"'",
      "category": "'"${CATEGORY}"'"
    }
  }'

echo
