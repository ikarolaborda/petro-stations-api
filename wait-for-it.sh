#!/bin/sh
# Use this script to test if a given TCP host/port are available

TIMEOUT=15
QUIET=0
HOST="$1"
PORT="$2"

usage() {
    echo "Usage: $0 host port"
    exit 1
}

wait_for() {
  for i in `seq $TIMEOUT` ; do
    nc -z "$HOST" "$PORT" > /dev/null 2>&1
    result=$?
    if [ $result -eq 0 ] ; then
      exit 0
    fi
    sleep 1
  done
  exit 1
}

if [ "$HOST" = "" -o "$PORT" = "" ]; then
    usage
fi

wait_for
