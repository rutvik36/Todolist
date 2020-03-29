
module.exports.getdate=function()
{
var today = new Date();
var currentday=today.getDay();
var day="";
var weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
currentday=today.toLocaleDateString("en-US",options);
return currentday;
}
module.exports.getday=function()
{
  var today = new Date();
  var currentday=today.getDay();
  var day="";
  var weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var options={
    weekday:"long",
  };
  currentday=today.toLocaleDateString("en-US",options);
  return currentday;
}
