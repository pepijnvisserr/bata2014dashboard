from eca import *
from eca.generators import start_offline_tweets

import random
import datetime
import textwrap
import pprint
import re

## You might have to update the root path to point to the correct path
## (by default, it points to <rules>_static)
# root_content_path = 'template_static'


# binds the 'setup' function as the action for the 'init' event
# the action will be called with the context and the event
@event('init')
def setup(ctx, e):
	ctx.counttweets = 0
	ctx.allhashtags = []
	ctx.hashtagscounts = []
	ctx.alllocations = []
	ctx.locationcounts = []
	fire('activity')
	start_offline_tweets('data/bata_2014.txt', time_factor=100000)
	ctx.words = {}


# define a normal Python function
def clip(lower, value, upper):
    return max(lower, min(value, upper))


@event('activity')
def generate_sample(ctx, e):
    

	# base sample on previous one
	sample = clip(0, ctx.counttweets, 1000)
	# emit to outside world
	if (sample == 0):
		sample = 0.0000000000001
	emit('activity',{
		'action': 'add',
		'value': sample
	})


	ctx.counttweets = 0
	# chain event
	fire('activity', delay=1)

# simple word splitter
pattern = re.compile('\W+')

# sample stopword list, needs to be much more sophisticated
stopwords = ['het', 'een', 'aan', 'zijn', 'http', 'www', 'com', 'ben', 'jij']

def words(message):
    result = pattern.split(message)
    result = map(lambda w: w.lower(), result)
    result = filter(lambda w: w not in stopwords, result)
    result = filter(lambda w: len(w) > 2, result)
    return result

@event('tweet')
def echo(ctx,e):

	#TWEETS AND ANNOUNCEMENTS
	ctx.counttweets += 1
    
	tweetdata = e.data
	announcenames = {"Batavierenrace", "Overijssel_", "GelderlandNieuw", "UTNieuws"}
	badwords = {"kut","godver","godverdomme","tering","tyfus","hoer","tyfus","homo","flikker","motherfucker","sukkel","klootzak","mogool","mongool","lul","penis","vagina","bitch","slet","neger","nigger","nigga","fuck"}
	goodname = False
	swearword = False
	for y in announcenames:
		if tweetdata['user']['screen_name'] == y:
		#if  tweetdata['text'].find('kanker') != -1:
			goodname = True
	for x in badwords:
		if  tweetdata['text'].find(x) > -1:
			swearword = True
	if (swearword == False):
		emit('tweet', e.data)
	if (tweetdata['user']['verified'] or goodname) and swearword == False:
		emit('importanttweet', tweetdata)

	#HASHTAGS
	hashtagdatas = tweetdata['entities']['hashtags']
	if hashtagdatas != []:
		for h in hashtagdatas:
			if h['text'].lower() not in ctx.allhashtags:
				ctx.allhashtags.append(h['text'].lower())
				ctx.hashtagscounts.append((h['text'].lower(),1))
			else:
				i = 0
				for y in ctx.hashtagscounts:
					if y[0] == h['text'].lower():
						ctx.hashtagscounts.append((h['text'].lower(),y[1] + 1))
						ctx.hashtagscounts.remove(y)
				i+= 1
		ctx.hashtagscounts.sort(key=lambda tup: tup[1])
		ctx.hashtagscounts.reverse()
		tophashtags = ctx.hashtagscounts[0:10]
		tophashtags.reverse()
		for h in tophashtags:
			emit('importanthashtags', h)

	#LOCATIONS
	locationdata = tweetdata['user']['location']
	if locationdata != [] and locationdata != "":
		if locationdata.lower() not in ctx.alllocations:
			ctx.alllocations.append(locationdata.lower())
			ctx.locationcounts.append((locationdata.lower(),1))
		else:
			i = 0
			for y in ctx.locationcounts:
				if y[0] == locationdata.lower():
					ctx.locationcounts.append((locationdata.lower(),y[1] + 1))
					ctx.locationcounts.remove(y)
			i+= 1
		ctx.locationcounts.sort(key=lambda tup: tup[1])
		ctx.locationcounts.reverse()
		toplocations = ctx.locationcounts[0:10]
		toplocations.reverse()
		for h in toplocations:
			emit('toplocations', h)

	#WORDCLOUD
	tweet = e.data

	for w in words(tweet['text']):
		emit('woordwolk', {
			'action': 'add',
			'value': (w, 1)
	})
