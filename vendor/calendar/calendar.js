$( ".addToCal" ).toggleClass( "open" );

$( ".addToCalOptions button" ).on( "click", function(){
  var $this = $( this ),
      data = $this.closest( ".container" ).find( "button" ).data( "ace" ),
      type = $this.data( "type" ),
      url = "";
  // console.log( data );
  console.log( type );
  switch( type ){
      case "google":
          url = getUrl_google( data );
          break;
      case "yahoo":
          url = getUrl_yahoo( data );
          break;
      case "hotmail":
          url = getUrl_hotmail( data );
          break;
      case "ics":
          // Logic to download ics file.
          break;
      default:
          break;
  }
  console.log( url );
  window.open( url, '_blank' );
} );


function getUrl_google( data ) {
  var url = 'https://www.google.com/calendar/event?action=TEMPLATE';
  url += '&text=Personal Invitation for Alina&location=B+and+B+Espresso+Bar';
  url += '&details=This is your personal reminder.';
  url += '&location=B&B Espresso Bar, Mir Street, 11a, Mukachevo,';
  url += '&dates=20190927T150000Z/20190927T160000Z';  // time needs to be sent as UTC and let Google handle converting to local
  return url;
}



function _getUTCTime( dateObj, zone ) {
  var newDateObj = _adjustToUTC(dateObj, zone);
  return _getDatePart(newDateObj.getFullYear(),4) + _getDatePart(newDateObj.getMonth()+1,2) + _getDatePart(newDateObj.getDate(),2) + 'T' + _getDatePart(newDateObj.getHours(),2) + _getDatePart(newDateObj.getMinutes(),2) + _getDatePart(newDateObj.getSeconds(),2) + 'Z';
}

function _getDatePart(part, digits){
  part = part.toString();
  while(part.length < digits) {
      part = '0' + part;
  }
  return part;
}

function _adjustToUTC(dateObj, zone){
  var dateOut = new Date(dateObj),
  hours, mins;

  if(isNaN(dateOut.getTime())) {
      return new Date();
  }

  // adjust to UTC
  hours = zone.substring(1,3);
  mins = zone.substring(4,6);
  if(zone.substring(0,1) === '-') {
      dateOut.setHours(dateOut.getHours() + (hours-0));
      dateOut.setMinutes(dateOut.getMinutes() + (mins-0));
  } else {
      dateOut.setHours(dateOut.getHours() - hours);
      dateOut.setMinutes(dateOut.getMinutes() - mins);
  }
  return dateOut;
}

function _getDateDiff(startDate, endDate) {
  var diff = Math.floor((endDate - startDate)/60000),
  hours = Math.floor(diff/60),
  mins = diff - (hours * 60);
  return this._getDatePart(hours,2) + this._getDatePart(mins,2);
}