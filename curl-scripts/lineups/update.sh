API="http://localhost:4741"
URL_PATH="/lineup"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request PATCH \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "lineup": {
    "name": "'"${NAME}"'"
  }
}'

echo
