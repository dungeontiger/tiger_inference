var expect = require('expect.js');
var inference = require('../inference.js');

describe('Testing inference engine.', function() {
	it('Module loads and function exported.', function () {
		expect(inference.infer).to.be.ok();
	});
	
	it('Test a simple rule.', function() {
		var rules = [
			{
				id: 'high',
				description: 'The value of x was high.',
				priority: 1,
				condition: function(facts) {
					return facts.x > 500;
				},
				consequence: function(facts) {
					facts.xHigh = true;
				}
			}
		];
		var facts = {
			x: 700
		};
		var explain = inference.infer(facts, rules);
		expect(facts.xHigh).to.eql(true);
		expect(explain).to.have.length(1);
	});
});