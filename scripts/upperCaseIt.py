import os
import re

searchDir = '/Users/jessebeach/code/quailjs/quail/lib/assessments'
exclude = ['.git', 'node_modules','bin']
os.chdir(searchDir)

for root, dirs, files in os.walk(searchDir):
    dirs[:] = [d for d in dirs if d not in exclude]
    for f in files:
        if re.match(r'[a-z]', f):
            fullPath = os.path.join(root, f)
            fullPathLower = os.path.join(root, f[0].upper() + f[1:])
            command = 'git mv --force ' + fullPath + ' ' + fullPathLower
            print(command)
            os.system(command)
