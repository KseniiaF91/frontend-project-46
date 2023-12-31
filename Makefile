install:	
	npm ci
	
gendiff:
	node bin/gendiff.js

publish:	
	npm publish --dry-run

lint:		
	 npx eslint .	

lintfix:
	npx eslint --fix .
	
test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

rec:
	asciinema rec