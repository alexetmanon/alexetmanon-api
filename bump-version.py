#! /usr/bin/env python3

import xml.etree.ElementTree as ET
import json, sys
from collections import OrderedDict

def updatesJSON(filename, version):
    with open(filename, 'r+') as f:
        bower = json.load(f, object_pairs_hook=OrderedDict)

        # updates version
        bower['version'] = version

        f.seek(0)
        f.write(json.dumps(bower, indent=2))
        f.truncate()

if __name__ == '__main__':
    if len(sys.argv) < 2:
        exit(-1)

    # new version
    version = sys.argv[1]

    #
    # edits bower.json and package.json
    #
    # updatesJSON('bower.json', version)
    updatesJSON('package.json', version)