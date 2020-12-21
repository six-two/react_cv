#!/usr/bin/env python3
import json
import os
import sys
import time
# external: pip3 install PyYAML
import yaml

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
os.chdir(SCRIPT_DIR)


def readYaml(inputPath):
    try:
        with open(inputPath, "r") as inputStream:
            return yaml.safe_load(inputStream)
    except Exception as ex:
        print(" Error parsing yaml file ".center(80, "="))
        print(ex)
        sys.exit(1)


def writeJson(outputPath, data):
    with open(outputPath, "w") as output:
        json.dump(data, output, indent=2, sort_keys=True)


def yaml2json(inputFile, outputFile):
    data = readYaml(inputFile)
    writeJson(outputFile, data)


if __name__ == "__main__":
    FILE_NAMES = ["timeline", "labels", "ratings"]
    IN_DIR = "."
    OUT_DIR = "../src/app/data"

    for fileName in FILE_NAMES:
        inputFile = os.path.join(IN_DIR, fileName + ".yaml")
        outputFile = os.path.join(OUT_DIR, fileName + ".json")
        print("{} -> {}".format(inputFile, outputFile))
        yaml2json(inputFile, outputFile)
