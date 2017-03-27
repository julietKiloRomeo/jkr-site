import copy
import time


def increase_entropy(mask_list):
    # increase largest number and decrease smallest
    mask_list = sorted(mask_list)
    if mask_list[-1] - mask_list[0] > 1:
       mask_list[0]  += 1 
       mask_list[-1] -= 1
    return sorted(mask_list)


def list_diff(l1, l2):
    # calc manhattan-difference between lists
    diff = 0
    for v1, v2 in zip(l1, l2):
        diff += abs(v1-v2)
    return diff

# EXAMPLE
# 12 patterns leading to 23 de/in-creases

dN  = 23
N_1 = 50

nl     = [0]*dN
nl_old = copy.deepcopy(nl)
nl[-1] = N_1

safety_count = 0
max_count    = 100 + nl[-1]
while not list_diff(nl_old, nl)==0:
    print(nl)
    nl_old = copy.deepcopy(nl)
    nl     = increase_entropy(nl)
    safety_count += 1
    time.sleep(0.1)
    if safety_count > max_count:
        break

l = []

for count in range(len(nl)):
    take_from_left = count%2 == 0
    append_to_left = (count-1)%4 > 1

    val = nl.pop(0) if take_from_left else nl.pop(-1)

    if append_to_left:
        l = [val]+l
    else:
        l = l+[val]
print('='*40)
print(l)

l_direct = [N_1/dN]*dN
print(l_direct)

