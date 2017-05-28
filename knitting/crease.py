
def mix_evenly(l):
    sorted_l = sorted(l)

    N = len(sorted_l)

    N_right = sum([1 for v in sorted_l if v == sorted_l[-1]])
    N_left  = N - N_right
    start_from_right = N_left > N_right
    if start_from_right:
        # then reverse list
        sorted_l = sorted_l[::-1]

    l = []
    while len(sorted_l) > 0:
        add_to_right    = len(sorted_l)%2 == 0
        take_from_right = (len(sorted_l)-1)%4 < 2

        if take_from_right:
            val = sorted_l.pop(-1)
        else:
            val = sorted_l.pop(0)

        if add_to_right:
            l += [val]
        else:
            l = [val] + l
    return l

def max_entropy_list(total_masks, patterns):
    smallest_common = total_masks//patterns

    base_list = [smallest_common]*patterns
    missing   = total_masks - smallest_common*patterns

    assert missing >= 0
    assert missing <  total_masks

    for i in range(missing):
        base_list[i] += 1

    assert sum(base_list) == total_masks

    return mix_evenly(base_list)

def crease(N_from, N_to):

    dN  = N_to - N_from

    evenly_spread = max_entropy_list(N_from, abs(dN))

    action   = 'increase' if dN > 0 else 'decrease'

    p_min = min(evenly_spread)
    N_min = sum([1 for p in evenly_spread if p == p_min])
    p_max = max(evenly_spread)
    N_max = sum([1 for p in evenly_spread if p == p_max])
    summary = [ (p_min, N_min), (p_max, N_max)] if p_max>p_min else [ (p_min, N_min) ]

    solution = {'from':N_from,
                'to'  :N_to,
                'action':action,
                'action_sign': 1 if action == 'increase' else -1,
                'suggestion':evenly_spread,
                'summary': summary}

    # assert sum([ 1 for l,n in summary ]) == dN
    assert sum([ l*n for l,n in summary ]) == N_from

    return solution


# EXAMPLE
# 12 patterns leading to 23 de/in-creases
def run_example():

    N_from = 50
    N_to   = 57
    sol = crease(N_from, N_to)

    print('='*40)
    print(sol)

if __name__ == '__main__':
    run_example()
