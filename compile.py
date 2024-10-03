#!/usr/bin/python
# -*- coding: UTF-8 -*-

from xml.dom.minidom import parse
import xml.dom.minidom
import json
import os
import time
import sys
import codecs
import cgi
from html.parser import HTMLParser
import re
import base64

RootDir = os.getcwd()
print(RootDir)

htmlPath = RootDir + '/build/web-mobile/index.html'
htmlVunglePath = RootDir + '/build/web-mobile/vungle.html'
htmlIronsourcePath = RootDir + '/build/web-mobile/ironsource.html'
htmlmindworkPath = RootDir + './build/web-mobile/mindwork.html'
htmladcolonyPath = RootDir + '/build/web-mobile/adcolony.html'
settingScrPath = RootDir + '/build/web-mobile/src/settings.js'
mainScrPath = RootDir + '/build/web-mobile/main.js'
mainirounsourceScrPath = RootDir + '/build/web-mobile/mainironsource.js'
mainmindwoekScrPath = RootDir + './build/web-mobile/mainmindwork.js'
mainadcolonyScrPath = RootDir + '/build/web-mobile/mainadcolony.js'
mainvungleScrPath = RootDir + '/build/web-mobile/mainvungle.js'
engineScrPath = RootDir + '/build/web-mobile/cocos2d-js-min.js'
projectScrPath = RootDir + '/build/web-mobile/src/project.js'

resPath = RootDir + '/build/web-mobile/res'

settingMatchKey = '{#settings}'
mainMatchKey = '{#main}'
engineMatchKey = '{#cocosengine}'
projectMatchKey = '{#project}'
resMapMatchKey = '{#resMap}'

addScriptPathList = [settingScrPath, mainScrPath, engineScrPath, projectScrPath]

fileByteList = ['.png', '.jpg', '.mp3', '.ogg', '.ttf', '.json', '.atlas', '.plist', '.bin']

base64PreList = {
  '.png' : 'data:image/png;base64,',
  '.jpg' : 'data:image/jpeg;base64,',
  '.mp3' : '',
  '.ogg' : '',
  '.ttf' : '',
  '.json': '',
  '.atlas': '',
  '.plist': '',
  '.bin': ''
}

def read_in_chunks(filePath, chunk_size=1024*1024):
  """
  Lazy function (generator) to read a file piece by piece.
  Default chunk size: 1M
  You can set your own chunk size
  """
  extName = os.path.splitext(filePath)[1]
  if extName in fileByteList:
    file_object = open(filePath, 'rb')
    base64Str = base64.b64encode(file_object.read()).decode('utf-8')
    preName = base64PreList[extName]
    if preName != None:
      base64Str = preName + base64Str
    return base64Str
  elif extName == '':
    return None
  
  file_object = open(filePath, encoding="utf8")
  return file_object.read()

def writeToPath(path, data):
  with open(path,'w', encoding="utf-8") as f: # 如果filename不存在会自动创建， 'w'表示写数据，写之前会清空文件中的原有数据！
    f.write(data)

def getResMap(jsonObj, path):
  fileList = os.listdir(path)
  for fileName in fileList:
    absPath = path + '/' + fileName
    if (os.path.isdir(absPath)):
      getResMap(jsonObj, absPath)
    elif (os.path.isfile(absPath)):
      dataStr = read_in_chunks(absPath)
      if dataStr != None:
        absPath = 'res' + absPath.replace(resPath, '')
        jsonObj[absPath] = dataStr
        print(absPath)

def getResMapScript():
  jsonObj = {}
  getResMap(jsonObj, resPath)
  resStr = str("window.resMap = ") + json.dumps(jsonObj)
  return resStr
  
def start(htmlPath):
  htmlStr = read_in_chunks(htmlPath)

  settingsStr = read_in_chunks(settingScrPath)
  htmlStr = htmlStr.replace(settingMatchKey, settingsStr, 1)
  
  projectStr = read_in_chunks(projectScrPath)
  htmlStr = htmlStr.replace(projectMatchKey, projectStr, 1)
  
  mainStr = read_in_chunks(mainScrPath)
  htmlStr = htmlStr.replace(mainMatchKey, mainStr, 1)
  
  engineStr = read_in_chunks(engineScrPath)
  htmlStr = htmlStr.replace(engineMatchKey, engineStr, 1)
  
  resStr = getResMapScript()
  htmlStr = htmlStr.replace(resMapMatchKey, resStr, 1)

  writeToPath(htmlPath, htmlStr)

def startIronsource(htmlPath):
  htmlStr = read_in_chunks(htmlPath)

  settingsStr = read_in_chunks(settingScrPath)
  htmlStr = htmlStr.replace(settingMatchKey, settingsStr, 1)
  
  projectStr = read_in_chunks(projectScrPath)
  htmlStr = htmlStr.replace(projectMatchKey, projectStr, 1)
  
  mainStr = read_in_chunks(mainirounsourceScrPath)
  htmlStr = htmlStr.replace(mainMatchKey, mainStr, 1)
  
  engineStr = read_in_chunks(engineScrPath)
  htmlStr = htmlStr.replace(engineMatchKey, engineStr, 1)

  resStr = getResMapScript()
  htmlStr = htmlStr.replace(resMapMatchKey, resStr, 1)

  writeToPath(htmlPath, htmlStr)

def startVungle(htmlPath):
  htmlStr = read_in_chunks(htmlPath)

  settingsStr = read_in_chunks(settingScrPath)
  htmlStr = htmlStr.replace(settingMatchKey, settingsStr, 1)
  
  projectStr = read_in_chunks(projectScrPath)
  htmlStr = htmlStr.replace(projectMatchKey, projectStr, 1)
  
  mainStr = read_in_chunks(mainvungleScrPath)
  htmlStr = htmlStr.replace(mainMatchKey, mainStr, 1)
  
  engineStr = read_in_chunks(engineScrPath)
  htmlStr = htmlStr.replace(engineMatchKey, engineStr, 1)

  resStr = getResMapScript()
  htmlStr = htmlStr.replace(resMapMatchKey, resStr, 1)

  writeToPath(htmlPath, htmlStr)

def startMindwork(htmlPath):
  htmlStr = read_in_chunks(htmlPath)

  settingsStr = read_in_chunks(settingScrPath)
  htmlStr = htmlStr.replace(settingMatchKey, settingsStr, 1)
  
  projectStr = read_in_chunks(projectScrPath)
  htmlStr = htmlStr.replace(projectMatchKey, projectStr, 1)
  
  mainStr = read_in_chunks(mainmindwoekScrPath)
  htmlStr = htmlStr.replace(mainMatchKey, mainStr, 1)
  
  engineStr = read_in_chunks(engineScrPath)
  htmlStr = htmlStr.replace(engineMatchKey, engineStr, 1)

  resStr = getResMapScript()
  htmlStr = htmlStr.replace(resMapMatchKey, resStr, 1)

  writeToPath(htmlPath, htmlStr)

def startAdcolony(htmlPath):
  htmlStr = read_in_chunks(htmlPath)

  settingsStr = read_in_chunks(settingScrPath)
  htmlStr = htmlStr.replace(settingMatchKey, settingsStr, 1)
  
  projectStr = read_in_chunks(projectScrPath)
  htmlStr = htmlStr.replace(projectMatchKey, projectStr, 1)
  
  mainStr = read_in_chunks(mainadcolonyScrPath)
  htmlStr = htmlStr.replace(mainMatchKey, mainStr, 1)
  
  engineStr = read_in_chunks(engineScrPath)
  htmlStr = htmlStr.replace(engineMatchKey, engineStr, 1)

  resStr = getResMapScript()
  htmlStr = htmlStr.replace(resMapMatchKey, resStr, 1)

  writeToPath(htmlPath, htmlStr)
if __name__ == '__main__':
  start(htmlPath)
  startIronsource(htmlIronsourcePath)
  startVungle(htmlVunglePath)
  startMindwork(htmlmindworkPath)
  startAdcolony(htmladcolonyPath)
