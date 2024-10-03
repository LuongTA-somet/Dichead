import re
import os
import zipfile
import shutil

if(not os.path.isdir('playableAds')):
    os.mkdir('playableAds')
    print('Tao thanh con thu muc playableAds')

RootDir = os.getcwd()
print(RootDir)

htmlPath = RootDir + '/build/web-mobile/index.html'
htmlIronsourcePath = RootDir + '/build/web-mobile/ironsource.html'
htmlVunglePath = RootDir + '/build/web-mobile/vungle.html'
htmlMindworkPath = RootDir + './build/web-mobile/mindwork.html'
htmlAdcolonyPath = RootDir + '/build/web-mobile/adcolony.html'


def build(html_file_name, build_file_name, adNetwork=None, adSize=None):
    with open(html_file_name, "r", encoding='utf8') as htmlFile:
        htmlStr = htmlFile.read()
        if adNetwork:
            htmlStr = htmlStr.replace('__adNetwork__', adNetwork)
        if adSize:
            htmlStr = htmlStr.replace('<!--__MetaAdSize__-->', '<meta name="ad.size" content="width=' +
                                      adSize['width'] + ',height=' + adSize['height'] + '">')
        else:
            htmlStr = htmlStr.replace('<!--__MetaAdSize__-->', '')
        with open(build_file_name, "w", encoding='utf8') as buildFile:
            buildFile.write(htmlStr)


build(htmlPath, 'playableAds/unity.html',   'unity')
build(htmlPath, 'playableAds/applovin.html', 'applovin')
build(htmlPath, 'playableAds/facebook.html', 'facebook')
shutil.copy(htmlIronsourcePath, 'playableAds/ironsource.html')
shutil.copy(htmlVunglePath, 'playableAds/vungle.html')
shutil.copy(htmlMindworkPath, 'playableAds/mindwork.html')
shutil.copy(htmlAdcolonyPath, 'playableAds/adcolony.html')

build(htmlPath, 'playableAds/index.html',
      'adword', {'width': '300', 'height': '250'})
zip = zipfile.ZipFile("playableAds/adword_300_250.zip",
                      "w", zipfile.ZIP_DEFLATED)
zip.write("playableAds/index.html", "index.html")
zip.close()

build(htmlPath, 'playableAds/index.html',
      'adword', {'width': '480', 'height': '320'})
zip = zipfile.ZipFile("playableAds/adword_480_320.zip",
                      "w", zipfile.ZIP_DEFLATED)
zip.write("playableAds/index.html", "index.html")
zip.close()

build(htmlPath, 'playableAds/index.html',
      'adword', {'width': '320', 'height': '480'})
zip = zipfile.ZipFile("playableAds/adword_320_480.zip",
                      "w", zipfile.ZIP_DEFLATED)
zip.write("playableAds/index.html", "index.html")
zip.close()

zip = zipfile.ZipFile('playableAds/mindwork.zip', 'w', zipfile.ZIP_DEFLATED)
zip.write('playableAds/mindwork.html', 'mindwork.html')
zip.close()

os.remove(RootDir + './playableAds/mindwork.html')