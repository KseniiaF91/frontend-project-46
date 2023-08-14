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

rec:
	asciinema rec