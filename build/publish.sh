#!/bin/bash

npm update

VERSION=$(node --eval "console.log(require('./package.json').version);")

# npm test || exit 1

git checkout -b release/v-$VERSION

jake build[,,true]
jake docs

git commit -m "v$VERSION"

git tag v$VERSION -f
git push -u origin release/v-$VERSION --tags -f

npm publish --access=public
