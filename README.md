
Require Node.js >= v5

Install Heroku Toolbelt

For Debian:

```bash
echo "deb http://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list
wget -O- https://toolbelt.heroku.com/apt/release.key | apt-key add -
apt-get update
apt-get install -y ruby
apt-get install -y heroku-toolbelt
```
For Windows:

https://toolbelt.heroku.com/ and click click and more clicks

Login in heroku client:
``` bash
heroku login
```
Connect with Heroku repo:

``` bash
heroku create
heroku git:remote -a sos-2016-06
```
Upload code to heroku
``` bash
git add .

git commit -am "Comments for commit"

git push heroku master
``` 

Upload code to github too

```bash
git push origin master

```

