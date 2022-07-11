#!/bin/bash

# Restore staging db from prod db.

echo "Pulling proudction db to local filesystem..."
mongodump --uri="mongodb+srv://devcenterAdmin@devhub-cluster.sewho.mongodb.net/cms" --out="/tmp/db-dump"

echo "Pushing dumped files to staging db..."
mongorestore --drop --uri="mongodb+srv://devcenterAdmin@devhub-cluster.sewho.mongodb.net/cms-test" /tmp/db-dump/cms/

echo "Removing dunmped files..."
rm -R /tmp/db-dump

echo 'Done!'