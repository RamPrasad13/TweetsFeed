import './app.scss';

let style=document.createElement('link');
style.href='https://fonts.googleapis.com/css?family=Roboto';
style.rel='stylesheet';
document.getElementsByTagName('head')[0].appendChild(style);
let link=document.createElement('link');
link.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
link.rel='stylesheet';
document.getElementsByTagName('head')[0].appendChild(link);
let metaTag=document.createElement('meta');
metaTag.name = "viewport";
metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
document.getElementsByTagName('head')[0].appendChild(metaTag);
import("./twitter").then(twitter => {
twitter.init();
});