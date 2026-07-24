#!/bin/sh

npx hardhat compile

npx hardhat node &

sleep 10

npx hardhat run scripts/deploy.js --network localhost

wait
