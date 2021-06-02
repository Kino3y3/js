const log = console.log;

const curry = f => 
	(a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const L = {};

L.range = function* (l) {
	let i = -1;
	while (++i < l) {
		yield i;
	}
};

L.entries = function* (obj) {
	for (const k in obj) yield [k, obj[k]];
};

//const take = curry((l, iter) => {
//	let res = [];
//	iter = iter[Symbol.iterator]();
//	let cur;
//	while (!(cur = iter.next()).done) {
//		const a = cur.value;
//		res.push(a);
//		if (res.length == l) return res;
//	}
//	return res;
//});


const take = curry((l, iter) => {
	let res = [];
	for (const a of iter) {
		res.push(a);
		if (res.length == l) return res;
	}
	return res;
});

//const reduce = curry((f, acc, iter) => {
//	if (!iter) {
//		iter = acc[Symbol.iterator]();
//		acc = iter.next().value;
//	} else {
//		iter = iter[Symbol.iterator]();
//	}
//	let cur;
//	while (!(cur = iter.next()).done) {
//		const a = cur.value;
//		acc = f(acc, a);
//	}
//	return acc;
//});

const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const a of iter) {
		acc = f(acc, a);
	}
	return acc;
});
