Inference Engine Notes
====

Rules, facts and results must all work together.
Rules will look for 'facts' and the code will fail if they do not expect.
The results will have various things sets
The application will do something with the results after
These are furthere 'facts'

This is forward chaining inference.
We keep going until no new facts are added.

Steps 
==

1. Match Rules
2. Select Rules
3. Execute Rules

Execute rules may add new facts.  If that is the case, the process is executed again until no new rules are matched.

Each rule has a priority.  This is not a priority for matching but for execution.

Match Rules
==
Evaluate the condition for all the rules based on the current set of facts.
If the condition is true, it is matched.
Record whether or not a new rule was matched.

Select Rules
==
Sort the matched rules by priority

Execute Rules
==
Execute the rules in priority order

If at least one new rule was matched in Step 1, proceed again to step one and continue until no new rules are matched