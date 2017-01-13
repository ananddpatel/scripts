import os
import sys

html_template = """<!DOCTYPE html>
<html>
<head>
	<title>Index</title>
	<link rel="stylesheet" href="css/custom_style.css">
</head>
<body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script src="js/main.js"></script>
</body>
</html>
"""

# dir/file structure ('folder name', [list of file names to create]) in a list.
js_project_boilerplate = [('js', ['main.js', 'test.js']), ('css', ['custom_style.css']), 'index.html']

def make_project(files_list):
	try:
		if isinstance(files_list, list):
			for item in files_list:
				make_project(item)
		elif isinstance(files_list, tuple):
			os.mkdir(files_list[0])
			for item in files_list[1]:
				make_project(item)
		else:
			with open(files_list, 'w') as f:
				if files_list == 'index.html':
					f.write(html_template)
	except Exception as e:
		sys.stdout.write('Files with same name already available.')

if __name__ == '__main__':
	make_project(js_project_boilerplate)
