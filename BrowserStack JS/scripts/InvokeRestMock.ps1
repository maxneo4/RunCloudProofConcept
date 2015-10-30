$json = '{
  "Email": "maxneo4@gmail.com",
  "Password": "$Pass123",
  "ConfirmPassword": "$Pass123"
}'

$uri = 'http://localhost:8000/api/values'

Invoke-RestMethod -Method Post -Uri $uri -Body $json -ContentType 'text/json'

BrowserStackLocal 8TCw23SoLnrWjLdVY4PV  localhost,3000,0
