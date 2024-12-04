import re

data = open(r"input.txt").read()
regex = r"(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))"
part2 = 0
enabled = True
for match in re.finditer(regex, data):
    instruction = match.group(1)
    if instruction == "do()":
        enabled = True
    elif instruction == "don't()":
        enabled = False
    elif enabled:
        part2 += int(match.group(2)) * int(match.group(3))
print(part2)
