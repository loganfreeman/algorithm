function TestHandler(conf) {
	var inputs = conf.inputs;
	var testname = conf.name;
	var test = conf.test;

	this.run = function () {
		//doing the test here
		console.log(testname);

		//loop through each input
		for (var i = 0; i < inputs.length; i++) {
			test.apply(null, inputs[i]);
		}
	}
}

module.exports = TestHandler;
