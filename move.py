import os
import platform
from shutil import copy2
from time import sleep

def creationDate(filePath):
    """
    Try to get the date that a file was created, falling back to when it was
    last modified if that isn't possible.

    @param string filePath path to the file
    @return int createdtime of file
    """
    if platform.system() == 'Windows':
        return os.path.getctime(filePath)
    else:
        stat = os.stat(filePath)
        try:
            return stat.st_birthtime
        except AttributeError:
            # We're probably on Linux. No easy way to get creation dates here,
            # so we'll settle for when its content was last modified.
            return stat.st_mtime

def buildSongList(songsDirPath):
	"""
	returns list of tuples with createdAt time and songPath.
	the list is sorted by latest to earliest

	@param strong songsDirPath: path to the dir with all the songs
	@return lst[(createdAt, songPath)]
	"""
	lst = []
	for song in os.listdir(songsDirPath):
		songPath = os.path.join(songsDirPath, song)
		if os.path.isfile(songPath):
			lst.append((creationDate(songPath), songPath, song))

	lst.sort(key = lambda pair: pair[0])

	return lst 

def moveFiles(sortedList, dst):
	"""
	copies and movies all the files WARNING! THIS REPLACES EXISTING FILES

	@param list lst[(createdAt, songPath)]
	@param string dst destination path
	"""
	for _, path, song in sortedList:
		try:
			copy2(path, dst)
			print('moving', song+'...')
			sleep(0.25)
		except Exception as e:
			print('problem moving', song)

if __name__ == '__main__':
	src = input('Source directory: ')
	dst = input('Destination directory: ')

	print('Sorting by date created... ')
	sortedList = buildSongList(src)

	print('Preparing to move...')
	moveFiles(sortedList, dst)

	print('DONE!')


