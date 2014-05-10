# Installing Breeze
The installation process of Breeze should be just that: a breeze. The
following is a set of **tl;dr**-style commands:

```shell
$ vagrant up && vagrant ssh
$ npm install && npm setup && grunt watch
```

## Installing Packages
NPM provides an extension called [npm-shrinkwrap][] that fixes the installation
of packages _and_ the sub-packages to a specific version. This prevents
packages with implicit dependencies from being silently upgraded and breaking
functionality. Running `npm install` handles this black magic for you.

## Bootstrapping
In order to make the bootstrapping of the application easier over time, an
alias for a suite of tasks to be either handled by Grunt or whichever task
runner you choose to use has been defined in `package.json` via `npm setup`.
This goes through the act of (potentially) seeding the database for you with some
placeholder.

## Testing
The different types of tests that'd be run (unit, regression, feature and the
likes) wouldn't be run directly but in the future via the `npm` command. Things
like `npm test`, `npm test:ci`, `npm test:fast`, `npm test:slow` would be
available as the test suite grows in complexity.

# Using Vagrant
It's strongly recommended that you do any work with Breeze within Vagrant. The
instance provided uses CentOS 6.5 and using the Puppet configuration; comes
with the GCC toolchain, Node, and Python (for node-gyp support). The
application will be available over the port 8080, regardless of the underlying
port it chooses to use; for sanity across the board. Users of Mac OS X can use
something like [Pow][] to emulate a host name for the application, otherwise
editing your `/etc/hosts` would be desired, but not required. The Vagrant tool
also sets up the databases, HTTP forwarding servers and the likes so the
application as closely as it would to a production state without affecting its
host machine. Provisioning is shared alongside with the code using Puppet.

[pow]: http://pow.cx
[npm-shrinkwrap]: https://www.npmjs.org/doc/cli/npm-shrinkwrap.html
