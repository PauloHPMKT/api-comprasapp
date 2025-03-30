git fetch --tags
LAST_TAG=$(git tag --sort=-v:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1)
echo "Última versão encontrada: $LAST_TAG"
echo "VERSION=$LAST_TAG" >> $GITHUB_ENV