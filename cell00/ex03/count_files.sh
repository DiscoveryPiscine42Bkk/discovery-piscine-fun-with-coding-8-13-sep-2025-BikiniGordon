#!/bin/bash

COUNT=$(find . -maxdepth 1 -type f | wc -l)

echo "$COUNT"
