module.exports = {
  allowedPackages: [
    {
      name: "axe-core@4.4.1",
      reason: "we need this to run the package",
    },

    {
      name: "language-subtag-registry@0.3.21",
      reason: "fjjf",
    },
    {
      name: "argparse@2.0.1",
      reason: "fjjf",
    },
    {
      name: "mariadb@3.0.0 LGPL-2.1",
      reason: "the database",
    },
  ],
  disallowedPackages: [],
  allowedLicenses: [
    "MIT",
    "Apache-2.0",
    "ISC",
    "Apache",
    "WTF",
    "Public Domain",
    "MPL",
    "CC-BY-3.0",
    "CC-BY-4.0",
    "BSD-3-Clause",
    "BSD-2-Clause",
    "X11",
    "WTFPL",
    "CDDL",
    "LGPL",
    "Apache 2.0",
    "MIT/X11",
    "AFL",
    "(MIT AND CC-BY-3.0)",
    "Unlicense",
    "OFL-1.1 AND MIT",
    "LGPL-2.1-",
  ],
  strictMode: true,
  ignoreDevDependencies: true,
  warnOnUnknown: true,
};
