const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('@babel/core');
const fs = require('fs');
class Parser {
    static ast(path) {
        const content = fs.readFileSync(path, 'utf-8');
        return babylon.parse(content, {
            sourceType: 'module',
        });
    }
    static getDependency(ast) {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value);
            },
        });
        return dependencies;
    }

    static transform(ast) {
        const { code } = transformFromAst(ast, null, {
            // presets: ['@babel/preset-env'],
        });
        return code;
    }
}
module.exports = Parser;
