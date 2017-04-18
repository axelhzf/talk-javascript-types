title: Types in javacript
author:
  twitter: axelhzf
  url: http://axelhzf.com
output: index.html
controls: false
theme: ./theme

-- cover

## Types in JavaScript

--

Big JavaScript codebases tend to become "read-only".

--

# Benefits of using types

--

## Type systems make code easier to maintain

--
 
* Types can make code more readable
* Types can make code easier to analyse
* Types can allow for reliable refactoring
* Types can allow for generally better IDE support
* Types can catch some (type related) errors early

A smart static type checker increases our confidence in our code, catches easily made mistakes before they are committed, and makes the code base more self-documenting.

--

> After having used TypeScript for nearly a year, I have to confess: I never want to start a new project without it again.
 ([Tom Dale](https://medium.com/@tomdale/glimmer-js-whats-the-deal-with-typescript-f666d1a3aad0))


--

## We are already using types in our application.

-- 

## JSDoc

```
/**
* Converts an IDL into a understandable text
* @param {Object} idl - The Intermediate Definition Language
* @param {Boolean} useHTML - True to get a formatted text
* @return {String}
*/
app.monitoring.stringifyIDL = function(idl, useHTML) {
  var arr = _stringifyIDL(idl, useHTML);
  return arr.length ? arr[0] : '';
};
```


* Problem: You have to trust that the person who wrote the code documented it correctly and that people who changed it later correctly updated the documentation. 

--

## React's proptypes

```
ActivationAccount.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    screenName: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  formatNumber: PropTypes.func,
  translate: PropTypes.func,
};

* Problem: Just for react components. Limited expressiveness

```

--

## We are not talking about an “alternative” JavaScript.

### Sorry coffescript fans

--

# Types had bad reputation

* Types have a reputation of being unnecessarily ceremonious
* This is not about putting the "Java" back into JavaScript
* Modern types systems are smarter

--

## Type inference

```
var foo = 123;
foo = '456'; // Error: cannot assign `string` to `number`
```

--

## Structural typing

* Duck typing is a first class language construct

 
 ```
 interface Point2D {
     x: number;
     y: number;
 }
 interface Point3D {
     x: number;
     y: number;
     z: number;
 }
 var point2D: Point2D = { x: 0, y: 10 }
 var point3D: Point3D = { x: 0, y: 10, z: 20 }
 function iTakePoint2D(point: Point2D) { /* do something */ }
 
 iTakePoint2D(point2D); // exact match okay
 iTakePoint2D(point3D); // extra information okay
 iTakePoint2D({ x: 0 }); // Error: missing information `y`
 ```

--


Nullability
One of my main sources of runtime exceptions when programming Java

Even after many years it is still surprising how many corner cases I miss in complex code


```
function foo(num: number) {
4      if (num > 10) {
5          return 'cool';
6      }
7  }


const fooed: string|void = foo(9);
3  if (fooed) {
4      fooed.toString();
5  }

```

typescript strictNullChecks

--

Generics

let cats: Array<Cat> = []; // can only contain cats
2  let animals: Array<Animal> = []; // can only contain animals

--

Typescript
 
 * Its a superset of javascript
 * 

ease of use and tool support over soundness

http://www.typescriptlang.org/
By Microsoft (Anders Hejlsberg)
Based on ES6 (probably ES7/ES8)
Adds optional type annotations, visibility, and decorators
Compiler checks and removes annotations
2.x with major changes released recently

--

Flow

* No es un lenguaje nuevo, es un type checker
* Se le añade un preprocesador a babel para eliminar las anotaciones de los tipos
soundness, no runtime exceptions as goal
http://flowtype.org/
By Facebook
Flow is a static type checker, designed to quickly find errors in JavaScript applications
Not a compiler, but checker
If present, type annotations can very easily be removed by babel for runtime

--


typescript vs flow

* Both TypeScript and Flow provide gradual static typing capabilities. They also use a similar syntax for type annotations and declaration files.

 TypeScript wants to provide great tooling and language services for autocompletion, code navigation, and refactoring. Flow, on the other hand, develops a deeper understanding of your code and even does interprocedural analyses.



--

# Migration

Modern JavaScript is valid TypeScript, meaning that one can use TypeScript without changing a single line of code. This allowed us to use “gradual typing” by enabling the compiler and the static analysis early, without suspending work on critical bug fixes or new features.

## Migration

First, we were surprised by the number of small bugs we found when converting our code

https://slack.engineering/typescript-at-slack-a81307fa288d

--

Second, we underestimated how powerful the editor integration is. Thanks to TypeScript’s language service, editors with an autocomplete function can support the development with context-aware suggestions. TypeScript understands which properties and methods are available on certain objects, enabling your editor to do the same. An autocomplete system that only uses words in the current document feels barbaric afterward. Gone are the days we find ourselves on Google, checking yet again which events are available on Electron’s BrowserWindow

--

## Migration

It’s taken about six months to annotate most of the JavaScript in the desktop app code base.

--

Developers who have experience using any strongly-typed language usually pick up the syntax within an hour or two

--

Are Flow and TypeScript like Java/C++/C#?

Both
optionally typed / any
built to match common JavaScript programming patterns
type systems more expressive
type inference
control flow based type analysis
TypeScript
semantically compatible with JavaScript
Flow
just a checker
not even a language of its own
non-nullability as default


--

Don’t get fooled into thinking that TypeScript is as awkward and occasionally frustrating to use as Java. Behind that Java-like syntax is a language that is every bit as flexible and dynamic as JavaScript because, well, it is JavaScript.


--

IDE integration

-- 


Atom / Nuclide
https://atom.io/
https://nuclide.io/ (Atom Package)
Probably best Flow support
IntelliJ IDEA / Webstorm
Starting from 2016.3

Flow: integrated checking and display of messages 
Even better TypeScript support: uses Language Service of TypeScript Compiler
Basic Elm support via Plugin
Barrier to entry for JavaScript people
Flow: low
fits seamlessly in standard JavaScript build chain
can be enabled file by file
weak mode only shows clear errors in order not to overwhelm people
TypeScript: medium
different build chain (tsc compiler)
can include plain JavaScript, but entry point must be TypeScript
Elm: high
different syntax, semantics, and tool chain
Should you use a type checker?
don't be fooled: checkers do not make your programs error free
there seems to be little or no impact on productivity
initial effort to introduce a checker is low, though
but a type system is a complex thing, it comes at a cost
My biased recommendation

your project does not live for long: no
your project is really simple: no
there is a chance you will need to refactor the thing: yes
your system is very important or even crucial for the success of your company: yes
people enter or leave your team frequently: yes
you have substantial amount of algorithmic code: yes
Where do they excel?
TypeScript: supporting people from Java and C# land
more complete IDE support
language server
large set of 3rd party declaration files
Flow: providing typings for idiomatic JavaScript
easy to get started even with existing project
more powerful and flexible generics
nominal typing for classes
Elm: functional language deliberately different from JavaScript
simplicity of type system (no JavaScript legacy)
always completely typed (no any)
everything immutable and constant always and everywhere
complete package (also great orientation for beginners)
 Barrier to entry for JavaScript people 
 Flow: low fits seamlessly in standard JavaScript build chain can be enabled file by file weak mode only shows clear errors in order not to overwhelm people TypeScript: medium different build chain (tsc compiler) can include plain JavaScript, but entry point must be TypeScript Elm: high different syntax, semantics, and tool chain
 
 
 
--
 
Should you use a type checker?
don't be fooled: checkers do not make your programs error free
there seems to be little or no impact on productivity
initial effort to introduce a checker is low, though
but a type system is a complex thing, it comes at a cost
My biased recommendation

your project does not live for long: no
your project is really simple: no
there is a chance you will need to refactor the thing: yes
your system is very important or even crucial for the success of your company: yes
people enter or leave your team frequently: yes
you have substantial amount of algorithmic code: yes
 
--

Where do they excel?
TypeScript: supporting people from Java and C# land
more complete IDE support
language server
large set of 3rd party declaration files
Flow: providing typings for idiomatic JavaScript
easy to get started even with existing project
more powerful and flexible generics
nominal typing for classes
 


---

docs

https://basarat.gitbooks.io/typescript/content/docs/types/migrating.html
http://djcordhose.github.io/flow-vs-typescript/elm-flow-typescript.html#/1



<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-31904298-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
</script>