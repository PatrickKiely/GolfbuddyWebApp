*************************************************************************************************
*	Golfbuddy Web Application								*
*************************************************************************************************

Mobile Web Development Assignment 2
Patrick Kiely - 20054995

*************************************************************************************************
*	Technologies used									*
*************************************************************************************************
html
Javascript 
CSS
Backbone
Jquery-mobile
Facebook Api
Google API
Amazon Ec2 Instance
Mongodb HQ
Node.js
Github



*************************************************************************************************
*	Source Library										*
*************************************************************************************************

https://github.com/PatrickKiely/GolfbuddyWebApp



*************************************************************************************************
*	Web Deployment 										*
*************************************************************************************************

bit.ly/Golfbuddy



*************************************************************************************************
*	App Purpose										*
*************************************************************************************************


I have chosen to build a mobile web app (The Golfbuddy) to show you closest golf clubs to you in your 
immediate vicinity, the current deployed version shows all major golf clubs in the south east as well 
as the official Irish top 10 as per the golfing digest website.

On inital load an element loats down to ask you to add to home screen, I have created app icons for 
both Android and iOS using :
http://www.gieson.com/Library/projects/utilities/icon_slayer/#.U3ioBfldWSo
this was a very usful site for resizing and applying shadow etc for professional looking icons.


On tab 2 As well as directing you to a golf club it also allows you to record the fact you play there, 
the date, your handicap, your score as well as notes on the round. This information is displayed with minimal 
info first (golf course and date) but you can expand from the list to show all the attached information 
as well as edit it*(nb editing not working).

Swiping right on a golf course name brings up the delete icon, tapping this deletes the entry or swiping 
left cancels the delete.

On tab 3 you can log into facebook to like the app or share the face you are using the app, if others of 
your face book friends are using the app they will be listed here as well after you login.

On tab 4 a calculator is supplied to help you quickly tot up your scores on the round of golf if the numbers 
become too large..

Tab 5 is a more info tab, it contains a more info button which shows different info about  the application. 
As well as this there is a street map button to allow you to quickly access google to see where you are.


*************************************************************************************************
*	App development 									*
*************************************************************************************************

HTML:

The main application is built with a html page using javascript to show and hide elements. 

Javascript:
The javascript is in the main implemented using jquery mobile in a backbone framework.

CSS :
I used mainstream CSS as well as some CSS3 features to identify whether I was on desktop screen, 
an iPhone 5s or larger Samsung s4 screen. There was alot of resizing needed as what looks good on an iPhone is too 
small on a larger android screen.

Android identification : @media only screen and (max-width:632px) 
iPhone identification  : @media (device-height : 568px) 
   and (device-width : 320px) 
   and (-webkit-min-device-pixel-ratio: 2)

An interesting issue was the fact I was displaying show info, hide info and delete icons all on 
the same place on screen using .show and .hide to swithch elements. On desktop this was fine but 
on modile device it changed too fast and tapping an icon sometimes caused the next action to happen 
as well. I solved this by causing the .show to be .show(slow) and it gave time for the tap action to be 'forgotten'.





*************************************************************************************************
*	Issues										*
*************************************************************************************************

Scrolling does not work on all screens, it works fine on the home screen but other are intermittent.

Updating the saved data is not working so I didnt display the update button.

All the view, adding deleting works fine on the locally deployed version of the app but gives me a 502 
gateway error on thw AWS deployed version. I know it is an issue with the API call but so far I dont know 
how to fix it. I do think is is a simple change in the AWS nginx conf file but I didnt crack it yet!

I used two ways to display the google map. On tab 1 it is displayed using a library script and array to store 
the golfclub element. Serving up the google map on tab 5 (using backbone) shows up an issue with showing 
a google map that is in an initially hidden div. The center of the map stay in the top left corner and 
only a quarter of the map initially displays. I researched this issue and lots of people online had it 
too without a good remedy. This map works fine on tab 1 if you display it there.







