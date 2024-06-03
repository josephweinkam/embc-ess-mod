# Warm up before running heavier load test
# npm run stepTest -- -e VUS=5 -e DUR=2m -e WAIT=false

# Step Test - Increase vus each run
# Scenario 1: Increase by 10 each time
# npm run stepTest -- -e VUS=10 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=20 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=30 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=40 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=50 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=60 -e DUR=10m -e WAIT=false

# Scenario 2: Increase by 5 each time
# npm run stepTest -- -e VUS=15 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=20 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=25 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=30 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=35 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=40 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=45 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=50 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=55 -e DUR=10m -e WAIT=false
# npm run stepTest -- -e VUS=60 -e DUR=10m -e WAIT=false


# npm run regNewProfile
npm run regNewProfile -- -e VUS=20 -e ITERS=1