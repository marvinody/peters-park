# should probably add shebang, but not sure linux/mac compat.
echo "Ignore any 'dropdb: database removal failed' kinda thing"
dropdb peters-park
createdb peters-park
