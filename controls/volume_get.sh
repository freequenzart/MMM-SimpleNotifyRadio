#!/bin/bash
amixer -M sget PCM | grep -o '[0-9]*%'
