# Scratch
Risk comes from not knowing what you're doing-**Warren Buffett**

Everyone or most people had a fleeting idea of "Hey, I think I might be able to make a pretty penny from stocks..." But not all of us are well versed in stock trading strategies or have the innate skills of trading like Leonardo Dicaprio from The Wolf of Wall Street.

![Leo and his monies](https://media.giphy.com/media/gTURHJs4e2Ies/giphy.gif)

Well I for one am one of those lofty dreamers thinking that I could make some money from dabbling in the stock market. This idea lead me to start on this project to learn from the best ~~or just the better~~ traders.Like the saying goes "Imitation is the sincerest form of flattery-**Charles Caleb Colton**":ok_hand: However that is not all the *Scratch* can offer, it also keeps track of your current portfolio and shows you how much money you earned or lose...So with this app I believe that one can improve or just learn the ropes of trading.

## How to Make Money in 1 Easy Step (**JOKE**)

*disclaimer that was a joke, Please do not sue me.*
However you are able try out [Scratch](https://scrbk.herokuapp.com/) right over here!

## Getting Started
Want to help out expanding this application?
1. Head on over to my [github](https://github.com/iancwe/Scratch)
2. Fork it or clone it to your computer/github
3. Open the repository in you editor of choice and do not forget to `npm install` the node modules for the project.
4.  There is an `.env` file that you would have to create on your own however there is  sample file in the repository as well.
5.  Go wild. All help is mucho appreciated. :tada:

## Development
This was the first full stack application that I tried my hands on. And it was quite a daunting task I must admit. After coming up with this idea, I went ahead and draw out an **E** ntity **R** elationship **D** iagram to help map out which collections is interacting with each other.

![ERD](http://i.imgur.com/ZQALp5y.png)

Ok that look way more simple when drawn out as compared to pondering over how it works. So for this diagram, I have 2 collections in my database, which is represented by the 2 rectangles users and company. Firstly, we will take a look at the relationship of user to company.

In this first case we have to break down to relationship into minimum and maximum interaction. Therefore the user could have invested in 0 company and is just lurking around the application or he could be a baller and invest in many companies. This is drawn using the 0< on the right side of the line. For the second interaction, it would b company to user and 1 share can only be bought by 1 user and not shared among other user. Therefore the symbol || is placed on the line.

On to the next diagram!

![Use Case diagram](http://i.imgur.com/I1lk8Wa.jpg)

In this picture of well drawn rich dude with wads of cash, I listed down all or most of the features that I think was needed in  application and designated some of the features as the **M** inimum **V** iable **P** roduct. Which was creating an account that also consisted of logging in. Being able to updated your profile and deleting companies in your portfolio. All this feature were under the CRUD requirements.

![First page of wireframes](http://i.imgur.com/XHVCg24.jpg)

Once I figured out my ERD and Use Case Diagram, I just drew a bunch of wireframes layout as how each webpage would look like. In order to flex my dormant creative side, I just made it an effort to come with with at least 2 layouts for one page and I tried going as fast as I can without being nitty gritty. So in the first column I drew 2 wireframes for my landing page. And the second column would be the sign up page, which I eventually got rid off. In the effort for making a more compact and flatter website.

![Second page of wireframes](http://i.imgur.com/u2Rue88.jpg)

The first column wireframes are for the home page once the users are signed up or logged in. This page would show their current portfolio and a list of their followed users. The second column consisted of a design for a meet up page which I abandoned and a populated list of uses who are using *Scratch*

 ![last page of wireframes](http://i.imgur.com/S9hQrD9.jpg)

 On this last page, it was how my portfolio page would look like. However I managed to combined this into my homepage, making it more accessible and the user would be able to see the current state of their portfolio at once glance and not through a barrage of actions.

 ![stocks](https://media0.giphy.com/media/3orieUs03VUeeBa7Wo/giphy.gif)

 ## Point of Interest Workflow

 1. Creating RESTful routes and isolated collections were the main goal for this project

 2. A close runner up was trying to apply an API to the application that can retrieve real life and time stock prices to help calculate the users returns.

 3. And another target I had was to try to get rid of pages that do not serve much purpose or isn't use that much, namely sign up and log in page. Therefore the dream was to create a modal log in and sign up box which would handle the pages work.

 4. Get a bunch of background images that changes everything you refresh or render/redirect into the landing page. Wanted to overlay the background image with a `particle.js` canvas.

 5. Only showing the current user portfolio and not other users portfolio.


 ## Notable Milestones

 1. The first and one of the biggest issue I had through this project was trimming down on my webpages with a sign up and log in modal box.

![modal box in action](https://media.giphy.com/media/l0Iyds5xmEvGH12o0/giphy.gif)

I assumed when creating a modal dialog box to house my sign up and log in form. It would just be an synchronous affair. However after many hours of trying to figure out if I broke my authentication and passport function. I realized it was an async function only after trawling through StackOverflow. Using jQuery to pass the data that was extracted out from the form using`ajax`

`jQuery(function ($) {
  $('#modalLog').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      dataType: 'json',
      url: '/login-ajax', // this is the submit URL
      type: 'POST', // or POST
      data: $('#modalLog').serialize(),
      success: function (data) {
        if (data.message === 'success') {
          $('#logmodal').hide()
          window.location.replace('/home')
        } else if (data.message === 'error') {
          $('#modalErrorAlert').show()
        }
      }
    })
  })
})`

As seen from the code above, once the user clicks on the log in button. It prevents the default action of the `.post` route but instead takes the data from the form and packages it into an `json` first then post it which is taken in by the passport in the authentication controller.

`router.post('/login-ajax', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) { return res.json({message: 'error'}) }
    if (!user) { return res.json({message: 'error'}) }
    req.login(user, function (err) {
      if (err) return res.json({message: 'error'})
      return res.json({message: 'success'})
    })
  })(req, res, next)
})`

It takes in the `json` data and runs the passport function as well.

`passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  process.nextTick(function () {
    User.findOne({ email: email }, function (err, user) {
      if (err) return done(err)
      if (!user) return done(null, false)
      if (!user.validPassword(password)) return done(null, false)
      return done(null, user)
    })
  })
}))`

So once the `passport.use` function runs through the data checking if it indeed in the database and it is an registered user. it returns a `json` back with either the message `success` or `error` The respond has to be send back in JSON because the request was also sent as a JSON. It is sent back to the script in `script.js` with it's corresponding message the script would either replace the current window with the home page or `.show` and error message that was hidden in the log in/sign up modal box.

2. API for finance or just stock in general were actually pretty difficult to scour for. As most of them are behind a pay wall or have deprecated databases. Yahoo finance API which was a go to for most developers current stopped their YAHOO webservice API services. Luckily reading through some developer forums I managed to find a service provider called 'Alpha Vantage' for APIs. This API was was to be used every time the user get routed to the homepage where their portfolio is retrieved and updated with the current day average stock prices for the company he chose.

`  let comAvg = {}
  company.forEach(function (nth, i) {
    let comSym = company[i].symbol
    let url = 'http://www.alphavantage.co/query?function=SMA&symbol=' + comSym + '&interval=daily&time_period=2&series_type=close&apikey=C8VN'
    unirest.get(url).end(function (output) {
      let data = output.body['Technical Analysis: SMA']
      let avg = data[Object.keys(data)[0]]
      comAvg[company[i]._id] = (avg.SMA)
      if (Object.keys(comAvg).length === company.length) {
        res.render('home', {companies: company, dAvg: comAvg})`

Using the `unirest` module it made handling an `ajax` request easier. However I again ran into another problem with when I tried refactoring my code but put it as an external function to be called only when populating the homepage. The issue i ran into was that it was a blocking function thus it was pushed to the the stack queue. And not populating my array that I needed. I fixed the issue by sticking the function back into the populate home controller function but it costed considerable delay when loading the page.

![googleStocks](https://media.giphy.com/media/8xmAaX9mGFUZ2/giphy.gif)

3.  To only be able to populate the homepage with the current user portfolio I had to do a `.populate` on a reference collection. In my case it was looking for the company that was linked to the user.  

`User.findById(req.user._id)
.populate({
  path: 'portfolio'
})
.exec(function (err, user) {
  let company = user.portfolio
  if (err) {
    req.flash('error', 'Can\'t populate user portfolio')
    req.redirect('/home')
  } else if (user.portfolio.length > 0) {
    if (err) {
      req.flash('error', 'Portfolio not found')
      res.redirect('/home')
    }`

By doing populate on my referenced collection I was able to just display the current user companies in his portfolio.

## Deployment
- [Heroku](https://dashboard.heroku.com/)
- [mlab](mlab.com)

## Built With
- jQuery
- Node
- Javascript
- CSS
- HTML
- BootStrap
- Bcrypt
- passport
- Express

![Witchcraft](https://media.giphy.com/media/3o84U6421OOWegpQhq/giphy.gif)

## Bugs :bug:
- Did not managed to populate followed users on homepage
- Return for half a year return is not working well as there isn't enough info
- API for other markets

## Further Development
- Project still Work in Progress
- Add in more API for different markets
- Add in `particle.js` as my canvas for the landing page
- Populate homepage with followed users
- fix return of users
- Use `Async Series` npm to fix API issue
- Refactor more of my codes(i.e fix up my `auth.js` file into a router and controller)

## Resources  

- [ERD Explanation](https://www.youtube.com/user/lucidchart)
- [BootStrap Navbar](https://www.youtube.com/channel/UCwHrYi0GL6dmYaRB0StEbEA)
- [CSS Know How](https://www.youtube.com/channel/UCyIe-61Y8C4_o-zZCtO4ETQ)
- Stack Overflow
- Unsplash

## Author
[Ian Chong](https://github.com/iancwe)

## Acknowledgments

- [YISHENG](https://github.com/yisheng90)
- [Sharona](https://github.com/sharona1610)
- [Prima](https://github.com/primaulia)
- [Tom](https://github.com/dorkblue)
- [Maria](https://github.com/hexhex23)
- [Robin](https://github.com/cwxr)
- [Darrell](https://github.com/darrelltzj)

Without the Handsome my project might be still broken.
![The Handsome](http://i.imgur.com/ZtcGF7B.gif)
