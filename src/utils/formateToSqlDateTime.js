import moment from 'moment';

export const formateToSqlDateTime = (date) => {

   return date.toISOString().slice(0, 19).replace('T', ' ');
};

export const formateToSqlDateWithMoment = (date) => {
   // console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
   return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const sqlDateTimeToJsDateTime = (date) => {
   if(!date) return ;
   var dateStr = date; //returned from mysql timestamp/date time field
   var a = dateStr.split(' ');
   var d = a[0].split('-');
   var t = a[1].split(':');
   var formattedDate = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
   console.log(formattedDate);
   return formattedDate;
};
