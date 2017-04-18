from nltk.classify import NaiveBayesClassifier
from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.util import *
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import tokenize
from nltk.twitter import Twitter
from twython import Twython
from flask import Flask
from flask import json

# ## Code to connect to the web server or whatever
# app = Flask(__name__)
#
# @app.route('/get_query/<query>', methods=['GET'])
# def get_query(query):
#     return query;
#
# if __name__ == "__main__":
#     app.run()
# ##

CONSUMER_KEY='xmNzm2YKn1LyBBQA32YzQpLix'
CONSUMER_SECRET='7d4vGazTVoVOSLmH2zWMVWGIXotlAyFeqkWMHLJWdG3othjv6B'
ACCESS_KEY='375094867-N1P09cdmtPB43vMsYmMa77LgD5u1bSASdCYBLvqN'
ACCESS_SECRET='vV20CFJUodqdrGMW1vLZhHzzQkAvRV8upV5TSx7BrSn8x'

twitter = Twython(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_KEY, ACCESS_SECRET)

query = '$' + input('Enter a stock ticker:\n')

results=twitter.search(q=query, count=100)
#print(results['statuses'][1]['text'])
#print(results["text"])

tweets = []

for status in range(1, len(results['statuses'])):
    tweets.append(results['statuses'][status]['text'])

resultsLength = len(results['statuses'])

lastID = results['statuses'][resultsLength-1]['id_str']

while(resultsLength == 100 and len(tweets) < 1998):
    results=twitter.search(q=query, count=100, max_id=lastID)

    for status in range(1, len(results['statuses'])):
        tweets.append(results['statuses'][status]['text'])

    resultsLength = len(results['statuses'])

    lastID = results['statuses'][resultsLength-1]['id_str']

def tweetsToSentiments(sentences):

    sid = SentimentIntensityAnalyzer()
    values = []

    for sentence in sentences:
        ss = sid.polarity_scores(sentence)
        values.append(ss["compound"])

    return values

values = tweetsToSentiments(tweets)

positiveCount = 0
negativeCount = 0

for i in range(1, len(values)):
    if values[i] > 0:
        positiveCount += 1
    elif values[i] < 0:
        negativeCount += 1

percentPositive = (positiveCount*100)/len(values)
percentNegative = (negativeCount*100)/len(values)

print('Total tweets found: %d' % len(values))
print('Percent positive: %d' % percentPositive)
print('Percent negative: %d' % percentNegative)
