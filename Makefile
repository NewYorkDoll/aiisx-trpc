.PHONY: build

build:
    sed -i "s/BUILD_TIME=.*/BUILD_TIME=$$(date '+%Y-%m-%d %H:%M:%S')/" .env
    npm run build
