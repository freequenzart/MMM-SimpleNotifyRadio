#!/bin/bash
amixer -M sget Headphone | grep -o '[0-9]*%'
