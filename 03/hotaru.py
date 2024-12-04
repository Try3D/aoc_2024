import re

data = open(r"input.txt").read()
regex = r"mul\((\d{1,3}),(\d{1,3})\)"
ind = [i.start() for i in re.finditer(r"don't\(\)", data)]
val = re.findall(regex, data[: ind[0]])
for i in range(len(ind) - 1):
    itr = data[ind[i] : ind[i + 1]].split("do()")
    for j in itr[1:]:
        val.extend(re.findall(regex, j))

print(sum(int(c) * int(d) for c, d in val))
