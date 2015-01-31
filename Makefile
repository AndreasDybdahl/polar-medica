BUNDLE    := app/main + app/bundle + core-js

build:
	mimosa build

bundle:
	jspm bundle $(BUNDLE) lib/app.js

debug-bundle:
	node-debug jspm bundle $(BUNDLE) lib/app.js

deploy:
	#jspm bundle $(BUNDLE) lib/app.min.js --minify --inject
	# minification is broken, run unminified for now
	jspm bundle $(BUNDLE) lib/app.js --inject

start:
	mimosa watch -s

test:
	karma start --no-auto-watch --single-run