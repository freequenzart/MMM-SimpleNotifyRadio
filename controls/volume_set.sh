#!/bin/bash
# amixer -M sget PCM | grep -o '[0-9]*%'

value="$1%"
amixer -q -M  sset Headphone $value
