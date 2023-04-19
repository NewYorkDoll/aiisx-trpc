.PHONY: build
build:
	BUILD_TIME=`date +"%Y-%m-%d %H:%M:%S"` ; \
	echo $$BUILD_TIME ; \
	echo "BUILD_TIME=$$BUILD_TIME" > .env ; \
	npm run build