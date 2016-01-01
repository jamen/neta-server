babel = node_modules/.bin/babel

build: babel

babel:
	$(babel) src -d out
