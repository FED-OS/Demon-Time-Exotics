.PHONY: install dev build clean test lint typecheck release

install:
	pnpm install

dev:
	pnpm dev

dev-landing:
	pnpm dev:landing

dev-tauri:
	pnpm dev:tauri

dev-electron:
	pnpm dev:electron

dev-mobile:
	pnpm dev:mobile

build:
	pnpm build

build-landing:
	pnpm build:landing

build-tauri:
	pnpm build:tauri

build-electron:
	pnpm build:electron

build-mobile:
	pnpm build:mobile

lint:
	pnpm lint

typecheck:
	pnpm typecheck

test:
	pnpm test

clean:
	pnpm clean

release:
	pnpm release
