import pandas as pd
import numpy as np
import pickle
data=pd.read_csv("data.csv")

x=data.drop("salary",axis=1)
y=data.salary

from sklearn.linear_model import LinearRegression

reg=LinearRegression()

reg.fit(x,y)

pickle.dump(reg,open("model.pkl","wb"))