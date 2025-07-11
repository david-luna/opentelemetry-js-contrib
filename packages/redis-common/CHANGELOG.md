# Changelog

## [0.38.0](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.37.0...redis-common-v0.38.0) (2025-07-04)


### ⚠ BREAKING CHANGES

* **instrumentation-redis:** consolidate redis v2,3 and redis v4 instrumentation to one package ([#2915](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/2915))

### Features

* **instrumentation-redis:** consolidate redis v2,3 and redis v4 instrumentation to one package ([#2915](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/2915)) ([5988c79](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/5988c791983027c28f970b2d15047fd48c3f651f))

## [0.37.0](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.36.2...redis-common-v0.37.0) (2025-03-18)


### ⚠ BREAKING CHANGES

* chore!: Update to 2.x and 0.200.x @opentelemetry/* packages from opentelemetry-js.git per [2.x upgrade guide](https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/upgrade-to-2.x.md)
  * The minimum supported Node.js has been raised to ^18.19.0 || >=20.6.0. This means that support for Node.js 14 and 16 has been dropped.
  * The minimum supported TypeScript version has been raised to 5.0.4.
  * The compilation target for transpiled TypeScript has been raised to ES2022 (from ES2017).

### Miscellaneous Chores

* update to JS SDK 2.x ([#2738](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/2738)) ([7fb4ba3](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/7fb4ba3bc36dc616bd86375cfd225722b850d0d5))

## [0.36.2](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.36.1...redis-common-v0.36.2) (2024-04-25)


### Bug Fixes

* revert modifications to Apache license ([#2105](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/2105)) ([4590c8d](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/4590c8df184bbcb9bd67ce1111df9f25f865ccf2))

## [0.36.1](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.36.0...redis-common-v0.36.1) (2023-08-14)


### Bug Fixes

* Revert "feat(minification): Add importHelpers and tslib as a dependency ([#1545](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1545))" ([#1611](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1611)) ([e5bca5f](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/e5bca5fe5b27adc59c8de8fe4087d38b69d93bd4))

## [0.36.0](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.35.1...redis-common-v0.36.0) (2023-07-12)


### Features

* **minification:** Add importHelpers and tslib as a dependency ([#1545](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1545)) ([65f612e](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/65f612e35c4d67b9935dc3a9155588b35d915482))

## [0.35.1](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.35.0...redis-common-v0.35.1) (2023-05-16)


### Bug Fixes

* **eslint-config:** replace gts with prettier and eslint ([#1439](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1439)) ([2571c37](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/2571c371be1b5738442200cab2415b6a04c32aab))

## [0.35.0](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.34.0...redis-common-v0.35.0) (2023-03-03)


### Features

* **ioredis:** Update instrumentation-ioredis to version 5.x.x ([#1121](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1121)) ([f5f7ac6](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/f5f7ac6196b5422e030a6913c491117a6a3a0690))

## [0.34.0](https://github.com/open-telemetry/opentelemetry-js-contrib/compare/redis-common-v0.33.0...redis-common-v0.34.0) (2022-12-20)


### Features

* upstream mocha instrumentation testing plugin from ext-js [#621](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/621) ([#669](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/669)) ([a5170c4](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/a5170c494706a2bec3ba51e59966d0ca8a41d00e))


### Bug Fixes

* **redis:** serialize non sensitive arguments into db.statement attribute ([#1299](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1299)) ([092a250](https://github.com/open-telemetry/opentelemetry-js-contrib/commit/092a2509bcf884e1b997e0eaec3a6ca02cfd2058))
