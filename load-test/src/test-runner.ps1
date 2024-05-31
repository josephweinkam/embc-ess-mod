# Step Test - Increase vus each run
# npm run stepTest -- -e VUS=10
# npm run stepTest -- -e VUS=20
# npm run stepTest -- -e VUS=30
# npm run stepTest -- -e VUS=40
# npm run stepTest -- -e VUS=50
# npm run stepTest -- -e VUS=60

# Warm up before running heavier load test
# npm run stepTest -- -e VUS=5 -e MIN=2 -e WAIT=false

# npm run stepTest -- -e VUS=30
# npm run stepTest -- -e VUS=35
# npm run stepTest -- -e VUS=40
npm run stepTest -- -e VUS=45


# npm run regNewProfile