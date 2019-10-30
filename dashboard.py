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
	fire('activity')
	start_offline_tweets('data/bata_2014.txt', time_factor=100000)
	start_offline_tweets('data/bata_2014.txt','woordwolk', time_factor=100000)
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


@event('woordwolk')
def wolk(ctx, e):
    # we receive a tweet
    tweet = e.data

    for w in words(tweet['text']):
        emit('woordwolk', {
            'action': 'add',
            'value': (w, 1)
        })


@event('chirp')
def tweet(ctx, e):
    # we receive a tweet
    tweet = e.data

    # parse date
    time = datetime.datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')

    # nicify text
    text = textwrap.fill(tweet['text'],initial_indent='    ', subsequent_indent='    ')

    # generate output
    output = "[{}] {} (@{}):\n{}".format(time, tweet['user']['name'], tweet['user']['screen_name'], text)
    emit('chirp', output)


@event('tweet')
def echo(ctx,e):
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
