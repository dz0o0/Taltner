// このファイルは`./server/.pre-commit-config.yaml`で管理する.
module.exports = {
    /*
     * documentation: https://commitlint.js.org/reference/configuration.html
     */
    extends: ['@commitlint/config-conventional'],
    
    rules: {
        "subject-case": [
            2,
            "always",
            [
                'lower-case',    // lower case
                'upper-case',    // UPPERCASE
                'camel-case',    // camelCase
                'kebab-case',    // kebab-case
                'pascal-case',   // PascalCase
                'sentence-case', // Sentence case
                'snake-case',    // snake_case
                'start-case'     // Start Case
            ]
        ],
        // typeのenumを強制
        'type-enum': [
            2,  // この数字何？
            'always',
            [
                // type(scope): <更新内容>
                // 上の`type`の部分の許可する文字列
                // CONTRIBUTING.mdに書いてあるものに従う
                "feat",
                "update",
                "fix",
                "docs",
                "ci",
                "refactor",
                "chore"
            ]
        ],
        "type-case": [
            2,
            "always",
            [
                "lower-case",
                "pascal-case"
            ]
        ],
    },
};
