# DFA Design Notes

## Feature flags
- L: length has reached at least 8 characters
- D: a digit has been read
- S: a special character has been read

The machine uses eight states, one for each combination of three Boolean flags. A character can turn a flag from 0 to 1; flags never turn back to 0 while reading the string. Length flag changes to 1 when the eighth character is read.

## State output
The DFA is used as a Moore-style machine: each state has a classification output.
- q111 → Strong
- q101 and q110 → Medium
- q000, q001, q010, q011, q100 → Weak

## Transition intuition
- On a digit, set D=1.
- On a special character, set S=1.
- On any character, once the current position reaches 8, set L=1.
- Other characters leave D and S unchanged.

The UI highlights the current feature-combination state and shows a character-by-character trace.
