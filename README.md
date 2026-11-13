# वाक् (Vāk) — A Programming Language Built on Sanskrit Grammar

> *"The grammar of Sanskrit is the oldest formal system in the world. It is time it became a programming language."*

---

## 1. Vision

We are building a programming language whose **type system, argument binding, and expression structure are derived from Pāṇini's Aṣṭādhyāyī** — the 2,500-year-old grammar of Sanskrit. This is not a language with Sanskrit keywords pasted onto English syntax. This is a language where **the grammar itself is Sanskrit grammar**: arguments are bound by semantic role (*kāraka*), not by position; word order is free; meaning is encoded morphologically, the way Sanskrit encodes it.

The goal is to combine this grammatical architecture with the performance and memory-safety ambitions of systems languages like **Rust, C++, and C**. Sanskrit grammar offers a formal, rule-based, context-sensitive framework that has been refined over millennia for precision and unambiguity. We believe this framework can inform a new generation of programming languages that are **safer, more expressive, and more structurally sound**.

This README explains **why** we are doing this, **how** Sanskrit grammar connects to programming language theory, **what** is required to build a new language, and **what** we are building.

---

## 2. The Historical Connection: Pāṇini → BNF → Every Programming Language

### 2.1 Pāṇini's Aṣṭādhyāyī: The First Formal Grammar

Around the 4th century BCE, the Indian grammarian **Pāṇini** composed the **Aṣṭādhyāyī** ("Eight Chapters"), a treatise of approximately 4,000 *sūtras* (rules) that completely describes the Sanskrit language[reference:0]. This was not a descriptive essay. It was a **formal, rule-based, generative system**: a finite set of rules that can generate an infinite number of well-formed expressions.

Pāṇini introduced concepts that would not appear in Western formal systems for over two thousand years:

- **Rewrite rules** — each rule replaces a target with a replacement in a specific context (`φ → ψ / λ __ ρ`)
- **Metarules** — rules about how to apply other rules
- **Recursion** — rules that refer to themselves
- **Context-sensitive conditions** — rules that fire only when specific neighbors are present[reference:1]

As one IEEE study notes, Pāṇini's system "anticipates formal generative approaches later developed in modern linguistics" and provides "algorithmic mechanisms for morphological analysis, syntactic parsing, and language generation"[reference:2].

### 2.2 The Modern Rediscovery: Backus and BNF

In 1959, **John Backus** — the designer of FORTRAN — needed a formal notation to describe the syntax of **ALGOL 60**, the first major high-level programming language. He created **Backus-Naur Form (BNF)**: a set of recursive rewriting rules of the form `left ::= right`[reference:3].

The structural parallel to Pāṇini was immediate. The **idea of describing language structure with rewriting rules can be traced back to at least Pāṇini**, and BNF is often called the **"Pāṇini-Backus Form"** to acknowledge this precedence[reference:4][reference:5]. As one source states directly: *"In 1959, when the computer scientist John Backus designed the syntax for ALGOL 60 — the first high-level programming language — he based it on Pāṇini's grammar."*

Backus discovered BNF **independently**, but the architectural identity is unmistakable. Pāṇini's notation is "equivalent in its power" to Backus's and has "many similar properties"[reference:7].

### 2.3 From BNF to Every Language You Use

BNF became the standard notation for defining programming language syntax. Virtually every modern language — Python, Java, C, Rust — has its grammar specified in BNF or a variant (EBNF, ABNF)[reference:8]. Pāṇini's grammar is also recognized as a **classical knowledge base for compiler construction**, directly relevant to syntax analysis, semantic analysis, and even **context-sensitive language parsing**[reference:9].

**The historical chain is clear:**


Pāṇini's Aṣṭādhyāyī (≈ 4th c. BCE)
↓ (independent rediscovery)

Backus-Naur Form (1959)
↓
ALGOL 60 → Pascal → C → C++ → Java → Python → Rust

```text


**We are not inventing a new connection. We are making the original connection explicit.**

---

## 3. What Sanskrit Grammar Offers a Programming Language

Sanskrit is not just a language with old words. It is a language with a **formal, precise, morphology-driven architecture** that maps naturally onto modern type theory and compiler design.

### 3.1 Kāraka: Semantic Role Binding Instead of Positional Arguments

In Sanskrit, the role of each participant in an action is marked by its **case ending** (*vibhakti*). The **agent** (doer), **patient** (object), **instrument**, **recipient**, **source**, and **locus** each carry distinct morphological markers[reference:10][reference:11].

The consequence is radical: **word order does not determine meaning**. A Sanskrit sentence can be reordered freely without changing its semantics, because each word carries its role with it.

**In a programming language, this is the difference between:**

```

// Positional (most languages)
transfer(user, account, amount);

// Kāraka-based (Vāk-style)
transfer(agent: user, recipient: account, patient: amount);

```text
  
The *kāraka* approach makes argument order irrelevant. It eliminates a whole class of bugs where arguments are swapped. It also makes function calls **self-documenting by construction**. Existing projects like **Vāk** and **karaka-lang** have already demonstrated that this model can serve as a type system and calling convention[reference:12][reference:13].

### 3.2 Vibhakti: Morphological Type Checking

Sanskrit encodes **gender, number, and case directly into word forms**. `rāmaḥ` (nominative singular masculine) and `rāmam` (accusative singular masculine) are distinct tokens; the grammar of the word tells you its role[reference:14].

This is **strong typing built into the language structure**. A programming language can borrow this idea: types are not annotations added to identifiers; **types are carried by the expression itself**. The compiler checks grammatical agreement the way Pāṇini checked Sanskrit agreement — structurally, formally, and exhaustively.

### 3.3 Sandhi: Compositional Morphology

Sanskrit words combine through **sandhi** — systematic, context-sensitive sound changes at morpheme boundaries. This is a **formal, rule-based composition system** that operates at the phonological level[reference:15].

In a programming language, sandhi principles can inform:

- **Operator overloading** — how two expressions combine depends on their types and context
- **Macro expansion** — context-sensitive rewriting of syntax trees
- **Module composition** — how interfaces merge based on the “shape” of what they contain

### 3.4 Compounds (Samāsa): Structured Abstraction

Sanskrit compounds (*samāsa*) combine multiple stems into a single word while preserving a precise semantic relationship between them. A *ṣaṣṭhī tatpuruṣa* compound, for example, encodes a possessive relationship in one token[reference:16].

This is directly analogous to **object-oriented composition and inheritance** — but with a formal grammar governing how components combine and what relationships are legal. A programming language can use compound rules to make abstraction **structurally verified** rather than ad hoc.

### 3.5 Free Word Order: Flexible Evaluation Order

Because Sanskrit marks roles morphologically, **word order is free**[reference:17]. A programming language can exploit this: the *meaning* of an expression is determined by its **roles and types**, not by left-to-right position. This enables:

- **Order-independent function arguments** (as in karaka-lang)
- **Flexible evaluation strategies** — the compiler chooses the optimal order
- **Parallel-by-default execution** — independent sub-expressions can be reordered safely

---

## 4. What It Takes to Build a New Programming Language

A programming language is not just syntax. It is a complete pipeline. Here is the full architecture.

### 4.1 The Compiler Pipeline

| Phase | What It Does | Sanskrit Connection |
|---|---|---|
| **1. Lexer** | Text → tokens | Sandhi decomposition: split compounds into meaningful units |
| **2. Parser** | Tokens → AST | Grammar rules (BNF/EBNF or Pāṇinian) define valid structures |
| **3. Semantic Analyzer** | Type checking, role binding | *Kāraka* analysis: verify that each argument carries a valid role |
| **4. IR Generator** | AST → intermediate representation | — |
| **5. Optimizer** | Improve IR (speed, memory) | — |
| **6. Code Generator** | IR → target code | — |
| **7. Runtime** | Execute output | Memory management, concurrency, I/O |

### 4.2 Tooling Around the Language

| Component | Purpose |
|---|---|
| **REPL** | Interactive development |
| **Error formatter** | Human-readable errors (ideally in Sanskrit and English) |
| **Standard library** | Core types, functions, data structures |
| **Build system** | Compile and link programs |
| **Package manager** | (Later phase) |
| **Documentation generator** | (Later phase) |

### 4.3 The Realistic Strategy: Transpile First, Native Later

The fastest path to a working language is **not** to write a native code generator from scratch. It is to **transpile to an existing systems language** (Rust or C) and let that language’s compiler handle the machine code. This gives you:

- A working language in **months, not years**
- Access to an existing, optimized runtime
- The ability to focus on **what makes your language unique** (the Sanskrit grammar layer) rather than reinventing register allocation

Once the grammar and semantics are stable, a native backend can be developed.

---

## 5. What We Are Building

### 5.1 The Language: Vāk (वाक्)

**Vāk** is a Sanskrit-grammar programming language. Its defining features:

1. **Kāraka-based argument binding** — function arguments are bound by semantic role (agent, patient, instrument, recipient, source, locus), not by position. Argument order is irrelevant to meaning[reference:18].
2. **Vibhakti-driven type checking** — types are carried morphologically by expressions, and the compiler verifies grammatical agreement the way Pāṇini verified Sanskrit agreement[reference:19].
3. **Sandhi-based composition** — how expressions combine is governed by formal, context-sensitive rewrite rules.
4. **Free word order** — evaluation order is chosen by the compiler based on data dependencies and optimization goals, not syntactic position[reference:20].
5. **Compound abstractions** — structured composition of types and modules using Sanskrit compound grammar.

### 5.2 The Engineering Goals: Beyond Rust, C++, and C

We are not claiming that Sanskrit grammar alone guarantees performance. Performance comes from compiler engineering, memory model design, and runtime implementation. But Sanskrit grammar provides a **structural foundation** that can enable certain classes of optimization and safety.

| Goal | How Sanskrit Grammar Helps | How We Achieve It |
|---|---|---|
| **Memory safety without garbage collection** | Morphological type marking can make ownership and lifetime roles explicit in the grammar | Ownership model informed by *vibhakti*: the “case” of a value determines whether it is borrowed, moved, or shared |
| **Data-race freedom** | Free word order + explicit roles = clear separation of dependencies | Concurrency model where independent roles can execute in parallel; dependent roles are ordered by grammar |
| **Zero-cost abstractions** | Compound rules are formal and structural, so abstraction does not require runtime overhead | Compile-time expansion of compound abstractions into optimized IR |
| **Self-documenting code** | Kāraka roles make every call site unambiguous | No positional argument bugs; the grammar *is* the documentation |

**Honest caveat:** Rust and C++ have decades of compiler optimization work behind them. We are not promising day-one parity. We are promising a **different architectural foundation** that may make certain guarantees cheaper to enforce and certain optimizations easier to express. The performance goal is real, but it is an **engineering destination**, not a grammatical guarantee.

### 5.3 What Makes This Different From Existing Sanskrit-Inspired Languages

Several projects have explored Sanskrit-inspired programming:

| Project | Approach | What We Do Differently |
|---|---|---|
| **Mantra-lang** | Sanskrit keywords on Python syntax[reference:21] | We use Sanskrit **grammar**, not just vocabulary |
| **Sanskrit-Py** | Sanskrit syntax transpiled to Python[reference:22] | We are not a transpiler to a dynamic language; we target systems-level performance |
| **Vāk** | Pāṇini’s kāraka analysis as a type system[reference:23] | We build on this insight and extend it with sandhi composition and compound abstractions |
| **karaka-lang** | Semantic-role argument binding for logic programming[reference:24] | We target general-purpose systems programming, not just logic programming |

We are not the first to explore this space. We are aiming to be the most **architecturally complete** exploration: a full compiler pipeline whose grammar, type system, and evaluation model are all derived from Pāṇini’s formal system.

---

## 6. Roadmap

### Phase 1: Foundation (Months 1–3)
- [ ] Formal specification of the core grammar (kāraka roles, vibhakti types, sandhi rules)
- [ ] Lexer and parser for a minimal core language
- [ ] AST design with role-annotated nodes
- [ ] Transpiler from core AST to **Rust** (for performance baseline)

### Phase 2: Semantic Layer (Months 4–6)
- [ ] Kāraka-based semantic analyzer
- [ ] Vibhakti type checker
- [ ] Sandhi-driven composition rules
- [ ] Error reporting in Sanskrit and English

### Phase 3: Usability (Months 7–9)
- [ ] REPL
- [ ] Standard library (numeric types, strings, collections, concurrency primitives)
- [ ] Documentation and examples
- [ ] Build system

### Phase 4: Performance and Native Backend (Months 10–18)
- [ ] IR optimizer
- [ ] Native code generator (or LLVM backend)
- [ ] Memory model implementation
- [ ] Benchmarking against Rust, C++, and C baselines

### Phase 5: Ecosystem (18+ Months)
- [ ] Package manager
- [ ] FFI (interoperability with C and Rust)
- [ ] Community governance and contribution guidelines

---

## 7. Why This Matters

Programming languages shape how we think. A language built on positional arguments teaches us to think in sequences. A language built on **semantic roles** teaches us to think in **relationships**. A language built on **morphological types** teaches us to think in **structural agreement**.

Sanskrit grammar solved the problem of **precise, unambiguous, order-independent expression** millennia before the first compiler was written. Pāṇini’s system is not a historical curiosity; it is a **formal architecture** that modern computer science is only beginning to fully appreciate. BNF borrowed its shape. We are asking: what happens if we borrow **more**?

We are building Vāk because we believe the answer is worth finding out.

---

## 8. Contributing

This is an open research and engineering project. Contributions are welcome in:

- **Formal grammar design** (kāraka, vibhakti, sandhi, samāsa)
- **Compiler engineering** (lexer, parser, type checker, IR, backend)
- **Sanskrit linguistics** (ensuring grammatical accuracy)
- **Performance engineering** (benchmarking, optimization)
- **Documentation and examples**

See `CONTRIBUTING.md` for guidelines. (To be written.)

---

## 9. References and Further Reading

- Kulkarni, S. G. (2026). *Panini Grammar — A Classical Knowledge Base for Compiler Construction*. Zenodo.[reference:25]
- *The Humanities in the World* — on Backus basing ALGOL 60 on Pāṇini’s grammar.
- Wikipedia: *Backus–Naur Form* — history tracing rewriting rules to Pāṇini.[reference:27]
- Unicode Mail List Archive — Pāṇini as forerunner of formal language theory; Pāṇini-Backus Form proposal.[reference:28]
- *Vāk* and *karaka-lang* — prior art in kāraka-based programming languages.[reference:29][reference:30]
- *Mantra-lang* — Sanskrit-keyword language for comparison.[reference:31]
- Ars Technica — Rust, C, and C++ performance and memory safety trade-offs.[reference:32]

---

**वाक् तेजस्विनी भूयात्।**  
*May Vāk be radiant.*

```



