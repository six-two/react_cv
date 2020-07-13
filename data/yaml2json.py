#!/usr/bin/env python3
import json
import os
import sys
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
    for fileName in ["timeline"]:
        inputFile = "./{}.yaml".format(fileName)
        outputFile = "../src/data/{}.json".format(fileName)
        # print("{} -> {}".format(inputFile, outputFile))
        yaml2json(inputFile, outputFile)
