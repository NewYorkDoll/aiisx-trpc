.PHONY: build
build:
	pip3 install -r requirements.txt
	BUILD_TIME=`date +"%Y-%m-%d %H:%M:%S"` ; \
	echo $$BUILD_TIME ; \
	echo "BUILD_TIME=$$BUILD_TIME" > .env ; \
	npm run build
