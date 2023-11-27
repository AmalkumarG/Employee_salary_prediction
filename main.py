from flask import Flask,request,redirect,url_for,jsonify
from flask_cors import CORS
import pickle
import json
import numpy as np
app=Flask(__name__)
model=pickle.load(open("model.pkl","rb"))
CORS(app)
@app.route("/data")
def getData():
    return {"abd":"aaaa"}

@app.route("/predict",methods=["POST"])
def predict():
    if request.method=="POST":
        content=request.json
        data=content["data"]
        data=[int(i) for i in data]
        final=np.array(data).reshape(1,-1)
        value=np.array(content["data"]).reshape(1,-1)
        predicted=model.predict(final)
        
        return jsonify({"predicted":round(predicted.tolist()[0],2)})
    

if __name__=="__main__":
    app.run(debug=True)