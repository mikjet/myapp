module.exports = {
    collectCoverage: true,
    coverageDirectory: "/react-app/test-coverage",  // Absolute path for coverage
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "/react-app/test-reports",  // Absolute path for junit output
                outputName: "junit.xml"
            }
        ]
    ],
    coverageReporters: ["lcov", "text"],
};