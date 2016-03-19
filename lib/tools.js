
exports.log = function() {
	console.log.apply(null, ['' + new Date()].concat(Array.from(arguments)))
}

exports.err = function() {
	console.error.apply(null, ['' + new Date()].concat(Array.from(arguments)))
}