with open('dashboard1.html', 'r', encoding='utf-8') as f:
    d1 = f.read()

with open('dash2.txt', 'r', encoding='utf-8') as f:
    d2 = f.read()

with open('dash3.txt', 'r', encoding='utf-8') as f:
    d3 = f.read()

# Get d1 up to '<div class="content">'
idx = d1.find('<div class="content">')
if idx != -1:
    d1_part = d1[:idx + len('<div class="content">') + 1]
else:
    print("Could not find <div class=\"content\"> in dashboard1.html")
    exit(1)

# Get d2 after DASHBOARD PAGE comment
idx2 = d2.find('<!-- ═══════════════ DASHBOARD PAGE ═══════════════ -->')
if idx2 != -1:
    d2_part = d2[idx2:]
else:
    print("Could not find marker in dash2.txt")
    exit(1)

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(d1_part + '\n' + d2_part + '\n' + d3)

print("Combined successfully!")
