BUNDLE    := app/main + app/bundle + core-js

build:
	mimosa build

bundle: build
	jspm bundle --minify=false $(BUNDLE) lib/app.js

debug-bundle:
	node-debug jspm bundle $(BUNDLE) lib/app.js

deploy:
	#jspm bundle $(BUNDLE) lib/app.min.js --minify --inject
	# minification is broken, run unminified for now
	jspm bundle $(BUNDLE) lib/app.js --inject

update:
	npm update
	jspm update --save

start:
	mimosa watch -s

test:
	karma start --no-auto-watch --single-run
