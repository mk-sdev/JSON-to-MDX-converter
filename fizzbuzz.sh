#!/bin/bash

scope=$1

for (( i=0; i < $scope; i++)); do
	if (( $i % 3 == 0)); then
		echo "$i fizz"
	elif (( $i % 5 == 0)); then
		echo "$i buzz"
	elif  
		echo "$i fizzbuzz"
	fi
done
