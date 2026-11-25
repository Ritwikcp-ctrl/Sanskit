# Understanding EBNF-From Zero to Reading Any Grammer:

EBNF stands for Extended Backus-Naur Form OR we need to know PBNF (Panini Backus-Naur Form) .
That's it . its a way to write down "what valid sentences look like" in a language - any language.


## 1. The Core Idea:
   An EPBNF rule says: "The thing on the left can be written as the thing on the right."
   ```text
   <greeting> ::= "Namaste"
   ```
   Read as : "A greeting is written as the word Namaste."

## 2.The Symbols You Must Know:
   EPBNF uses a small set of symbols.Lean these seven , and you can read any grammer.

```table

Symbol           Name                Meaning          

::=            is defined as        left side become  
                                    right side   

|              or                   Alternative

,              then                 sequence

[]            optional              zero or one time

{}            repeat                zero or more time

()            grouping              Grouping things together

""            terminal              A literal  string

< >           non-terminal       

( * * )       comment
```

# The Corrected Grammer(v0.1)
  
  ```epbnf

  program     ::= {statement}

  statement   ::= function_def
                | variable_decl
                | if_stmt
                | while_stmt
                | return_stmt
                | expression ";"

function_def  ::= "kriya" identifier "(" [param_list] ")" ["->" type ] block

param_list    ::= parma {"," param}
param         ::= karaka ":" identifier ":" type

karaka        ::= "kartā" | "karma" | "karaṇa"
               | "sampradāna" | "apādāna" | "adhikaraṇa"

variable_decl  ::= "cara" identifier   ":"  type  "=" expression  ";"

if_stmt       ::=  "yadi"  "(" expression ")"  block["anyatha" block]
while_stmt    ::=  "yavat"  "("  expression ")"  block
return_stmt   ::=  "pratyavartana" [expression]  ";"

block     ::=  "{" {statement} "}"   