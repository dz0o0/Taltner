// このファイルは`./server/.pre-commit-config.yaml`で管理する.
module.exports = {
    /*
     * documentation: https://commitlint.js.org/reference/configuration.html
     */
    extends: ['@commitlint/config-conventional'],
    rules: {
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
    },
};
