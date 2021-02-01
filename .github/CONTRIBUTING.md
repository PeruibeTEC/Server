# Contribution guidelines

## Table of Contents

- [Getting started](#getting-started)
  - [Language](#language)
  - [Code of Conduct](#code-of-conduct)
- [How can I help ?](#how-can-i-help)
  - [Documentation](#documentation)
  - [Issues](#issues)
    - [Submitting an Issue](#submitting-an-issue)
  - [Feedback](#feedback)
  - [Code](#code)
    - [Dev environment](#dev-environment)

## Getting started

Here we have a set of instructions and guidelines to reduce misunderstandings and make the process of contributing to `PeruibeTec` as smooth as possible.

We hope this guide makes the contribution process clear and answers any questions you may have.

### Language

When contributing or interacting in any way in this project, avoid using any language other than **English**, languages other than English will be ignored

### Code of Conduct

We expect that project participants to adhere to our Code of Conduct. You can check the [full text](CODE_OF_CONDUCT.md) so that you may understand the kind of conduct we are expecting and what actions will and will not be tolerated.

By participating in this project, you agree to abide by its terms.

## How can I help ?

Here are some ways you can help along with some guidelines.

### Documentation

As a user of `PeruibeTec`, you're the perfect candidate to help us improve our documentation!

Typos, errors, lack of examples and/or explanation and so on, are just some examples of things that could be fixed and/or improved.

You could even make improvements to this guide! :)

While documenting, try to keep things simple and clear.

### Issues

Some issues are created with missing information, without a template, not reproducible, or plain
invalid.

You can make them easier to understand and resolve.

#### Submiting an issue

- Please search for similar issues before opening a new one;
- Use one of the corresponding issue templates;
- Use a clear and descriptive title;
- Include as much information as possible by filling out the provided issue template;
- Most of the time, the best way to report an issue is a failing test proving it.

### Feedback

The more feedback the better! We're always looking for more suggestions and opinions on discussions. That's a good opportunity to influence the future direction of this tool.

This includes submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

The [`question`](https://github.com/PeruibeTec/Server/labels/question%20or%20discussion) labels are a good place to find ongoing discussions.

### Code

You can use issue labels to discover issues you could help out with:

- [`bug` issues](https://github.com/PeruibeTec/Server/labels/bug)
  are known bugs we'd like to fix;
- [`feature request` issues](https://github.com/PeruibeTec/Server/labels/feature%20request)
  are features we're open to include.

When you see an issue that is already assigned, please check to see if there isn't someone working on it already (maybe try asking in the issue). This is to prevent unnecessary work for everyone involved.

#### Dev environment

When developing, prefer using **Node** ≥ 10 and **yarn**. Writing code with the latest stable Node versions allows us to use newer developer tools.

After [cloning the repository](https://help.github.com/articles/cloning-a-repository/), run `yarn` to install dependencies.

A summary of the scripts:

- The `yarn dev:start` command will build the lib and watch files in bundle and rebuild on changes;
- Use `yarn test` to run the test suite (powered by [Jest](https://facebook.github.io/jest/));
- `yarn coveralls` can't be used locally, this is only used to provide test coverage statistics to [Coveralls](https://coveralls.io);
  - For code coverage locally, you can run `yarn test --coverage`.
- `yarn build` will build the build

This project uses [Prettier](http://prettier.io/) for code formatting and also uses [ESLint](https://eslint.org/) for code verification. Consider installing a [prettier plugin](https://prettier.io/docs/en/editors.html) and an [eslint plugin](https://eslint.org/docs/developer-guide/working-with-plugins) for the best experience, but the code will also be formatted with a pre-confirmation script.
