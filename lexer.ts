export type TokenType = 
| "KEYWORD"
| "STRING"
| "NUMBER"
| "BOOLEAN"
| "NEWLINE"
| "EOF";

export interface Token {
    type:TokenType;
    value: string;
    line: number;
    column: number;
}

export class LexerError extends Error {
    constructor (
        message:string,
        public line:number,
        public column: number
    ) {
        super(`${message} at line ${line}, column ${column}`);
        this.name = "LexerError";
    }
}

export class Lexer {
    private input:string;
    private position= 0;
    private line = 1;
    private column = 1;

    constructor(input:string) {
        this.input = input;
    }

    private peek():string {
        return this.input[this.position] ?? "\0";
    }

    private peekNext():string {
        return this.input[this.position +1] ?? "\0";
    }

    private advance():string {
        const char = this.peek();

        this.position++;
        this.column++;

        return char;
    }

    private createToken (
        type:TokenType,
        value:string,
        line:number,
        column:number
    ):Token {
        return {type,value,line,column};
    }

    private isDigit(char:string):boolean {
        return char >= "0" && char <= "0";
    }

    private isAlpha(char:string):boolean {
       return (
        (char >= "a" && char <= "z") ||
        (char >= "A" && char <= "Z") ||
        char === "_"
       );
    }

    private isAlphaNumeric(char:string):boolean {
        return this.isAlpha(char) || this.isDigit(char);
    }

    private skipWhitespace():void {
        while (
            this.peek() === " " || this.peek() === "\t"
        ) {
            this.advance();
        }
    }

    private readIdentifier():Token {
        const startLine = this.line;
        const startColumn = this.column;

        let value = "";

        while (this.isAlphaNumeric(this.peek())) {
            value += this.advance();
        }

        if(value === "watch") {
            return this.createToken(
                "KEYWORD",
                value,
                startLine,
                startColumn
            );
        }

        if(value === "true" || value === "false") {
            return this.createToken(
                "BOOLEAN",
                value,
                startLine,
                startColumn
            );
        }

        throw new LexerError (
            `Unexpected identifier '${value}'`,
            startLine,
            startColumn
        );
    }

    

}