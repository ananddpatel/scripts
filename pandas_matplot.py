import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import argrelextrema

data = pd.read_csv('./WEED.TO-daily.csv')
data.columns = ['Date', 'Name','Close','High','Low','Open','Volume']

data = data.set_index(data.Date)
data = data[['Name','Close','High','Low','Open','Volume']]

price = data.Close 

for i in range(len(price)):
	max_i = list(argrelextrema(price.values[:i], np.greater, order=10)[0]) # [0] because its tuple
	min_i = list(argrelextrema(price.values[:i], np.less, order=10)[0]) # [0] because its tuple

	min_max_indexes = max_i + min_i
	# min_max_indexes = max_i + min_i + [len(price.values[:i])-1]
	min_max_indexes.sort()

	extremas = price.values[min_max_indexes]

	plt.plot(price.values[:i])
	plt.scatter(min_max_indexes, extremas, c='b')
plt.show()

# max_i = list(argrelextrema(price.values, np.greater, order=10)[0]) # [0] because its tuple
# min_i = list(argrelextrema(price.values, np.less, order=10)[0]) # [0] because its tuple

# min_max_indexes = max_i + min_i
# min_max_indexes.sort()

# extremas = price.values[min_max_indexes]

# plt.plot(price.values)
# plt.scatter(min_max_indexes, extremas, c='r')
# plt.show()
