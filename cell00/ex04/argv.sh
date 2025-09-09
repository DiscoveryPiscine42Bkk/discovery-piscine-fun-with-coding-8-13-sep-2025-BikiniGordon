#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
	exit 1

fi

for i in 1 2 3; do
	if [ -z "${!i}" ]; then
		break
	fi

	echo "${!i}"
done
