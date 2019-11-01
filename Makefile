GOFLAGS := -tags netgo -installsuffix netgo -ldflags '-w -s --extldflags "-static"'
GOVERSION=$(shell go version)
GOOS=js
GOARCH=wasm
BUILD_DIR=build/$(GOOS)-$(GOARCH)

.PHONY: all build clean deps

all: build

build:
	mkdir -p $(BUILD_DIR)
	GOOS=$(GOOS) GOARCH=$(GOARCH) go build $(GOFLAGS) -o $(BUILD_DIR)/sqldef.wasm node-sqldef.go
	cp ${GOROOT}/misc/wasm/wasm_exec.js $(BUILD_DIR)

clean:
	rm -rf build package

deps:
	go get

