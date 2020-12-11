#!/usr/bin/env python3
import json
import os
import sys
import time
# external: pip3 install PyYAML watchdog
import yaml
from watchdog.observers import Observer
from watchdog.events import RegexMatchingEventHandler


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
    FILE_NAMES = ["timeline", "labels"]
    IN_DIR = "."
    OUT_DIR = "../src/app/data"

    def convert(fileName):
        inputFile = os.path.join(IN_DIR, fileName + ".yaml")
        outputFile = os.path.join(OUT_DIR, fileName + ".json")
        print("{} -> {}".format(inputFile, outputFile))
        yaml2json(inputFile, outputFile)

    for fileName in FILE_NAMES:
        convert(fileName)

    my_event_handler = RegexMatchingEventHandler([".*\\.yaml"])
    def on_modified(event):
        fileName = os.path.basename(event.src_path).rsplit(".", 2)[0]
        convert(fileName)

    my_event_handler.on_modified = on_modified

    observer = Observer()
    observer.schedule(my_event_handler, IN_DIR, recursive=True)
    observer.start()

    try:
        print("Watching for file changes...")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("Stopping...")
    observer.join()
