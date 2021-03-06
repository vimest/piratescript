// jsconf 2011 piratescript data

define([
{
noobScript:
"var items = [1, 2, 3, 4, 5];\n\
for (var i = 0, len = items.length; i < len; i++) !function (item) {\n\
	console.log('item is ', item);\n\
}(items[i]);",
answer: "noob",
reasonCode: "performance",
reason:
"js engines can't optimize the function within the loop since a new function instance is created each iteration. Hoist and name the function for best performance.",
pirateScript:
"var items = [1, 2, 3, 4, 5];\n\
function log (item) {\n\
	console.log('item is ', item);\n\
}\n\
for (var i = 0, len = items.length; i < len; i++) log(items[i]);",
source: "(find / create a jsperf example)"
},
{
noobScript:
"var myModule = {\n\
	myFunc: function myFunc (param) {\n\
		doSomethingAwesome(param);\n\
	}\n\
};",
answer: "noob",
reasonCode: "memory leak",
reason: "A bug in IE 6-8 will leak memory when combining named function expressions with property or var declarations of the same name.  Hoist your function or use a different name to avoid the leaks.",
pirateScript:
"function myFunc (param) {\n\
	doSomethingAwesome(param);\n\
}\n\
var myModule = {\n\
	myFunc: myFunc\n\
};",
source: "http://performancekills.com/"
},
{
pirateScript:
"// create 20 promises that remove themselves from a list\n\
// when resolved successfully.\n\
// assumes a modern browser with Array.prototype.forEach\n\
var items = new Array(20);\n\
items.forEach(function (item, i, items) {\n\
	items[i] = new Deferred().then(function (value) {\n\
		items.splice(i, 1);\n\
		return value;\n\
	});\n\
});",
answer: "pirate",
reasonCode: "performance",
reason:
"1. forEach() is almost always faster than a normal for(;;) loop.\n\
2. splice() is adequately fast for such a small array.\n\
3. a for(;;) loop would cause the inner function's reference to i to be incorrect since it would always equal len before the resolution of any async Deferred.\n\
\n\
Here's the problematic version:",
noobScript:
"// create 20 promises that remove themselves from a list\n\
// when resolved successfully.\n\
var items = new Array(20);\n\
for (var i = 0, len = items.length; i < len; i++) {\n\
	items[i] = new Deferred().then(function (value) {\n\
		items.splice(i, 1);\n\
		return value;\n\
	});\n\
});",
source: "?????"
},
{
noobScript:
"if (myvar == null) {\n\
	doSomethingPiratey(myvar);\n\
}",
answer: "noob",
reasonCode: "ambiguity",
reason:
"When comparing strictly to null, use ===.  Test for both <code>null</code> and <code>undefined</code> when you wish to compare against both.",
pirateScript:
"if (myvar === null) {\n\
	doSomethingPiratey(myvar);\n\
}",
source: "???????"
}

]);
