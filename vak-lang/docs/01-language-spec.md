1. Core Design Decisions (DECIDED)
These are non-negotiable for v0.1. Everything else follows from them.

```
#	Decision	                                         Consequence

D1	Kāraka is mandatory                                   No positional arguments 
    for every function argument.                          exist in Vāk.Ever. 
    	                          

D2	Syntax is IAST transliteration                         kriyā, not क्रिया, for now.
    (Devanagari later).


D3	Six kāraka roles only.	                               kartā, karma, karaṇa, sampradāna, 
                                                           apādāna, adhikaraṇa.
                                                         



D4	Arguments bind by label, not position.	                yoga(karma: 3, kartā: 5) ≡ yoga(kartā: 5,  
                                                            karma: 3).

                                                           

D5	Types are explicit and Sanskrit-named.	                 saṅkhyā, śabda, satya-asatya.

D6	v0.1 is a tree-walking interpreter (TypeScript).	     No compiler, no LLVM yet.

D7	Memory model v0.1: ownership by kāraka role.	         Defined in §7. Refined later.

```
```
2. Lexical Structure (DECIDED)
2.1 Keywords

Vāk keyword	    Sanskrit	   English	     Purpose

kriyā           क्रिया             action         function definition
cara	        चर	             moving	        Variable declaration
yadi	        यदि	              if	             Conditional
anyathā	        अन्यथा	           otherwise	       Else
yāvat	        यावत्	          as long as	      While loop
pratyāvartana	प्रत्यावर्तन	       return	       Return statement
satya	        सत्य	          truth	          Boolean true
asatya	        असत्य	          untruth	      Boolean false
śūnya	        शून्य	           zero/empty	       Null/void

```
```
2.2 Type names

Vāk type	  Sanskrit	  English	        Represents
saṅkhyā	      सङ्ख्या	    number	          Integer (64-bit signed)
daśāṃśa	      दशांश	       decimal part	     Float (64-bit IEEE 754)
śabda	      शब्द	       sound/word	     String (UTF-8)
satya-asatya  सत्य-असत्य	truth-untruth	  Boolean
sūcī	      सूची	       needle/list	     Array/list
kośa	      कोश	      treasury	        Map/dictionary
śūnya	      शून्य	         empty	          Void (return type only)

```
```
2.3 Kāraka roles
Vāk label	Sanskrit	Semantic role	Memory meaning (see §7)

kartā	कर्ता	Agent (doer)	Moves (ownership transfer in)

karma	कर्म	Patient (object)	Mutable borrow

karaṇa	करण	Instrument (tool)	Immutable borrow

sampradāna	सम्प्रदान	Recipient	Moves (ownership transfer in)

apādāna	अपादान	Source	Immutable borrow

adhikaraṇa	अधिकरण	Locus (context)	Immutable borrow

```

```text
identifier  ::= [a-zA-Z_][a-zA-Z0-9_]*
integer     ::= -?[0-9]+
float       ::= -?[0-9]+"."[0-9]+
string      ::= '"' [^"]* '"'
boolean     ::= "satya" | "asatya"
null        ::= "śūnya"
comment     ::= "//" [^\n]*
```

## 3.Grammer(EBNF)
```ebnf
   program     ::= statement*

   statement   ::= function_def
                   | variable_decl
                   | if_stmt
                   | while_stmt
                   | return_stmt
                   | expression ";"

(* Function *)
function_def   ::= "kriya"  identifier "(" parma_list? ")" ("->" type)? block

param_list     ::=  param ("," param)*
param          ::=  karaka  ":" identifier ":" type
karaka         ::= "karta" | "karma" | "karana" | "sampradan" | "apadana" | "sdhikarana"

(*Variable*)
variable_decl ::= "cara" identifier ":" type "=" expression ";"

(*Control flow*)
if_stmt    ::=   "yadi" "(" expression ")" block ("anyatha" block)?

while_stmt  ::=  "yavat"  "(" expression ")" block

return_stmt  ::=  "pratyavartana"  expression? ";"
block     ::=  "{" statement* "}"


(*Expression*)
expression     ::= assignment
assignment     ::= identifier "=" expression | logic_or

logic_or    ::= logic_and ("||" logic_and)*
logic_and   ::= equality ("&&" equality)*
equality    ::= comparison (("==" | "!=") comparison)*
comparison  ::= addition (("<" | ">" | "<=" | "">=) addition)*

addition    ::= multiplication (("+" | "-") multiplication)*

multiplication   ::= unary (("*" | "/" | "%" ) unary)*

unary            ::= ("!" | "-" ) unary | call
call             ::= identifier "(" arg_list? ")"
arg_list         ::= arg ("," arg)*
arg              ::= karaka ":" expression
primary          ::= integer | float | string | boolean | null | identifier | "(" expression ")"


(*Types*)

type       ::= "sankhya" | " dasamsa" | "sabda" | "satya-asatya" | "suci" | "kosa" | "sunya"

```

## 4.Hello World

```text
// mudrana = "printing" - built-in 
mudrana("Numaste, Jagat!");
```

Output: Namaste, Jagat!

Built-in mudrana has this signature(conceptual):

```text
  kriya mudraṇa(karma: pakṣa: sabda) → sunya
```
paksa here is a parameter name, karma is the karaka.When calling, you write:

```text
mudrana(karma:"Namaste, Jagat!");
```

For convenience in v0.1, the intrepreter can allow mudrana("...") as sugar -- but the spec-correct form uses karma;

Decision: v0.1 requires the karaka label. No sugar. We test the real grammer.
```text
mudrana(karma: "Namaste, Jagat!");
```

## 5.Function and Karaka 

5.1 Definition

``` text
kriya yoga(karta: a: sankhya, karma: b: sankhya) -> sankhya {
    pratyavartana a+b;
}
```

Reading: "A function yoga (union/addition) takes an agent (a) of type number, a patient (b) of type number, and returns a number."

5.2 Calls --- Order Independence

All three are identical:
```text
yoga(karta:5, karma:3)   // -> 8
yoga(karma:3, karta:5)   // -> 8
yoga(karma:3, karta:5)   // -> 8 (same)
```

The compiler/interpreter checks that:

1. Every declared karaka is provided exactly once .
2. No extra karaka is provided .
3. Each value's type mathces the declared type.

if you provide yoga(karta:5) -> error:missing karma.
if you provide yoga(karta:5, karma:3, karana: 7 ) -> error:unexpected karana.
if you provide yoga (karta: "hi", karma: 3) -> error: type mismatch.

This is the core safety guarntee: argument-role bugs are impossible.

5.3 Why Six Roles (and not arbitaray names)

Because the roles carry memory semantics . karta and sampradana move ownership; karma borrows mutably; karana, apadana, adhikarana borrow immutably. Arbitrary names would lose this.The closed set is what makes the memory model enforceable.

## 6. Control Flow 

if/else

```text
cara x: sankhya = 10;
yadi(x>5) {
    mudrana(karma: "large");
} anyatha {
    mudrana(karma: "small");
}
```

While
```text
cara i: sankhya = 0;
yavat (i<5) {
    mudrana(karma:i);
    i = i+1;
}
```

Return
```text
kriya abs (karta: n: sankhya) -> sankhya {
    yadi (n<0) {
        pratyavartana -n;
    }
    pratyavartana n;
}
```

## 7. Memory Model v0.1 (PROPOSED - refine after interpreter)
This is the most novel part of Vak . It ties memory safety to karaka roles .Here is the v0.1 rule:

```
Kāraka	      Ownership behavior	                       Meaning
kartā	       Move — caller 	                            The function 
                loses owenership                            owns the value 

                                          
sampradāna	   Move — caller loses                          The function 
               ownership                                     owns the value

karma          Mutable borrow-                              Temporary read-write access
               caller keeps ownership, function  
               may modify

karana        Immutable borrow-                             shared read-only
              caller keeps ownership, function
              can't modify.
apadana       Immutable borrow                               shared read-only

adhikaraṇa    Immutable borrow                               shared read-only

```

Return values arw owned by the caller (they become the caller's karta when used).

## Example

```text
kriya consume(karta: x: sabda) -> sunya{
    mudrana(karma: x);
}

cara name: sabda = "Rama";
consume(karta: name);  // name is MOVED - caller loses it
mudrana(karma:name);  // ERROR: name has been moved
been moved

```
```text
kriya insepct (karana: x: sabda) -> sunya {
    mudrana(karma:x);
}
cara name: sabda = "Rama";
inspect(karana: name);    // name is BORROWED (read-only)
mudrana (karma: name);   // OK: name is still owned by caller

```

For v0.1 interpreter: Enforce moves and borrows at runtime with a simple ownership table. This is not a full compile-time borrow checker yet -- that comes in v0.2 with the transpiler. But we design the rules now so the grammer reflects them.




