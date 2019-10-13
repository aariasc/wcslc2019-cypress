# End-to-End tests in WordPress using Cypress

## WordCam SLC 2019

### Prerequisites

- [NodeJS with NPM](https://nodejs.org/en/)

### Install dependencies

```shell
npm install
```

### Run tests

#### Open Cypress runner

```shell
node_modules/.bin/cypress open
```

#### Run all tests locally (with videos and screenshots)

```shell
node_modules/.bin/cypress run
```

**Important:** screenshots and videos are deleted every time you run the tests, so you'll find only the latest execution.

##### Run all tests and store results in Cypress dashboard

(you need to create the project first)

```shell
node_modules/.bin/cypress run --record --key <cypress-dashboard-key>
```

The `cypress-dashboard-key` is available in the Settings section of the dashboard.

[Link to Cypress Dashboard](https://dashboard.cypress.io/)
