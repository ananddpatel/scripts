import requests as r
from bs4 import BeautifulSoup
from sys import argv


def buildSearchQuery(words):
	return '+'.join(words)

def getSoup(url):
	"""k
	url: string
	return: BeautifulSoup

	gets page soup
	"""
	headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
	}
	res = r.get(url, headers=headers)
	return BeautifulSoup(res.text, 'html.parser')


def main():
	soup = getSoup(urlToCrawl)
	listTags = soup.select('.mainsite_record_listing li')
	for li in listTags:
		productTitleSpan = li.find('span', class_="product_title")
		if productTitleSpan:
			name = productTitleSpan.text
			price = li.find('span', class_="sale").text
			link = li.find('a').get('href')
			print(name, price, link)
	


if __name__ == '__main__':
	base = 'https://www.footlocker.ca'
	query = buildSearchQuery(argv[1:]) if len(argv) > 1 else 'air+force+low'
	# urlToCrawl = base+'/en-CA/Mens/_-_/N-24Z5v/keyword-'+query+'?cm_REF=10%2E0&Rpp=180&crumbs=76%20211'

	urlToCrawl = base+'/en-CA/Mens/_-_/N-24Z5v/keyword-'+query+'?Rpp=180&Ns=P_StyleSalePrice%7C0&crumbs=76%20211&cm_SORT=Price%20%28Low%20to%20High%29'
	main()
