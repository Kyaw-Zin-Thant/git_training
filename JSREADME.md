1.  What standard do you use when building REST API?
    There are a few standards that are commonly followed when building REST APIs. One of the most important standards is the use of HTTP methods to indicate the intended action for a request. The four most commonly used HTTP methods in REST APIs are:

        GET: Used to retrieve data from the server.
        POST: Used to send data to the server to create a new resource.
        PUT: Used to send data to the server to update an existing resource.
        DELETE: Used to delete a resource from the server.
        Other standards for building REST APIs include:

        Using HTTP status codes to indicate the success or failure of an API request.
        Using HTTP headers to send additional information about the request or response.
        Using a URL structure that clearly identifies the resources being accessed.
        Allowing for the use of different media types (such as JSON or XML) to send data to and from the server.
        It's also important to design your API in a way that is easy to understand and use, and to document your API so that developers can easily understand how to use it.

2.  How would you clone an object in JavaScript?
    There are a few different ways to clone an object in JavaScript, depending on the level of cloning that you need. Here are three options:

    **Shallow cloning: To create a shallow clone of an object, you can use the spread operator (...). This creates a new object with the same properties as the original object, but the properties themselves are not cloned. Here's an example:

        ``
        const original = { a: 1, b: 2 };
        const clone = { ...original };
        ``
    In this example, clone is a new object that has the same properties as original, but the properties themselves (a and b) are not cloned. If you modify a property of the clone, it will also be modified in the original object, because the properties are still the same objects.

    Deep cloning: To create a deep clone of an object, you can use a library like Lodash or serialize the object to a string and then deserialize it to a new object. Here's an example using Lodash:


        ``       
        const _ = require('lodash');
        const original = { a: { b: 1 } };
        const clone = _.cloneDeep(original);
        ``
    In this example, clone is a new object that has the same properties as original, and the properties themselves are also cloned. Modifying a property of the clone will not affect the original object.

    Custom cloning: If you need to perform custom cloning logic (for example, if you have a class with a clone method), you can define your own function to perform the cloning. Here's an example:

        ``
        function clone(obj) {
        // Perform custom cloning logic here
        }
        ``
    It's important to note that cloning an object can be a complex task, especially if the object contains references to other objects or functions. Make sure to choose the appropriate cloning method for your needs.

3.  How would you approach securing API for the project?
    There are several strategies that can be used to secure an API. Here are a few options:

    **Authentication: One of the most common ways to secure an API is to require authentication for certain API endpoints. This can be done using a variety of techniques, such as OAuth, JSON Web Tokens (JWTs), or API keys.

    **HTTPS: It's important to use HTTPS for all API requests to protect the data being transmitted from being intercepted by third parties.

    **Input validation: Validating the input of API requests can help prevent malicious data from being processed by the API. This can include validating the format, length, and type of data being sent in the request.

    **Rate limiting: Implementing rate limiting can help prevent malicious users from making too many requests to the API in a short period of time.

    **Access controls: Setting up access controls can allow you to limit which users or systems have access to certain API endpoints.

    **Auditing and logging: Keeping track of API requests and responses through auditing and logging can help you identify and address potential security issues.

    It's important to keep in mind that securing an API is an ongoing process, and you should regularly review and update your security measures to ensure that your API remains secure.

4.  What are your thoughts on Typescript?
    TypeScript is a popular programming language that is a superset of JavaScript. It adds optional static typing and class-based object-oriented programming to JavaScript.

    Many developers find that TypeScript helps them write more reliable and maintainable code, especially in larger projects. The static typing and type inference provided by TypeScript can catch many common programming errors at compile-time, rather than at runtime. This can save time and effort during development and testing.

    TypeScript also has good integration with popular JavaScript libraries and frameworks, and it can be used with tools like Babel and webpack to target older versions of JavaScript or run in different environments.

    That being said, TypeScript is not without its drawbacks. It can add a learning curve for developers who are new to static typing, and it can also increase the complexity of the build process for a project. Some developers may also prefer the flexibility and simplicity of vanilla JavaScript.

    Overall, whether or not to use TypeScript in a project is a decision that should be based on the needs and preferences of the development team and the requirements of the project.

5.  How would you deal with SEO issues long-term and short-term?
    There are a few different strategies that can be used to address SEO issues, both in the short-term and the long-term. Here are some options:

    Identify the issue: The first step in addressing an SEO issue is to identify what the issue is. This can often be done using tools like Google Search Console or through manual testing.

    Prioritize issues: Once you have identified the issues, it's important to prioritize them based on their severity and the impact they are having on your site's traffic and ranking. This will help you determine which issues should be addressed first.

    Fix technical issues: Technical issues, such as crawl errors or broken links, can often be fixed relatively quickly. Make sure to fix these issues as soon as possible to avoid any negative impact on your site's ranking.

    Improve on-page optimization: On-page optimization includes factors like title tags, headings, and content quality. Improving these factors can help your site rank better in search results.

    Build high-quality backlinks: Backlinks are an important factor in SEO. Building high-quality backlinks from reputable websites can help improve your site's ranking.

    Monitor and track progress: It's important to track your progress and measure the impact of any changes you make. This can help you identify what is working and what isn't, and make any necessary adjustments.

    Overall, addressing SEO issues is a long-term process that requires ongoing effort. It's important to be proactive in identifying and fixing issues, and to track and measure the impact of any changes you make.

6.  What is a shim?
    A shim is a small piece of code that is used to adapt or modify the behavior of an existing system or application. Shims are often used to provide compatibility between different systems or to add new features to an existing system.

    Shims can be implemented in a variety of ways, depending on the needs of the system. For example, a shim might be used to intercept function calls or to modify the behavior of an API.

    Shims are often used in software development to provide compatibility between different versions of a library or framework, or to allow a newer system to work with an older one. They can also be used to add new features to an existing system, or to work around bugs or limitations in the system.

    Overall, shims are a useful tool for adapting and modifying the behavior of existing systems, and they can be an effective way to add compatibility or new features without making major changes to the underlying code.

7.  What do you know about security in general?
    Security is the practice of protecting systems, networks, and devices from digital attacks and unauthorized access. There are many different aspects to security, including:

    Network security: This involves protecting a network and its resources from unauthorized access or attacks.

    Application security: This involves ensuring that applications are secure and protected from vulnerabilities or attacks.

    Device security: This involves protecting devices, such as computers and smartphones, from threats such as malware or unauthorized access.

    Information security: This involves protecting sensitive information, such as customer data or financial information, from unauthorized access or disclosure.

    To ensure security, it is important to implement measures such as firewalls, encryption, and authentication. It is also important to keep systems and software up to date with the latest security patches and updates.

    Overall, security is an important consideration in the design and operation of any system or network, and it is essential for protecting sensitive information and assets from threats.

8.  How can we deal with validating big amount of arguments in a function?
    One way to validate a large number of arguments in a function is to use an object with predefined properties to represent the arguments, rather than passing the arguments as separate parameters. This allows you to use a single validation function to validate the entire object.

    For example:

        ``
        function validateArgs(args) {
        if (!args.hasOwnProperty('arg1')) {
            throw new Error('arg1 is required');
        }
        if (!args.hasOwnProperty('arg2')) {
            throw new Error('arg2 is required');
        }
        // Validate other arguments here
        }

        function myFunction(args) {
        validateArgs(args);
        // Use args.arg1 and args.arg2 in the function
        }
        ``
    In this example, the validateArgs function is used to validate the args object, which contains all of the required arguments for the myFunction function. This can make the validation process more organized and easier to maintain, especially if there are a large number of arguments that need to be validated.

    Another option is to use a library like Joi or Yup to validate the arguments. These libraries provide a set of functions and rules for validating objects, and they can make it easier to validate complex data structures.

    It's important to note that argument validation is an important aspect of function design, and it's essential for ensuring the reliability and security of your code. Make sure to carefully consider the requirements and constraints of your arguments when designing your functions.

9.  Do you know what functional programming is?
    Functional programming is a programming paradigm that is based on the idea of treating computation as the evaluation of mathematical functions. In functional programming, functions are first-class citizens, which means that they can be passed as arguments to other functions, returned as values, and assigned to variables.

    Functional programming languages are designed to support the functional programming paradigm, and they typically have a number of features that make it easier to write functional code. These features can include:

    Support for higher-order functions (functions that take other functions as arguments or return functions as values)
    Immutable variables (variables that cannot be modified after they are created)
    Support for recursion (the ability for a function to call itself)
    Functional programming languages are often used for tasks that involve data processing or mathematical computation, and they can be particularly well-suited for concurrent or parallel programming.

    Some examples of functional programming languages include Lisp, Haskell, and ML. However, many other programming languages, including JavaScript, Python, and C#, also have support for functional programming concepts and can be used in a functional style.

10. How to find a memory leak in JavaScript application?
    There are a few different ways to identify a memory leak in a JavaScript application:

    Manual testing: One way to identify a memory leak is to manually test the application and look for signs of a leak, such as a slow down in performance or an increase in memory usage over time.

    Monitoring tools: There are a number of tools that can help you monitor the memory usage of your application, such as the Chrome DevTools Memory panel or the Node.js --inspect flag. These tools can help you identify areas of the code where memory usage is increasing over time.

    Heap snapshots: A heap snapshot is a snapshot of the memory usage of your application at a given point in time. By taking heap snapshots at different points in the application's lifecycle, you can compare them to see where the memory is being allocated and potentially identify areas of the code that are causing a leak.

    Once you have identified a potential memory leak, you can use the above tools to further investigate the cause of the leak and determine the best course of action to fix it. This may involve identifying and fixing code that is creating unnecessary references to objects, or optimizing the code to reduce the overall memory usage of the application.

    It's important to note that identifying and fixing a memory leak can be a complex process, and it may require a thorough understanding of the code and the application's architecture.

11. What is the difference between let, var and const variables?
    In JavaScript, there are three keywords that you can use to declare variables: var, let, and const. Here is a summary of the main differences between these three keywords:

    var: The var keyword is used to declare a variable with function-level scope. This means that the variable is accessible within the function in which it is declared, as well as within any functions that are nested inside that function. If a var variable is not declared within a function, it is declared with global scope and is accessible from anywhere in the code.

    let: The let keyword is used to declare a variable with block-level scope. This means that the variable is only accessible within the block of code in which it is declared. let variables are often used in for loops or if statements to limit the scope of the variable to the block of code where it is needed.

    const: The const keyword is used to declare a constant with block-level scope. This means that the value of the constant cannot be reassigned after it is declared. Unlike let variables, const variables must be initialized with a value when they are declared.

    In general, it is considered good practice to use const for variables that do not need to be reassigned, and to use let for variables that do need to be reassigned. The var keyword should generally be avoided, as it has some quirks and limitations that can make it confusing to use in certain situations.

12. What is currying in FP (Functional Programming)?
    In functional programming, currying is the process of taking a function with multiple arguments and turning it into a sequence of functions that each take a single argument.

    Here is an example of a function that adds two numbers:

        ``
        function add(x, y) {
        return x + y;
        }
        This function can be converted into a curried function like this:


        function add(x) {
        return function(y) {
            return x + y;
        }
        }
        ``
    Now, instead of calling the add function with two arguments, you can call it with a single argument and get a new function back that expects the second argument. For example:

        ``
        const add5 = add(5);
        const result = add5(3); // 8
        ``
    Currying can be useful in functional programming because it allows you to create specialized versions of functions by partially applying arguments. It can also make it easier to compose functions, since you can create new functions by combining smaller functions that each take a single argument.

    Overall, currying is a useful technique in functional programming that can help make your code more modular and flexible.

13. Do you know what reactive programming is?
    Reactive programming is a programming paradigm that is based on the idea of building programs around the idea of streams of data that can be transformed and combined to create a desired output.

    In reactive programming, data is represented as a stream of events or values that can be processed by a series of operators to create a new stream of data. This allows for the creation of complex data pipelines that can process data as it is received, rather than waiting for all of the data to be available before processing it.

    Reactive programming is often used in applications that need to handle large amounts of data or handle data in real-time, such as event-driven systems, real-time data processing, or interactive applications.

    There are several libraries and frameworks available for reactive programming, such as RxJS, ReactiveX, and Reactive Extensions. These libraries provide a set of functions and operators that can be used to build reactive data pipelines and handle asynchronous events.

    Overall, reactive programming can be a powerful tool for building responsive and scalable applications, and it is becoming increasingly popular in a variety of domains.

14. Does every event in Javascript bubble?
    In JavaScript, events are objects that represent a specific occurrence within the browser or application. Most events in JavaScript bubble, which means that they propagate upward through the DOM (Document Object Model) hierarchy.

    For example, consider the following HTML code:

        ``
        <div id="outer">
        <div id="inner">Click me</div>
        </div>
        ``
    If a click event is triggered on the inner div, it will also be triggered on the outer div, because the event bubbles up the DOM hierarchy. This allows you to handle events at different levels of the DOM, rather than having to attach an event listener to each individual element.

    There are a few exceptions to this rule. Some events, such as the focus and blur events, do not bubble. In addition, it is possible to stop an event from bubbling by calling the stopPropagation method of the event object.

    Overall, bubbling is an important concept in JavaScript event handling, and it allows you to handle events at different levels of the DOM hierarchy in a convenient and efficient way.

15. Do you know differences between local storage, session storage and cookies?
    In JavaScript, there are three main ways to store data on the client-side: local storage, session storage, and cookies. Here is a summary of the main differences between these three options:

    Local storage: Local storage is a type of storage that is persisted across browser sessions. This means that data stored in local storage will remain available even after the browser is closed and reopened. Local storage is stored in key-value pairs, and it has a larger capacity (typically around 5MB) compared to other storage options.

    Session storage: Session storage is similar to local storage, but it is only persisted for a single browser session. Data stored in session storage is deleted when the browser is closed. Session storage also has a smaller capacity (typically around 2MB) compared to local storage.

    Cookies: Cookies are small text files that are stored on the user's device by the browser. Cookies can be used to store small amounts of data (typically up to 4KB) and are often used to track user preferences or to store session information. Unlike local storage and session storage, cookies are sent with every request to the server, which can make them less efficient for storing large amounts of data.

    Overall, the choice between local storage, session storage, and cookies depends on the specific needs of your application. Local storage and session storage are generally better suited for storing larger amounts of data on the client-side, while cookies are better suited for storing small amounts of data or for tracking user preferences or session information.

16. When should you use Object.freeze and when Object.seal?
    In JavaScript, the Object.freeze function is used to prevent an object from being modified. When an object is frozen, it becomes read-only and its properties cannot be modified or deleted.

    The Object.seal function is similar to Object.freeze, but it has a slightly different behavior. When an object is sealed, its properties cannot be added or deleted, but its existing properties can still be modified.

    Here is an example of using Object.freeze:

        ``
        const obj = { foo: 'bar' };
        Object.freeze(obj);
        obj.foo = 'baz'; // This will have no effect
        delete obj.foo; // This will have no effect
        And here is an example of using Object.seal:


        const obj = { foo: 'bar' };
        Object.seal(obj);
        obj.foo = 'baz'; // This will modify the value of obj.foo
        obj.bar = 'baz'; // This will have no effect
        delete obj.foo; // This will have no effect
        ``
    When deciding whether to use Object.freeze or Object.seal, you should consider the specific requirements of your application. If you want to prevent an object from being modified in any way, you should use Object.freeze. If you want to allow an object's existing properties to be modified, but prevent new properties from being added or existing properties from being deleted, you should use Object.seal.

17. What is CallStack?
    In computer programming, a call stack is a data structure that is used to store information about the active function calls in a program. The call stack is used to keep track of the function calls made during the execution of a program, and it is organized in a last-in, first-out (LIFO) manner.

    When a function is called, it is added to the top of the call stack. When the function returns, it is removed from the top of the call stack. This allows the call stack to keep track of the current function being executed and the functions that have been called to get to the current point in the program.

    The call stack is an important part of the execution of a program, and it is used to manage the execution of functions and handle errors and exceptions. When an error or exception occurs, the call stack is used to determine the point in the program where the error occurred and to identify the functions that were called leading up to the error.

    Overall, the call stack is a critical component of the execution of a program, and it plays a vital role in the management of function calls and the handling of errors and exceptions.

18. What types of cloning do you know in javascript?
    There are several ways to clone an object in JavaScript, depending on the specific requirements of your application. Here are a few common techniques:

    Shallow copying: Shallow copying is a technique that creates a new object with the same properties as the original object, but the properties themselves are not copied. Instead, the new object contains references to the same objects as the original object. This can be achieved using the Object.assign function or the spread operator (...).
        ``
        const original = { foo: 'bar', baz: { qux: 'quux' } };
        const copy = Object.assign({}, original);

        console.log(copy); // { foo: 'bar', baz: { qux: 'quux' } }
        ``
    Deep copying: Deep copying is a technique that creates a new object with copies of the properties and objects within the original object. This ensures that the new object is completely independent of the original object, and changes to the new object will not affect the original object. Deep copying can be achieved using a recursive function that traverses the object and creates new objects for each property.
        ``
        function deepCopy(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        const copy = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
            }
        }
        return copy;
        }

        const original = { foo: 'bar', baz: { qux: 'quux' } };
        const copy = deepCopy(original);

        console.log(copy); // { foo: 'bar', baz: { qux: 'quux' } }
        ``
    Overall, the choice of cloning technique will depend on the specific requirements of your application. Shallow copying is often sufficient for simple objects, while deep copying may be necessary for objects with nested objects or arrays

19. What do different HTTP codes mean in javascript? 
    In JavaScript, HTTP codes are used to indicate the status of an HTTP request. HTTP codes are three-digit numbers that are grouped into five categories:

    1xx (Informational): These codes indicate that the request has been received and that the process is continuing.

    2xx (Success): These codes indicate that the request has been successfully processed. The most common 2xx code is 200 OK, which indicates that the request was successful and that the requested data is being returned.

    3xx (Redirection): These codes indicate that the client needs to take additional action in order to complete the request. The most common 3xx code is 301 Moved Permanently, which indicates that the requested resource has been moved to a new URL.

    4xx (Client Error): These codes indicate that there was an error on the client side, such as a bad request or an unauthorized request. The most common 4xx code is 404 Not Found, which indicates that the requested resource could not be found on the server.

    5xx (Server Error): These codes indicate that there was an error on the server side, such as an internal server error or a service unavailable error. The most common 5xx code is 500 Internal Server Error, which indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.

    Overall, HTTP codes are an important part of the HTTP protocol, and they are used to communicate the status of a request between the client and the server.

20. What Typescript Utility Types have you used?
    TypeScript provides a number of utility types that can be used to perform common type transformations or to extract the types of properties from an object. Some of the utility types that I have used include:

    Partial: The Partial type allows you to make all of the properties of an object optional. This can be useful when you want to create a type that represents an object that may be partially initialized.
        ``
        type User = {
        name: string;
        age: number;
        address: string;
        };

        type PartialUser = Partial<User>;

        const user: PartialUser = {}; // okay
        ``
    Readonly: The Readonly type allows you to make all of the properties of an object read-only. This can be useful when you want to create an object that cannot be modified after it is created.
        ``
        type User = {
        name: string;
        age: number;
        address: string;
        };

        type ReadonlyUser = Readonly<User>;

        const user: ReadonlyUser = { name: 'Alice', age: 30, address: 'New York' };
        user.name = 'Bob'; // error: name is read-only
        ``
    Pick: The Pick type allows you to create a new type that consists of a subset of the properties of an existing type.
        ``
        type User = {
        name: string;
        age: number;
        address: string;
        };

        type UserInfo = Pick<User, 'name' | 'age'>;

        ``
    Pick type:

        ``
        type User = {
        name: string;
        age: number;
        address: string;
        };

        type UserInfo = Pick<User, 'name' | 'age'>;

        const user: UserInfo = { name: 'Alice', age: 30 };
        user.address = 'New York'; // error: address does not exist on type UserInfo
        ``
    Omit: The Omit type allows you to create a new type that consists of all of the properties of an existing type, except for a specific set of properties.
        ``
        type User = {
        name: string;
        age: number;
        address: string;
        };

        type UserInfo = Omit<User, 'address'>;

        const user: UserInfo = { name: 'Alice', age: 30 };
        user.address = 'New York'; // error: address does not exist on type UserInfo
        ``
    Record: The Record type allows you to create a type that consists of a set of properties with a specific key type and value type.
        ``
        type User = Record<string, string>;

        const user: User = { name: 'Alice', age: '30' };
        ``
    These are just a few examples of the utility types that are available in TypeScript. There are many more utility types that can be used to perform various type transformations or extractions.

21. Do you know the HATEOAS standard for building APIs?
    HATEOAS (Hypermedia as the Engine of Application State) is a constraint of the REST architectural style that specifies that a client should be able to discover and navigate the available actions for a resource by interacting with the resource itself, rather than being directed to a fixed set of actions.

    In practice, this means that a REST API that follows the HATEOAS constraint should include links to related resources and actions within the resource representations returned to the client. The client can then use these links to discover and navigate the available actions for the resource.

    For example, consider an API for a blog platform that exposes a /posts resource for managing blog posts. A HATEOAS-compliant API for this resource might return a representation of a specific post that includes links to related resources, such as a link to the author's profile or a link to the comments for the post.

    Using HATEOAS can make an API more flexible and easier to use, since the client does not need to know about all of the available actions in advance. It can also make the API more self-descriptive, since the available actions are encoded within the resource representations.

    Overall, HATEOAS is an important concept in REST API design, and it can help to make APIs more flexible, discoverable, and self-descriptive.

22. What API vulnerabilities do you know?
    There are a number of vulnerabilities that can affect APIs, and it is important to be aware of these vulnerabilities in order to properly secure an API. Some common API vulnerabilities include:

    Injection attacks: Injection attacks occur when an attacker is able to inject malicious code or data into an API request, which can allow the attacker to execute arbitrary commands or access sensitive data. Injection attacks can be prevented by properly sanitizing user input and using prepared statements or parameterized queries when interacting with a database.

    Broken authentication and authorization: Broken authentication and authorization occurs when an API does not properly implement authentication and authorization controls, which can allow unauthorized users to access sensitive data or perform actions that they are not permitted to do. To prevent broken authentication and authorization, it is important to implement robust authentication and authorization controls and to regularly review and update these controls.

    Insecure data storage: Insecure data storage occurs when an API stores data in a way that is not secure, such as storing sensitive data in plaintext or using weak encryption. To prevent insecure data storage, it is important to use strong encryption for sensitive data and to follow best practices for data storage and handling.

    Lack of rate limiting: Lack of rate limiting occurs when an API does not limit the number of requests that a user or client can make in a given period of time. This can allow an attacker to flood the API with requests and potentially cause a denial of service (DoS) attack. To prevent DoS attacks, it is important to implement rate limiting controls to limit the number of requests that can be made in a given period of time.

    Overall, it is important to be aware of these and other API vulnerabilities and to take appropriate measures to secure an API. This may include implementing proper input sanitization, implementing robust authentication and authorization controls, using strong encryption for sensitive data, and implementing rate limiting controls.

23. What are the differences between any, unknown and never types in TypeScript?
    In TypeScript, the any type is a type that represents any value, including values of any type. The any type is often used when it is not possible or convenient to specify the type of a value.

    The unknown type is similar to the any type, but it represents values of unknown type. The unknown type is generally considered to be safer than the any type, because it requires explicit type checking before the value can be used.

    The never type is a type that represents the absence of a value. It is used to represent values that never occur, such as the return value of a function that always throws an exception.

    Here is an example that demonstrates the differences between these types:

        ``
        let x: any;
        let y: unknown;
        let z: never;

        x = 'hello'; // okay
        x = 123; // okay
        x = true; // okay

        y = 'hello'; // okay
        y = 123; // okay
        y = true; // okay

        z = 'hello'; // error: 'hello' is not never
        z = 123; // error: 123 is not never
        z = true; // error: true is not never
        ``
    In general, it is recommended to use the unknown type instead of the any type whenever possible, as it provides a safer and more secure type. The never type is useful in situations where a value is expected to never occur.

24. How does Mark and Sweep algorithm work?
    The mark and sweep algorithm is a garbage collection algorithm that is used to reclaim memory that is no longer in use by a program. The algorithm works by first marking all objects that are still in use, and then sweeping through the heap and reclaiming any objects that are not marked.

    The mark phase of the algorithm begins by starting at a set of root objects, which are objects that are directly reachable from the program. The algorithm then traverses the object graph, following references from one object to another, and marks each object that it encounters. Once the algorithm has finished traversing the object graph, all of the objects that are still in use will be marked.

    The sweep phase of the algorithm begins by scanning through the heap and reclaiming any objects that are not marked. Once all of the unreachable objects have been reclaimed, the heap is compacted to eliminate any gaps that may have been created by the reclaimed objects.

    Overall, the mark and sweep algorithm is an effective way to reclaim memory that is no longer in use, and it is widely used in programming languages and runtime environments to manage memory usage.

25. How would you document a JavaScript code?
    There are several ways to document JavaScript code, depending on the specific needs of your project. Some common techniques for documenting JavaScript code include:

    Inline documentation: Inline documentation is documentation that is included directly in the code, usually in the form of comments. Inline documentation is useful for providing brief explanations or notes about specific parts of the code. In JavaScript, inline documentation is typically written using // for single-line comments or /* */ for multi-line comments.
        ``
        // This is a single-line comment

        /*
        This is a
        multi-line comment
        */
        ``
    JSDoc: JSDoc is a tool for generating documentation for JavaScript code. It uses special comments in the code, known as JSDoc comments, to provide information about the types and behavior of variables, functions, and other parts of the code. JSDoc comments use the /** */ syntax, and they can include a number of different tags to provide information about the code.
        ``
        /**
        * This is a JSDoc comment
        *
        * @param {string} name - The name of the person
        * @returns {string} - A greeting for the person
        */
        function greet(name) {
        return `Hello, ${name}!`;
        }
        ``
    External documentation: External documentation is documentation that is not included directly in the code, but is maintained separately in a separate documentation website or other resource. External documentation can be useful for providing a more comprehensive overview of the code, and it can be easier to maintain and update than inline documentation.
    
    Overall, the choice of documentation technique will depend on the specific needs of your project. It is often a good idea to use a combination of different techniques, such as inline documentation for brief explanations and JSDoc for more detailed information about the code.

26. How would you approach building a new REST API?
    Building a new REST API can be a complex and time-consuming process, but there are a number of steps that you can follow to make the process more efficient and effective:

    Define the API's purpose and audience: The first step in building a new REST API is to define the purpose of the API and the target audience that it will serve. This will help you to determine the features and capabilities that the API will need to provide, as well as the constraints that you will need to consider.

    Design the API's resource and action structure: The next step is to design the structure of the API, including the resources that the API will expose and the actions that can be performed on those resources. It is important to design the API in a way that is intuitive, consistent, and easy to use.

    Implement the API: Once the API has been designed, the next step is to implement the API. This will typically involve writing code to handle requests, perform actions, and return responses. It is important to consider issues such as error handling, security, and performance as you implement the API.

    Test and debug the API: Once the API has been implemented, it is important to test the API to ensure that it is functioning correctly. This may involve writing unit tests, integration tests, and performance tests to validate the API's behavior.

    Document the API: Finally, it is important to provide thorough documentation for the API, including information about the resources and actions that are available, the inputs and outputs of the API, and any other relevant details. This will help developers to understand how to use the API and integrate it into their own applications.

    Overall, building a new REST API involves a number of different tasks, and it is important to approach the process in a structured and organized way in order to create a successful API.

27. What are layers of backend applications?
    In a backend application, there are typically several layers that are used to implement different aspects of the application's functionality. These layers can include:

    Presentation layer: The presentation layer is the layer that is responsible for handling incoming requests from clients and returning responses. This layer typically includes routing logic to determine which code should be executed in response to a particular request, and it may also include logic to handle input validation and output formatting.

    Business logic layer: The business logic layer is the layer that contains the core logic of the application. This layer typically implements the application's business rules and processes, such as data manipulation and processing, and it may also include logic to interact with external systems or services.

    Data access layer: The data access layer is the layer that is responsible for interacting with the application's data store or stores. This layer typically includes code to perform tasks such as querying the database, inserting and updating data, and deleting data.

    Infrastructure layer: The infrastructure layer is the layer that contains the code and services that are used to support the other layers of the application. This may include things such as logging, error handling, and integration with external services.

    Overall, the structure and organization of the layers in a backend application will depend on the specific needs and requirements of the application. The layers may be implemented as separate modules, packages, or components, depending on the programming language and framework being used.

28. Do you know differences between HTTP/1.1 and HTTP/2?
    Yes, there are several differences between HTTP/1.1 and HTTP/2:

    Binary protocol: HTTP/2 is a binary protocol, while HTTP/1.1 is a text-based protocol. This means that HTTP/2 is more efficient and easier to parse than HTTP/1.1.

    Multiplexing: HTTP/2 supports multiplexing, which means that it can send multiple requests over a single connection simultaneously. HTTP/1.1, on the other hand, can only send one request at a time over a single connection.

    Header compression: HTTP/2 uses a header compression algorithm called HPACK to compress the headers of HTTP requests and responses. This can reduce the amount of data that needs to be transmitted and improve the performance of the protocol.

    Server push: HTTP/2 includes a feature called server push, which allows the server to proactively send data to the client without the client first making a request for that data. This can be used to reduce the number of round trips between the client and server and improve the performance of the application.

    Prioritization: HTTP/2 allows the client and server to prioritize requests and responses, which can help to improve the performance of the application.

    Overall, HTTP/2 represents a significant improvement over HTTP/1.1 in terms of performance, efficiency, and functionality. It is becoming increasingly widely adopted, and it is expected to eventually replace HTTP/1.1 as the dominant version of the HTTP protocol.

29. What differs WeakMap from Map in JavaScript?
    In JavaScript, the WeakMap object is a collection of key/value pairs in which the keys are weakly referenced. This means that the keys of a WeakMap object are only held in memory as long as there is at least one reference to the key from somewhere else in the program.

    The Map object, on the other hand, is a collection of key/value pairs in which the keys are strongly referenced. This means that the keys of a Map object will remain in memory as long as there is at least one reference to the Map object itself, regardless of whether there are any other references to the keys.

    There are a few key differences between WeakMap and Map:

    Key type: The keys of a WeakMap object must be objects, while the keys of a Map object can be any value (including objects, primitive values, and even functions).

    Reference semantics: The keys of a WeakMap are weakly referenced, while the keys of a Map are strongly referenced. This means that the keys of a WeakMap can be garbage collected if there are no other references to them, while the keys of a Map will remain in memory as long as there is at least one reference to the Map object itself.

    Iteration: The WeakMap object does not have a built-in way to iterate over its keys or values, while the Map object has several methods for iterating, such as .keys(), .values(), and .entries().


30. How to write and delete a cookie in JavaScript?
To write a cookie in JavaScript, you can use the setCookie function like this:

        ``
        function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }
        ``
    To delete a cookie, you can set the expiration date of the cookie to a date in the past. You can do this using the setCookie function like this:

        ``
        function deleteCookie(name) {
        setCookie(name, "", -1);
        }
        ``
    To use the setCookie and deleteCookie functions, you can call them with the name of the cookie and the appropriate parameters. For example, to set a cookie named "foo" with a value of "bar" that expires in 30 days, you could call setCookie("foo", "bar", 30). To delete the "foo" cookie, you could call deleteCookie("foo").

    It is important to note that cookies are stored on the client side and are included with every request to the server, so they can be used to store small amounts of data (such as user preferences or session information) that needs to be persisted across requests. However, cookies have size limitations and are not suitable for storing large amounts of data.


31. What is the difference between "async" and "defer" keywords in <script> tag?
    The async and defer keywords are attributes that can be used in the script tag to specify the behavior of the script when it is loaded.

    The async attribute tells the browser that the script should be executed asynchronously, meaning that the script will be loaded and executed concurrently with other elements on the page. This can improve the performance of the page, as it allows the browser to continue loading and rendering other elements while the script is being loaded.

    The defer attribute tells the browser that the script should be executed after the page has finished loading. This can be useful if the script depends on the DOM being fully constructed, or if you want to ensure that the script is executed in a particular order.

    There are a few key differences between async and defer:

    Execution order: defer scripts are executed in the order that they appear in the document, while async scripts are executed as soon as they are loaded, regardless of their order in the document.

    Blocking: defer scripts do not block the loading of other elements on the page, while async scripts may block the loading of other elements if they are not yet loaded.

    Compatibility: The defer attribute is supported by all modern browsers, while the async attribute is not supported in older versions of Internet Explorer.

32. When should you use TypedArray in JavaScript?
    In JavaScript, a TypedArray is a type of array that stores a fixed-size, typed set of elements in a memory buffer. There are several different types of TypedArray objects available, including Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, and Float64Array.

    You should use a TypedArray when you need to work with a large set of typed data (such as numbers or boolean values) and you need to access the data efficiently. TypedArray objects are designed to provide a more efficient way to manipulate large sets of typed data than regular arrays, and they can be especially useful when working with data that comes from an external source (such as an API or a file).

    There are a few key advantages to using a TypedArray:

    Efficiency: TypedArray objects are more efficient than regular arrays when working with large sets of typed data, as they store the data in a continuous memory buffer rather than as a series of objects. This can make it faster to access and manipulate the data.

    Memory usage: TypedArray objects use less memory than regular arrays when storing large sets of typed data, as they do not store the data as a series of objects. This can be especially important when working with large datasets or when running on devices with limited memory.

    Type safety: TypedArray objects are typed, which means that they can only store values of a particular type (such as integers or floats). This can help to prevent errors and ensure that the data is processed correctly.
