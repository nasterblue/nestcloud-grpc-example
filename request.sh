#!/usr/bin/env bash

for i in {1..10000};
do curl --location --request GET 'http://localhost:3004/cats';
done