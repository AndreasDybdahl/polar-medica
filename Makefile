build:
	mimosa build

bundle:
	jspm bundle lib/app/main lib/app.js

debug-bundle:
	node-debug jspm bundle lib/app/main lib/app.js

deploy:
	#jspm bundle lib/app/main lib/app.min.js --minify --inject
	# minification is broken, run unminified for now
	jspm bundle lib/app/main lib/app.js --inject

start:
	mimosa watch -s

test:
	karma start --no-auto-watch --single-run