![TypeScript Playground Feature Graphics](https://raw.githubusercontent.com/johnnymillergh/MaterialLibrary/master/vuetify-typescript-playground/vuetify-typescript-playground-blue-background.png)

[![GitHub release](https://img.shields.io/github/release/johnnymillergh/vuetify-typescript-playground.svg)](https://github.com/johnnymillergh/vuetify-typescript-playground/releases)
[![Build Status](https://travis-ci.com/johnnymillergh/vuetify-typescript-playground.svg?branch=master)](https://travis-ci.com/johnnymillergh/typescript-playground)
[![GitHub issues](https://img.shields.io/github/issues/johnnymillergh/vuetify-typescript-playground)](https://github.com/johnnymillergh/vuetify-typescript-playground/issues)
[![GitHub forks](https://img.shields.io/github/forks/johnnymillergh/vuetiify-typescript-playground)](https://github.com/johnnymillergh/vuetify-typescript-playground/network)
[![GitHub stars](https://img.shields.io/github/stars/johnnymillergh/vuetiify-typescript-playground)](https://github.com/johnnymillergh/vuetify-typescript-playground/stargazers)
[![GitHub license](https://img.shields.io/github/license/johnnymillergh/vuetiify-typescript-playground)](https://github.com/johnnymillergh/vuetify-typescript-playground/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/johnnymillergh/vuetiify-typescript-playground?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fjohnnymillergh%2Fvuetify-typescript-playground)

# Vuetify TypeScript Playground

**Vuetify TypeScript Playground** is a Vuetify tutorial project based on TypeScript.

[Official Docker Image](https://hub.docker.com/r/ijohnnymiller/vuetify-typescript-playground-prod)

## Features

Here is the highlights of **TypeScript Playground**:

1. Based on the most modern and latest [**Type**Script](https://github.com/microsoft/TypeScript) - [![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=3.7.3&x2=0)](https://www.npmjs.com/package/typescript)
3. Material components demo.
4. Docker support.
5. Multi-environment support.
6. NGINX Gzip support.
6. Support `Dark` / `Light` color scheme. Self-adaptive color scheme change.

## Usage

### Project Setup

Recommended IDE is the latest version JetBrains WebStorm.

1. Clone or download this project.

   ```shell
   $ git clone https://github.com/johnnymillergh/typescript-playground.git
   ```

2. Project setup.

   ```shell
   npm install
   ```

### Compiles and Hot-reloads for Development

   ```shell
npm run serve
   ```

### Compiles and Minifies for Production

```shell
npm run build
```

### Run Your Unit Tests

```sh
npm run test:unit
```

### Lints and fixes files

```shell
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker Integration

Docker deployment can defer by environment. Here is the list of environments:

| #    | Environment Name   | Environment Alias Name | Description |
| ---- | ------------------ | ---------------------- | ----------- |
| 1    | development_docker | dev_dkr                |             |
| 2    | test               | test                   |             |
| 3    | stage              | stage                  |             |
| 4    | production         | prod                   |             |

### The Procedures of Docker Deployment

1. Compile and minify source (can be deferred by environment, if it’s `development_docker`, then the command could be `npm run build:dev_dkr`)

   ```shell
   npm run build
   ```

2. Build Docker image and run by Docker Compose. Available Docker Compose:

   - development_docker
   - test
   - stage
   - production

## Maintainers

[@johnnymillergh](https://github.com/johnnymillergh).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/johnnymillergh/typescript-playground/issues/new).

### Contributors

This project exists thanks to all the people who contribute. 

- Johnny Miller [[@johnnymillergh](https://github.com/johnnymillergh)]
- …


### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](Become a sponsor)]

## License

[Apache License](https://github.com/johnnymillergh/typescript-playground/blob/master/LICENSE) © Johnny Miller

2019 - Present



