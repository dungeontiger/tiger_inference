/*

	rules is an array
	each rule object has an id, a description, a condition function and a consquence function
	both functions take the facts and a results object
	rules:[
		{
			id: 'id',
			description: 'description',
			priorty: 1,
			condition: function(facts, results) {},
			consequence: function(facts, results) {}
		}
	]
 
*/

// rules can only be matched once
// facts are mutable, the engine will add new facts as a consequence of rules
// rules are immutable

//
// engine main entry point
//
module.exports.infer = function(facts, rules) {
	// three steps to inference
	// 1. match rules
	// 2. select rules
	// 3. execute rules
	// repeat if at least one new rule was matched in step 1
	
	var explain = [];
	var matchedRuleIds = [];
	do {
		var matchedRules = matchRules(facts, rules, explain, matchedRuleIds);
		selectRules(matchedRules);
		executeRules(facts, matchedRules);
	} while (matchedRules.length > 0)
	return explain;
};

//
// match rules
//
function matchRules(facts, rules, explain, matchedRuleIds) {
	var matchedRules = [];
	rules.forEach(function (rule) {
		// skip this rule if it has been previously matched
		if (matchedRuleIds.indexOf(rule.id) == -1) {
			// if this rules condition is true add it to the list of matched rules
			if (rule.condition(facts)) {
				// add the rule
				matchedRules.push(rule);
				
				// record the description of this rule as its explanation
				explain.push(rule.description);

				// record that this rule has been matched
				matchedRuleIds.push(rule.id);
			}
		}
	});
	return matchedRules;
}

// 
// select rules
//
function selectRules(rules) {
	// sort in descending order by priority
	rules.sort(function (a,b) {b.priority - a.priority});
}

//
// execute rules
function executeRules(facts, rules) {
	// call consequence on each of the rules
	rules.forEach(function (rule) {
		rule.consequence(facts);
	});
}